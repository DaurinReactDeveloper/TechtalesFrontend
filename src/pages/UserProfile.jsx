import { useNavigate } from "react-router-dom";
import authService from "../utils/token";
import { useEffect, useState } from "react";
import InformationAuth, {
  InformationWelcome,
} from "../components/InformationAuth";
import { getStoriesByUserId } from "../services/storiesServices";
import Pagination from "../components/Pagination";
import { CardStories } from "../components/CardStories";
import { getChallengesCompletedByUser } from "../services/challengescompleted";
import { ChallengAccordionBasic } from "../components/Accordions";
import "../styles/userprofile.css";

export default function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [stories, setStories] = useState([]);
  const [messageStories, setMessageStories] = useState(null);
  const [challengeCompleted, setChallengesCompleted] = useState([]);
  const [messageChallengesCompleted, setMessageChallengesCompleted] =
    useState(null);
  const [showStories, setShowStories] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);

  useEffect(() => {
    const user = authService.getUserDataFromStorage();
    if (!user) {
      navigate("/");
    } else {
      setUserData(user);
    }
  }, []);

  async function callStoriesByUserId() {
    setShowChallenge(false);
    if (userData) {
      await getStoriesByUserId(userData.id, setStories, setMessageStories);
      setShowStories(true);
    }
  }

  async function callChallengeCompleted() {
    setShowStories(false);
    if (userData) {
      await getChallengesCompletedByUser(
        userData.id,
        setChallengesCompleted,
        setMessageChallengesCompleted
      );
      setShowChallenge(true);
    }
  }

  return (
    <>
      <InformationAuth userData={userData} navigate={navigate} />

      <section>
        <article className="article-buttons-userprofile">
          <button className="buttons-userprofile" onClick={callStoriesByUserId}>
            HISTORIAS
          </button>
          <button
            className="buttons-userprofile"
            onClick={callChallengeCompleted}
          >
            RETOS COMPLETADOS
          </button>
        </article>

        {!showStories && !showChallenge && (
          <InformationWelcome
            name={userData?.name}
            description={
              " Elige una opción para explorar tus historias o retos completados."
            }
          />
        )}

        {showStories && (
          <>
            {stories.length > 0 ? (
              <Pagination
                data={stories}
                itemsPerPage={2}
                render={(currentItems) =>
                  currentItems.map((storie) => (
                    <CardStories key={storie.id} data={storie} />
                  ))
                }
              />
            ) : (
              <p className="p-info-userprofile">{messageStories}</p>
            )}
          </>
        )}

        <div
          className="accordion accordion-challeges div-accordion-challengescompleted"
          id="accordionCompleted"
        >
          {showChallenge && (
            <>
              {challengeCompleted.length > 0 ? (
                <Pagination
                  data={challengeCompleted}
                  itemsPerPage={3}
                  render={(currentItems) =>
                    currentItems.map((reto) => (
                      <ChallengAccordionBasic
                        key={reto.id}
                        data={reto}
                        accordionId={"accordionCompleted"}
                        complete={true}
                        ChallengesNavigation={true}
                      />
                    ))
                  }
                />
              ) : (
                <p className="p-userprofile">{messageChallengesCompleted}</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
