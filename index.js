import React from "react";
import { render } from "react-dom";
import styled from "styled-components";
import Menu from "./src/components/Menu";

const menuItems = [
  { id: 0, content: "Alpha" },
  { id: 1, content: "Bravo" },
  { id: 2, content: "Charlie" },
  { id: 3, content: "Delta" },
  { id: 4, content: "Epsilon" },
  { id: 5, content: "Foxtrot" },
  { id: 6, content: "Golf" }
];

class App extends React.Component {
  render() {
    return (
      <div>
        <Menu items={menuItems} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
