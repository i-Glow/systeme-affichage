import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
      --primary: #FF4300;
      --primary-opacity: rgba(255,67,0, 0.6);
      --secondary: #F8F8F8;
      --background: #E5E5E5;
      /* --black: #171717; */
      --black-opacity: rgba(23, 23, 23, 0.15);
      --danger: #D0342C;
      --danger-opacity: rgba(208, 52, 44, 0.2);
      --border-sm: 4px;
      --border-md: 8px;
    }
    * {
      box-sizing: border-box;
    	margin: 0;
      padding: 0;
      scroll-behavior: smooth;
      font-family: 'Russo One', sans-serif;
      
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: #888;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type=number] {
        -moz-appearance: textfield;
      }

	  }
    img {
      user-select: none;
    }
    h1, h2, h3, h4, h5, h6, p, a {
      color: var(--black);
      &::selection {
        background-color: var(--primary-opacity);
      }
    }
    body {
      background-color: var(--background);
      min-height: 100vh;
    }
`;