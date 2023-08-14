import React from 'react'
import EfficientAbout from '../components/efficiency/EfficientAbout';
import EfficientCompute from '../components/efficiency/EfficientCompute';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/footer/Footer';

function EfficientComputation() {
  return (
    <div style={{ background: "linear-gradient(to right, #E9F1FF, #B5D2FE)" }}>
      <Navbar /> 
      <div className="app">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <Sidebar />
            </div>
            <div className="d-flex flex-md-row flex-column col-lg-9 px-0">
              <div className='col-md-7'>
                <EfficientAbout />
              </div>
              <div className='col-md-5'>
                <EfficientCompute />
              </div>  
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EfficientComputation