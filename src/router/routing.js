import { createBrowserRouter } from "react-router-dom";
import GetToken from "../components/Authorization/GetToken";
import PostToken from "../components/Authorization/PostToken";
import { Main } from "../components/Main/Main";
import StartingPage from "../components/startingPage/StartPage";
import { FiltersProvider } from "../contexts/isActiveContext";
import ActiveFilm from "../components/ActiveFilm/ActiveFilm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartingPage />,
    children: [
      { path: "/getToken", element: <GetToken /> },
      { path: "/getPost", element: <PostToken /> },
    ],
  },
  {
    path: "/main",
    element: (
      <FiltersProvider>
        <Main />
      </FiltersProvider>
    ),
  },
  {
    path: "/:activeFilmId",
    element: <ActiveFilm />,
  },
]);

export default router;
