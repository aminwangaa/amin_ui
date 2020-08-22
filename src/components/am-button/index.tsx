import React, {PropsWithChildren} from "react"
import Button, {ButtonProps} from "./button";

const TestButton = (props:PropsWithChildren<ButtonProps>) => (<Button  data-testid={"button"} {...props}/>)

const DocsBtnStyle = {
    display: "inline-block",
    width: "100px",
    margin: "8px 12px"
}

export const DocsButton = (props:PropsWithChildren<ButtonProps>) => (
    <div style={DocsBtnStyle}>
        <Button  {...props}/>
    </div>
)
DocsButton.defaultProps = {
    isLink: false,
    appearance: "primary",
    isDisabled: false,
    isUnclickable: false,
    containsIcon: false,
    size: "medium",
    border: true,
    circle: false,
    newPage: false,
    round: false,
    disabled: false,
    href: "",
    target: "",
};

export default TestButton;
