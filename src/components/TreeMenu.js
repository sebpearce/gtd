import React from "react";
import styled from "styled-components";
import global from "../styles/global";
import ChevronRightIcon from "./icons/ChevronRightIcon";

const cssVars = {
  indentSize: 1.9
};

const List = styled.ul`
  font-family: ${global.baseFontFamily};
  list-style: none;
  margin: 0;
  padding: 0;
  color: ${global.colors.text};
  font-size: 1rem;
  max-width: 315px;
`;

const SubList = List.extend`
  padding-left: 0;
  display: ${props => (props.expanded ? "block" : "none")};
  // opacity: ${props => (props.expanded ? 1 : 0)};
  // transition: opacity 1s ease;
  animation: 0.1s expandNode;

  @keyframes expandNode {
    from { transform: translateX(-0.3em); }
    to { transform: translateX(0); }
  }
`;

const MenuItem = styled.li`
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  padding-left: ${props => {
    if (props.isFlat) return 0.5;
    return props.indentLevel * cssVars.indentSize;
  }}em;
  background-color: ${props =>
    props.selected ? global.colors.selected : "transparent"};

  font-weight: ${props => (props.selected ? 700 : "normal")};

  &:hover {
    background-color: ${props =>
      props.selected ? global.colors.selected : "transparent"};
    cursor: pointer;
  }
  // ul > ul > & {
  //   // subitems
  // }
`;

const Label = styled.span`
  position: relative;
  user-select: none;
`;

const MenuItemWithSubItems = MenuItem.extend`
  padding-left: ${props => props.indentLevel * cssVars.indentSize}em;
  background-color: ${props =>
    props.selected ? global.colors.selected : "transparent"};
`;

const ChevronRight = styled(ChevronRightIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  fill: currentColor;
  width: 1em;
  height: 1em;
  background-color: transparent;
  transform: translateX(-0.5em) translateY(-0.5em)
    ${props => (props.expanded ? "rotateZ(90deg)" : "rotateZ(0deg)")};
  transition: transform 0.1s ease;
`;

const ChevronRightWrapper = styled.span`
  position: absolute;
  top: 0.05em;
  left: -1.5em;
  width: 1.1em;
  height: 1.1em;
  border-radius: 50%;
  border: 1px solid transparent;
  background: transparent;
  &:hover {
    border-color: ${global.colors.hoverOutlineBorder};
    background: #fff;
    cursor: pointer;
  }
`;

const Heading = styled.h3`
  ${global.mixins.smallHeadingFont};
  padding-left: 0.5em;
`;

const Expander = props => {
  return (
    <ChevronRightWrapper onClick={props.handleExpanderClick}>
      <ChevronRight expanded={props.expanded} />
    </ChevronRightWrapper>
  );
};

class ExpandableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded || false
    };
    this.handleExpanderClick = this.handleExpanderClick.bind(this);
  }

  handleExpanderClick(e) {
    e.stopPropagation();
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { item } = this.props;

    return item.children ? (
      [
        <MenuItemWithSubItems
          key={item.id}
          selected={this.props.selection === item.id}
          indentLevel={this.props.indentLevel}
          onClick={() => {
            this.props.selectItem(item);
          }}
        >
          <Label>
            <Expander
              handleExpanderClick={this.handleExpanderClick}
              expanded={this.state.expanded}
            />
            {item.content}
          </Label>
        </MenuItemWithSubItems>,
        <SubList key={`${item.id}-submenu`} expanded={this.state.expanded}>
          {item.children.map(child => {
            return (
              <ExpandableItem
                item={child}
                selection={this.props.selection}
                selectItem={this.props.selectItem}
                indentLevel={this.props.indentLevel + 1}
                expanded={child.expanded}
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
        onClick={() => {
          this.props.selectItem(item);
        }}
      >
        <Label>{item.content}</Label>
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

  renderList(items) {
    // TODO: this means we're mapping twice. Smelly.
    const isFlat = items.reduce(
      (acc, item) => acc && item.children === undefined,
      true
    );

    return (
      <List>
        {items.map(item => {
          return item.children ? (
            <ExpandableItem
              item={item}
              selection={this.state.selection}
              selectItem={this.selectItem}
              indentLevel={1}
              expanded={item.expanded}
            />
          ) : (
            <MenuItem
              selected={this.state.selection === item.id}
              indentLevel={1}
              onClick={() => {
                this.selectItem(item);
              }}
              isFlat={isFlat}
            >
              <Label>{item.content}</Label>
            </MenuItem>
          );
        })}
      </List>
    );
  }

  render() {
    const { items, heading } = this.props;

    return heading
      ? [<Heading>{heading}</Heading>, this.renderList(items)]
      : this.renderList(items);
  }
}
