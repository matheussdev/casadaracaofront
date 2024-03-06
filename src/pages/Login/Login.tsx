import React, { useRef } from "react";
import * as S from "./styles";
import Logo2 from "../../assets/casa_logo.png";
import { Alert, Button, Form, FormInstance, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MaskCpfCnpj } from "../../utils/MaskCpfCnpj";

export const Login: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useRef<FormInstance>(null);

  const handleSubmit = (e: { login: string; password: string }) => {
    setError("");
    setLoading(true);
    login({
      username: MaskCpfCnpj.desformatar(e.login),
      password: e.password,
    })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        setError(error || "Erro ao logar!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <S.Container>
      <S.LogoContainer>
        <img src={Logo2} alt="Logo" />
      </S.LogoContainer>
      <S.FormContainer>
        <h1>Bem vindo(a)</h1>
        <h3>Faça login com seus dados para acessar</h3>
        <Form
          ref={form}
          layout={"vertical"}
          style={{
            maxWidth: 448,
            width: "100%",
          }}
          onFinish={handleSubmit}
        >
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16, width: "100%" }}
            />
          )}
          <Form.Item name="login" label="CPF" style={{ marginBottom: 16 }}>
            <Input
              size="large"
              type="tel"
              required
              placeholder="Digite seu CPF ou CNPJ"
              onChange={(e) =>
                form.current?.setFieldValue(
                  "login",
                  MaskCpfCnpj.formatCpfCnpj(e.target.value)
                )
              }
            />
          </Form.Item>
          <Form.Item name="password" label="Senha" style={{ marginBottom: 16 }}>
            <Input.Password
              size="large"
              required
              placeholder="Digite sua senha"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
              style={{
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Entrar
            </Button>
          </Form.Item>

          <Form.Item>
            <span>
              Não tem uma conta?
              <Button
                type="link"
                onClick={() => navigate("/registrar")}
                style={{
                  cursor: "pointer",
                }}
              >
                Clique aqui
              </Button>
            </span>
          </Form.Item>
        </Form>
      </S.FormContainer>
    </S.Container>
  );
};
