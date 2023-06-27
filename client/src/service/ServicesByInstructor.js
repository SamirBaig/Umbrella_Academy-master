import React, { Component } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import "./Services2.css";

class Services extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `http://localhost:5000/coursebyinstructor?id=${this.props.match.params.id}`
      );
      this.setState({
        data: response.data,
      });
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  }

  render() {
    const { data } = this.state;

    const courseCards = data.map((val, i) => (
      <div className="col-lg-4 col-md-6 col-sm-6" key={i}>
        <div className="course-card">
          <div className="course-card__image">
            <a href={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val._id}`}>
              {/* Add image content here */}
            </a>
          </div>
          <div className="course-card__content" style={{ textAlign: "center" }}>
            <h3 className="course-card__title">
              <a href={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val._id}`}>
                {val.courseName}
              </a>
              <br></br>
              <br></br>
            </h3>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        {/* Navigation bar */}
        <NavBar />

        {/* Breadcrumb */}
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="page-banner text-center">
                  <h1>MY COURSES</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service page content */}
        <div className="page-wrapper section-space--inner--120">
          {/* Service section */}
          <div className="service-section">
            <div className="container">
              <div className="row">{courseCards}</div>
            </div>
          </div>
        </div>

        {/* Brand logo */}
        <BrandLogoSlider background="grey-bg" />

        {/* Footer */}
        <Footer />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    );
  }
}

export default Services;
