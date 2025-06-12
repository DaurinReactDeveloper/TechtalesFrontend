import axios from "axios";
import authService from "../utils/token";
import { urlComments } from "./endpoints";
import { commentAddDto, commentDeleteDto } from "../data/commentDto";
import { validateCredentialsAddComment } from "../utils/validations";

export async function getCommentsByUserId(id, setComment, setMessageComment) {
  const token = authService.getToken();

  if (!token) {
    setMessageComment("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  try {
    const peticion = await axios.get(
      `${urlComments}/GetCommentsByUserId/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (peticion.data.success) {
      setComment(peticion.data.data);
    } else {
      setMessageComment(peticion.data.message);
      setTimeout(() => setMessageComment(""), 1000);
    }
  } catch (error) {
    setMessageComment(
      error.response?.data?.message || "Error en la solicitud."
    );
    setTimeout(() => setMessageComment(""), 1000);
  }
}

export async function getCommentCountByUserLength(id) {
  const token = authService.getToken();

  if (!token) {
    return 0;
  }

  try {
    const request = await axios.get(`${urlComments}/GetCommentsByUserId/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success) {
      return request.data.data.length;
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}

export async function getCommentsByStoriesId(
  id,
  setComments,
  setMessageComment
) {
  try {
    const request = await axios.get(
      `${urlComments}/GetCommentsByStoriesId/${id}`
    );

    if (request.data.success) {
      setComments(request.data.data);
    } else {
      setMessageComment(request.data.message);
      setTimeout(() => setMessageComment(""), 1000);
    }
  } catch (error) {
    setMessageComment(
      error.response?.data?.message || "Error en la solicitud."
    );
    setTimeout(() => setMessageComment(""), 1000);
  }
}

export async function getCountCommentByStoriesId(
  id,
  setCountComment,
  setMessageCountComment
) {
  try {
    const request = await axios.get(
      `${urlComments}/getCountCommentByStoriesId/${id}`
    );

    if (request.data.success) {
      setCountComment(request.data.data);
    } else {
      setMessageCountComment(request.data.message);
      setTimeout(() => setMessageCountComment(""), 1000);
    }
  } catch (error) {
    setMessageCountComment(
      error.response?.data?.message || "Error en la solicitud."
    );
    setTimeout(() => setMessageCountComment(""), 1000);
  }
}

export async function saveComment(
  content,
  idStorie,
  idUser,
  setMessageContent,
  setLoading,
  setError,
  setMessageResult
) {
  const token = authService.getToken();

  const credentialsValidComment = validateCredentialsAddComment(
    content,
    setMessageContent
  );

  if (!credentialsValidComment) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = commentAddDto(content, idStorie, idUser);

  try {
    const request = await axios.post(`${urlComments}/Save/`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        setMessageResult("");
      }, 1100);

      setLoading(false);
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

export async function deleteComment(
  idComment,
  idStorie,
  idUser,
  setLoading,
  setError,
  setMessageResult
) {
  const token = authService.getToken();

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = commentDeleteDto(idComment, idStorie, idUser);

  try {
    const request = await axios.delete(`${urlComments}/Delete/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: dto,
    });

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        setMessageResult("");
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
