import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

import LoadingIndicator from "../../components/LoadingIndicator";
import Coupon from "../../components/Coupon";
import Page from "../../components/Page";
import SeeAll from "../../components/SeeAll";

import food from "../../icons/food.svg";
import clothing from "../../icons/clothing.svg";
import hotels from "../../icons/hotels.svg";
import experience from "../../icons/experience.svg";
import travel from "../../icons/travel.svg";
import insurance from "../../icons/insurance.svg";

const Category = () => {
  let { category } = useParams();

  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/stores/${category}`)
      .then(result => {
        console.log(result.data.stores);
        setStores(result.data.stores);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("ERROR: ", error);
        setIsLoading(false);
      });
  }, []);

  const imageSwitch = {
    food: food,
    clothing: clothing,
    hotels: hotels,
    experience: experience,
    travel: travel,
    insurance: insurance
  };

  const Logo = styled.img`
    height: 36px;
    width: 36px;
    object-fit: contain;
  `;

  const Top = styled.div`
    display: flex;
    align-items: center;
  `;

  const Flex = styled.div`
    display: flex;
    width: 70%;
    max-width: 500px;
    align-items: center;
    overflow: scroll;
  `;

  return (
    <Page className="page">
      {/* <h1>{category.toUpperCase()}</h1> */}
      <div style={{ textAlign: "center" }}>
        <img alt={category} src={imageSwitch[category.toLowerCase()]} />
      </div>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <>
          {stores.map(store => (
            <>
              <Top>
                <Logo src={store.logo} />
                <h2>
                  {store.name.charAt(0).toUpperCase()}
                  {store.name.substr(1)}
                </h2>
              </Top>
              {store.coupons.length === 0 ? (
                <h2> No coupons </h2>
              ) : (
                <Flex>
                  {store.coupons.map(coupon => (
                    <div>
                      <Coupon
                        name={coupon.name}
                        deal={coupon.deal}
                        points={coupon.points}
                        id={coupon.id}
                      />
                    </div>
                  ))}
              {store.coupons.length > 2 ? (
                <SeeAll store={store.name} id={store.id}></SeeAll>
              ) : (
                <></>
              )}
                </Flex>
              )}
            </>
          ))}
        </>
      )}
    </Page>
  );
};

export default Category;
