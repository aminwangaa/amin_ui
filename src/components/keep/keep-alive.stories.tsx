import React from 'react';
import { withKnobs, text, boolean, select, number, color } from "@storybook/addon-knobs";
import { Button } from '../button';
import App from './index';
import { Icon } from '../icon';

export default {
    title: "TestApp",
    component: App,  // 用处是什么
    decorators: [withKnobs],
};


export const TestApp = () => <App />
