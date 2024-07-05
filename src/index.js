import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/routing";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { filtersReducer } from "./store/filtersReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(filtersReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
