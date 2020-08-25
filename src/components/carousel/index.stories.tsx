import React from 'react';
import {
    withKnobs,
    text,
    boolean,
    select,
    number,
} from "@storybook/addon-knobs";
import { Carousel } from './index';
import { color } from '../shared/styles';

export default {
    title: "Carousel",  // 小标题
    component: Carousel, // 使用组件 //如果组件重复 ，会发生覆盖
    decorators: [withKnobs],  // 使用 knob 进行装饰
};

// export const knobsCarousel = () => (
// 	<div>
// 		<Carousel autoplay delay={1000} height={300}>
// 			<div style={{ height: "100%", width: "100%", background: "red" }}>
// 				1
// 			</div>
// 			<div style={{ height: "100%", width: "100%", background: "blue" }}>
// 				2
// 			</div>
// 			<div
// 				style={{ height: "100%", width: "100%", background: "yellow" }}
// 			>
// 				3
// 			</div>
// 			<div style={{ height: "100%", width: "100%" }}>4</div>
// 		</Carousel>
// 	</div>
// );

const DivExample = function(height: number, index: number) {
    return (
        <div
            style={{
                background: "#364d79",
            }}
            key={index}
        >
			<span
                style={{
                    lineHeight: `${height}px`,
                    color: "white",
                    fontSize: "20px",
                    fontWeight: 800,
                    width: "100%",
                    textAlign: "center",
                    display: "inline-block",
                }}
            >
				{index + 1}
			</span>
        </div>
    );
};

export const normalCarousel = () => (
    <div>
        <Carousel delay={300} height={300} radioAppear="darker" width={500}>
            {/* <Carousel delay={300} height={300} radioAppear="darker" > */}
            {new Array(4).fill(300).map((v, i) => DivExample(v, i))}
        </Carousel>
    </div>
);

export const knobsCarousel = () => {
    const height = number("height", 300);
    const num = number("item number", 4);
    return (
        <Carousel
            delay={number("delay", 300)}
            height={height}
            radioAppear={select(
                "radioAppear",
                Object.keys(color) as Array<keyof typeof color>,
                "primary"
            )}
            defaultIndex={number("defaultIndex", 0)}
            autoplay={boolean("autoplay", true)}
            viewportBoxshadow={text("viewportBoxshadow", "2px 2px 4px #d9d9d9")}
            autoplayReverse={boolean("autoplayReverse", false)}
            animationDelay={number("animationDelay", 500)}
            autoplayDelay={number("autoplayDelay", 5000)}
            width={number("width", 5000)}
        >
            {new Array(num).fill(height).map((v, i) => DivExample(v, i))}
        </Carousel>
    );
};