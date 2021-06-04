import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Hello from "./hello";

export const getBody = () => renderToStaticMarkup(<Hello />);
