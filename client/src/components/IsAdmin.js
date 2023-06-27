import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Dashboard from "./dashboard/Dashboard";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import AdminRoutes from "../components/IsAdmin";

class Services extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-center bg-primary py-2 mb-3">
          <h5 className="m-0">Admin Routes</h5>
        </div>
        <div className="text-center">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-3">
              <Link
                to={`${process.env.PUBLIC_URL}/dashboard`}
                className="btn btn-primary btn-block"
              >
                Dashboard
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <Link
                to={`${process.env.PUBLIC_URL}/allusers`}
                className="btn btn-primary btn-block"
              >
                Get All Users
              </Link>
            </div>
            {/* <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
              <Link
                to={`${process.env.PUBLIC_URL}/users/create`}
                className="btn btn-link text-decoration-none btn-block"
              >
                Create User
              </Link>
            </div> */}
            <div className="col-lg-3 col-md-6 mb-3">
              <Link
                to={`${process.env.PUBLIC_URL}/ShowCategoryList`}
                className="btn btn-primary btn-block"
              >
                Categories
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <Link
                to={`${process.env.PUBLIC_URL}/EnrollmentList`}
                className="btn btn-primary btn-block"
              >
                Enrollment List
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Services;
