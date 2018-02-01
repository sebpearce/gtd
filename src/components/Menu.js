import React from "react";
import styled from "styled-components";
import global from "../global/global";

const List = styled.ul`
  ${global.baseFontFamily};
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 0.5em;
  &:last-child {
    margin-bottom: 0;
  }
`;

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
