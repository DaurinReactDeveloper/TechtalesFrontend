import React from "react";
import { Link } from "react-router-dom";
import "../styles/cardsection2.css";

export default function CardSection2({ classCard, header, text, year }) {
  return (
    <>
      <div
        className={`card div-card-historias-section-2-inicio ${classCard}`}
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <h5 className="card-header card-header-historias-section-2-inicio">
          {header}
        </h5>
        <div className="card-body card-body-historias-section-2-inicio">
          <p className="p-historia-section-2-inicio">Historia</p>
          <h5 className="card-title card-title-historias-section-2-inicio">
            {year}
          </h5>
          <p className="card-text card-text-historias-section-2-inicio">
            {text}
          </p>
          <Link to={"/stories"} className="link-card-historias-section-2-inicio">
            AGREGAR HISTORIA
          </Link>
        </div>
      </div>
    </>
  );
}
