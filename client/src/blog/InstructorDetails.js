import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import axios from "axios";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Moment from "react-moment";

class InstructorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      showForm: false,
      meetingData: {
        date: "",
        time: "",
        subject: "",
        description: ""
      }
    };
  }

  async componentDidMount() {
    const response = await axios
      .get(
        "http://localhost:5000/api/profile/user/" + this.props.match.params.id
      )
      .then((result) => {
        console.log(result.data.user)
     
        return result.data;
      });
    this.setState({
      profile: response,
    });
  }

  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      meetingData: {
        ...prevState.meetingData,
        [name]: value
      }
    }));
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = this.state.profile.user;
      const student = JSON.parse(localStorage.getItem('email'));
        
      console.log(student);
      const response = await axios.post(
        "http://localhost:5000/api/profile/meeting",
        {...this.state.meetingData ,
            _id : data._id,
             first_name :data.first_name,
             last_name:data.last_name ,
             teacherEmail : data.email,
              studentEmail  :student
            }
      );
      // Reset the form and hide it
      this.setState({
        showForm: false,
        meetingData: {
          date: "",
          time: "",
          subject: "",
          description: ""
        }
      });
      // Show a success toast message
      toast.success("Meeting scheduled successfully!");
    } catch (error) {
      // Handle error and show an error toast message
      console.error("Error scheduling meeting:", error);
      toast.error("Error scheduling meeting. Please try again.");
    }
  };
  render() {
    const experience = this.state.profile ? (
      this.state.profile.experience.map((exp) => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
        </tr>
      ))
    ) : (
      <></>
    );
    const education = this.state.profile ? (
      this.state.profile.education.map((edu) => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
            {edu.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </td>
        </tr>
      ))
    ) : (
      <></>
    );
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
                  <h1>
                    <a href={`${process.env.PUBLIC_URL}/InstructorDetails`}>
                      {this.state.profile
                        ? this.state.profile.user.first_name +
                          " " +
                          this.state.profile.user.last_name
                        : "loading"}
                    </a>
                  </h1>
                  <ul className="page-breadcrumb"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-wrapper section-space--inner--120">
          {/*Projects section start*/}
          <div className="project-section">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h4 className="mb-4">Experience Credentials</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th />
                      </tr>
                      {experience}
                    </thead>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h4 className="mb-4">Education Credentials</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th />
                      </tr>
                      {education}
                    </thead>
                  </table>
                </div>
                {this.state.showForm ? (
                  <div className="col-12">
                    <h4 className="mb-4">Schedule Meeting</h4>
                    <form onSubmit={this.handleFormSubmit}>
                      <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          name="date"
                          value={this.state.meetingData.date}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="time">Time:</label>
                        <input
                          type="time"
                          className="form-control"
                          id="time"
                          name="time"
                          value={this.state.meetingData.time}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="subject">Subject:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          value={this.state.meetingData.subject}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          value={this.state.meetingData.description}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Schedule Meeting
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="col-12">
                    <button
                      className="btn btn-primary"
                      onClick={() => this.setState({ showForm: true })}
                    >
                      Schedule Meeting
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <BrandLogoSlider background="grey-bg" />
        <Footer />
        <MobileMenu />
      </div>
    );
  }
}

export default InstructorDetails;
