import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    
    * {
      box-sizing: border-box;
    	margin: 0;
      padding: 0;
      scroll-behavior: smooth;
      font-family: sans-serif;
      
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
`;