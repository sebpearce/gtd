import React from "react";
import styled from "styled-components";
import global from "../styles/global";
import InboxIcon from "./icons/InboxIcon";
import TodayIcon from "./icons/TodayIcon";
import NextActionsIcon from "./icons/NextActionsIcon";
import ProjectIcon from "./icons/ProjectIcon";
import LaterIcon from "./icons/LaterIcon";
import SomedayMaybeIcon from "./icons/SomedayMaybeIcon";
import ChecklistIcon from "./icons/ChecklistIcon";
import ReferenceIcon from "./icons/ReferenceIcon";

const NavList = styled.ul`
  font-family: ${global.baseFontFamily};
  padding: 0;
  color: ${global.colors.text};
  font-size: 1.25rem;
  max-width: 300px;
`;

const NavItem = styled.li`
  font-weight: 600;
  padding: 0.35em;
  margin: 0;
  background-color: ${props =>
    props.selected ? global.colors.menuItemSelected : "transparent"};

  &:hover {
    background-color: ${props =>
      props.selected
        ? global.colors.menuItemSelected
        : global.colors.menuItemHover};
    cursor: pointer;
  }
`;

const Label = styled.span`
  padding-left: 0.7em;
`;

const Icon = styled.span`
  height: 1.25em;
  display: inline-block;
  vertical-align: top;
  transform: translateY(0.04em);

  svg {
    height: inherit;
    width: inherit;
  }
`;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    };
  }

  handleSelection(item) {
    console.log(`Opening ${item}...`);
  }

  selectItem(item) {
    this.setState({
      selectedItem: item
    });
    this.handleSelection(item);
  }

  render() {
    return (
      <NavList>
        <NavItem
          selected={this.state.selectedItem === "In"}
          onClick={() => {
            this.selectItem("In");
          }}
        >
          <Icon>
            <InboxIcon />
          </Icon>
          <Label>In</Label>
        </NavItem>
        <NavItem
          selected={this.state.selectedItem === "Today"}
          onClick={() => {
            this.selectItem("Today");
          }}
        >
          <Icon>
            <TodayIcon />
          </Icon>
          <Label>Today</Label>
        </NavItem>
        <NavItem
          selected={this.state.selectedItem === "Next Actions"}
          onClick={() => {
            this.selectItem("Next Actions");
          }}
        >
          <Icon>
            <NextActionsIcon />
          </Icon>
          <Label>Next Actions</Label>
        </NavItem>
        <NavItem
          selected={this.state.selectedItem === "Projects"}
          onClick={() => {
            this.selectItem("Projects");
          }}
        >
          <Icon>
            <ProjectIcon />
          </Icon>
          <Label>Projects</Label>
        </NavItem>
        <NavItem
          selected={this.state.selectedItem === "Later"}
          onClick={() => {
            this.selectItem("Later");
          }}
        >
          <Icon>
            <LaterIcon />
          </Icon>
          <Label>Later</Label>
        </NavItem>
        <NavItem
          selected={this.state.selectedItem === "Someday/maybe"}
          onClick={() => {
            this.selectItem("Someday/maybe");
          }}
        >
          <Icon>
            <SomedayMaybeIcon />
          </Icon>
          <Label>Someday/maybe</Label>
        </NavItem>
        <NavItem
          selected={this.state.selectedItem === "Checklists"}
          onClick={() => {
            this.selectItem("Checklists");
          }}
        >
          <Icon>
            <ChecklistIcon />
          </Icon>
          <Label>Checklists</Label>
        </NavItem>
        <NavItem
          selected={this.state.selectedItem === "Reference"}
          onClick={() => {
            this.selectItem("Reference");
          }}
        >
          <Icon>
            <ReferenceIcon />
          </Icon>
          <Label>Reference</Label>
        </NavItem>
      </NavList>
    );
  }
}
