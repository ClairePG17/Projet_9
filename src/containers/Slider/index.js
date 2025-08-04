import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

   // Si pas de données, on retourne []
   const byDateDesc = data?.focus ? [...data.focus] : [];

  // Trie par date croissante (du plus ancien au plus recent)
  byDateDesc.sort((evtA, evtB) => 
    new Date(evtA.date) - new Date(evtB.date)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      // On passe à la prochaine carte, ou on revient à 0 si on est à la dernière.
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);

    // On nettoie le timer quand l'effet est rerun ou le composant est démonté
    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]); // L'effet dépend de index et de la longueur (données chargées)

    return (
      <div className="SlideCardList">
        {byDateDesc.map((event, idx) => (
          <div
            key={event.id} // key unique
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
    
        {/* Pagination rendue une seule fois */}
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {byDateDesc.map((_, radioIdx) => (
              <input
                key={byDateDesc[radioIdx].id} // key unique où je n'utilise pas event car il n'est plus accessible
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                onChange={() => setIndex(radioIdx)} // ajout du clic pour la pagination
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Slider;
