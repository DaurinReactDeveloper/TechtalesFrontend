import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/authlayout.css";

export default function AuthLayout({ children, imgUrl, classAdmin }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="row row-auth-layout">
      <article
        className={`col-lg-4 col-md-12 col-sm-12 article-img-auth-layout ${classAdmin}`}
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        <img src={imgUrl} alt="IniciarSesion" className="img-fluid" />
      </article>

      <article
        className="col-lg-4 col-md-12 col-sm-12 article-text-auth-layout"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {children}
      </article>
    </section>
  );
}
