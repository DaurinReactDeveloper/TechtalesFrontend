import React, { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { getStories } from "../services/storiesServices";
import Pagination from "../components/Pagination";
import { CardStories } from "../components/CardStories";
import { ModalAddStorie } from "../components/Modals";
import DescriptionsLayout from "../layouts/DescriptionsLayout";
import AOS from "aos";
import authService from "../utils/token";
import "aos/dist/aos.css";
import "../styles/stories.css";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [messageStories, setMessageStories] = useState("");
  const userData = authService.getUserDataFromStorage();

  useEffect(() => {
    AOS.init();

    getStories(setStories, setMessageStories);
  }, []);

  return (
    <>
      <DescriptionsLayout
        Title={"HISTORIAS"}
        Description={
          <>
            "En <strong>TechTales</strong>, cada historia es una oportunidad
            para inspirar y aprender. Comparte tus experiencias en el mundo del
            desarrollo, los desafíos que has superado y los conocimientos que
            has adquirido. Desde anécdotas hasta lecciones técnicas, cada
            historia puede motivar a otros y fortalecer la comunidad.
            <strong>¡Tu voz importa, cuéntanos tu historia! 🚀"</strong>
          </>
        }
        UrlImg={"/img/img-section-2.gif"}
        classColor={"historiaH1"}
        classBackground={"row-historia"}
        hr={true}
      />

      <section className="section-button-add-stories">
        <button
          type="button"
          className="button-add-stories"
          title={userData ? "Agregar Historia" : "Inicia Sesion"}
          data-bs-toggle={userData ? "modal" : undefined}
          data-bs-target={userData ? "#modalAddStorie" : undefined}
        >
          <MdAddBox />
          AGREGAR
        </button>
      </section>

      <ModalAddStorie />
      {!messageStories && stories.length > 0 ? (
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
        !messageStories && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            {messageStories}
          </p>
        )
      )}
    </>
  );
}
