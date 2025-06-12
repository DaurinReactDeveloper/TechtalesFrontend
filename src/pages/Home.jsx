import React, { useEffect, useState } from "react";
import { BsCode } from "react-icons/bs";
import { BsCodeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import CardSection2 from "../components/CardSection2";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/home.css";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </>
  );
}

function SectionOne() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <section className="row row-section-1-inicio">
        <article
          className="col-lg-7 col-sm-12 col-md-12"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className="div-section-1-text">
            <hr className="hr-section-1-inicio" />
            <img
              src="/img/logo-techtales.webp"
              alt="img-logo"
              className="img-fluid img-logo-section-1-inicio"
            />
            <hr className="hr-section-1-inicio" />
          </div>

          <div className="div-text-section-1-inicio">
            <h1>TechTales</h1>
            <p>Comparte tu historia, inspira al mundo.</p>
            <div className="div-button-compartir-section-1-inicio">
              <Link
                to={"/login"}
                className="button-compartir-section-1-inicio"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <BsCode />
                {isHovered ? "INSPIRA A LOS DEVS" : "COMPARTIR MI HISTORIA"}
                <BsCodeSlash />
              </Link>
            </div>
          </div>
        </article>

        <article className="col-lg-5 col-sm-12 col-md-12 article-gif-section-1-inicio">
          <img
            src="/img/img-section-1.gif"
            alt="section-1Gif"
            className="img-fluid gif-section-1-inicio"
          />
        </article>

        <article className="article-ola-section-1-inicio">
          <img
            src="/img/Ola-section-1.webp"
            alt="ola"
            className="img-ola-section-1-inicio"
          />
        </article>
      </section>
    </>
  );
}

function SectionTwo() {
  return (
    <>
      <section className="row row-section-2-inicio">
        <div className="text-h2-section-2-inicio">
          <h2 className="h2-section-2-inicio">INSPIRA Y APRENDE</h2>
          <p className="p-section-2-inicio">
            {" "}
            Comparte tus historias y aprendizajes como programador :)
          </p>
        </div>

        <article className="col-lg-6 article-img-section-2-inicio">
          <img
            src="/img/img-section-2.gif"
            alt="img-section-2"
            className="img-fluid img-section-2-inicio"
          />
        </article>

        <article className="col-lg-6 article-text-section-2-inicio">
          <div className="div-card-section-2-inicio">
            <CardSection2
              header={"Daurin  Gonzalez"}
              text={
                "Mi primer trabajo como programador fue un desastre. Subí código a  producción sin probarlo bien y rompí todo el sistema. Pasé toda la noche arreglándolo, pero aprendí una lección clave."
              }
              year={"2025"}
              classCard={"card-historia-section-2-derecha"}
            />
            <br />

            <CardSection2
              header={"Juan Perez"}
              text={
                "Cuando decidí aprender a programar, no tenía idea de lo que me esperaba. Venía de un mundo completamente diferente (soy diseñador gráfico de profesión)..."
              }
              year={"2024"}
              classCard={"card-historia-section-2-izquierda"}
            />

            <br />

            <CardSection2
              header={"Francis Ramirez"}
              text={
                "Nunca subas código sin pruebas. Una pequeña revisión puede ahorrarte horas de dolor de cabeza."
              }
              year={"2023"}
              classCard={"card-historia-section-2-centro"}
            />
          </div>
        </article>
      </section>
    </>
  );
}

function SectionThree() {
  return (
    <>
      <section className="row row-section-3-inicio">
        <article
          className="col-lg-5 col-sm-12 col-md-12  article-img-section-3-inicio"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <img
            src="/img/img-section-3.webp"
            alt="img-section-3"
            className="img-fluid img-section-3-inicio"
          />
        </article>

        <article
          className="col-lg-5 col-sm-12 col-md-12  article-text-section-3-inicio"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <h2 className="h2-section-3-inicio">
            RETOS DE{" "}
            <span className="span-h2-section-3-inicio">PROGRAMACION</span>
          </h2>
          <p className="p-text-section-3-inicio">
            "Desafía tu mente y mejora tus habilidades resolviendo problemas
            reales de programación. En este espacio, encontrarás retos diseñados
            para poner a prueba tu lógica, creatividad y capacidad de
            resolución.{" "}
          </p>
          <div className="div-link-section-3-inicio">
            <Link to={"/challenges"} className="link-section-3-inicio">
              <BsCode />
              ¡ACEPTAR EL RETO!
              <BsCodeSlash />
            </Link>
          </div>
          <br />
        </article>
      </section>
    </>
  );
}
