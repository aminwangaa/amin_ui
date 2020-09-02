import React, { HTMLAttributes, PropsWithChildren, useState, useEffect, useRef } from "react";
import {
	ProgressL,
	ProgressContainer,
	LineProgress,
	ProgressBox,
	CircleProgress,
	Num,
	CircleProgressInner,
	DashboardInner,
	Dashboard
} from "./style-progress"
import { isArray } from "lodash"

const statusColor = new Map()
statusColor.set("active", "#1890ff")
statusColor.set("success", "#52c41a")
statusColor.set("exception", "#ff4d4f")
statusColor.set("normal", "#1890ff")

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
	strokeWidth?: number,
	bgColor?: string,
	progressColor?: string,
	showInfo?: boolean,
	status?: string,
	textInside?: boolean,
	passNum?: number,
	successText?: string,
	unPassText?: string,
	showText?: boolean,
}

export interface ProgressAllProps extends ProgressProps {
	percent: number,
}

export const Progress = (props: PropsWithChildren<ProgressAllProps>) =>{

	const {
		strokeWidth,
		// percent,
		bgColor,
		progressColor,
		showInfo,
		status,
		textInside,
		passNum,
		successText,
		unPassText,
		showText,
	} = props

	const boxRef: any = useRef(null)
	const lineRef: any = useRef(null)

	const [percent, setPercent] = useState(10)

	const btnClick = (type) => {
		type === "add" && setPercent(() => 5 + percent > 100 ? 100 : 5 + percent)
		type === "reduce" && setPercent(() => percent- 5 < 0 ? 0 : percent- 5)
	}

	useEffect(() => {
		if (strokeWidth && boxRef.current) {
			boxRef.current.style.width = `${strokeWidth}px`
		}
		if (bgColor && boxRef.current) {
			boxRef.current.style.background = bgColor
		}
		if (status && lineRef.current) {
			lineRef.current.style.background = statusColor.get(status)
		}
		if (progressColor && lineRef.current) {
			lineRef.current.style.background =
				isArray(progressColor) ?
					`linear-gradient(to right,${progressColor[0]} 0%, ${progressColor[1]} 100%)` :
					progressColor
		}
		if (textInside && lineRef.current) {
			lineRef.current.style.height = "auto"
			lineRef.current.style.padding = "4px 6px"
		}
	}, [])

	useEffect(() => {
		const targetBox: any = boxRef.current
		if (targetBox) {
			let tarWidth: string = targetBox.style.width
			tarWidth = tarWidth.replace("px", "")
			const targetWidth: number = Number(tarWidth)

			const progressWidth = percent / 100 * targetWidth
			lineRef.current.style.width = `${progressWidth}px`
		}
	}, [percent])

	const r = 40
	const path = `M 50,50 m 0,-${r} a ${r},${r} 0 1 1 0,${2 * r} a ${r},${r} 0 1 1 0,-${2 * r}`
	const path2 = `M 50,50 m 0,${r} a ${r},${r} 0 1 1 0,-${2 * r} a ${r},${r} 0 1 1 0,${2 * r}`
	const C = 2 * Math.PI * r
	const tC = percent / 100 * C
	const styleFirst = {
		strokeDasharray: `${C}px, ${C}px`,
		strokeDashoffset: "0px",
		transition: `
            stroke-dashoffset 0.3s ease 0s, 
            stroke-dasharray 0.3s ease 0s, 
            stroke 0.3s ease 0s,
            strokeWidth 0.06s ease 0.3s
         `
	}

	const styleSecond = {
		strokeDasharray: `${tC}px, ${C}px`,
		strokeDashoffset: "0px",
		transition:  `
            stroke-dashoffset 0.3s ease 0s, 
            stroke-dasharray 0.3s ease 0s, 
            stroke 0.3s ease 0s,
            strokeWidth 0.06s ease 0.3s
         `
	}

    return (
		<ProgressContainer>
			<button onClick={() => btnClick("add")}> + </button>
			<button onClick={() => btnClick("reduce")}> - </button>
			<LineProgress>
				<ProgressBox ref={boxRef}>
					<ProgressL ref={lineRef} >
						{showText && textInside && (
							<Num>
							   {percent}%
						   </Num>
						)}
					</ProgressL>
				</ProgressBox>
				{showText && showInfo && !textInside && (
					<Num>
					   {
						   percent === 100 ? successText :
							   percent < passNum ? unPassText :
								   `${percent}%`
					   }
				   </Num>
				)}
			</LineProgress>
			<CircleProgress>
				<svg height="100" width="100">
					<path
						d={path}
						strokeLinecap="round"
						stroke="#f5f5f5"
						strokeWidth="6"
						fillOpacity="0"
						style={styleFirst}
					/>
					<path
						d={path}
						stroke="red"
						strokeLinecap="round"
						strokeWidth="6"
						opacity="1"
						fillOpacity="0"
						style={styleSecond}
					/>
				</svg>
				<CircleProgressInner>
					{showText && showInfo && !textInside && (
						<Num>
                           {
							   percent === 100 ? successText :
								   percent < passNum ? unPassText :
									   `${percent}%`
						   }
                       </Num>
					)}
				</CircleProgressInner>
			</CircleProgress>

			<Dashboard>
				<svg  height="100" width="100">
					<path d={path2}
						  stroke="#e5e9f2"
						  strokeWidth="4.8"
						  fill="none"
						  strokeLinecap="round"
						  style={{
							  strokeDasharray: `${3 / 4 * C}px, ${C}px`,
							  strokeDashoffset: `-${1 / 8 * C}px`
						  }}
					/>
					<path d={path2}
						  stroke="red"
						  strokeWidth="4.8"
						  fill="none"
						  strokeLinecap="round"
						  style={{
							  strokeDasharray: `${percent / 100 * 3 / 4 * C}px, ${C}px`,
							  strokeDashoffset: `-${1 / 8 * C}px`,
							  transition:  `
                                stroke-dashoffset 0.3s ease 0s,
                                stroke-dasharray 0.3s ease 0s,
                                stroke 0.3s ease 0s,
                                strokeWidth 0.06s ease 0.3s
                             `
						  }}
					/>
				</svg>

				<DashboardInner>
					{showText && showInfo && !textInside && (
						<Num>
                           {
							   percent === 100 ? successText :
								   percent < passNum ? unPassText :
									   `${percent}%`
						   }
                      </Num>
					)}
				</DashboardInner>
			</Dashboard>
		</ProgressContainer>
	);
}


Progress.defaultProps = {
	strokeWidth	: 150,
	percent: 80,
	bgColor: "#f5f5f5",
	progressColor: ["deepskyblue", "blue"],
	showInfo: true,
	status: "normal",
	textInside: false,
	passNum: 60,
	successText: "完成",
	unPassText: "不及格",
	showText: true,
	type: "line"
};
export default Progress;
