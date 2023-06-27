import React, { Component } from "react";
import NavBar from "./NavBar";
import Dashboard from "./dashboard/Dashboard";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import AdminRoutes from "../components/IsAdmin";


class Services extends Component {


  render() {

const  FirstName =    localStorage.getItem("email")? JSON.parse(localStorage.getItem("email"))  : null ;
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />

        {/* breadcrumb */}
        {/*====================  breadcrumb area ====================*/}
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="page-banner text-center">
                  <h1>Dashboard</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="/">Home</a>
                    </li>


                    <li>Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

         {FirstName == "admin@admin.com"?  
          <div className="service-section">
            <div className="container">
            <AdminRoutes  // FirstName ={FirstName}
            />  
            </div>
        </div> : null}
        <div className="page-wrapper section-space--inner--120">
          {/*Service section start*/}
          <div className="service-section">
            <div className="container">
              <Dashboard />
            </div>
          </div>
          {/*Service section end*/}
        </div>

        {/*====================  End of service page content  ====================*/}

       
        <Footer />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    );
  }
}

export default Services;
