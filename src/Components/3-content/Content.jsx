import React, { useState, useEffect } from 'react'
import './ContentStyle.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetQuerryByNameQuery } from '../../Redux/QuerryAPI';


export default function Content() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  //API pour categories
  const { data: dataCategorie, errorCategorie, isLoadingCategorie } = useGetQuerryByNameQuery('categories?populate=*');
  //API pour projects
  const { data: dataProjets, errorProjets, isLoadingProjets } = useGetQuerryByNameQuery('projects?populate=*');


  const [activeCategory, setActiveCategory] = useState('all'); // Ajoutez un état pour la catégorie active
  const [filteredProjects, setFilteredProjects] = useState([]);


  useEffect(() => {
    if (dataProjets && activeCategory === "all") {
      setFilteredProjects(dataProjets.data)
    }
    else if (dataProjets && activeCategory != "all") {
      setFilteredProjects(dataProjets.data.filter(project => {
        const cat = project.attributes.categorie;
        return cat && cat.data && cat.data.attributes && cat.data.attributes.nom === activeCategory;
      }))
    }
  }, [activeCategory, dataProjets]);


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
    <main>

      <div className="LeftSection">
        <button className={`BtProjects ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>{t('content.allProjects')}</button>
        {errorCategorie ? (
          <>Oh no, there was an error</>
        ) : isLoadingCategorie ? (
          <>Loading...</>
        ) : dataCategorie ? (
          <>
            {dataCategorie.data.map((item, index) => (
              <button
                className={`BtTools ${activeCategory === item?.attributes?.nom ? 'active' : ''}`}
                key={index} onClick={() =>
                  setActiveCategory(item?.attributes?.nom)} >
                {t(item?.attributes?.nom)}
              </button>
            ))}</>
        ) : null
        }

      </div>



      <div className="RightSection " >
        {errorProjets ? (
          <>Oh no, there was an error</>
        ) : isLoadingProjets ? (
          <>Loading...</>
        ) : dataProjets ? (
          <>
            {filteredProjects.map((item, index) => (
              item.attributes.visibilite &&
              <article key={item.id} className="card"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}  >
                {(item.attributes.img &&
                item.attributes.img.data &&
                item.attributes.img.data.length > 0 &&
                item.attributes.img.data[0].attributes &&
                item.attributes.img.data[0].attributes.name) &&
                <img src={item.attributes.img.data[0].attributes.name} alt="" />
                }

                <div className="box" >
                  <h1 className="titleBox"> {item.attributes.title}</h1>
                  <p className="subtitle" >{item.attributes.description}</p>

                  <div className="icons">

                    <div className="iconsCard">
                      {item.attributes.playStoreLink &&
                        <a href={item.attributes.playStoreLink} target='_blanc'><img className="playStoreIcon" src="/playstore.png" alt="playStore Icon" /></a>}
                      {item.attributes.appStoreLink &&
                        <a href={item.attributes.appStoreLink} target='_blanc' ><img className="appStoreIcon" src="/appstore.png" alt="appSotre Icon" /></a>}
                      {item.attributes.steamLink &&
                        <a href={item.attributes.steamLink} target='_blanc'><img className="steamIcon" src="/steam.png" alt="steam Icon" /></a>}
                      {item.attributes.linkGit &&
                        <a href={item.attributes.linkGit} target='_blanc'><div className="icon-github icon-githubCard" /></a>
                      }
                    </div>
                    <div style={{ marginTop: '30px' }}>
                    <span className="link" onClick={() => navigate(`/project/${item.id}`)}>
                      {t('content.More')}
                      <div style={{ marginTop: '2px' }} className="icon-arrow-right" />
                    </span>
                    </div>

                  </div>
                </div>
              </article>

            ))}</>
        ) : null
        }
      </div>
    </main>
  )
}
