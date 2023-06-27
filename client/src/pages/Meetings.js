import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";

const Meetings = () => {
  const token = localStorage.getItem("jwtToken");
  const [isLoading, setIsLoading] = useState(true);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/meeting/my/scheduled/", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setMeetings(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
                <h1>MY MEETINGS</h1>
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
              <h2 className="section-title">Check your scheduled meetings</h2>
            </div>
          </div>
          <div class="mt-5">
            {isLoading ? (
              <div className="row">
                <div className="col-12">Loading...</div>
              </div>
            ) : (
              <>
                {meetings.length === 0 ? (
                  <div className="row">
                    <div className="col-12">No meeting found</div>
                  </div>
                ) : (
                  meetings.map((meeting) => (
                    <div key={meeting._id}>
                      <div className="row">
                        <div className="col-3">Start time</div>
                        <div className="col-9 text-break">
                          {meeting.startTime}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">Topic</div>
                        <div className="col-9 text-break">{meeting.topic}</div>
                      </div>
                      <div className="row">
                        <div className="col-3">Description</div>
                        <div className="col-9 text-break">
                          {meeting.description}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">Start URL</div>
                        <div className="col-9 text-break">
                          <a target="_blank" href={meeting.start_url}>
                            {meeting.start_url}
                          </a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">Join URL</div>
                        <div className="col-9 text-break">
                          <a target="_blank" href={meeting.join_url}>
                            {meeting.join_url}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
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
};

export default Meetings;
