import styled from "styled-components";
import { Button as AntdButton } from "antd";
export const Containter = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex: 1;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const Body = styled.div`
  display: flex;
  flex: 1;
  overflow-x: hidden;
  flex-direction: column;
  background: "#FFFFFF";
  overflow-y: auto;
  padding-bottom: 60px;
  margin-top: 79px;
  z-index: 1;
  max-height: calc(100vh - 79px);
  position: relative;
`;
export const Button = styled(AntdButton)`
  margin-right: auto;
  @media (min-width: 768px) {
    display: none;
  }
`;
export const Header = styled.div`
  min-height:80px;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
  border: none;
  background: linear-gradient(180deg, #15519B 0%, #01408C 75%);
  position: fixed;
  width: 100%;
  z-index: 10;
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  border-top: 1px solid #dee9f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #ffffff;
  z-index: 2;
`;

export const FooterIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonFooter = styled.button<{ color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: ${({ color }) => color};
`;
