import React from "react";
import authService from "../utils/token";
import "../styles/informationauth.css";

export default function InformationAuth({ userData, navigate }) {
  
  function callCloseSesion() {
    authService.logOut(navigate);
  }

  return (
    <>
      <section className="section-informationauth">
        <article className="article-img-informationauth">
          <img
            src={userData?.imgProfile}
            alt={userData?.name}
            className="img-fluid img-informationauth"
          />
        </article>

        <article className="article-information-informationauth">
          <h1>{userData?.name}</h1>
          <hr />
          <p>{userData?.email}</p>
          <div>
            <button type="button" onClick={callCloseSesion}>
              Cerrar Sesión
            </button>
          </div>
        </article>
      </section>
    </>
  );
}

export function InformationWelcome({
  name,
  description,
}) {
  return (
    <>
    
        <div>
          <h2 className="h2-userprofile">
            ¡Bienvenido, <span>{name}</span>!
          </h2>
          <p className="p-userprofile">
            <strong>¿Listo para comenzar?</strong> {description}
          </p>
        </div>
    </>
  );
}
