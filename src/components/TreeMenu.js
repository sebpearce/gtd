import React from "react";
import styled from "styled-components";
import global from "../styles/global";
import ChevronRightIcon from "./icons/ChevronRightIcon";

// TODO: make chevron absolute positioned and bigger;
//       make entire li clickable and hoverable
//       (chevron will override it at higher z-index)

const List = styled.ul`
  font-family: ${global.baseFontFamily};
  list-style: none;
  margin: 0;
  padding: 0;
  color: ${global.colors.text};
  font-size: 1rem;
  max-width: 250px;
`;

const SubList = List.extend`
  padding-left: 0;
  display: ${props => (props.expanded ? "block" : "none")};
  // opacity: ${props => (props.expanded ? 1 : 0)};
  // transition: opacity 1s ease;
  animation: 0.1s foo;

  @keyframes foo {
    from { transform: translateX(-0.3em); }
    to { transform: translateX(0); }
  }
`;

const MenuItem = styled.li`
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  padding-left: ${props => props.indentLevel * 1.5}em;

  background-color: ${props =>
    props.selected ? global.colors.menuItemSelected : "transparent"};

  font-weight: ${props => (props.selected ? 600 : "normal")};

  // ul > ul > & {
  //   // subitems
  // }
`;

const Label = styled.span`
  cursor: pointer;
  user-select: none;
  // &:hover {
  //   color: ${global.colors.textHover};
  //   text-decoration: underline;
  // }
`;

const MenuItemWithSubItems = MenuItem.extend`
  padding-left: ${props => props.indentLevel * 1.5 - 1.5}em;
  background-color: ${props =>
    props.selected ? global.colors.menuItemSelected : "transparent"};
`;

const ChevronRight = styled(ChevronRightIcon)`
  fill: currentColor;
  display: inline-block;
  width: 1.5em;
  height: 1em;
  vertical-align: top;
  transform: translateY(0.2em)
    ${props => (props.expanded ? "rotateZ(90deg)" : "rotateZ(0deg)")};
  transition: transform 0.1s ease;
  &:hover {
    // color: ${global.colors.textHover};
    cursor: pointer;
  }
`;

const MenuItemLabel = ({ item, clickFn }) => {
  return (
    <Label
      onClick={() => {
        clickFn && clickFn();
      }}
    >
      {item.content}
    </Label>
  );
};

class ExpandableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleExpanderClick = this.handleExpanderClick.bind(this);
  }

  handleExpanderClick(e) {
    this.setState({
      expanded: !this.state.expanded
    });
    this.props.clickFn && this.props.clickFn();
  }

  render() {
    const { item } = this.props;

    return item.children ? (
      [
        <MenuItemWithSubItems
          key={item.id}
          selected={this.props.selection === item.id}
          indentLevel={this.props.indentLevel}
        >
          <span onClick={this.handleExpanderClick}>
            <ChevronRight expanded={this.state.expanded} />
          </span>
          <MenuItemLabel
            item={item}
            clickFn={() => {
              this.props.selectItem(item);
            }}
          />
        </MenuItemWithSubItems>,
        <SubList key={`${item.id}-submenu`} expanded={this.state.expanded}>
          {item.children.map(child => {
            return (
              <ExpandableItem
                item={child}
                selection={this.props.selection}
                selectItem={this.props.selectItem}
                indentLevel={this.props.indentLevel + 1}
              />
            );
          })}
        </SubList>
      ]
    ) : (
      <MenuItem
        key={item.id}
        selected={this.props.selection === item.id}
        indentLevel={this.props.indentLevel}
      >
        <MenuItemLabel
          item={item}
          clickFn={() => {
            this.props.selectItem(item);
          }}
        />
      </MenuItem>
    );
  }
}

export default class TreeMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null
    };

    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(item) {
    this.setState({
      ...this.state,
      selection: item.id
    });
  }

  render() {
    const { items } = this.props;
    return (
      <List>
        {items.map(item => {
          return item.children ? (
            <ExpandableItem
              item={item}
              selection={this.state.selection}
              selectItem={this.selectItem}
              indentLevel={1}
            />
          ) : (
            <MenuItem
              selected={this.state.selection === item.id}
              indentLevel={1}
            >
              <MenuItemLabel
                item={item}
                clickFn={() => {
                  this.selectItem(item);
                }}
              />
            </MenuItem>
          );
        })}
      </List>
    );
  }
}
