import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  deleteChallengesCompleted,
  saveChallengesCompleted,
} from "../services/challengescompleted";
import authService from "../utils/token";
import "../styles/accordion.css";

export function ChallengAccordionBasic({
  complete = false,
  data,
  accordionId,
  ChallengesNavigation = false,
}) {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const user = authService.getUserDataFromStorage();

  async function callSaveChallengeCompleted(idChallenges) {
    await saveChallengesCompleted(
      idChallenges,
      user?.id,
      setLoading,
      setError,
      setMessageResult
    );
  }

  async function callDeleteChallengeCompleted(id) {
    await deleteChallengesCompleted(
      id,
      user?.id,
      setLoading,
      setError,
      setMessageResult
    );
  }

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id={`heading-${data.id}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${data.id}`}
            aria-expanded="false"
            aria-controls={`collapse-${data.id}`}
          >
            #{ChallengesNavigation ? data.idChallenges : data.id}-
            {ChallengesNavigation
              ? data.idChallengesNavigation.title
              : data.title}
          </button>
        </h2>
        <div
          id={`collapse-${data.id}`}
          className="accordion-collapse collapse"
          aria-labelledby={`heading-${data.id}`}
          data-bs-parent={`#${accordionId}`}
        >
          <div className="accordion-body">
            <p>
              {" "}
              <strong>Detalles del Ejercicio: </strong>
              {ChallengesNavigation
                ? data.idChallengesNavigation.description
                : data.description}
            </p>
            <p>
              {ChallengesNavigation
                ? data.idChallengesNavigation.hint
                : data.hint}
            </p>

            {!complete && (
              <div className="div-button-completed-accordion">
                <button
                  type="button"
                  className="button-completed-accordion"
                  onClick={() => callSaveChallengeCompleted(data.id)}
                >
                  MARCAR COMO SUPERADO {":)"}
                </button>
              </div>
            )}

            {complete && (
              <div className="div-button-delete-accordion">
                <button
                  type="button"
                  className="button-delete-accordion"
                  onClick={() => callDeleteChallengeCompleted(data.id)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="alert-div-message-error-challenges">{error}</div>
        )}
        {messageResult && (
          <div className="alert-div-message-success-challenges">
            {messageResult}
          </div>
        )}
      </div>
      <br />
    </>
  );
}
