import React from "react";
import { Progress } from "./index";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { badgeColor } from "../shared/styles";

export default {
    title: "AmProgress",
    component: Progress,
    decorators: [withKnobs],
};


export const knobsProgress = () => (
    <Progress percent={50} />
);

