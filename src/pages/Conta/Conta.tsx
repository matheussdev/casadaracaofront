import React from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import { theme } from "../../theme";
import { Button, Input, Popconfirm, message } from "antd";
import api from "../../services/api";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../services/auth";
function maskCpf(cpf: string) {
  // 123.***.***-12
  return cpf.substring(0, 3) + ".***.***-" + cpf.substring(9, 11);
}
export const Conta: React.FC = () => {
  const [loadingCancel, setLoadingCancel] = React.useState(false);

  return (
    <GlobalWrapper>
      <div
        style={{
          overflowX: "hidden",
          position: "relative",
          minHeight: "calc(100vh - 144px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "40px",
            backgroundColor: theme.token.colorPrimary,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              bottom: -40,
              height: 40,
              borderRadius: "0 0 100% 100%",
              backgroundColor: theme.token.colorPrimary,
            }}
          ></div>
        </div>
        <div
          style={{
            padding: "32px 16px 0",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              boxShadow: "0px 0px 10px 0px #000000",
            }}
          >
            <FaUserCircle
              style={{
                color: "#a0aec1",
              }}
              size={64}
            />
          </div>
        </div>
        <div
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Input
            size="large"
            readOnly
            value={
              (localStorage.getItem("@casa_da_racao_user") &&
                JSON.parse(
                  localStorage.getItem("@casa_da_racao_user") || ""
                ).name.split(" ")[0] +
                  " " +
                  JSON.parse(
                    localStorage.getItem("@casa_da_racao_user") || ""
                  ).name.split(" ")[1]) ||
              "Usuário"
            }
          />
          <Input
            size="large"
            readOnly
            value={
              (localStorage.getItem("@casa_da_racao_user") &&
                maskCpf(
                  JSON.parse(localStorage.getItem("@casa_da_racao_user") || "")
                    .cpf
                )) ||
              "Usuário"
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Popconfirm
            title="Tem certeza que deseja excluir sua conta?"
            description="Essa ação é irreversível"
            onConfirm={() => {
              setLoadingCancel(true);
              api
                .get("/auth/cancel")
                .then(() => {
                  message.success("Conta excluída com sucesso");
                  logout();
                })
                .finally(() => {
                  setLoadingCancel(false);
                });
            }}
            okButtonProps={{
              danger: true,
              loading: loadingCancel,
            }}
            okText="Sim, Excluir minha conta"
          >
            <Button type="link" danger size="small" loading={loadingCancel}>
              Excluir conta
            </Button>
          </Popconfirm>
        </div>
      </div>
    </GlobalWrapper>
  );
};
