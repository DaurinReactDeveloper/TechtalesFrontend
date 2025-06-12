import axios from "axios";
import authService from "../utils/token";
import { votesStoriesAddDto } from "../data/votesStoriesDto";
import { urlVotesStories } from "./endpoints";

export async function getVotesByStoriesId(id, setVote, setMessageVote) {
  try {
    const request = await axios.get(
      `${urlVotesStories}/GetVotesByStoriesId/${id}`
    );

    if (request.data.success) {
      setVote(request.data.data);
    } else {
      setMessageVote(request.data.message);
      setTimeout(() => setMessageVote(""), 1000);
    }
  } catch (error) {
    setMessageVote(
      "Ha ocurrido un error obteniendo la inf de la historia " + error
    );
    setTimeout(() => setMessageVote(""), 1000);
  }
}

export async function saveVoteStories(
  IdUser,
  IdStories,
  Vote,
  setMessageVote,
  setMessageResult,
  setError,
  setLoading
) {
  const token = authService.getToken();

  if (!token) {
    setMessageVote("Debe Registrarse o Iniciar Sesion.");
    return;
  }

  setLoading(true);

  const dto = votesStoriesAddDto(IdUser, IdStories, Vote);

  try {
    const request = await axios.post(`${urlVotesStories}/Save/`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.data.success) {
      setMessageResult(request.data.message);
      setTimeout(() => setMessageResult(""), 1000);
      setLoading(false);
    } else {
      setError(request.data.message || "Error al registrar.");
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error en la solicitud.");
    setLoading(false);
  }
}
