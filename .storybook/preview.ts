import type { Preview } from "@storybook/react";
import "../src/style/globals.css";
import "../src/style/tokens.css";

const preview: Preview = {
  parameters: {
    a11y: {
      element: "#root",
    },
  },
};

export default preview;
