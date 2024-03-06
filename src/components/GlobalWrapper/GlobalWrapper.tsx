import React from "react";
import * as S from "./styles";
import { Dropdown, Image, Typography } from "antd";
import Logo2 from "../../assets/casa_logo.png";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaFileInvoiceDollar,
  FaHome,
  FaFileSignature,
  FaChartPie,
  FaFileInvoice,
} from "react-icons/fa";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
interface GlobalWrapperProps {
  children: React.ReactNode;
}
interface MenuType {
  title: string;
  icon: React.ReactNode;
  route: string;
}

function maskCpf (cpf: string) {
  // 123.***.***-12
  return cpf.substring(0, 3) + ".***.***-" + cpf.substring(9, 11)
}

const MenuItems: MenuType[] = [
  {
    title: "Dashboard",
    route: "/",
    icon: (
      <FaChartPie
        style={{
          fontSize: "20px",
        }}
      />
    ),
  },
  {
    title: "Notas",
    route: "/notas",
    icon: (
      <FaFileInvoice
        style={{
          fontSize: "20px",
        }}
      />
    ),
  },
  {
    title: "Início",
    route: "/home",
    icon: (
      <FaHome
        style={{
          fontSize: "20px",
        }}
      />
    ),
  },
  {
    title: "Boletos",
    route: "/boletos",
    icon: (
      <FaFileInvoiceDollar
        style={{
          fontSize: "20px",
        }}
      />
    ),
  },
  {
    title: "Assinaturas",
    route: "/assinaturas",
    icon: (
      <FaFileSignature
        style={{
          fontSize: "20px",
        }}
      />
    ),
  },
];

export const GlobalWrapper: React.FC<GlobalWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  return (
    <S.Containter>
      <S.Content>
        <S.Header>
          <Image src={Logo2} preview={false} width={90} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}>
              <Title
                level={5}
                style={{
                  margin: 0,
                  color: "#fff",
                }}
              >
                {
                  localStorage.getItem("@casa_da_racao_user") && JSON.parse(localStorage.getItem("@casa_da_racao_user") || "").name.split(" ")[0] + " " +  JSON.parse(localStorage.getItem("@casa_da_racao_user") || "").name.split(" ")[1] || "Usuário"
                }
              </Title>
              <Title
                level={5}
                style={{
                  margin: 0,
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                {
                  localStorage.getItem("@casa_da_racao_user") && maskCpf(JSON.parse(localStorage.getItem("@casa_da_racao_user") || "").cpf) || "Usuário"
                }
              </Title>
            </div>
            <Dropdown
              menu={{
                items: [
                  {
                    label: "Minha Conta",
                    onClick: () => navigate('/conta'),
                    key: "2",
                    icon: <FaUserCircle size={16} />,
                  },
                  {
                    label: "Sair",
                    onClick: () => logout(),
                    key: "1",
                    icon: <FaSignOutAlt size={16} />,
                  },
                  
                ],
              }}
              trigger={["click"]}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaUserCircle
                  style={{
                    color: "#a0aec1",
                  }}
                  size={40}
                />
              </div>
            </Dropdown>
          </div>
        </S.Header>
        <S.Body>{children}</S.Body>
        <S.Footer>
          {MenuItems.map((item) => (
            <S.ButtonFooter
              type="button"
              key={item.title}
              onClick={() => navigate(item.route)}
              color={path === item.route ? "#008fff" : "#B2B2B2"}
            >
              {item.icon}
              {item.title}
            </S.ButtonFooter>
          ))}
        </S.Footer>
      </S.Content>
    </S.Containter>
  );
};
