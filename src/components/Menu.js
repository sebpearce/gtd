import React from "react";
import styled from "styled-components";
import global from "../global/global";

const List = styled.ul`
  ${global.baseFontFamily};
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubList = List.extend`
  padding-left: 1.5em;
`;

const MenuItem = styled.li`
  color: ${global.colors.text};
  // border: 1px solid #aaa;
  & {
    margin-top: 0.5em;
  }
`;

const renderItemAndSubItems = item => {
  return item.items ? (
    [
      <MenuItem key={item.id}>{`${item.content} (${item.id})`}</MenuItem>,
      <SubList key={`${item.id}-subitems`}>
        {item.items.map(sub => renderItemAndSubItems(sub))}
      </SubList>
    ]
  ) : (
    <MenuItem key={item.id}>{`${item.content} (${item.id})`}</MenuItem>
  );
};

const Menu = ({ items }) => {
  return (
    <List>
      {items.map(item => {
        return renderItemAndSubItems(item);
      })}
    </List>
  );
};

export default Menu;
