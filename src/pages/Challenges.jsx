import React, { useEffect, useState } from "react";
import { getChallengesForType } from "../services/challengesServices";
import Pagination from "../components/Pagination";
import { ChallengAccordionBasic } from "../components/Accordions";
import DescriptionsLayout from "../layouts/DescriptionsLayout";
import "../styles/challeges.css";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [messageChallenges, setMessageChallenges] = useState("");
  const [challengesIntermediate, setChallengesintermediate] = useState([]);
  const [messageChallengesIntermediate, setMessagechallengesIntermediate] = useState("");
  const [challengesAdvanced, setChallengesAdvanced] = useState([]);
  const [messageChallengesAdvanced, setMessageChallengesAdvanced] = useState("");

  useEffect(() => {
    getChallengesForType("basic", setChallenges, setMessageChallenges);
    getChallengesForType("intermediate", setChallengesintermediate, setMessagechallengesIntermediate);
    getChallengesForType("advanced", setChallengesAdvanced, setMessageChallengesAdvanced);
  }, []);

  return (
    <>
      <DescriptionsLayout
        Title={
          <>
            RETOS DE{" "}
            <span className="span-title-DescriptionsLayout">PROGRAMACIÓN</span>
          </>
        }
        Description={
          <>
            Los retos en <strong>TechTales</strong> están diseñados para
            ayudarte a crecer como <strong>desarrollador</strong>. Desde
            desafíos básicos para quienes están comenzando, hasta retos
            avanzados que pondrán a prueba tu <strong>lógica</strong> y{" "}
            <strong>creatividad</strong>. Cada desafío es una oportunidad para
            aprender, mejorar y demostrar tus habilidades.
          </>
        }
        UrlImg={"/img/img-section-3.webp"}
        classBackground={"retosBackground"}
      />

      <section className="row row-challeges">
        <article className="article-basicos-challenges">
          <h2 className="h2-basicos-challeges">BÁSICOS</h2>
          <hr className="hr-basicos-challeges" />
          <div className="accordion  accordion-challeges" id="accordionExample">
            
            {messageChallenges && <p>{messageChallenges}</p>}

            {!messageChallenges && challenges.length > 0 ? (
              <Pagination
                data={challenges}
                itemsPerPage={4}
                render={(currentItems) =>
                  currentItems.map((reto) => (
                    <ChallengAccordionBasic
                      key={reto.id}
                      data={reto}
                      accordionId={"accordionExample"}
                    />
                  ))
                }
              />
            ) : (
              !messageChallenges && <p>No hay retos disponibles.</p>
            )}
          </div>
        </article>

        <article className="article-basicos-challenges">
          <h2 className="h2-basicos-challeges">INTERMEDIOS</h2>
          <hr className="hr-basicos-challeges" />
          <div className="accordion  accordion-challeges" id="accordionExample">
            {messageChallengesIntermediate && <p>{messageChallengesIntermediate}</p>}

            {!messageChallengesIntermediate && challengesIntermediate.length > 0 ? (
              <Pagination
                data={challengesIntermediate}
                itemsPerPage={4}
                render={(currentItems) =>
                  currentItems.map((reto) => (
                    <ChallengAccordionBasic
                      key={reto.id}
                      data={reto}
                      accordionId={"accordionExample"}
                    />
                  ))
                }
              />
            ) : (
              !messageChallengesIntermediate && <p>No hay retos disponibles.</p>
            )}
          </div>
        </article>

        <article className="article-basicos-challenges">
          <h2 className="h2-basicos-challeges">AVANZADOS</h2>
          <hr className="hr-basicos-challeges" />
          <div className="accordion  accordion-challeges" id="accordionExample">
            {messageChallengesAdvanced && <p>{messageChallengesAdvanced}</p>}

            {!messageChallengesAdvanced && challengesAdvanced.length > 0 ? (
              <Pagination
                data={challengesAdvanced}
                itemsPerPage={4}
                render={(currentItems) =>
                  currentItems.map((reto) => (
                    <ChallengAccordionBasic
                      key={reto.id}
                      data={reto}
                      accordionId={"accordionExample"}
                    />
                  ))
                }
              />
            ) : (
              !messageChallengesAdvanced && <p>No hay retos disponibles.</p>
            )}
          </div>
        </article>
      </section>
    </>
  );
}
