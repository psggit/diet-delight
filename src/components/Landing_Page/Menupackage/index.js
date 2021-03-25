import React, { useEffect, useState } from "react";
import { Menupack, Packup, Packdown, Downup } from "./MenupacakgeElement";
import axios from "../../../axiosInstance";
import Menubox from "./Menubox";
import { Heading, Subheading, Para, Line } from "../../MainComponents";

const MenuPackage = () => {
  const [mealup, setMealup] = useState([]);

  useEffect(() => {
    axios
      .get(`menus?`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMealup(res.data.data);
      });
  }, []);

  return (
    <>
      <Menupack id="menu">
        <Packup>
          <Heading size="2rem" color="rgba(137,197,63,1)" length="1px">
            We use only the finest, freshest farm-to-table ingredients.
          </Heading>
          <Subheading size="2rem" color="purple" length="1px">
            OUR MENU PACKAGE
          </Subheading>
          <Line height="5px" back="rgba(137,197,63,1)" />
          <Para weight="800" width="350px" color="#303960">
            Our menus are fit—perfectly balanced, calorie controlled, and
            portioned to satisfy.
          </Para>
        </Packup>
        <Packdown>
          <Downup>
            {mealup.map((meal) => (
              <Menubox key={Math.random()} meal={meal} />
            ))}
          </Downup>
        </Packdown>
      </Menupack>
    </>
  );
};

export default MenuPackage;
