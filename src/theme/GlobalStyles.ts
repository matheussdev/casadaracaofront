import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
html {
  font-size: 100%;
  @media (max-width: 1080px) {
    font-size: 100%;
  }
  @media (max-width: 720px) {
    font-size: 87.5%;
  }
}
::-webkit-scrollbar {
    width: 4px;
    height: 2px;
    }

    ::-webkit-scrollbar-track {
    background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #01408C;
    border-radius: 5px;

    }
body,
button,
input,
textarea,
label,
input::placeholder
{
  font: 400 1rem "Nunito", sans-serif !important;
}

button{
  cursor: pointer !important;
  span {
    cursor: pointer !important;
  }
}

h1, h2, h3, h4, h5, h6, strong {
  font: 700 1rem "roboto" sans-serif;
}

#root{
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  height: 100vh;
}
`;
export default GlobalStyle;
