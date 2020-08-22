import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    PropsWithChildren,
    useMemo
    }
from "react"
import styled from "styled-components";
import StyledButton from "./styleButton"

export type AppearancesTypes = keyof typeof APPEARANCES;

type appearance =
	| "primary"
	| "default"
	| "success"
	| "warning"
	| "danger"

type AppearancesObj = {
	[key in appearance]: appearance;
};

export const APPEARANCES: AppearancesObj = {
	primary: "primary",
	default: "default",
	success: "success",
	warning: "warning",
	danger: "danger",
};

export type SizesTypes = keyof typeof SIZES;
type sizeType = "small" | "medium" | "large";
type sizeObj = {
	[key in sizeType]: sizeType;
};

export const SIZES: sizeObj = {
	small: "small",
	medium: "medium",
	large: "large",
};

type fontSizeObj = {
    [key in sizeType]: string;
};

export const SIZE: fontSizeObj = {
    small: "12px",
    medium: "14px",
    large: "16px",
};

type btnPadding = {
    [key in sizeType]: string;
}

export const btnPadding: btnPadding = {
	small: "6px 12px",
	medium: "8px 16px",
	large: "10px 20px",
};

const Text = styled.span`
	display: inline-block;
	height: 100%;
	width: 100%;
`;

export interface CustormButtonProps {
	/** 按钮类型 */
	appearance?: AppearancesTypes;
	/** 是否需要border */
	border?: boolean;
	/** 是否圆 */
	circle?: boolean;
	/** 自定义类名 */
	className?: string;
	/** 是否禁用 */
	disabled?: boolean;
	/** 是否是a标签 */
	isLink?: boolean;
    /** 是否打开新页面 */
    newPage?: boolean;
	/** 是否圆角 */
	round?: boolean;
	/** 按钮大小 */
	size?: SizesTypes;
    /** a标签时打开方式 */
    target?: string;
	/** a标签时hover有无下划线 */
	textLine?: boolean;
}

export type ButtonProps = CustormButtonProps &
	AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: PropsWithChildren<ButtonProps>) => {
	const {
		isLink,
		children,
        newPage,
		disabled,
	} = props;
	const buttonInner = (
		<Text>{children}</Text>
	);
	const btnType = useMemo(() => {
		if (isLink) {
			return "a";
		} else {
			return "button"
		}
	}, [isLink]);

	type isDisableLink = {
        href?: string;
        target?: string;
        onClick?: (event:React.MouseEvent) => void
    }
	const isDisableLink:isDisableLink = {}
	if (isLink && disabled) {
        isDisableLink.href = "#"
        isDisableLink.onClick = (e) => {
        	e.preventDefault()
			return false
		}
	}

	if (newPage && isLink) {
        isDisableLink.target = "_blank"
	}

	return (
		<StyledButton
			as={btnType}
			{...props}
			{...isDisableLink}
		>
			{buttonInner}
		</StyledButton>
	);
}

Button.defaultProps = {
	isLink: false,
	appearance: APPEARANCES.primary,
	isDisabled: false,
	containsIcon: false,
	size: SIZES.medium,
	border: true,
    circle: false,
    newPage: false,
    round: false,
    disabled: false,
    href: "",
    target: "",
};

export default Button;
