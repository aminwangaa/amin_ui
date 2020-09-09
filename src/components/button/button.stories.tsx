import React from "react";
import { action } from "@storybook/addon-actions";
import  { Button }  from "./index";

// CSF 用法
export default {
	title: "Button",  // 主题 （小标题）
	component: Button,
};

export const Text = () => (  // 导出的 就是 主题下面 的案例
	<Button onClick={action("clicked")}>Hello Button11</Button>
);

export const Emoji = () => (
	<Button onClick={action("clicked")}>hello storybook</Button>
);
