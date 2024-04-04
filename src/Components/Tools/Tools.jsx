import React from 'react';
import './ToolStyle.css';
import { useGetQuerryByNameQuery } from '../../Redux/QuerryAPI';


export default function Tools() {

  const { data, error, isLoading } = useGetQuerryByNameQuery('tools?populate=*');

const handleCardHover = (index, isHovering) => {
    // Sélectionne toutes les cartes dans le DOM
    const cards = document.querySelectorAll('.card');
    // Parcourt chaque carte
    cards.forEach((card, i) => {
      if (i === index && isHovering) {
        card.style.transform = 'scale(1.1)';
        card.style.opacity = '1';
        card.style.zIndex = '2';
      } else if (i !== index && isHovering) {
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.72';
        card.classList.add('blur');
      } else {
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '1';
        card.style.zIndex = '1';
        card.classList.remove('blur');
      }
    });
  };

  return (

    <div className="RightSection">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          {data.data.map((item, index) => (

          <a key={item.id} href={item.attributes.link} target='_blank'
          className="card"
                                              onMouseEnter={() => handleCardHover(index, true)}
                                              onMouseLeave={() => handleCardHover(index, false)}  >
             <article >
              <div className='image'>
                <img src={"https://vps-96abfae6.vps.ovh.net"+item.attributes.imageTool.data[0].attributes.url} />
              </div>
              <div className='content'>
                <h3>{item.attributes.title}</h3>
                <p className='subtitle'>{item.attributes.description}</p>

              </div>
            </article>
            </a>
          ))}

        </>
      ) : null
      }
    </div>


  )
}
