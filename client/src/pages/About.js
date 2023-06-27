import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import AboutSection from "../components/AboutSection";
import FeatureSection from "../components/FeatureSection";
import FunFact from "../components/FunFact";
import TeamMemberGrid from "../components/TeamMemberGrid";
import TestimonialSlider from "../components/TestimonialSlider";
import BrandLogoSlider from "../components/BrandLogoSlider";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import ModalVideo from "react-modal-video";

class About extends React.Component {
  state = {
    isOpen: false,
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  render() {
    return (
      <div>
        <NavBar />

        <Banner title="About Us" breadcrumbItems={["Home", "About Us"]} />
<br></br>
        <AboutSection />
<br></br>
        <FeatureSection />
        <br></br>
        {/* <FunFact /> */}

        <TeamMemberGrid />

        <TestimonialSlider />

        <BrandLogoSlider />

        <Footer />

        <MobileMenu />
      </div>
    );
  }
}

export default About;