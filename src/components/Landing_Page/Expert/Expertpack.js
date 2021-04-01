import React from "react";

import { Container, Btnbox, Btn } from "./ExpertElements";
import { Heading, Para } from "../../MainComponents";
import { Link } from "react-router-dom";

const Expertpack = ({ imagepackage, title, data, type, color, id, setOpenConfirmDialog }) => {
  return (
    <>
      <Container>
        <img
          src={imagepackage}
          alt="Logo"
          style={{ height: 50, width: 150, marginTop: "5%" }}
        />
        <Heading width="180px" length="1px" size="1rem" back={color}>
          {title}
        </Heading>
        <Para
          style={{ height: "120px", maxHeight: "120px" }}
          width="250px"
          size="0.9rem"
          weight="600"
          top="30px"
          color="#303960"
        >
          {data}
        </Para>
        <Heading top="25px" color="rgba(137,197,63,1)" length="1px">
          BHD {type}
        </Heading>
        <Btnbox>
          <Link
            to={{
              pathname: "/Appointmentmain",
              state: {
                packageId: id,
                packagePicture: imagepackage,
                packageDetails: data,
                packageType: type,
              },
            }}
            onClick={(e)=>{
              const ACCESS_TOKEN = localStorage.getItem("access_token");
              if(!ACCESS_TOKEN){
                e.preventDefault();
                setOpenConfirmDialog(true);
              }
            }}
          >
            <Btn>BOOK YOUR APPOINTMENT</Btn>
          </Link>
        </Btnbox>
      </Container>
    </>
  );
};

export default Expertpack;
