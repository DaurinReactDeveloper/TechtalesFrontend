import axios from "axios";
import { urlChallenges } from "./endpoints";
import authService from "../utils/token";
import { challengeDeleteDto, challengeSaveDto, challengeUpdateDto } from "../data/challengesDto";
import { validateChallengeFields } from "../utils/validations";

export async function getChallengesForType(
  type,
  setChallenges,
  setMessageChallenges
) {
  try {
    const request = await axios.get(
      `${urlChallenges}/GetChallengesForType/${type}`
    );

    if (request.data.success) {
      setChallenges(request.data.data);
    } else {
      setMessageChallenges(request.data.message);
      setTimeout(() => setMessageChallenges(""), 1000);
    }
  } catch (error) {
    setMessageChallenges(
      error.response?.data?.message || "Error en la solicitud."
    );
    setTimeout(() => setMessageChallenges(""), 1000);
  }
}

export async function getChallenges(setChallenges, setMessageChallenges) {
  const token = authService.getToken();

  if (!token) {
    setMessageChallenges("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  try {
    const request = await axios.get(`${urlChallenges}/GetChallenges`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (request.data.success) {
      setChallenges(request.data.data);
    } else {
      setMessageChallenges(request.data.message);
      setTimeout(() => setMessageChallenges(""), 1000);
    }
  } catch (error) {
    setMessageChallenges(
      error.response?.data?.message || "Error en la solicitud."
    );
    setTimeout(() => setMessageChallenges(""), 1000);
  }
}

export async function deleteChallenge(
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

  const dto = challengeDeleteDto(id, idUser);

  try {
    const request = await axios.delete(`${urlChallenges}/Delete/`, {
      headers: { Authorization: `Bearer ${token}` },
      data: dto,
    });

    if (request.data.success) {
      setMessageResult(request.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 1100);

      setLoading(false);
    } else {
      setError(request.data.message || "Error al eliminar el Reto.");
      setTimeout(() => {
        setError("");
      }, 1100);
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error al eliminar el Reto.");
    setTimeout(() => {
      setError("");
    }, 1100);
    setLoading(false);
  }
}

export async function saveChallenge(
  idUser,
  title,
  type,
  description,
  hint,
  datePublication,
  setMessageTitle,
  setMessageType,
  setMessageDescription,
  setMessageHint,
  setMessageDatePublication,
  setError,
  setLoading,
  setMessageResult
) {
  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    return;
  }
  
  const validAddChallenge = validateChallengeFields(
    title,
    type,
    description,
    hint,
    datePublication,
    setMessageTitle,
    setMessageType,
    setMessageDescription,
    setMessageHint,
    setMessageDatePublication
  );
  

  if (!validAddChallenge) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = challengeSaveDto(title, description, idUser, hint, type);

  try {
    const request = await axios.post(`${urlChallenges}/Save/`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function updateChallenge(
  id,
  idUser,
  title,
  type,
  description,
  hint,
  setMessageTitle,
  setMessageType,
  setMessageDescription,
  setMessageHint,
  setError,
  setLoading,
  setMessageResult
) {

  const token = authService.getToken();

  if (!token) {
    setError("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  const credentialsValid = validateChallengeFields(
    title,
    type,
    description,
    hint,
    setMessageTitle,
    setMessageType,
    setMessageDescription,
    setMessageHint
  );

  if (!credentialsValid) {
    return;
  }

  setLoading(true);
  setError("");
  setMessageResult("");

  const dto = challengeUpdateDto(id,title,description,idUser,type,hint);

  try {
    const request = await axios.put(`${urlChallenges}/Update/`, dto,{
      headers:{Authorization: `Bearer ${token}`}
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
