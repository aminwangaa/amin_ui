import * as React from 'react';
import Screenshot from './index';
import { withKnobs, number } from "@storybook/addon-knobs";

export default {
    title: 'AmScreenshot',
    component: Screenshot,
    decorators: [withKnobs],
};

export const KnobsSreenshot = () => {
    const imgChange = (val: string) => {
        // console.log(val)
    }

    return (
        <Screenshot onChange={imgChange} />
    );
};
