import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Welcome } from "@storybook/react/demo";

import Menu from "../src/components/Menu";

// document.documentElement.style.fontSize = "10px";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

const menuItems = [
  { id: 0, content: "Alpha" },
  { id: 1, content: "Bravo" },
  { id: 2, content: "Charlie" },
  { id: 3, content: "Delta" },
  { id: 4, content: "Epsilon" },
  { id: 5, content: "Foxtrot" },
  { id: 6, content: "Golf" }
];

storiesOf("Menu", module).add("Default", () => <Menu items={menuItems} />);
