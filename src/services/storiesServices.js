import axios from "axios";
import authService from "../utils/token";
import { urlStories } from "./endpoints";
import {
  storieAddDto,
  storieRemoveDto,
  storieUpdateDto,
} from "../data/storiesDto";

export async function getStories(setStories, setMessageStories) {
  try {
    const request = await axios.get(`${urlStories}/GetStories`);

    if (request.data.success) {
      setStories(request.data.data);
    } else {
      setMessageStories(request.data.message);
      setTimeout(() => setMessageStories(""), 1000);
    }
  } catch (error) {
    setMessageStories(
      error.response?.data?.message || "Error en la solicitud."
    );
    setTimeout(() => setMessageStories(""), 1000);
  }
}

export async function getStoriesByUserId(
  userId,
  setStories,
  setMessageStories
) {
  const token = authService.getToken();

  if (!token) {
    setMessageResult("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  try {
    const request = await axios.get(`${urlStories}/GetStoriesByUserId/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (request.data.success) {
      setStories(request.data.data);
    } else {
      setMessageStories(request.data.message);
      setTimeout(() => setMessageStories(""), 1000);
    }
  } catch (error) {
    setMessageStories(
      error.response?.data?.message || "Error en la solicitud."
    );
  }
}

export async function getStoryCountByUserLength(userId) {
  const token = authService.getToken();

  if (!token) {
    return 0;
  }

  try {
    const response = await axios.get(`${urlStories}/GetStoriesByUserId/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      return response.data.data.length;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}

export async function saveStorie(
  title,
  content,
  idUser,
  setMessageResult,
  setError,
  setLoading
) {
  const token = authService.getToken();

  if (!token) {
    setMessageResult("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  const dto = storieAddDto(title, content, idUser);

  try {
    const request = await axios.post(`${urlStories}/Save/`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);
      setTimeout(() => {
        setMessageResult("");
        window.location.reload();
      }, 1100);
      setLoading(false);
    } else {
      setError(request.data.message || "Error al registrar.");
      setTimeout(() => {
        setError("");
      }, 1000);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1000);
    setLoading(false);
  }
}

export async function updateStories(
  idStorie,
  title,
  content,
  idUser,
  setMessageResult,
  setError,
  setLoading
) {
  const token = authService.getToken();

  if (!token) {
    setMessageResult("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  const dto = storieUpdateDto(idStorie, title, content, idUser);

  try {
    const request = await axios.put(`${urlStories}/Update/`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);
      setTimeout(() => {
        setMessageResult("");
        window.location.reload();
      }, 1100);
      setLoading(false);
    } else {
      setError(request.data.message || "Error al registrar.");
      setTimeout(() => {
        setError("");
      }, 1000);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => {
      setError("");
    }, 1000);
    setLoading(false);
  }
}

export async function deleteStories(
  idStorie,
  idUser,
  setLoading,
  setError,
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setMessageResult("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = storieRemoveDto(idStorie, idUser);

  try {
    const request = await axios.delete(`${urlStories}/Delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: dto,
    });

    if (request.data.success) {
      setMessageResult(request.data.message);
      setTimeout(() => window.location.reload(), 1100);
      setLoading(false);
    } else {
      setError(request.data.message);
      setTimeout(() => setError(""), 1000);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setTimeout(() => setError(""), 1000);
    setLoading(false);
  }
}