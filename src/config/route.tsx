import React from "react";
import { createBrowserRouter } from "react-router-dom";
import View from "../pages/View";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <View />,
  }
])

export default routes;
