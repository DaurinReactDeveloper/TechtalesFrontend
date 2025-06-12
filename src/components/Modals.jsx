import dateSplit from "../utils/dateSplit";
import { useEffect, useState } from "react";
import {
  deleteComment,
  getCommentsByStoriesId,
  saveComment,
} from "../services/commentsServices";
import { MdDelete, MdOutlinePersonPin } from "react-icons/md";
import authService from "../utils/token";
import { saveStorie, updateStories } from "../services/storiesServices";
import { AiOutlinePicture } from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { saveAdmin, updateUser } from "../services/userServices";
import { saveChallenge, updateChallenge } from "../services/challengesServices";
import "../styles/modal.css";

export function ModalComment({ title, modalId, content, idStorie, idUser }) {
  const [messageContent, setMessageContent] = useState("");
  const [contentTextArea, setContentTextArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const [comments, setComments] = useState([]);
  const [messageComments, setMessageComment] = useState([]);
  const userId = authService.getUserDataFromStorage();

  useEffect(() => {
    getCommentsByStoriesId(idStorie, setComments,setMessageComment);
  }, []);

  async function callSaveComment() {
    if (!userId?.id) {
      setError("Debe iniciar sesión para poder agregar un comentario");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    await saveComment(
      contentTextArea,
      idStorie,
      idUser,
      setMessageContent,
      setLoading,
      setError,
      setMessageResult
    );
    setContentTextArea("");
    await getCommentsByStoriesId(idStorie, setComments,setMessageComment);
  }

  async function callDeleteComment(idComment) {
    if (!userId?.id) {
      setError("Debe iniciar sesión para poder eliminar un comentario");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    await deleteComment(
      idComment,
      idStorie,
      idUser,
      setLoading,
      setError,
      setMessageResult
    );

    await getCommentsByStoriesId(idStorie, setComments,setMessageComment);

  }

  return (
    <div
      className="modal fade modal-generic"
      id={modalId}
      tabIndex="-1"
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header modal-header-generic">
            <h5 className="modal-title modal-title-h5" id={`${modalId}Label`}>
              <span className="modal-title-h5-span">Título: </span>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          <div className="modal-body">
            <p className="p-content-modal-body">{content}</p>
            <hr className="hr-modal-body-generic" />
            <h6 className="h6-modal-body-generic">Comentarios</h6>

            <div className="div-generic-modal">
              {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="div-map-generic-modal">
                    <small className="text-muted small-generic-modal">
                      {dateSplit(comment.dateComment)}
                    </small>
                    <p>{comment.content}</p>

                    {comment.idUser == idUser && (
                      <div className="div-button-delete">
                        <button
                          type="button"
                          className="button-delete-generic"
                          onClick={() => callDeleteComment(comment.id)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted">No hay comentarios aún.</p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                callSaveComment();
              }}
            >
              <div>
                <textarea
                  className="form-control textarea-generic-modal"
                  placeholder="Escribe tu comentario..."
                  rows="5"
                  required
                  minLength={16}
                  maxLength={1000}
                  value={contentTextArea}
                  onChange={(e) => setContentTextArea(e.target.value)}
                ></textarea>

                {messageContent && (
                  <div className="alert-div-message-warning">
                    {messageContent}
                  </div>
                )}
                {error && (
                  <div className="alert-div-message-error">{error}</div>
                )}
                {messageResult && (
                  <div className="alert-div-message-success">
                    {messageResult}
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="modal-footer div-buttons-modal">
            <button
              type="button"
              className="button-close-modal"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="button-generic-modal"
              disabled={loading}
              onClick={callSaveComment}
            >
              Comentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//Storie
export function ModalAddStorie() {
  const userId = authService.getUserDataFromStorage();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageResult, setMessageResult] = useState("");

  async function callSaveStorie(e) {
    e.preventDefault();

    await saveStorie(
      title,
      content,
      userId.id,
      setMessageResult,
      setError,
      setLoading
    );

    setTimeout(() => {
      setTitle("");
      setContent("");
    }, 1000);
  }

  return (
    <div
      className="modal fade modal-generic"
      id="modalAddStorie"
      tabIndex="-1"
      aria-labelledby="modalAddStorieLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header modal-header-generic">
            <h5 className="modal-title modal-title-h5" id="modalAddStorieLabel">
              {userId
                ? `Hola ${userId.name}, cuéntanos tu historia :)`
                : "AGREGAR HISTORIA"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Formulario */}
          <form onSubmit={callSaveStorie}>
            <div className="modal-body">
              <p className="p-content-modal-body">Titulo</p>
              <input
                type="text"
                className="form-control textarea-generic-modal"
                placeholder="Escribe el titulo :)"
                minLength={16}
                maxLength={99}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="p-content-modal-body">Contenido</p>
              <textarea
                className="form-control textarea-generic-modal"
                placeholder="Escribe tu historia :)"
                rows="3"
                required
                minLength={16}
                maxLength={399}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              {error && <div className="alert-div-message-error">{error}</div>}
              {messageResult && (
                <div className="alert-div-message-success">{messageResult}</div>
              )}
            </div>

            <div className="modal-footer div-buttons-modal">
              <button
                type="button"
                className="button-close-modal"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="button-generic-modal"
                disabled={loading}
              >
                {loading ? "Agregando..." : "Agregar Historia"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ModalEditStorie({ idStorie }) {
  const userId = authService.getUserDataFromStorage();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageResult, setMessageResult] = useState("");

  async function callUpdateStorie(e) {
    e.preventDefault();

    await updateStories(
      idStorie,
      title,
      content,
      userId.id,
      setMessageResult,
      setError,
      setLoading
    );

    setTimeout(() => {
      setTitle("");
      setContent("");
    }, 1000);
  }

  return (
    <div
      className="modal fade modal-generic"
      id="modalUpdateStorie"
      tabIndex="-1"
      aria-labelledby="modalUpdateStorieLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header modal-header-generic">
            <h5
              className="modal-title modal-title-h5"
              id="modalUpdateStorieLabel"
            >
              EDITA TU HISTORIA {":)"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Formulario */}
          <form onSubmit={callUpdateStorie}>
            <div className="modal-body">
              <p className="p-content-modal-body">Titulo</p>
              <input
                type="text"
                className="form-control textarea-generic-modal"
                placeholder="Escribe el titulo :)"
                minLength={16}
                maxLength={99}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="p-content-modal-body">Contenido</p>
              <textarea
                className="form-control textarea-generic-modal"
                placeholder="Escribe tu historia :)"
                rows="3"
                required
                minLength={16}
                maxLength={399}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              {error && <div className="alert-div-message-error">{error}</div>}
              {messageResult && (
                <div className="alert-div-message-success">{messageResult}</div>
              )}
            </div>

            <div className="modal-footer div-buttons-modal">
              <button
                type="button"
                className="button-close-modal"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="button-generic-modal"
                disabled={loading}
              >
                {loading ? "Agregando..." : "Agregar Historia"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

//User
export function ModalAddUser() {
  const userId = authService.getUserDataFromStorage();
  const [imageProfile, setImageProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageImageProfile, setMessageImageProfile] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function callSaveUserAdmin(e) {
    e.preventDefault();

    await saveAdmin(
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
    );
  }

  return (
    <div
      className="modal fade modal-generic"
      id="modalAddUser"
      tabIndex="-1"
      aria-labelledby="modalAddUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header modal-header-generic">
            <h5 className="modal-title modal-title-h5" id="modalAddUserLabel">
              {userId
                ? `Hola ${userId.name}, AGREGUE SU USUARIO :) `
                : "AGREGAR USUARIO"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Nuevo Formulario */}
          <form onSubmit={callSaveUserAdmin}>
            <div className="modal-body">
              <div>
                <p className="p-content-modal-body">
                  <AiOutlinePicture /> Foto de Perfil
                </p>
                <input
                  className="form-control textarea-generic-modal"
                  type="file"
                  accept="image/jpeg, image/webp"
                  required
                  onChange={(e) => setImageProfile(e.target.files[0])}
                />
                {messageImageProfile && (
                  <p className="alert-div-message-error">
                    {messageImageProfile}
                  </p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">
                  <MdOutlinePersonPin /> Nombre
                </p>
                <input
                  className="form-control textarea-generic-modal"
                  type="text"
                  required
                  minLength={9}
                  maxLength={14}
                  onChange={(e) => setName(e.target.value)}
                />
                {messageName && (
                  <p className="alert-div-message-error">{messageName}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">
                  <CgMail /> Correo Electrónico
                </p>
                <input
                  className="form-control textarea-generic-modal"
                  type="text"
                  value={email}
                  minLength={11}
                  maxLength={48}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {messageEmail && (
                  <p className="alert-div-message-error">{messageEmail}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">
                  <RiLockPasswordLine /> Contraseña
                </p>
                <input
                  className="form-control textarea-generic-modal"
                  type="password"
                  value={password}
                  minLength={9}
                  maxLength={14}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                {messagePassword && (
                  <p className="alert-div-message-error">{messagePassword}</p>
                )}
              </div>

              {error && <p className="alert-div-message-error">{error}</p>}
              {messageResult && (
                <p className="alert-div-message-success">{messageResult}</p>
              )}
            </div>

            <div className="modal-footer div-buttons-modal">
              <button
                type="button"
                className="button-close-modal"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="button-generic-modal"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Agregar Usuario"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ModalEditUser({ idUser }) {
  const userId = authService.getUserDataFromStorage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function callSaveUserAdmin(e) {
    e.preventDefault();

    await updateUser(
      idUser,
      name,
      email,
      password,
      userId.id,
      setMessageEmail,
      setMessagePassword,
      setMessageName,
      setError,
      setLoading,
      setMessageResult
    );
  }

  return (
    <div
      className="modal fade modal-generic"
      id="modalEditUser"
      tabIndex="-1"
      aria-labelledby="modalEditUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header modal-header-generic">
            <h5 className="modal-title modal-title-h5" id="modalEditUserLabel">
              {userId
                ? `Hola ${userId.name}, ACTUALICE SU USUARIO :) `
                : "ACTUALIZAR USUARIO"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Nuevo Formulario */}
          <form onSubmit={callSaveUserAdmin}>
            <div className="modal-body">
              <div>
                <p className="p-content-modal-body">
                  <MdOutlinePersonPin /> Nombre
                </p>
                <input
                  className="form-control textarea-generic-modal"
                  type="text"
                  required
                  minLength={9}
                  maxLength={14}
                  onChange={(e) => setName(e.target.value)}
                />
                {messageName && (
                  <p className="alert-div-message-error">{messageName}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">
                  <CgMail /> Correo Electrónico
                </p>
                <input
                  className="form-control textarea-generic-modal"
                  type="text"
                  value={email}
                  minLength={11}
                  maxLength={48}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {messageEmail && (
                  <p className="alert-div-message-error">{messageEmail}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">
                  <RiLockPasswordLine /> Contraseña
                </p>
                <input
                  className="form-control textarea-generic-modal"
                  type="password"
                  value={password}
                  minLength={9}
                  maxLength={14}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                {messagePassword && (
                  <p className="alert-div-message-error">{messagePassword}</p>
                )}
              </div>

              {error && <p className="alert-div-message-error">{error}</p>}
              {messageResult && (
                <p className="alert-div-message-success">{messageResult}</p>
              )}
            </div>

            <div className="modal-footer div-buttons-modal">
              <button
                type="button"
                className="button-close-modal"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="button-generic-modal"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Actualizar Usuario"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

//Challenges
export function ModalAddChallenges({ idUser }) {
  const userId = authService.getUserDataFromStorage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [hint, setHint] = useState("");
  const [datePublication, setDatePublication] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [messageType, setMessageType] = useState("");
  const [messageHint, setMessageHint] = useState("");
  const [messageDatePublication, setMessageDatePublication] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function callSaveChallenges(e) {
    e.preventDefault();

    await saveChallenge(
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
    );
  }

  return (
    <div
      className="modal fade modal-generic"
      id="modalAddChallenge"
      tabIndex="-1"
      aria-labelledby="modalAddChallengeLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header modal-header-generic">
            <h5
              className="modal-title modal-title-h5"
              id="modalAddChallengeLabel"
            >
              {userId
                ? `Hola ${userId.name}, AGREGUE EL NUEVO RETO :)`
                : "AGREGAR RETO"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          <form onSubmit={callSaveChallenges}>
            <div className="modal-body">
              <div>
                <p className="p-content-modal-body">Título</p>
                <input
                  className="form-control textarea-generic-modal"
                  type="text"
                  required
                  minLength={16}
                  maxLength={99}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {messageTitle && (
                  <p className="alert-div-message-error">{messageTitle}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">Tipo</p>
                <select
                  className="form-control textarea-generic-modal"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Seleccione un nivel</option>
                  <option value="basic">Básico</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
                {messageType && (
                  <p className="alert-div-message-error">{messageType}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">Descripción</p>
                <textarea
                  className="form-control textarea-generic-modal"
                  minLength={101}
                  maxLength={399}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {messageDescription && (
                  <p className="alert-div-message-error">
                    {messageDescription}
                  </p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">Pista</p>
                <textarea
                  className="form-control textarea-generic-modal"
                  required
                  minLength={20}
                  maxLength={150}
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                />
                {messageHint && (
                  <p className="alert-div-message-error">{messageHint}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">Fecha de Publicación</p>
                <input
                  className="form-control textarea-generic-modal"
                  type="date"
                  required
                  value={datePublication}
                  onChange={(e) => setDatePublication(e.target.value)}
                />
                {messageDatePublication && (
                  <p className="alert-div-message-error">
                    {messageDatePublication}
                  </p>
                )}
              </div>

              {error && <p className="alert-div-message-error">{error}</p>}
              {messageResult && (
                <p className="alert-div-message-success">{messageResult}</p>
              )}
            </div>

            <div className="modal-footer div-buttons-modal">
              <button
                type="button"
                className="button-close-modal"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="button-generic-modal"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Actualizar Reto"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ModalEditChallenges({ idUser }) {
  const userId = authService.getUserDataFromStorage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [hint, setHint] = useState("");
  const [datePublication, setDatePublication] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [messageType, setMessageType] = useState("");
  const [messageHint, setMessageHint] = useState("");
  const [messageDatePublication, setMessageDatePublication] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function callSaveChallenges(e) {
    e.preventDefault();

    await updateChallenge(
      idUser,
      userId.id,
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
    );
  }

  return (
    <div
      className="modal fade modal-generic"
      id="modalEditChallenge"
      tabIndex="-1"
      aria-labelledby="modalEditChallengeLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header modal-header-generic">
            <h5
              className="modal-title modal-title-h5"
              id="modalEditChallengeLabel"
            >
              {userId
                ? `Hola ${userId.name}, ACTUALIZA EL RETO :)`
                : "ACTUALIZAR RETO"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          <form onSubmit={callSaveChallenges}>
            <div className="modal-body">
              <div>
                <p className="p-content-modal-body">Título</p>
                <input
                  className="form-control textarea-generic-modal"
                  type="text"
                  required
                  minLength={16}
                  maxLength={99}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {messageTitle && (
                  <p className="alert-div-message-error">{messageTitle}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">Tipo</p>
                <select
                  className="form-control textarea-generic-modal"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Seleccione un nivel</option>
                  <option value="basic">Básico</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
                {messageType && (
                  <p className="alert-div-message-error">{messageType}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">Descripción</p>
                <textarea
                  className="form-control textarea-generic-modal"
                  minLength={101}
                  maxLength={399}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {messageDescription && (
                  <p className="alert-div-message-error">
                    {messageDescription}
                  </p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">Pista</p>
                <textarea
                  className="form-control textarea-generic-modal"
                  required
                  minLength={20}
                  maxLength={150}
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                />
                {messageHint && (
                  <p className="alert-div-message-error">{messageHint}</p>
                )}
              </div>

              <div>
                <p className="p-content-modal-body">Fecha de Publicación</p>
                <input
                  className="form-control textarea-generic-modal"
                  type="date"
                  required
                  value={datePublication}
                  onChange={(e) => setDatePublication(e.target.value)}
                />
                {messageDatePublication && (
                  <p className="alert-div-message-error">
                    {messageDatePublication}
                  </p>
                )}
              </div>

              {error && <p className="alert-div-message-error">{error}</p>}
              {messageResult && (
                <p className="alert-div-message-success">{messageResult}</p>
              )}
            </div>

            <div className="modal-footer div-buttons-modal">
              <button
                type="button"
                className="button-close-modal"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="button-generic-modal"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Actualizar Reto"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
