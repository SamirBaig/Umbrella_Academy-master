import React, { Component } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
// import courseImage1 from "../images/course-image-1.jpg"; // Import the course image
import "./Services.css"; // Import the CSS file

class Services extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:5000/courses");
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
      <div className="col-lg-4 col-md-6 col-12" key={i}>
        <div className="course-card">
          {/* <div className="course-card__image-wrapper">
            <img src={courseImage1} alt="Course" className="course-card__image" />
          </div> */}
          <div className="course-card__content">
            <h3 className="course-card__title">{val.courseName}</h3>
            <p>{val.description}</p>
            <p>Instructor: {val.teacher}</p> {/* Add instructor name */}
            <div className="course-card__details">
              <p>Duration: {val.duration}</p>
              <p>Level: {val.level}</p>
              <p>Price: ${val.price}</p>
            </div>
            <a href={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val._id}`} className="course-card__button">Learn More</a>
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
                  <h1>ALL COURSES</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service page content */}
        <div className="page-wrapper section-space--inner--120">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="section-title">Explore Our Courses</h2>
              </div>
            </div>
            <div className="row">{courseCards}</div>
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
