import {React, useEffect, useState} from "react";
import "../../styles/navbar/Navbar.css";
import logo from "../../assets/navbar/pravahini-logo1.png";
import { ConnectKitButton } from "connectkit";

const navigation = [
  {
    title: "About Us",
    link: "/",
  },
  {
    title: "Connect Wallet",
    link: "/",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
<<<<<<< HEAD

=======
>>>>>>> 61c2dac01926150e9bb92d9f1dc9e68600be428c
  useEffect(()=>{
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
<<<<<<< HEAD


 
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light sticky-top py-2 ${scrolled?'scrolled':''}`}
=======
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light sticky-top py-2 ${scrolled?'scrolled':''} `}
>>>>>>> 61c2dac01926150e9bb92d9f1dc9e68600be428c
        role="navigation"
      >
        <div className="container-fluid px-4 px-md-5 navbar">
          <a className="d-flex navbar-brand" href="/">
            {/* <h1>LOGO</h1> */}
            <img src={logo} className="img-logo" />
          </a>

          <button
            type="button"
            className="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around"
            data-bs-toggle="collapse"
            data-bs-target="#navbarRightAlignExample"
            aria-controls="navbarRightAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-icon top-bar"></span>
            <span className="toggler-icon middle-bar"></span>
            <span className="toggler-icon bottom-bar"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarRightAlignExample"
          >
            <ul className="navbar-nav ml-auto align-items-center mb-2 mb-lg-0">
              <li className="nav-item px-2">
                <a
                  className="nav-link navbar-link p-0 active"
                  aria-current="page"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li className="navbar-content nav-item px-2 d-lg-none">
                <a
                  className="nav-link navbar-link p-0 active"
                  aria-current="page"
                  href="#"
                >
                  Create
                </a>
              </li>
              <li className="navbar-content nav-item px-2 d-lg-none">
                <a
                  className="nav-link navbar-link p-0 active"
                  aria-current="page"
                  href="#"
                >
                  Dashboard
                </a>
              </li>
              <li className="navbar-content nav-item px-2 d-lg-none">
                <a
                  className="nav-link navbar-link p-0 active"
                  aria-current="page"
                  href="#"
                >
                  Dataset Marketplace
                </a>
              </li>
              <li className="navbar-content nav-item px-2 d-lg-none">
                <a
                  className="nav-link navbar-link p-0 active"
                  aria-current="page"
                  href="#"
                >
                  Model Marketplace
                </a>
              </li>
              <li className="navbar-content nav-item px-2 d-lg-none">
                <a
                  className="nav-link navbar-link p-0 active"
                  aria-current="page"
                  href="#"
                >
                  Code
                </a>
              </li>
              <li className="navbar-content nav-item px-2 d-lg-none">
                <a
                  className="nav-link navbar-link p-0 active"
                  aria-current="page"
                  href="#"
                >
                  Decentralized Computation
                </a>
              </li>

              <div className="py-3 py-lg-none">
                <ConnectKitButton />
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
function NavLink({ body }) {
  return (
    <li className="nav-item px-2">
      <a className="nav-link p-0 active" aria-current="page" href={body.link}>
        {body.title}
      </a>
    </li>
  );
}
