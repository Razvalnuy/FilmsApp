import React from "react";
import { FiltersProvider } from "./contexts/isActiveContext";
import { Main } from "./components/Main/Main";

export default function App() {
  return (
    <FiltersProvider>
      <Main />
    </FiltersProvider>
  );
}
