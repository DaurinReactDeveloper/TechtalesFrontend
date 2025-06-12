// src/components/UserTable.js
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { getCommentCountByUserLength } from "../services/commentsServices";
import { getStoryCountByUserLength } from "../services/storiesServices";

export function UserTable({ users, onEdit, onDelete }) {
  const [commentCounts, setCommentCounts] = useState({});
  const [storyCounts, setStoryCounts] = useState({});

  useEffect(() => {
    async function loadCounts() {
      const commentMap = {};
      const storyMap = {};
  
      for (const user of users) {
        const commentCount = await getCommentCountByUserLength(user.id);
        const storyCount = await getStoryCountByUserLength(user.id);
        commentMap[user.id] = commentCount;
        storyMap[user.id] = storyCount;
      }
  
      setCommentCounts(commentMap);
      setStoryCounts(storyMap);
    }
  
    if (users.length > 0) {
      loadCounts();
    }
  }, [users]);
  
  

  return (
    <div>
      <table className="table-admin">
        <thead>
          <tr className="tr-table-admin">
            <th>No</th>
            <th>Nombre del usuario</th>
            <th>Correo Electrónico</th>
            <th>Historias realizadas</th>
            <th>Comentarios realizados</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((userinfo, index) => (
              <tr key={userinfo.id} className="tr-table-information">
                <td>{index + 1}</td>
                <td>{userinfo.name}</td>
                <td>{userinfo.email}</td>
                <td>{storyCounts[userinfo.id] ?? 0}</td>
                <td>{commentCounts[userinfo.id] ?? 0}</td>
                <td>
                  <button
                    className="button-delete-table"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditUser"
                    onClick={() => onEdit(userinfo.id)}
                  >
                    <FaUserEdit />
                  </button>
                </td>
                <td>
                  <button
                    className="button-delete-table"
                    onClick={() => onDelete(userinfo.id)}
                  >
                    <TiUserDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export function ChallengeTable({ challenges, onEdit, onDelete }) {
    return (
      <div>
        <table className="table-admin">
          <thead>
            <tr className="tr-table-admin">
              <th>No</th>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Pista</th>
              <th>Tipo</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {challenges.length > 0 &&
              challenges.map((challengeinfo, index) => (
                <tr key={challengeinfo.id} className="tr-table-information">
                  <td>{index + 1}</td>
                  <td>{challengeinfo.title}</td>
                  <td>{challengeinfo.description}</td>
                  <td>{challengeinfo.hint}</td>
                  <td>{challengeinfo.type}</td>
                  <td>
                    <button
                      className="button-delete-table"
                      data-bs-toggle="modal"
                      data-bs-target="#modalEditChallenge"
                      onClick={() => onEdit(challengeinfo.id)}
                    >
                      <MdEditSquare  />
                    </button>
                  </td>
                  <td>
                    <button
                      className="button-delete-table"
                      onClick={() => onDelete(challengeinfo.id)}
                    >
                      <MdDelete  />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }