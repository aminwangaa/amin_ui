import React, { ButtonHTMLAttributes, PropsWithChildren,} from "react"
import styled from "styled-components";
import { ButtonProps, CustormButtonProps } from "./button";
import { paddingSize, color } from "../shared/styles"

type IconProps = {

}

const StyledIcon = styled.span<CustormButtonProps>`
    display: inline-flex;
    align-items: center;
    outline: none;
    width: 12px;
    height: 12px;
    background: blue;
    text-decoration: none;
`;

export default StyledIcon
