import axios from "axios";
import {
  validateCredentialslogin,
  validateCredentialsRegister,
  validateCredentialsUpdate,
} from "../utils/validations";
import authService from "../utils/token";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseServices";
import { userAddDto, userDeleteDto, userUpdateDto } from "../data/userDto";
import { toBase64 } from "../utils/convertToBase64";
import { urlUsers } from "./endpoints";

export async function getUsers(setUser, setError, setLoading) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  setLoading(true);

  try {
    const request = await axios.get(`${urlUsers}/GetUsers/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success) {
      setUser(request.data.data);
      setLoading(false);
    } else {
      setError(request.data.message || "Error al iniciar sesión.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error?.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function getUser(
  e,
  navigate,
  email,
  password,
  setMessageEmail,
  setMessagePassword,
  setError,
  setLoading,
  setMessageResultado
) {
  e.preventDefault();

  const credentialsValid = validateCredentialslogin(
    email,
    password,
    setMessageEmail,
    setMessagePassword
  );

  if (!credentialsValid) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResultado("");

  localStorage.removeItem("token");
  localStorage.removeItem("token_expiry");

  try {
    const request = await axios.get(`${urlUsers}/GetUser/${email}/${password}`);

    if (request.data.data.success) {
      const token = request.data.token;
      const userData = request.data.data.data;
      authService.saveToken(token, userData);

      setMessageResultado(request.data.data.message);
      setTimeout(() => {
        setLoading(false);
        navigate("/user");
        window.location.reload();
      }, 1100);
    } else {
      setError(request.data.message || "Error al iniciar sesión.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error?.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function getUserById(id, setUser,setMessageUser) {
  try {
    const request = await axios.get(`${urlUsers}/GetUserById/${id}`);

    if (request.data.success) {
      setUser(request.data.data);
    } else {
      setMessageUser(request.data.message);
      setTimeout(() => setMessageUser(""), 1000);
    }
  } catch (error) {
    setMessageUser("Ha ocurrido un error obteniendo el usuario " + error);
    setTimeout(() => setMessageUser(""), 1000);
  }
}

export async function getUserAdmin(
  e,
  navigate,
  email,
  password,
  setMessageEmail,
  setMessagePassword,
  setError,
  setLoading,
  setMessageResult
) {
  e.preventDefault();

  const credentialsValid = validateCredentialslogin(
    email,
    password,
    setMessageEmail,
    setMessagePassword
  );

  if (!credentialsValid) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  localStorage.removeItem("token");
  localStorage.removeItem("token_expiry");

  try {
    const request = await axios.get(
      `${urlUsers}/GetUserAdmin/${email}/${password}`
    );

    if (request.data.data.success) {
      const token = request.data.token;
      const userData = request.data.data.data;
      authService.saveToken(token, userData);

      setMessageResult(request.data.data.message);

      setTimeout(() => {
        setLoading(false);
        navigate("/admin");
        window.location.reload();
      }, 1100);
    } else {
      setError(request.data.message || "Error al iniciar sesión.");
      setTimeout(() => {
        setError("");
      }, 1000);
      setLoading(false);
    }
  } catch (error) {
    setError(error?.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1000);
    setLoading(false);
  }
}

export async function getUserWithGoogle(
  navigate,
  setError,
  setLoading,
  setMessageResult
) {
  setLoading(true);
  setError("");
  setMessageResult("");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const email = user.email;
    const name = user.displayName;

    const request = await axios.get(
      `${urlUsers}/GetUserWithGoogle/${email}/${name}`
    );

    if (request.data.data.success) {
      const token = request.data.token;
      const userData = request.data.data.data;

      authService.saveToken(token, userData);

      setMessageResult(request.data.data.message);

      setTimeout(() => {
        setLoading(false);
        navigate("/user");
      }, 1100);
    } else {
      setError(request.data.message || "Error al iniciar sesión.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error?.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function registerWithGoogle(
  navigate,
  setError,
  setLoading,
  setMessageResult
) {
  setLoading(true);
  setError("");
  setMessageResult("");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const email = user.email;
    const name = user.displayName;
    const imgProfile = user.photoURL;

    const dto = userAddDto(imgProfile, name, email, "");

    const request = await axios.post(`${urlUsers}/RegisterWithGoogle/`, dto);

    if (request.data.data.success) {
      const token = request.data.token;
      const userData = request.data.data.data;
      authService.saveToken(token, userData);

      setMessageResult(request.data.data.message);

      setTimeout(() => {
        setLoading(false);
        navigate("/user");
        window.location.reload();
      }, 1100);
    } else {
      setError(request.data.message || "Error al registrar el usuario.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error?.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function saveUser(
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
  setMessageResult
) {
  e.preventDefault();

  const credentialsValidLogin = validateCredentialslogin(
    email,
    password,
    setMessageEmail,
    setMessagePassword
  );

  const credentialsValidRegister = validateCredentialsRegister(
    name,
    imageProfile,
    setMessageName,
    setMessageImageProfile
  );

  if (!credentialsValidLogin || !credentialsValidRegister) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = userAddDto(await toBase64(imageProfile), name, email, password);

  try {
    const request = await axios.post(`${urlUsers}/Save/`, dto);

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        setLoading(false);
        navigate("/login");
        window.location.reload();
      }, 1100);
    } else {
      setError(request.data.message || "Error al registrar.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function saveAdmin(
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
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  const credentialsValidLogin = validateCredentialslogin(
    email,
    password,
    setMessageEmail,
    setMessagePassword
  );

  const credentialsValidRegister = validateCredentialsRegister(
    name,
    imageProfile,
    setMessageName,
    setMessageImageProfile
  );

  if (!credentialsValidLogin || !credentialsValidRegister) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = userAddDto(await toBase64(imageProfile), name, email, password);

  try {
    const request = await axios.post(`${urlUsers}/SaveAdmin/`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } else {
      setError(request.data.message || "Error al registrar.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function updateUser(
  id,
  name,
  email,
  password,
  idUser,
  setMessageEmail,
  setMessagePassword,
  setMessageName,
  setError,
  setLoading,
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  const credentialsValid = validateCredentialsUpdate(
    name,
    email,
    password,
    setMessageName,
    setMessageEmail,
    setMessagePassword
  );

  if (!credentialsValid) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = userUpdateDto(id, name, email, password, idUser);

  try {
    const request = await axios.put(`${urlUsers}/Update/`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } else {
      setError(request.data.message || "Error al registrar.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function deleteUser(
  id,
  idUser,
  setLoading,
  setError,
  setMessageResult
) {
  const token = authService.getToken();

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = userDeleteDto(id, idUser);

  try {
    const request = await axios.delete(`${urlUsers}/Delete/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: dto,
    });

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        setMessageResult("");
        window.location.reload();
      }, 1100);

      setLoading(false);
    } else {
      setError(request.data.message || "Error al eliminar el comentario.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(
      error.response?.data?.message || "Error al eliminar el comentario."
    );
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}