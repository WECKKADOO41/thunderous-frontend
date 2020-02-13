import React, { useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

const Weigh = () => {
  const { state: dataFromPreviousPage = 0 } = useLocation();
  const {deposit_id, centre_name} = dataFromPreviousPage
  const history = useHistory();

  if (dataFromPreviousPage == 0) {
    history.push('/')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      axios({
        method: "GET",
        url: `http://localhost:5000/api/deposits/${deposit_id}`
      })
        .then(response => {
            console.log(response.data);
            if (response.data.weight === 0) {
                toast.info(`Found the deposit, same weight tho`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                });
            } else {
                clearInterval(interval);
                toast.success(`Deposit has a new weight`, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                });
                history.push("/deposit/result", {
                    weight: response.data.weight, 
                    points: response.data.points
                });
            }
        })
        .catch(error => {
          console.error(`Error: ${error}`); // so that we know what went wrong if the request failed
          toast.error(`Something went wrong, ${error}`, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true
          });
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2>You are at</h2>
      <h3>{centre_name}</h3>
      <h2>Waiting for trash...</h2>
    </>
  );
};

export default Weigh;