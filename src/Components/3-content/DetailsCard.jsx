import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsStyle.css';
import { useGetQuerryByNameQuery } from '../../Redux/QuerryAPI';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DetailsCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const [toggle, setToggle] = useState(0);
  const { data, error, isLoading } = useGetQuerryByNameQuery(`projects/${id}?populate=*`);

  function right() {
    if (toggle === 0 || toggle === -1) {
      setToggle(toggle + 1);
    }
  }

  function left() {
    if (toggle === 0 || toggle === 1) {
      setToggle(toggle - 1);
    }
  }
  useEffect(() => {
    if (data) {
      setContent(data.data.attributes.ReadMeStructure);
    }
  }, [data]);
  useEffect(() => {
    setToggle(toggle);
  }, [toggle]);
  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (

        <div className="containerDetails">
          <div className='iconPos'>
            <div className="icon-circle-left" onClick={() => navigate("/project")} />
          </div>
          {((data.data.attributes.img1Desc.data) || (data.data.attributes.img2desc.data) || (data.data.attributes.img3desc.data)) &&( 
          <div className='imagesCard'>
            <div className='leftArrow' onClick={left}>
              <img id="leftArrow" src="/left-arrow.png" alt="left-arrow" />
            </div>
            <div className='allImg'>
              {data.data.attributes.img1Desc &&
                data.data.attributes.img1Desc.data &&
                data.data.attributes.img1Desc.data.length > 0 &&
                data.data.attributes.img1Desc.data[0].attributes &&
                data.data.attributes.img1Desc.data[0].attributes.name && (
                  <img
                    style={{ display: toggle === 0 ? 'block' : 'none' }}
                    src={"/" + data.data.attributes.img1Desc.data[0].attributes.name}
                    alt='dondodon'
                  />)}
              {data.data.attributes.img2desc &&
                data.data.attributes.img2desc.data &&
                data.data.attributes.img2desc.data.length > 0 &&
                data.data.attributes.img2desc.data[0].attributes &&
                data.data.attributes.img2desc.data[0].attributes.name && (
                  <img
                    style={{ display: toggle === 1 ? 'block' : 'none' }}
                    src={"/" + data.data.attributes.img2desc.data[0].attributes.name}
                    alt='dondodon'
                  />
                )}
              {data.data.attributes.img3desc &&
                data.data.attributes.img3desc.data &&
                data.data.attributes.img3desc.data.length > 0 &&
                data.data.attributes.img3desc.data[0].attributes &&
                data.data.attributes.img3desc.data[0].attributes.name && (
                  <img
                    style={{ display: toggle === -1 ? 'block' : 'none' }}
                    src={"/" + data.data.attributes.img3desc.data[0].attributes.name}
                    alt='dondodon'
                  />
                )}

            </div>
            <div className='rightArrow' onClick={right}>
              <img id="rightArrow" src="/right-arrow.png" alt="right-arrow" />
            </div>
          </div>)}





          {/* {data.data.attributes.img2desc &&
              data.data.attributes.img2desc.data &&
              data.data.attributes.img2desc.data.length > 0 &&
              data.data.attributes.img2desc.data[0].attributes &&
              data.data.attributes.img2desc.data[0].attributes.name && (
                <div>
                  <img
                    src={"/" + data.data.attributes.img2desc.data[0].attributes.name}
                    alt='dondodon'
                  />
                </div>
              )}
            {data.data.attributes.img3desc &&
              data.data.attributes.img3desc.data &&
              data.data.attributes.img3desc.data.length > 0 &&
              data.data.attributes.img3desc.data[0].attributes &&
              data.data.attributes.img3desc.data[0].attributes.name && (
                <div>
                  <img
                    src={"/" + data.data.attributes.img3desc.data[0].attributes.name}
                    alt='dondodon'
                  />
                </div>
              )}

          </div> */}
          <div>
            {content &&
              <BlocksRenderer content={content}
                blocks={{
                  // You can use the default components to set class names...
                  paragraph: ({ children }) => <p >{children}</p>,
                  // ...or point to a design system
                  heading: ({ children, level }) => {
                    switch (level) {
                      case 1:
                        return (<h1>{children}<hr /></h1>)
                      case 2:
                        return <h2>{children}</h2>
                      case 3:
                        return <h3>{children}</h3>
                      case 4:
                        return <h4>{children}</h4>
                      case 5:
                        return <h5 variant="h5">{children}</h5>
                      case 6:
                        return <h6 variant="h6">{children}</h6>
                      default:
                        return <h1>{children}</h1>
                    }
                  },
                  // For links, you may want to use the component from your router or framework
                  link: ({ children, url }) => <span className='link'><Link to={url}>{children}</Link></span>,
                }}
                modifiers={{
                  bold: ({ children }) => <strong>{children}</strong>,
                  italic: ({ children }) => <i>{children}</i>,
                  list: ({ format, children }) => { if (format === "unordered") { return <ul><li>{children}</li></ul>; } return null; }

                }} />}
          </div>
          {((data.data.attributes.GifDesc &&
                  data.data.attributes.GifDesc.data &&
                  data.data.attributes.GifDesc.data.length > 0 &&
                  data.data.attributes.GifDesc.data[0].attributes &&
                  data.data.attributes.GifDesc.data[0].attributes.name) || (
                  data.data.attributes.videoDesc &&
                  data.data.attributes.videoDesc.data &&
                  data.data.attributes.videoDesc.data.length > 0 &&
                  data.data.attributes.videoDesc.data[0].attributes &&
                  data.data.attributes.videoDesc.data[0].attributes.name
                  )) &&
                   (
          <div className='media'>
            <div className='mediaHeading'>
              <h2>Project's Media</h2>
            </div>
            <div className='mediaContent'>
              <div className='gifArea'>
                {data.data.attributes.GifDesc &&
                  data.data.attributes.GifDesc.data &&
                  data.data.attributes.GifDesc.data.length > 0 &&
                  data.data.attributes.GifDesc.data[0].attributes &&
                  data.data.attributes.GifDesc.data[0].attributes.name && (
                    <img
                      src={"/" + data.data.attributes.GifDesc.data[0].attributes.name}
                      alt='dondodon'
                    />
                  )}

              </div>
              <div className='videoArea'>
                {data.data.attributes.videoDesc &&
                  data.data.attributes.videoDesc.data &&
                  data.data.attributes.videoDesc.data.length > 0 &&
                  data.data.attributes.videoDesc.data[0].attributes &&
                  data.data.attributes.videoDesc.data[0].attributes.name && (
                    <video controls>
                      <source
                        src={"/" + data.data.attributes.videoDesc.data[0].attributes.name}
                        type="video/mp4" />
                    </video>
                  )}

              </div>
            </div>
          </div>)}
        </div>
      ) : null
      }
    </>

  )
}