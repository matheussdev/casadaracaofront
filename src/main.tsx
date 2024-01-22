import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { theme } from "./theme/index.ts";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyles.ts";
import pt_BR from 'antd/es/locale/pt_BR';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme} locale={pt_BR}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>
);
