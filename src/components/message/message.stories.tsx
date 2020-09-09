import React from 'react';
import { withKnobs, text, boolean, select, number, color } from "@storybook/addon-knobs";
import { Button } from '../button';
import { createMessage, Message, MessageType, message } from './index';
import { Icon } from '../icon';

export default {
	title: "Message",
	component: Message,  // 用处是什么
	decorators: [withKnobs],
};

// export const knobsMessage = () => (
// 	<div>
// 		<Button onClick={() => createMessage()("111")}>click</Button>
// 		<Button onClick={() => createMessage()("222")}>click</Button>
// 	</div>
// );

const Options: MessageType[] = [
	"info",
	"success",
	"error",
	"warning",
	"loading",
	"default",
];

export const knobsMessage = () => {
	const se = select<MessageType>("iconType", Options, "default");
	const op = {
		delay: number("delay", 2000),
		animationDuring: number("animationDuring", 300),
		background: color("background", "#fff"),
		color: color("color", "#333"),
	};
	const tx = text("content", "hello message");
	const onClick = () => message[se](tx, op);

	return (
		<div>
			<Button onClick={onClick}>click</Button>
		</div>
	);
};


export const callbackTest = () => (
	<div>
		<Button
			onClick={() =>
				message.loading("加载中", {
					callback: () => message.success("加载完成"),
				})
			}
		>
			callback
		</Button>
	</div>
);

export const withIcon = () => (
	<div>
		<Button
			onClick={() =>
				message.default(
					<span>
						<Icon icon="admin"></Icon>111
					</span>
				)
			}
		>
			callback
		</Button>
	</div>
);