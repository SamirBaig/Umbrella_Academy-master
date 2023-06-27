import React, { Component } from "react";
import NavBar from "./components/NavBar";
import HeroSliderTwo from "./components/HeroSliderTwo";
import VideoCta from "./components/VideoCta";
import ProjectSliderTwo from "./components/ProjectSliderTwo";
import ServiceTab from "./components/ServiceTab";
import TestimonialSlider from "./components/TestimonialSlider";
import BrandLogoSlider from "./components/BrandLogoSlider";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";

class HomeTwo extends Component {
  render() {
    return (
      <div>
        
        <NavBar />

        
        <HeroSliderTwo />

        
        <VideoCta />

        
        <ProjectSliderTwo />

        
        <ServiceTab />

        <br>
        </br>
        <br></br>
        <TestimonialSlider />

        

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

export default HomeTwo;
