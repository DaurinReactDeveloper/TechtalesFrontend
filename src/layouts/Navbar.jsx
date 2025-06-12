import React, { useEffect, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import authService from "../utils/token";
import { truncateName } from "../utils/truncateName";
import "../styles/navbar.css";

export default function Navbar({
  backgroundReto,
  backgroundHistoria,
  backgroundRegistrate,
  backgroundSesion,
  backgroundAdmin,
}) {

  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);

   const updateUserState = () => {
    const currentUser = authService.getUserFromToken();
    const currentRol = authService.getUserRole();

    if (!authService.isTokenValid()) {
      setRol(null);
      setUser(null);
      return;
    }

    if (currentUser) {
      const userTruncate = truncateName(currentUser.sub);
      setUser(userTruncate);
    }

    if (currentRol) {
      setRol(currentRol);
    }
  };

  useEffect(() => {
    updateUserState();

    const interval = setInterval(() => {
      updateUserState();
    }, 1000); 

    return () => {
      clearInterval(interval);
    };
  }, []); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-contenedor">
      <div className="container-fluid">
        <div className="div-logo-navbar">
          <img src="/img/logo-techtales.webp" alt="logo" className="img-logo" />
          <Link className="navbar-brand navbar-text-logo" to={"/"}>
            TechTales
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className={backgroundReto}>
                <Link className="nav-link link-navbar" to={"/challenges"}>
                  Retos
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <div className={backgroundHistoria}>
                <Link className="nav-link link-navbar" to={"/stories"}>
                  Historias
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <div className={backgroundRegistrate}>
                <Link className="nav-link link-navbar" to={"/register"}>
                  Registrarse
                </Link>
              </div>
            </li>

            {user && rol == "user" ? (
              <li className="nav-item">
                <div className={backgroundSesion}>
                  <Link className="nav-link link-navbar" to={"/user"}>
                    <p className="p-user-navbar">{user}</p>
                  </Link>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <div className={backgroundSesion}>
                  <Link className="nav-link link-navbar" to={"login"}>
                    Iniciar Sesión
                  </Link>
                </div>
              </li>
            )}

            {rol && rol == "admin" ? (
              <li className="nav-item">
                <div className={backgroundAdmin}>
                  <Link className="nav-link link-navbar" to={"/admin"}>
                    {user ? (
                      <p className="p-user-navbar">{user}</p>
                    ) : (
                      <RiAdminFill className="navbar-icon-admin" />
                    )}
                  </Link>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <div className={backgroundAdmin}>
                  <Link className="nav-link link-navbar" to={"/loginAdmin"}>
                    <RiAdminFill className="navbar-icon-admin" />
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
