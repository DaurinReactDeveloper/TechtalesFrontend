import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlinePicture } from "react-icons/ai";
import { MdOutlinePersonPin } from "react-icons/md";

export function FormAuth({
  ReactIcon,
  nameOption,
  TextOption,
  googleOption = true,
  loginMethod,
  googleLoginMethod,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messageResultado, setMessageResultado] = useState(null);
  const navigate = useNavigate();

  const callUsuarioMethod = (e) => {
    loginMethod(
      e,
      navigate,
      email,
      password,
      setMessageEmail,
      setMessagePassword,
      setError,
      setLoading,
      setMessageResultado
    );
  };

  const callGoogleLogin = () => {
    googleLoginMethod(navigate, setError, setLoading, setMessageResultado);
  };

  return (
    <form>
      <div className="div-form-h1-auth-layout">
        <h1 className="h1-auth-layout">
          <ReactIcon /> {nameOption}
        </h1>
        <hr className="hr-auth-layout" />
        <p className="p-text-form-auth-layout">{TextOption}</p>
      </div>

      <div>
        <label className="label-correo-auth-layout">
          <p className="p-label-correo-auth-layout">
            <CgMail className="icon-correo-auth-layout" /> Correo Electrónico
          </p>
          <input
          placeholder="Escriba su email..."
            type="text"
            value={email}
            minLength={11}
            maxLength={48}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {messageEmail && (
            <p className="error-message-auth-layout">{messageEmail}</p>
          )}
        </label>
      </div>

      <div>
        <label className="label-password-auth-layout">
          <p className="p-label-password-auth-layout">
            <RiLockPasswordLine className="icon-password-auth-layout" />{" "}
            Contraseña
          </p>
          <input
                    placeholder="Escriba su contraseña..."
            type="password"
            value={password}
            minLength={9}
            maxLength={14}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {messagePassword && (
            <p className="error-message-auth-layout">{messagePassword}</p>
          )}
        </label>
      </div>

      {googleOption && (
        <div className="div-link-auth-layout">
          <button onClick={callGoogleLogin}>
            <FaGoogle className="logo-google-auth-layout" />
          </button>
          <Link to={"/register"}>Registrarme</Link>
        </div>
      )}

      {error && <p className="error-message-auth-layout-result">{error}</p>}

      {messageResultado && (
        <p className="success-message-auth-layout">{messageResultado}</p>
      )}

      <div className="div-button-auth-layout">
        <button type="button" onClick={callUsuarioMethod} disabled={loading}>
          {loading ? "CARGANDO..." : "CONTINUAR"}
        </button>
      </div>
    </form>
  );
}

export function FormAuthRegister({
  ReactIcon,
  nameOption,
  TextOption,
  loginMethod,
  googleLoginMethod,
  linkRegister = false,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageProfile, setImageProfile] = useState([]);
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messageImageProfile, setMessageImageProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageResultado, setMessageResultado] = useState("");

  const navigate = useNavigate();

  const callUsuarioMethod = (e) => {
    loginMethod(
      e,
      navigate,
      name,
      imageProfile,
      email,
      password,
      setMessageEmail,
      setMessagePassword,
      setMessageName,
      setMessageImageProfile,
      setError,
      setLoading,
      setMessageResultado
    );
  };

  const callGoogleLogin = () => {
    googleLoginMethod(navigate, setError, setLoading, setMessageResultado);
  };

  return (
    <form>
      <div className="div-form-h1-auth-layout">
        <h1 className="h1-auth-layout">
          <ReactIcon /> {nameOption}
        </h1>
        <hr className="hr-auth-layout" />
        <p className="p-text-form-auth-layout">{TextOption}</p>
      </div>

      <div>
        <label className="label-correo-auth-layout">
          <p className="p-label-correo-auth-layout">
            <AiOutlinePicture className="icon-correo-auth-layout" /> Foto de
            Perfil
          </p>
          <input
            type="file"
            accept="image/jpeg, image/webp"
            required
            onChange={(e) => setImageProfile(e.target.files[0])}
          />
          {messageImageProfile && (
            <p className="error-message-auth-layout">{messageImageProfile}</p>
          )}
        </label>
      </div>

      <div>
        <label className="label-correo-auth-layout">
          <p className="p-label-correo-auth-layout">
            <MdOutlinePersonPin className="icon-correo-auth-layout" /> Nombre
          </p>
          <input
          placeholder="Escriba su nombre de usuario..."
            type="text"
            required
            minLength={9}
            maxLength={14}
            onChange={(e) => setName(e.target.value)}
          />
          {messageName && (
            <p className="error-message-auth-layout">{messageName}</p>
          )}
        </label>
      </div>

      <div>
        <label className="label-correo-auth-layout">
          <p className="p-label-correo-auth-layout">
            <CgMail className="icon-correo-auth-layout" /> Correo Electrónico
          </p>
          <input
                    placeholder="Escriba su email..."
            type="text"
            value={email}
            minLength={11}
            maxLength={48}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {messageEmail && (
            <p className="error-message-auth-layout">{messageEmail}</p>
          )}
        </label>
      </div>

      <div>
        <label className="label-password-auth-layout">
          <p className="p-label-password-auth-layout">
            <RiLockPasswordLine className="icon-password-auth-layout" />{" "}
            Contraseña
          </p>
          <input
                              placeholder="Escriba su contraseña..."
            type="password"
            value={password}
            minLength={9}
            maxLength={14}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {messagePassword && (
            <p className="error-message-auth-layout">{messagePassword}</p>
          )}
        </label>
      </div>

      <div className="div-link-auth-layout">
        <button onClick={callGoogleLogin}>
          <FaGoogle className="logo-google-auth-layout" />
        </button>
        {linkRegister && <Link to={"/register"}>Registrarme</Link>}
      </div>

      {error && <p className="error-message-auth-layout-result">{error}</p>}
      {messageResultado && (
        <p className="success-message-auth-layout">{messageResultado}</p>
      )}

      <div className="div-button-auth-layout">
        <button type="button" onClick={callUsuarioMethod} disabled={loading}>
          {loading ? "CARGANDO..." : "CONTINUAR"}
        </button>
      </div>
    </form>
  );
}
