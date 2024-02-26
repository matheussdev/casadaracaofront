import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../pages/Home";

import { ChartIcon } from "../assets/icons";
import { SiGoogledocs } from "react-icons/si";
import { theme } from "../theme";
import { Boletos } from "../pages/Boletos/Boletos";
import { LoginRoute } from "./LoginRoute";
import { Notas } from "../pages/Notas";
import { Assinaturas } from "../pages/Assinaturas";
import { AssinaturaDetail } from "../pages/AssinaturaDetail";
import { Items } from "../pages/items";
import { Register } from "../pages/Register";

interface MiddlewareProps {
  children: React.ReactNode;
}

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: (selected: boolean) => (
      <ChartIcon color={selected ? theme.token.orange : "#fff"} size={25} />
    ),
    route: "/",
    private: true,
    show: true,
    component: <Items />,
  },
  {
    title: "Home",
    icon: (selected: boolean) => (
      <SiGoogledocs color={selected ? theme.token.orange : "#fff"} size={25} />
    ),
    route: "/home",
    private: true,
    show: true,
    component: <Home />,
  },
  {
    title: "Boletos",
    icon: (selected: boolean) => (
      <SiGoogledocs color={selected ? theme.token.orange : "#fff"} size={25} />
    ),
    route: "/boletos",
    private: true,
    show: true,
    component: <Boletos />,
  },
  {
    title: "Assinaturas",
    icon: (selected: boolean) => (
      <SiGoogledocs color={selected ? theme.token.orange : "#fff"} size={25} />
    ),
    route: "/assinaturas/",
    private: true,
    show: true,
    component: <Assinaturas />,
  },
  {
    title: "Assinaturas detail",
    icon: (selected: boolean) => (
      <SiGoogledocs color={selected ? theme.token.orange : "#fff"} size={25} />
    ),
    route: "/assinatura/:id",
    private: true,
    show: true,
    component: <AssinaturaDetail />,
  },
  {
    title: "Notas",
    icon: (selected: boolean) => (
      <SiGoogledocs color={selected ? theme.token.orange : "#fff"} size={25} />
    ),
    route: "/Notas",
    private: true,
    show: true,
    component: <Notas />,
  },
];

const Middleware: React.FC<MiddlewareProps> = ({ children }) => {
  return children;
};

export function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {sidebarItems.map((item) =>
          item.private ? (
            <Route
              key={item.route}
              path={item.route}
              element={<PrivateRoute />}
            >
              <Route
                path={item.route}
                element={<Middleware>{item.component}</Middleware>}
              />
            </Route>
          ) : (
            <Route path={item.route} element={<>{item.component}</>} />
          )
        )}
        <Route path="/login" element={<LoginRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/registrar" element={<LoginRoute />}>
          <Route path="/registrar" element={<Register />} />
        </Route>
        <Route path="*" element={<>not found</>} />
      </Routes>
    </BrowserRouter>
  );
}
