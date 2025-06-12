import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <>
      <section className="row row-footer">

        <article className="col">
          <div className="div-logo-footer">
            <hr className="hr-footer" />
            <img
              src="/img/logo-techtales.webp"
              alt="img-logo"
              className="img-fluid img-footer"
            />
            <hr className="hr-footer" />
          </div>

          <div className="div-text-footer">
            <h4>TechTales</h4>
          </div>
        </article>

        <article className="col article-redes-footer">
          <div>
            <a href="https://www.linkedin.com/in/dauringonzalezdeveloperweb/" target="_blank">
              <FaLinkedin className="icon-footer" />
            </a>
          </div>

          <div>
          <a href="https://wa.link/vsalbn" target="_blank">
          <FaWhatsappSquare className="icon-footer" />
            </a>
          </div>

          <div>
          <a href="https://www.instagram.com/dauringonzalez16/" target="_blank">
          <FaInstagramSquare className="icon-footer" />
            </a>
          </div>

          <div>
            <a href="https://github.com/DaurinReactDeveloper/DaurinReactDeveloper" target="_blank">
              <FaGithubSquare className="icon-footer" />
            </a>
          </div>
        </article>
      </section>

      <section className="section-2-footer">
        <p>
          Creado con 🤍 - Daurin Gonzalez. © Todos los Derechos Reservados :)
        </p>
      </section>
    </>
  );
}
