import styled from "styled-components";
import { ButtonProps, SIZE } from "./button";
import { paddingSize, color } from "../shared/styles"

const StyledButton = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    outline: none;
    border: 1px solid ${color.default};
    padding: ${paddingSize.medium};
    background:  ${color.lightest};
    color: ${color.darkest};
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    
    &:hover {
        opacity: 0.8;
        color: ${color.primary};
        border: 1px solid ${color.primary};
    }
    
    &:active {
        opacity: 1;
        color: ${color.primary};
        border: 1px solid ${color.primary};
    }
    
    ${(props) => (props.appearance && props.appearance !== "default") &&`
        color: ${color.lightest};
        background: ${color[props.appearance]};
        border: 1px solid ${color[props.appearance]};
        
        &:hover {
            opacity: 0.8;
            color: ${color.lightest};
            border: 1px solid ${color[props.appearance]};
        }
        
        &:active {
            opacity: 1;
            color: ${color.lightest};
            border: 1px solid ${color[props.appearance]};
        }
       
         `
    }

    ${(props) => props.disabled &&
    `
     cursor: not-allowed;
     color: rgba(0,0,0,.25);
     background: #f5f5f5;
     border: 1px solid #d9d9d9;
  
     &:hover, :active {
         opacity: 1;
         color: rgba(0,0,0,.25);
         background: #f5f5f5;
         border: 1px solid #d9d9d9;
     }
     `
    }
    
    ${(props) => props.round && 
         `border-radius: 40px;`
    }
    
    ${(props) => props.circle &&
    `
    padding: 0;
    border-radius: 50%;
    min-width: 40px;
    min-height: 40px;
    box-sizing: border-box;
    `
    }
 
    ${(props) => props.isLink &&
    `text-decoration: none;
     padding: 0;
     padding-bottom: 4px;
     border-radius: 0;
     border: none;
     border-bottom: 1px solid transparent;
     color: ${props.disabled ? "rgba(0,0,0,.25)" : color.primary};
     background: transparent;
     
     &:hover, :active {
        background: transparent;
        border: none;
        color: ${props.disabled ? "rgba(0,0,0,.25)" : color.primary};
        border-bottom: 1px solid ${props.textLine ? color.primary : "transparent"};
     }
     
     &:hover {
        opacity: ${props.disabled ? 1 : 0.8};
     };
     
     &:active {
        opacity: 1;
    };
    `
    }   
    
    ${(props) => (props.size && props.size !== "medium") &&
    `
    font-size: ${SIZE[props.size]};    
    padding: ${paddingSize[props.size]};    
    `
    }     
    
    ${(props) => !props.border &&
    `
    border: none;
    &:hover {
        border: none;
    }
    `
    }      

`;

export default StyledButton
