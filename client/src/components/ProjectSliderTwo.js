import React, { Component } from "react";
import Swiper from "react-id-swiper";
import axios from "axios";
class ServiceGridSlider extends Component {
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

  getSubString = (string) => {
    if(string.length > 30){
      return string.substring(0, 30) + '...';
    }
    return string;
  }
  
  render() {
    if (this.state.data.length === 0) {
      // Render a loading indicator or placeholder
      return <div>Loading...</div>;
    }
    const params = {
      slidesPerView: 3,
      loop: true,
      speed: 1000,
      watchSlidesVisibility: true,
      spaceBetween: 30,
      autoplay: {
        delay: 1000
      },
      
      breakpoints: {
        1499: {
          slidesPerView: 3
        },

        991: {
          slidesPerView: 2
        },

        767: {
          slidesPerView: 4
        },

        575: {
          slidesPerView: 1
        }
      }
    };
    let data = this.state.data; 

    let DataList = data.map((val, i) => {
      return (
        <div className="swiper-slide" key={val._id}>
          <div className="service-grid-item service-grid-item--style2">
            <div className="service-grid-item__content">
              <h3 className="title">
                <a href={`${process.env.PUBLIC_URL}/${val.serviceUrl}`}>
                  {val.courseName}
                </a>
              </h3>
              <p className="subtitle">{this.getSubString(val.courseDescription)}</p>
              <a
                href={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/${val._id}`}
                className="see-more-link"
              >
                SEE MORE
              </a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        {console.log("datalist",DataList)}
        <div className="service-slider-title-area grey-bg section-space--inner--top--120 section-space--inner--bottom--285">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title-area text-center">
                  <h2 className="section-title mb-0">
                    Latest Tutorials 
                    <span className="title-icon" />
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="service-grid-slider-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="service-slider">
                  <div className="service-slider__container service-slider__container--style2">
                    <Swiper {...params}>{DataList}</Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default ServiceGridSlider;