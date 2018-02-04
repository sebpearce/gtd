import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Welcome } from "@storybook/react/demo";

import TreeMenu from "../src/components/TreeMenu";
import Nav from "../src/components/Nav";

// document.documentElement.style.fontSize = "10px";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

const menuItems = [
  { id: 0, content: "Alpha" },
  {
    id: 1,
    content: "Bravo",
    children: [{ id: 12, content: "Zulu" }, { id: 13, content: "Yankee" }]
  },
  { id: 2, content: "Charlie" },
  { id: 3, content: "Delta" },
  { id: 4, content: "Epsilon" },
  {
    id: 5,
    content: "Foxtrot",
    children: [
      { id: 18, content: "Hotel" },
      {
        id: 19,
        content: "India",
        children: [
          { id: 132, content: "Juliet" },
          {
            id: 194,
            content: "Kilo",
            children: [{ id: 1982, content: "Lima" }]
          }
        ]
      }
    ]
  },
  { id: 6, content: "Golf" }
];

storiesOf("TreeMenu", module).add("Default", () => (
  <TreeMenu items={menuItems} />
));

storiesOf("Nav", module).add("Default", () => <Nav />);
