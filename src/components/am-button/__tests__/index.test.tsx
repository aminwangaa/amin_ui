import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Button, SIZES, SIZE, APPEARANCES } from "../button"
import {color, paddingSize} from "../../shared/styles"

describe("test Button component", () => {
    it("size button", () => {
        const sizes = Reflect.ownKeys(SIZES)
        sizes.forEach(item => {
            let wrapper = render(<Button size={item} appearance={"primary"}>{item}</Button>);
            expect(wrapper).toMatchSnapshot();
            let div = wrapper.queryByTestId("button-test");
            expect(div).toHaveStyle(`color: ${color.lightest}`);
            expect(div).toHaveStyle(`background: ${color.primary}`);
            expect(div).toHaveStyle(`border: 1px solid ${color.primary}`);
            expect(div).toHaveStyle(`font-size: ${SIZE[item]}`);
            expect(div).toHaveStyle(`padding: ${paddingSize[item]}`);
            cleanup()
        })
    });

    it("appearance button", () => {
        const appearances = Reflect.ownKeys(APPEARANCES)
        appearances.forEach(item => {
            let wrapper = render(<Button appearance={item}>{item}</Button>);
            expect(wrapper).toMatchSnapshot();
            let div = wrapper.queryByTestId("button-test");
            if (item === "default") {
                expect(div).toHaveStyle(`background:  ${color.lightest}`);
                expect(div).toHaveStyle(`color: ${color.darkest}`);
                expect(div).toHaveStyle(`border: 1px solid ${color.default}`);
            } else {
                expect(div).toHaveStyle(`color: ${color.lightest}`);
                expect(div).toHaveStyle(`background: ${color[item]}`);
                expect(div).toHaveStyle(`border: 1px solid ${color[item]}`);
            }
            cleanup()
        })
    });

    it("round button", () => {
        let wrapper = render(<Button round={true} appearance={"primary"}>primary round</Button>);
        expect(wrapper).toMatchSnapshot();
        let div = wrapper.queryByTestId("button-test");

        expect(div).toHaveStyle(`color: ${color.lightest}`);
        expect(div).toHaveStyle(`background: ${color.primary}`);
        expect(div).toHaveStyle(`border: 1px solid ${color.primary}`);
        expect(div).toHaveStyle(`border-radius: 40px`);
    });

    it("disabled button", () => {
        let wrapper = render(<Button disabled={true} round={true} appearance={"primary"}>disabled</Button>);
        expect(wrapper).toMatchSnapshot();
        let div = wrapper.queryByTestId("button-test");

        expect(div).toHaveTextContent(`disabled`);
        expect(div).toHaveStyle(`cursor: not-allowed`);
        expect(div).toHaveStyle(`color: rgba(0,0,0,.25)`);
        expect(div).toHaveStyle(`background: #f5f5f5`);
        expect(div).toHaveStyle(`border: 1px solid #d9d9d9`);
        expect(div).toHaveStyle(`border-radius: 40px`);
    });
});
