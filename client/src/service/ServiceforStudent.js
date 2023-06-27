import React, { Component } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";

class Services extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `http://localhost:5000/enrollmentbystudent?id=${this.props.match.params.id}`
      );
      this.setState({
        data: response.data
      });
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  }

  render() {
    const { data } = this.state;

    const Datalist = data.map((val, i) => (
      <div className="col-lg-4 col-md-6 col-12 section-space--bottom--30" key={i}>
        <div className="service-grid-item">
          <div className="service-grid-item__image">
            <div className="service-grid-item__image-wrapper">
              {/* <a href={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val.course._id}`}>
                <img src={val.course.courseImage} className="img-fluid" alt="Course" />
              </a> */}
            </div>
            <div className="service-grid-item__content">
              <h3 className="title">
                <a href={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val.course._id}`}>
                  {val.course.courseName}
                </a>
              </h3>
              <p className="subtitle">{val.course.description}</p>
              <div className="instructor">Instructor: {val.instructor}</div>
            </div>
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
          {/* Service section start */}
          <div className="service-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="service-item-wrapper">
                    <div className="row">{Datalist}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Service section end */}
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
