import React from "react";
import { Button } from "antd";

import "./App.css";

export default { title: "Button" };

export const withText = () => <Button type="primary">Hello Button</Button>;

export const withEmoji = () => (
  <Button type="primary">
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
