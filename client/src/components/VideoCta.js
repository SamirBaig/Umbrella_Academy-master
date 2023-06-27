import React, { Component } from "react";

class VideoCta extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }
  render() {
    return (
      <div>
        <div className="video-cta-area section-space--inner--120">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="video-cta-content">
                  <h4 className="video-cta-content__small-title">CONTACT US</h4>
                  <h3 className="video-cta-content__title">
                    Lets Get The Knowledge To Succeed
                  </h3>
                  <p className="video-cta-content__text">
                    Get in Touch: We'd love to hear from you! For any questions,
                    feedback, or collaboration opportunities, please don't
                    hesitate to reach out to our team at samirbaig@demo.com or
                    give us a call at +923154264339.
                  </p>
                  <a
                    href={`${process.env.PUBLIC_URL}/contact-us`}
                    className="ht-btn ht-btn--round"
                  >
                    CONTACT US
                  </a>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1 col-md-6">
                <div className="cta-video-image">
                  <img
                    src="assets/img/slider/sphere.jpg"
                    height="360px"
                    width="360px"
                    alt="techsphere"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoCta;
