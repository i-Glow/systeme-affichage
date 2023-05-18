import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    @font-face {
      font-family: 'Inter';
      src: local('Inter'), url(./fonts/Inter/Inter.ttf) format('truetype');
    }
    @font-face {
      font-family: 'ReadexPro';
      src: local('ReadexPro'), url(./fonts/Readex_Pro/ReadexPro.ttf) format('truetype');
    }
    :root {
      --border: 217, 217, 217;
      --background: 250, 250, 250;
      --blue: 22, 119, 255;
      --success: 46, 160, 67;
      --error: #ff4d4f;
    }
    * {
      box-sizing: border-box;
    	margin: 0;
      padding: 0;
      scroll-behavior: smooth;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      
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
    body {
      min-height: 100vh;
    }
    input, textarea {
      border-color: #787276 !important;
    }
`;
