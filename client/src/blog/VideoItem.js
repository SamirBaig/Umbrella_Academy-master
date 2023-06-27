import React, { useState } from "react";
import { Collapse, Card, CardBody } from "reactstrap";
import "./VideoItem.css";

const VideoItem = ({ video, onVideoSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prevState) => !prevState);

  return (
    // <div
    //   onClick={() => {
    //     onVideoSelect(video);
    //   }}
    //   style={{ cursor: "pointer" }}
    // >
    //   <div className="content">
    //     <br />
    //     <div>
    //       <h5>{video.title}</h5>
    //       <hr />
    //     </div>
    //   </div>
    // </div>
    <div>
     <div
      onClick={() => {
        onVideoSelect(video);
      }}
      style={{ cursor: "pointer" }}
    >
      <div
        className="w-100 p-3 border rounded mb-2 cursor-pointer shadow bg-dark text-light"
        onClick={toggle}
      >
        {video.title}
      </div>
      <Collapse isOpen={isOpen}>
        <Card className="bg-light">
          <CardBody>
            Immerse yourself in a dynamic e-learning journey where knowledge
            knows no bounds. Experience the power of online education as we
            explore cutting-edge technologies, interactive lessons, and
            real-world skills that will elevate your learning to new heights.
            Prepare to acquire in-demand expertise and unleash your true
            potential.
          </CardBody>
        </Card>
      </Collapse>
    </div>
    </div>
  );
};

export default VideoItem;
