import React, { useEffect, useState } from "react";
import expert from "../../../assets/expert.jpg";
import axios from "../../../axiosInstance";

import { Main, Expertup, Left, Right, Expertdown } from "./ExpertElements";

import { Heading, Subheading, Para, Line, Image } from "../../MainComponents";

import Expertpack from "./Expertpack";

const Expert = () => {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    axios
      .get(`consultation-packages?`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setExperts(res.data.data);
      });
  }, []);

  return (
    <>
      <Main id="expert">
        <Expertup>
          <Left>
            <Heading color="purple" length="1px" align="none">
              TALK TO OUR EXPERT
            </Heading>
            <Subheading color="rgba(137,197,63,1)" align="none">
              Consulting Package
            </Subheading>
            <Line height="4px" width="90px" back="rgba(137,197,63,1)" />
            <Para align="none" size="0.9rem" weight="600" color="#303960">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Para>
          </Left>
          <Right>
            <Image
              alt="expertImage"
              fit="cover"
              height="280px"
              width="400px"
              Mwidth="300px"
              Mheight="250px"
              src={expert}
            />
          </Right>
        </Expertup>
        <Expertdown>
          {experts.map((expert) => (
            <Expertpack
              key={Math.random() * 100}
              imagepackage={expert.picture}
              title={expert.name}
              data={expert.details}
              type={expert.price}
              id={expert.id}
              // color={expert.color}
            />
          ))}
        </Expertdown>
      </Main>
    </>
  );
};

export default Expert;
