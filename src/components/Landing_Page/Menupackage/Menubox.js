import React from "react";
import { Menu, MenubtnBox, Menubtn } from "./MenupacakgeElement";

import { Heading, Image, Line, Para } from "../../MainComponents";

const Menubox = (props) => {
  return (
    <Menu>
      <Image alt="mealbox" src={props.meal.picture} />
      <Heading color="purple" length="1px" size="2rem">
        {props.meal.name}
      </Heading>
      <Line back="rgba(137,197,63,1)" width="100px" />
      <Para size="0.8rem" weight="800" width="250px" color="#303960">
        {props.meal.details}
      </Para>
      <MenubtnBox
        style={{ textDecoration: "none", outline: "none" }}
        to={{
          pathname: "/MenuPkg",
          state: {
            mealData: props.meal,
          },
        }}
      >
        <Menubtn>VIEW MENU</Menubtn>
      </MenubtnBox>
    </Menu>
  );
};

export default Menubox;
