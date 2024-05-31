import React, { useState } from "react";
import Main from "./components/Main/Main";
import { Route, Routes } from "react-router-dom";
import ActiveFilm from "./components/ActiveFilm/ActiveFilm";
import { FiltersProvider } from "./contexts/isActiveContext";

import { GetToken } from "./components/Authorization/GetToken";
import { PostToken } from "./components/Authorization/PostToken";
import StartingPage from "./components/startingPage/StartPage";
import { SetTokenContext, TokenContext } from "./contexts/tokenContext";

export default function App() {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={token}>
      <SetTokenContext.Provider value={setToken}>
        <FiltersProvider>
          <Routes>
            <Route path="/" element={<StartingPage />} />
            <Route path="/main" element={<Main />} />
            <Route path="/activeFilm" element={<ActiveFilm />} />
            <Route path="/getToken" element={<GetToken />} />
            <Route path="/getPost" element={<PostToken />} />
          </Routes>
        </FiltersProvider>
      </SetTokenContext.Provider>
    </TokenContext.Provider>
  );
}
