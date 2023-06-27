import React from "react";

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="feature-item">
              <i className="fas fa-cogs"></i>
              <h3>Robust Features</h3>
              <p>
                Explore our cutting-edge features designed to enhance your
                learning experience. From interactive quizzes to personalized
                progress tracking, we provide the tools you need to succeed.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-item">
              <i className="fas fa-chart-bar"></i>
              <h3>Data-Driven Insights</h3>
              <p>
                Gain valuable insights into your learning journey with our
                advanced analytics. Track your performance, identify areas of
                improvement, and optimize your learning strategies for maximum
                results.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-item">
              <i className="fas fa-rocket"></i>
              <h3>Accelerated Learning</h3>
              <p>
                Experience accelerated learning through our immersive and
                engaging content. Interactive simulations, real-world case
                studies, and hands-on projects enable you to apply knowledge in
                practical ways.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
