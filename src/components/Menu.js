import React from "react";
import styled from "styled-components";
import gs from "../global/globalStyles";

const List = styled.ul`
  ${gs.defaultFont} font-size: 36px;
`;

const MenuItem = styled.li``;

const Menu = ({ items }) => {
  return (
    <List>
      {items.map(item => {
        return <MenuItem key={item.id}>{item.content}</MenuItem>;
      })}
    </List>
  );
};

export default Menu;
