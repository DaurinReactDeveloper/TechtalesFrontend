import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/descriptionslayout.css";

export default function DescriptionsLayout({
  Title,
  Description,
  UrlImg,
  classBackground,
  classColor,
  hr = false,
}) {

  
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section className={`row row-DescriptionsLayout ${classBackground}`}>
        <article
          className="col-sm-12 col-md-12 col-lg-6 col-1-DescriptionsLayout"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          <h1 className={`h1-title-DescriptionsLayout ${classColor}`}>
            {Title}
          </h1>
          <p className={`p-description-DescriptionsLayout ${classColor}`}>
            {Description}
          </p>
        </article>

        <article className="col-sm-12 col-md-12 col-lg-6 col-2-DescriptionsLayout">
          <img
            src={UrlImg}
            alt="img-description"
            className="img-fluid img-col-2-DescriptionsLayout"
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
          />
        </article>
      </section>
      {hr && <hr className="hr-DescriptionsLayout" />}
    </>
  );
}
