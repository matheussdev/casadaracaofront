import React, { useRef } from "react";
import * as S from "./styles";
import Logo2 from "../../assets/casa_logo.png";
import { Alert, Button, Form, FormInstance, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MaskCpfCnpj } from "../../utils/MaskCpfCnpj";

export const Register: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const form = useRef<FormInstance>(null);

  const handleSubmit = (e: { login: string; password: string, repassword: string }) => {
    setError("");
    setLoading(true);
    if (e.password !== e.repassword) {
      setError("As senhas não conferem!");
      setLoading(false);
      return;
    }
    register({
      username: MaskCpfCnpj.desformatar(e.login),
      password: e.password,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error || "Erro ao criar acesso!");
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
        <h1>Cadastre-se</h1>
        <h3>Digite seu cpf e crie uma nova senha.</h3>
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
          <Form.Item name="repassword" label="Confirmar Senha" style={{ marginBottom: 16 }}>
            <Input.Password
              size="large"
              required
              placeholder="Digite sua senha novamente"
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
              Criar conta
            </Button>
          </Form.Item>

          <Form.Item>
            <span>
              possui uma conta?{" "}
              <Button
                type="link"
                onClick={() => navigate("/login")}
                style={{
                  cursor: "pointer",
                }}
              >
                Faça login
              </Button>
            </span>
          </Form.Item>
        </Form>
      </S.FormContainer>
    </S.Container>
  );
};
