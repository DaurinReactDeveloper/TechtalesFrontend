import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import { AiOutlineUser } from "react-icons/ai";
import { FormAuth } from "../layouts/FormAuth";
import { getUser, getUserWithGoogle } from "../services/userServices";

export default function LoginUser() {
  return (
    <>
      <AuthLayout imgUrl="/img/img-iniciar-sesion.webp" classAdmin="">
        <FormAuth
          ReactIcon={AiOutlineUser}
          nameOption="INICIAR SESION"
          TextOption=" Inicia sesión para descubrir, compartir y aprender sobre las últimas tendencias en tecnología y desarrollo."
          loginMethod={getUser}
          googleLoginMethod={getUserWithGoogle}
        />
      </AuthLayout>
    </>
  );
}
