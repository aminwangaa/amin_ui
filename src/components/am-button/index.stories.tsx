import React from "react";
import Button, {
	APPEARANCES,
	AppearancesTypes,
	SIZES,
	SizesTypes,
} from "./button";
import {
	withKnobs,
	text,
	boolean,
	select,
} from "@storybook/addon-knobs";

export default {
	title: "AmButton",
	component: Button,
	decorators: [withKnobs],
};

export const KnobsButton = () => (
	<Button
		size={select<SizesTypes>("size", SIZES, SIZES.medium)}
		appearance={select<AppearancesTypes>("appearance", APPEARANCES, APPEARANCES.default)}
		href={text("hrefText", "")}
		className={text("className", "")}
		isLink={boolean("isLink", false)}
		disabled={boolean("disabled", false)}
		round={boolean("round", true)}
		circle={boolean("circle", false)}
        newPage={boolean("newPage", false)}
        border={boolean("border", true)}
		textLine={boolean("textLine", false)}
	>
		{text("childrenText", "默认按钮")}
	</Button>
);

