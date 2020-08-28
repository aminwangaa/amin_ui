import React from "react";
import { CascadeSelect } from "./index";
import {
    withKnobs,
    text,
    boolean,
    select,
} from "@storybook/addon-knobs";

export default {
    title: "CascadeSelect",
    component: CascadeSelect,
    decorators: [withKnobs],
};

export const KnobsButton = () => (
    <CascadeSelect />
);

