import React from 'react';
import {
    withKnobs,
    text,
    boolean,
    select,
    number,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { DatePicker } from './index';
import { color } from '../shared/styles';

export default {
    title: "Calendar",  // 小标题
    component: DatePicker, // 使用组件 //如果组件重复 ，会发生覆盖
    decorators: [withKnobs],  // 使用 knob 进行装饰
};

export const Example = () => <DatePicker />

export const knobsDatePicker = () => (
    <div style={{ height: "500px" }}>
        <DatePicker
            callback={action("callback")}
            delay={number("delay", 200)}
            initDate={text("initDate", "2020-1-1")}
        ></DatePicker>
    </div>
);
