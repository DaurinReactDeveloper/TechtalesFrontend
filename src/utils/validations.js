//User

export function validateCredentialslogin(
  email,
  password,
  setMessageEmail,
  setMessagePassword
) {
  let valido = true;

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    setMessageEmail("El correo electrónico no tiene un formato válido.");
    valido = false;
    setTimeout(() => {
      setMessageEmail("");
    }, 1100);
  } else {
    setMessageEmail("");
  }

  let tieneLetra = false;
  let tieneNumero = false;

  for (let char of password) {
    if (/[a-zA-Z]/.test(char)) tieneLetra = true;
    if (/[0-9]/.test(char)) tieneNumero = true;
  }

  if (!(tieneLetra && tieneNumero)) {
    setMessagePassword("La contraseña debe contener letras y números.");
    valido = false;
    setTimeout(() => {
      setMessagePassword("");
    }, 1100);
  } else {
    setMessagePassword("");
  }

  return valido;
}

export function validateCredentialsRegister(
  name,
  imageProfile,
  setMessageName,
  setMessageImageProfile
) {
  let valido = true;
  if (!name || name.trim() === "") {
    setMessageName("El nombre es obligatorio.");
    valido = false;
    setTimeout(() => {
      setMessageName("");
    }, 1000);
  } else {
    setMessageName("");
  }

  if (!imageProfile) {
    setMessageImageProfile("La imagen de perfil es obligatoria.");
    valido = false;
    setTimeout(() => {
      setMessageImageProfile("");
    }, 1100);
  } else if (
    imageProfile.type !== "image/jpeg" &&
    imageProfile.type !== "image/webp"
  ) {
    setMessageImageProfile("Solo se permiten imágenes JPEG o WEBP.");
    valido = false;
    setTimeout(() => {
      setMessageImageProfile("");
    }, 1100);
  } else {
    setMessageImageProfile("");
  }

  return valido;
}

export function validateCredentialsUpdate(
  name,
  email,
  password,
  setMessageName,
  setMessageEmail,
  setMessagePassword
) {
  let valido = true;

  // Validar nombre
  if (!name || name.trim() === "") {
    setMessageName("El nombre es obligatorio.");
    valido = false;
    setTimeout(() => setMessageName(""), 1000);
  } else {
    setMessageName("");
  }

  // Validar correo
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    setMessageEmail("El correo electrónico no tiene un formato válido.");
    valido = false;
    setTimeout(() => setMessageEmail(""), 1000);
  } else {
    setMessageEmail("");
  }

  // Validar contraseña
  let tieneLetra = false;
  let tieneNumero = false;

  for (let char of password) {
    if (/[a-zA-Z]/.test(char)) tieneLetra = true;
    if (/[0-9]/.test(char)) tieneNumero = true;
  }

  if (!(tieneLetra && tieneNumero)) {
    setMessagePassword("La contraseña debe contener letras y números.");
    valido = false;
    setTimeout(() => setMessagePassword(""), 1000);
  } else {
    setMessagePassword("");
  }

  return valido;
}

// Comments
export function validateCredentialsAddComment(content, setMessageContent) {
  let valido = true;

  if (!content || content.trim() === "") {
    setMessageContent("El contenido del comentario no puede estar vacío.");
    valido = false;
    setTimeout(() => {
      setMessageContent("");
    }, 1000);
  }

  if (content.length <= 15 || content.length >= 400) {
    setMessageContent("El contenido debe tener entre 15 y 400 caracteres.");
    valido = false;
    setTimeout(() => {
      setMessageContent("");
    }, 1000);
  }

  return valido;
}

// Challenges
export function validateChallengeFields(
  title,
  type,
  description,
  hint,
  setMessageTitle,
  setMessageType,
  setMessageDescription,
  setMessageHint,
  datePublication = null,
  setMessageDatePublication = null
) {
  let valid = true;

  // Validar Título
  if (title.length <= 15 || title.length >= 100) {
    setMessageTitle("El título debe tener entre 16 y 99 caracteres.");
    valid = false;
    setTimeout(() => setMessageTitle(""), 1000);
  } else {
    setMessageTitle("");
  }

  // Validar Tipo
  const allowedTypes = ["basic", "intermediate", "advanced"];
  if (!allowedTypes.includes(type)) {
    setMessageType("El Tipo debe ser: basic, intermediate o advanced.");
    valid = false;
    setTimeout(() => setMessageType(""), 1000);
  } else {
    setMessageType("");
  }

  // Validar Descripción
  if (description.length <= 100 || description.length >= 400) {
    setMessageDescription("La descripción debe tener entre 101 y 399 caracteres.");
    valid = false;
    setTimeout(() => setMessageDescription(""), 1000);
  } else {
    setMessageDescription("");
  }

  // Validar Hint
  if (hint.length < 20 || hint.length > 150) {
    setMessageHint("La pista debe tener entre 20 y 150 caracteres.");
    valid = false;
    setTimeout(() => setMessageHint(""), 1000);
  } else {
    setMessageHint("");
  }

  // Validar Fecha de Publicación (solo si se provee)
  if (datePublication !== null && setMessageDatePublication !== null) {
    if (!datePublication) {
      setMessageDatePublication("Debe seleccionar una fecha de publicación.");
      valid = false;
      setTimeout(() => setMessageDatePublication(""), 1000);
    } else {
      const now = new Date();
      const inputDate = new Date(datePublication);
      if (inputDate > now) {
        setMessageDatePublication("La fecha de publicación no puede ser en el futuro.");
        valid = false;
        setTimeout(() => setMessageDatePublication(""), 1000);
      } else {
        setMessageDatePublication("");
      }
    }
  }

  return valid;
}
