import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import { FormAuthRegister } from "../layouts/FormAuth";
import { AiOutlineUserAdd } from "react-icons/ai";
import { registerWithGoogle, saveUser } from "../services/userServices";

export default function Register() {
  return (
    <>
      <AuthLayout imgUrl="/img/img-iniciar-sesion.webp">
        <FormAuthRegister
          ReactIcon={AiOutlineUserAdd}
          TextOption="¡Bienvenido! Regístrate ahora y únete a nuestra comunidad para estar al día con las últimas innovaciones, compartir tus ideas y crecer profesionalmente en el mundo de la tecnología y el desarrollo."
          nameOption={"REGISTRO"}
          loginMethod={saveUser}
          googleLoginMethod={registerWithGoogle}
        />
      </AuthLayout>
    </>
  );
}
