import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18next";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

const appID = "xar_test_7eefd798acaca9ed7eaa2a8be620ea5baaccdedd";
export const arcanaProvider = new AuthProvider(appID, {
  // network: "testnet", //defaults to 'testnet'
  position: "right", //defaults to right
  theme: "light", //defaults to dark
  alwaysVisible: true, //defaults to true which is Full UI mode
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
    rpcUrl:
      "https://polygon-mumbai.g.alchemy.com/v2/Jc5hFtjDtHwMlxgmbM871Mi7qB_JD8af",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ProvideAuth provider={arcanaProvider}>
      <App />
    </ProvideAuth>
  </>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
