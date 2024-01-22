import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
export const LogoContainer = styled.div`
width: 100vw;
display: flex;
flex: 1;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.token.colorPrimary};

img {
  width: 80%;
  max-width: 200px;
  height: auto;
}
`;

export const FormContainer = styled.div`
  display: flex;
  flex: 1;
  background: linear-gradient(180deg, #d7eff7 0%, #ffffff 20.24%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  h3{
    width: 100%;
    margin-bottom: 1rem;
  }

  img {
    @media (min-width: 800px) {
      display: none;
    }
  }

  h1 {
    margin-top: 1rem;
    width: 100%;
    color: #000;

    strong {
      font-weight: 700;
      font-size: 1.6rem;
    }
  }
`;
