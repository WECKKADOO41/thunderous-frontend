import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import Ting from "./Modals/Modal";
import usericon from "../icons/usericon.png"
import applogo from "../icons/screenshotsmall.png"

import { Button } from "reactstrap";

const applogoStyle={
  // marginTop:'15px',
  position:'absolute',
  left:'5px',
  top:'5px'
  
}



const NavBar = ({ toast, setLoggedIn, loggedIn }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const [uploadModal, setUploadModal] = useState(false);
  const uploadToggle = () => setUploadModal(!uploadModal);

  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
    toast.success(`You've been logged out`, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  const NavBar = styled.header`
    width: 100vw;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 30px;
  `;

  const RightNav = styled.div`
    width: 10vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Linker = styled.a`
    text-decoration: none;
    cursor: pointer;
  `;

  return (
    <>
      <NavBar>
        <Link  to="/"><Linker><img style={applogoStyle} src={applogo}/></Linker></Link>
        {/* <Link  to="/"><Linker><img style={usericonStyle} src={usericon}/></Linker></Link> */}
        <Link to="/profile"><img src={usericon}/></Link>

        {loggedIn ? (
          <>
            <RightNav>
              <Linker  onClick={logOut}>
                Log Out
              </Linker>
            </RightNav>
          </>
        ) : (
          <Link color="danger" onClick={toggle}>
            LogIn
          </Link>
        )}
      </NavBar>
      <Ting
        toggle={toggle}
        modal={modal}
        setModal={setModal}
        toast={toast}
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
      />
    </>
  );
};

export default NavBar;
