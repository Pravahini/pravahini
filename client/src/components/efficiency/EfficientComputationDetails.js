import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

function EfficientComputationDetails() {
  const { address } = useAccount();
  const [jobStatus, setJobStatus] = useState("");
  const [userJobs, setUserJobs] = useState([]);
  const [cid, setCid] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [btnloadingArray, setBtnLoadingArray] = useState(
    Array(userJobs.length).fill(false)
  );
  const [cidbtnloadingArray, setCidBtnLoadingArray] = useState(
    Array(userJobs.length).fill(false)
  );
  const token = Cookies.get("jwtToken");
  const tokenHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleCheckJobStatus = async (jobId, index) => {
    console.log("Checking Job Status...");
    const email = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/register?address=${address}` );
// console.log()
const emailId =email.data.Email;
    const newBtnLoadingArray = [...btnloadingArray];
    newBtnLoadingArray[index] = true;
    setBtnLoadingArray(newBtnLoadingArray);
   
    const apiURL = `${process.env.REACT_APP_BACKEND_URL}/container1/get-job-status/:${jobId}?emailId=${emailId}`;

    axios
      .get(apiURL,tokenHeaders,{params : {
        emailId: email.data
      }})
      .then((response) => {
        const { state } = response.data;
        console.log("inside",email.data.Email);
        setJobStatus(state);

        // Update the job status in the database
        const updateJobStatusUrl = `${process.env.REACT_APP_BACKEND_URL}/container1/update-job-status`;
        const jobData = {
          walletAddress: address,
          jobId: jobId,
          jobStatus: state,
        };

        axios
          .post(updateJobStatusUrl, jobData, tokenHeaders)
          .then((updateResponse) => {
            console.log("Job status updated in the database:");
          })
          .catch((updateError) => {
            console.error(
              "Error updating job status in the database:",
              updateError
            );
          });
        newBtnLoadingArray[index] = false;
      })
      .catch((error) => {
        console.error("Error:", error);
        newBtnLoadingArray[index] = false;
      });
  };

  const handleGetCID = (jobId, index) => {
    console.log("Started Cid Getting");
    // const index = dataList.findIndex((data) => data.jobId === jobId );
    // if(index !== -1){
    const newCidBtnLoadingArray = [...btnloadingArray];
    newCidBtnLoadingArray[index] = true;
    setCidBtnLoadingArray(newCidBtnLoadingArray);
    console.log("Getting CID of this Job Id!");
    const apiURL = `${process.env.REACT_APP_BACKEND_URL}/container1/get-cid/:${jobId}`;

    axios
      .get(apiURL, tokenHeaders)
      .then((response) => {
        const { cid } = response.data;
        setCid(cid);
        setShowButton(false);
        try {
          const updateJobUrl = `${process.env.REACT_APP_BACKEND_URL}/container1/update-cid`;
          const jobData = {
            walletAddress: address,
            jobId: jobId,
            cid: cid,
          };

          // Post request to save the data in the database

          axios
            .post(updateJobUrl, jobData, tokenHeaders)
            .then((saveResponse) => {
              console.log("Job details updated:");
            })
            .catch((saveError) => {
              console.error("Error updating job:", saveError);
            });
        } catch (error) {
          console.log("While Updating job", error);
        }
        newCidBtnLoadingArray[index] = false;
      })
      .catch((error) => {
        console.error("Error:", error);
        newCidBtnLoadingArray[index] = false;
      });
    // }
  };

  const handleDeleteJob = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/container1/delete-job/${id}`,
        tokenHeaders
      )
      .then((response) => {
        console.log("Deletion Started");
        // Remove the deleted job from the userJobs array
        const updatedUserJobs = userJobs.filter((job) => job._id !== id);
        setUserJobs(updatedUserJobs);
        console.log("Deleted!");
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  };

  const fetchUserJobs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/container1/user-jobs?walletAddress=${address}`,
        tokenHeaders
      );
      const userJobs = response.data;
      setUserJobs(userJobs);
    } catch (error) {
      console.error("Error fetching user jobs:", error);
      
    }
  };
  useEffect(() => {
    fetchUserJobs();
  }, []);


 
  // useEffect(() => {
  //   let emailSent = false;
  //   let jobCompleted = false; 
  //   const fetchStatus = async () => {
  //     if (!jobCompleted) {
  //     const response = await axios.get(
  //       `http://localhost:5500/container1/get-job-status/:2cc75caf-ca61-4ebf-85e8-a247b24e5af6`,
  //       tokenHeaders
  //     );
  
  //     if (response.data.state === "Completed") {
  //       if(!emailSent){
  //         console.log("Job completed");
  //         emailSent = true;
  //         jobCompleted = true;
  //       }
  //     }
  //   }
  //   };
  
  //   const intervalId = setInterval(fetchStatus, 1000); // Check the API every 5 seconds (adjust the interval as needed)
  //   fetchStatus(); // Call fetchStatus immediately
  
  //   return () => clearInterval(intervalId); // Clean up the interval on component unmount
  // }, []);
  

  const pollForUpdates = async () => {
    while (true) {
      await fetchUserJobs();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  useEffect(() => {
    pollForUpdates();
  }, []);

  return (
    <div className="container-fluid py-3">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="dataset-table-head">
            <tr>
              <th>Sr. No.</th>
              <th>JobId</th>
              {/* <th>CID</th> */}
              <th>Started At</th>
              <th>Status</th>
              <th>Check status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {userJobs.map((job, index) => (
              <tr className="dataset-table-body" key={index}>
                <td>{index + 1}</td>
                <td>{job.jobId}</td>
                {/* <td className="efficient-get-cid-url">
                  {job.cid ? (
                    <a
                      href={`https://ipfs.io/ipfs/${job.cid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {job.cid}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleGetCID(job.jobId)}
                      className="bg-info border-0 rounded-3 text-white"
                    >
                      {cidbtnloadingArray[index] ? (
                        <ClipLoader color="#fff" />
                      ) : (
                        <> Get CID</>
                      )}
                    </button>
                  )}
                </td> */}
                <td>{new Date(job.timeStamp).toLocaleString()}</td>
                <td>
                  {" "}
                  <button
                    className={
                      job.jobStatus === "In Progress"
                        ? "bg-warning text-white border-0 rounded-3"
                        : job.jobStatus === "Completed"
                        ? "bg-success text-white border-0 rounded-3"
                        : job.jobStatus === "InProgress"
                        ? "bg-warning text-white border-0 rounded-3"
                        : "white"
                    }
                  >
                    {" "}
                    {job.jobStatus}
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => handleCheckJobStatus(job.jobId, index)}
                    className="bg-primary text-white border-0 rounded-3"
                  >
                    {btnloadingArray[index] ? (
                      <ClipLoader color="#fff" />
                    ) : (
                      <> Check Job Status</>
                    )}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="bg-danger text-white my-auto border-0 rounded-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EfficientComputationDetails;
