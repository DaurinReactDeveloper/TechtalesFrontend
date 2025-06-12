import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../utils/token";
import InformationAuth, {
  InformationWelcome,
} from "../components/InformationAuth";
import { deleteUser, getUsers } from "../services/userServices";
import {
  ModalAddChallenges,
  ModalAddUser,
  ModalEditChallenges,
  ModalEditUser,
} from "../components/Modals";
import { ChallengeTable, UserTable } from "../components/Tables";
import { deleteChallenge, getChallenges } from "../services/challengesServices";
import "../styles/adminprofile.css";

export default function AdminProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [messageChallenges, setMessageChallenges] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const [messageResult, setMessageResult] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [activeTable, setActiveTable] = useState("");

  useEffect(() => {
    const user = authService.getUserDataFromStorage();

    if (!user) {
      navigate("/");
    } else {
      setUserData(user);
    }
    callGetUsers();
    callGetChallenges();
  }, []);

  async function callGetUsers() {
    await getUsers(setUser, setError, setLoading);
  }

  async function callGetChallenges() {
    await getChallenges(setChallenges, setMessageChallenges);
  }

  // User
  async function callDeleteUser(id) {
    await deleteUser(id, userData.id, setLoading, setError, setMessageResult);
  }

  async function callEditUser(id) {
    setIdUser(id);
  }

  // Challenges
  async function callDeleteChallenges(id) {
    await deleteChallenge(
      id,
      userData.id,
      setLoading,
      setError,
      setMessageResult
    );
  }

  async function CallEditChallenges(id) {
    setIdUser(id);
  }

  return (
    <>
      <InformationAuth userData={userData} navigate={navigate} />

      <section>
        <article className="article--button-new-user-adminprofile">
          <button onClick={() => setActiveTable("users")}>
            Gestionar Usuarios
          </button>

          <button onClick={() => setActiveTable("challenges")}>
            Gestionar Retos
          </button>

          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modalAddUser"
          >
            Nuevo Usuario
          </button>

          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modalAddChallenge"
          >
            Nuevo Reto
          </button>
        </article>

        <br />
        {activeTable !== "users" && activeTable !== "challenges" && (
          <InformationWelcome
            name={userData?.name}
            description={
              " Elige una opción para gestionar los usuarios y los retos."
            }
          />
        )}

        {activeTable === "users" && user.length > 0 && (
          <article className="article-table-admin">
            <UserTable
              users={user}
              onEdit={callEditUser}
              onDelete={callDeleteUser}
            />
          </article>
        )}

        {activeTable === "challenges" && challenges.length > 0 && (
          <article className="article-table-admin">
            <ChallengeTable
              challenges={challenges}
              onEdit={CallEditChallenges}
              onDelete={callDeleteChallenges}
            />
          </article>
        )}
      </section>

      <br />

      {messageResult && (
        <p className="p-message-admin-succes">{messageResult}</p>
      )}

      {messageChallenges && (
        <p className="p-message-admin-succes">{messageChallenges}</p>
      )}

      {error && <p className="p-message-admin-error">{error}</p>}

      <ModalAddUser />

      <ModalEditUser idUser={idUser} />

      <ModalAddChallenges idUser={userData?.id} />

      <ModalEditChallenges idUser={userData?.id} />
      
    </>
  );
}
