import React from "react";
import { Modal } from "./index";
import {
withKnobs,
text,
boolean,
color,
select,
} from "@storybook/addon-knobs";

export default {
title: "Modal",
component: Modal,
decorators: [withKnobs],
};

export const knobsModal = () => (
    <div></div>
);
