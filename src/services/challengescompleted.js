import axios from "axios";
import authService from "../utils/token";
import { urlChallengesCompleted } from "./endpoints";
import {
  challengesAddDto,
  challengesDeleteDto,
} from "../data/challengesCompletedDto";

export async function getChallengesCompletedByUser(
  id,
  setChallengesCompleted,
  setMessageChallengesCompleted
) {
  const token = authService.getToken();

  if (!token) {
    setMessageChallengesCompleted("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  try {
    const peticion = await axios.get(
      `${urlChallengesCompleted}/GetChallengesCompletedByUser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (peticion.data.success) {
      setChallengesCompleted(peticion.data.data);
    } else {
      setMessageChallengesCompleted(peticion.data.message);
      setTimeout(() => setMessageChallengesCompleted(""), 1000);
    }
  } catch (error) {
    setMessageChallengesCompleted(
      error.response?.data?.message || "Error en la solicitud."
    );
  }
}

export async function saveChallengesCompleted(
  idChallenges,
  idUser,
  setLoading,
  setError,
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    setTimeout(() => {
      setError("");
    }, 1100);
    return;
  }

  setLoading(true);

  const dto = challengesAddDto(idChallenges, idUser);

  try {
    const request = await axios.post(`${urlChallengesCompleted}/Save/`, dto, {
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

export async function deleteChallengesCompleted(
  id,
  idUser,
  setLoading,
  setError,
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  setLoading(true);

  const dto = challengesDeleteDto(id, idUser);

  try {
    const request = await axios.delete(`${urlChallengesCompleted}/delete/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: dto
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
