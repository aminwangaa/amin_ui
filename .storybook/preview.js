import React from "react";
import { GlobalStyle } from "../src/components/shared/global";
import { addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

addParameters({
    options: {
        showRoots: true,
    },
    dependencies: {
        withStoriesOnly: true,
        hideEmpty: true,
    },
});

// addons.setConfig({
//     showRoots: true,
// })

addParameters({
    a11y: withA11y,
});

addDecorator((story) => (
    <>
        <GlobalStyle />
        {story()}
    </>
    )
);

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
}