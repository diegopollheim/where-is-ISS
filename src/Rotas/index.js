import React from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";

import Index from "../components/pages/Index";
import Sobre from "../components/pages/Sobre";

const Rotas = () => {
  return (
    <Routes>
      <Route element={<Index />} path="/" />
      <Route element={<Sobre />} path="/sobre" />
    </Routes>
  );
};

export default Rotas;
