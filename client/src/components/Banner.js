import React from "react";

const Banner = ({ title, breadcrumbItems }) => {
  return (
    <div className="breadcrumb-area breadcrumb-bg">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="page-banner text-center">
              <h1>{title}</h1>
              <ul className="page-breadcrumb">
                {breadcrumbItems.map((item, index) => (
                  <li key={index}>
                    {index !== breadcrumbItems.length - 1 ? (
                      <a href="/">{item}</a>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
