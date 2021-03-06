import React, { useState, useEffect} from "react";

import axios from 'axios'
import styled from "styled-components";
import { usePosition } from 'use-position';
import {toast} from 'react-toastify'

import Page from "../../components/Page";
import LoadingIndicator from "../../components/LoadingIndicator";
// import centreicon from "../../icons/locationgreen.svg"

import goarrow from "../../icons/goarrow.svg";
import centreicon from '../../icons/locationgreen.svg'

const Centres = () => {
  const {latitude, longitude} = usePosition();
  console.log(latitude, longitude)

  // const [placeID, setPlaceID] = useState("");
  const [centres, setCentres] = useState([]);
  const [first, setFirst] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ( latitude ){
      axios({
        method: 'POST',
        url: 'http://localhost:5000/api/centres/',
        data: {
            lat: latitude,
            lng: longitude
        }
    })
        .then(response => {
            console.log(response.data.centres)
            setFirst(response.data.centres.shift())
            setCentres(response.data.centres)
            // toast.success(`Found nearest centres`, {
            //     position: "top-left",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            // });
            setIsLoading(false)
          })
          .catch(error => {
            console.error(`Error: ${error}`) // so that we know what went wrong if the request failed
            toast.error(`Something went wrong`, {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
            });
            setIsLoading(false)
        }
        )

    }
  }, [latitude]);

  const Centre = styled.div`
    width: 276px;
    height: 120px;
    background: #eac1b4;
    border-radius: 30px;
    padding: 12px;
    box-sizing: border-box;
    margin: 12px;
  `;
  const BigCentre = styled.div`
    width: 276px;
    background: #eac1b4;
    border-radius: 30px;
    padding: 12px;
    box-sizing: border-box;
    margin: 12px;
  `;

  const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;



  return (
    <Page className="page">
      {/* <h1>Centres</h1> */}
      <div style={{marginTop:'20px'}}>
        <img src={centreicon}/>
      </div>
      <h3>Your nearest recycling centre is: </h3>
      { isLoading ? <>  <LoadingIndicator/> <h2>Ensure you have location services enabled</h2> </> :
        <>
        <a target="_blank" href={`https://www.google.com/maps/place/?q=place_id:${first.place_id}`}>
          <BigCentre>
            <h2>1. {first.name}</h2>
            <Flex>
              <h3>{first.distance}km away</h3>
              <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${first.name}&destination_place_id=${first.place_id}&dir_action=navigate`}>
                <img src={goarrow} alt="get directions"></img>
              </a>
            </Flex>
          </BigCentre>
          </a>
        <p>Other centres are: </p>
        { centres.map((centre, index) => (
          <a target="_blank" href={`https://www.google.com/maps/place/?q=place_id:${centre.place_id}`}>
            <Centre>
              <h3>{index+2}. {centre.name}</h3>
              <Flex>
                <h3>{centre.distance}km away</h3>
                <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${centre.name}&destination_place_id=${centre.place_id}&dir_action=navigate`}>
                  <img src={goarrow} alt="get directions"></img>
                </a>
              </Flex>
            </Centre>
          </a>
        )) 
        } 
      </>
    }
    <div className="background-gradient"></div>
    </Page>
  );
};

export default Centres;
