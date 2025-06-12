import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FcLike, FcDislike } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import authService from "../utils/token";
import dateSplit from "../utils/dateSplit";
import { getUserById } from "../services/userServices";
import { getCountCommentByStoriesId } from "../services/commentsServices";
import {
  getVotesByStoriesId,
  saveVoteStories,
} from "../services/votesStoriesServices";
import { ModalComment, ModalEditStorie } from "./Modals";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/cardstories.css";

export function CardStories({ data }) {
  const [user, setUser] = useState(null);
  const [vote, setVote] = useState(null);
  const [countComments, setCountComment] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageVote, setMessageVote] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const [messageCountComment ,setMessageCountComment] = useState("");
  const [messageUser, setMessageUser] = useState("");
  const [error, setError] = useState("");

  const userId = authService.getUserDataFromStorage();

  useEffect(() => {
    AOS.init();

    const fetchData = async () => {
      if (data.idUser) {
        await getUserById(data.idUser, setUser,setMessageUser);
        await getVotesByStoriesId(data.id, setVote, setMessageVote);
        await getCountCommentByStoriesId(data.id, setCountComment,setMessageCountComment);
      }
    };

    fetchData();
  }, []);

  async function callSaveVote(Vote) {
    if (!userId?.id) {
      setMessageVote("Debe iniciar sesión para votar.");
      setTimeout(() => {
        setMessageVote("");
      }, 1000);
      return;
    }

    await saveVoteStories(
      userId.id,
      data.id,
      Vote,
      setMessageVote,
      setMessageResult,
      setError,
      setLoading
    );

    getVotesByStoriesId(data.id, setVote, setMessageVote);
    setTimeout(() => {
      setMessageVote("");
    }, 1100);
  }

  return (
    <section className="section-cardstories" data-aos="fade-up">
      <article>
        <div className="div-inf-cardstories">
          <div className="div-img-cardstories">
            <img
              src={user?.imgProfile}
              alt="imgUser"
              className="img-fluid img-user-cardstories"
            />
            <h3>{user?.name}</h3>
          </div>
          <div className="div-date-cardstories">
            <p>{dateSplit(data?.datePublication)}</p>
          </div>
        </div>
      </article>

      <article>
        <div className="div-title-content-cardstories">
          <h5>"{data?.title}"</h5>
          <p>{data?.content}</p>
        </div>
      </article>

      <article className="article-like-dislike-cardstories">
        {vote?.likes > 0 && (
          <div className="div-like-cardstories">
            <FcLike />
            <p>{vote.likes}</p>
          </div>
        )}
        {vote?.dislikes > 0 && (
          <div className="div-dislike-cardstories">
            <FcDislike />
            <p>{vote.dislikes}</p>
          </div>
        )}
        {countComments > 0 && (
          <div className="div-like-cardstories">
            <BiCommentDetail />
            <p>{countComments}</p>
          </div>
        )}
      </article>

      {messageUser && (
        <div className="alert alert-info text-center">{messageUser}</div>
      )}
      {messageVote && (
        <div className="alert alert-info text-center">{messageVote}</div>
      )}
      {messageResult && (
        <div className="alert alert-success text-center">{messageResult}</div>
      )}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <hr />

      <article>
        <div className="div-icon-actions-cardstories">
          <div className="div-icon-union-cardstories">
            <button
              type="button"
              className="icon-cardstories"
              title="Me gusta"
              onClick={() => callSaveVote(true)}
              disabled={loading}
            >
              <FcLike />
            </button>

            <button
              type="button"
              className="icon-cardstories"
              title="No me gusta"
              onClick={() => callSaveVote(false)}
              disabled={loading}
            >
              <FcDislike />
            </button>

            <div>
              <button
                data-bs-toggle="modal"
                data-bs-target={`#modal_${data.id}`}
                type="button"
                className="icon-cardstories"
                title="Comentar"
              >
                <BiCommentDetail />
              </button>
            </div>

            {data.idUser === userId?.id && (
              <button
                type="button"
                className="icon-cardstories"
                title="Editar Historia"
                data-bs-toggle="modal"
                data-bs-target="#modalUpdateStorie"
              >
                <AiOutlineEdit />
              </button>
            )}
          </div>

          <div>
            {data.idUser === userId?.id && (
              <button
                type="button"
                className="icon-cardstories"
                title="Eliminar Historia"
                onClick={() => callDeleteStorie(data.id, userId?.id)}
              >
                <MdDelete />
              </button>
            )}
          </div>
        </div>

        <ModalComment
          title={data.title}
          modalId={`modal_${data.id}`}
          content={data.content}
          idStorie={data.id}
          idUser={userId?.id}
        />

        <ModalEditStorie idStorie={data.id} />
      </article>
    </section>
  );
}
