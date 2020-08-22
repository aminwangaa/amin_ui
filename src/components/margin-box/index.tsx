import React, { HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

const MarginDiv = styled.div`
    margin: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
`

interface DivProps extends HTMLAttributes<HTMLDivElement> {}

const MarginBox = (props: PropsWithChildren<DivProps>) => {
    const { children, ...rest } = props;
    return <MarginDiv {...rest}>{children}</MarginDiv>
}
export default MarginBox;
