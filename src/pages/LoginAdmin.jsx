import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import { RiAdminFill } from "react-icons/ri";
import { FormAuth } from "../layouts/FormAuth";
import { getUserAdmin } from "../services/userServices";
import "../styles/loginadmin.css";

export default function LoginAdmin() {
  return (
    <>
      <AuthLayout
        imgUrl="/img/img-iniciar-sesion-admin.webp"
        classAdmin="admin-auth"
      >
        <FormAuth
          ReactIcon={RiAdminFill}
          nameOption="INICIAR SESION"
          TextOption="Accede al panel administrativo para gestionar usuarios y contenidos. Ingresa tus credenciales para continuar con tus responsabilidades administrativas."
          loginMethod={getUserAdmin}
          googleOption={false}
        />
      </AuthLayout>
    </>
  );
}
