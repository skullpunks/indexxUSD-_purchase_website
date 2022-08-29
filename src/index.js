import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/style.css";
import Home from "./pages/Home";
import BuyCoin from "./pages/BuyCoin";
import { store, persistor } from "./state";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
  return (
    <React.StrictMode>
      <ToastContainer limit={1} position="bottom-center" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/buy-token" element={<BuyCoin />} />
              <Route
                path="/app"
                element={
                  <ChakraProvider>
                    <App />
                  </ChakraProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

root.render(<Index />);
