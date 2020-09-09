import React, { RefObject, useEffect, useState, useRef, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { darken, rgba } from "polished";
import { color } from '../shared/styles';
import { modalOpenAnimate, modalCloseAnimate } from '../shared/animation';
import { useStateAnimation } from '../modal';
import { Button } from '../button';
import { Icon } from '../icon';
/**
 *  我们先要实现个效果，就是当鼠标移入input并点击可以产生弹框。点击组件外，可以关闭弹窗。
 *  由于我们需要判定点击组件外，所以需要一个hook：
 */

export function useClickOutside(
    ref: RefObject<HTMLElement>,
    handler: Function
) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // console.log(ref, 'ref', ref?.current?.contains, event.target, ref?.current?.contains(event.target as Node));
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };
        window.addEventListener("click", listener);
        return () => window.removeEventListener("click", listener);
    }, [ref, handler]);
};


const CalendarWrapper = styled.div<{ visible: boolean; delay: number }>`
	position: absolute;
	border: 1px solid black;
	transition: all ${(props) => props.delay / 1000}s cubic-bezier(0.23, 1, 0.32, 1);
background: ${color.lightest};
	${(props) =>
    props.visible &&
    css`
			animation: ${modalOpenAnimate} ${props.delay / 1000}s ease-in;
		`}
	${(props) =>
    !props.visible &&
    css`
			animation: ${modalCloseAnimate} ${props.delay / 1000}s ease-in;
		`}
`;

const CalendarDateRow = styled.tr``;

const tableItemStyle = css`
	display: inline-block;
	min-width: 24px;
	height: 24px;
	line-height: 24px;
	border-radius: 2px;
	margin: 2px;
	text-align: center;
`;
const CalendarHeadItem = styled.td`
	${tableItemStyle}
	cursor:default;
`;
// const CalendarDate = styled.td`
// 	${tableItemStyle}
// `;
const CalendarHeadWrapper = styled.div`
	padding: 10px;
	display: flex;
	color: ${rgba(0, 0, 0, 0.85)};
	border-bottom: 1px solid #f0f0f0;
    justify-content: center;
    flex-direction: column;
`;

// type calDataType = [number, number];

const btnStyle = {
    padding: "0px",
    background: color.lightest,
};
const IconWrapper = styled.span`
	display: inline-block;
	vertical-align: middle;
	> svg {
		height: 12px;
	}
`;

const BtnDiv = styled.div`
	display: flex;
	jutify-content: center;
	align-items: center;
	height: 24px;
	line-height: 24px;
`;

const MonthWrapper = styled.div`
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	position: relative;
`;

// const MonthItem = styled.div`
// 	width: 25%;
// 	height: 60px;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	cursor: pointer;
// 	&:hover {
// 		color: ${color.secondary};
// 	}
// `;
const Bwrapper = styled.b`
	cursor: pointer;
	&:hover {
		color: ${color.primary};
	}
`;

const MonthItem = styled.div<{ toGrey?: boolean }>`
	width: 25%;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	${(props) => props.toGrey && `color:${color.mediumdark};`}
	&:hover {
		color: ${color.secondary};
	}
`;

const CalendarIcon = styled.span`
	display: inline-block;
`;

const DatePickerWrapper = styled.div`
	display: inline-block;
	border-color: #40a9ff;
	border-right-width: 1px !important;
	outline: 0;
	box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
`;

// 这个函数需要研究下
// const getDateData = function(year: number, month: number) {
// 	const firstDay = new Date(year, month, 1);
// 	let weekDay = firstDay.getDay(); //周日，0，周六 6
// 	weekDay = weekDay === 0 ? 7 : weekDay;
// 	let start = firstDay.getTime() - weekDay * 60 * 60 * 24 * 1000;
// 	let arr: number[] = [];
// 	for (let i = 0; i < 42; i++) {
// 		arr.push(new Date(start + i * 60 * 60 * 24 * 1000).getDate());
// 	}
// 	let k = -1;
// 	return Array.from({ length: 6 }, () => {
// 		k++;
// 		return arr.slice(k * 7, (k + 1) * 7);
// 	});
// };

// const getYearMonthDay = function(date: number): calDataType {
// 	let tmp = new Date(date);
// 	return [tmp.getFullYear(), tmp.getMonth()];
// };

const getYearMonthDay = function(date: number): calDataType {
    let tmp = new Date(date);
    return [tmp.getFullYear(), tmp.getMonth(),tmp.getDate()];
};

// const changeCalData = function(
// 	sign: boolean,
// 	calData: calDataType
// ): calDataType {
// 	const oldDate = new Date(calData[0], calData[1]);
// 	if (sign) {
// 		//true是减少false是增加
// 		const newDate = oldDate.setMonth(oldDate.getMonth() - 1);
// 		return getYearMonthDay(newDate);
// 	} else {
// 		const newDate = oldDate.setMonth(oldDate.getMonth() + 1);
// 		return getYearMonthDay(newDate);
// 	}
// };

type calDataType = [number, number,number];

interface DateItem {
    day: number; //天
    isonMonth: boolean; //当月
    isonDay: boolean; //当日
    origin: Date;
}

const isCurrentMonth = function(
    current: Date,
    year: number,
    month: number
): boolean {
    return current.getFullYear() === year && current.getMonth() === month;
};
const isCurrentDay = function(current: Date, day: number, onMonth: boolean) {
    return current.getDate() === day && onMonth;
};

const getDateData = function(year: number, month: number, day: number) {
    const firstDay = new Date(year, month, 1);
    let weekDay = firstDay.getDay(); //周日，0，周六 6
    weekDay = weekDay === 0 ? 7 : weekDay;
    let start = firstDay.getTime() - weekDay * 60 * 60 * 24 * 1000;
    let arr: DateItem[] = [];
    for (let i = 0; i < 42; i++) {
        let current = new Date(start + i * 60 * 60 * 24 * 1000);
        let onMonth = isCurrentMonth(current, year, month);
        arr.push({
            day: current.getDate(),
            isonMonth: onMonth,
            isonDay: isCurrentDay(current, day, onMonth),
            origin: current,
        });
    }
    let k = -1;
    return Array.from({ length: 6 }, () => {
        k++;
        return arr.slice(k * 7, (k + 1) * 7);
    });
};

const CalendarDate = styled.td<Partial<DateItem>>`
	display: inline-block;
	min-width: 24px;
	height: 24px;
	line-height: 24px;
	border-radius: 2px;
	margin: 2px;
	text-align: center;
	cursor: pointer;
		${(props) => {
    if (props.isonDay) {
        //当天的 
        return `color:${color.lightest};background:${color.primary};`;
    }
    return `&:hover {color: ${color.secondary};};`;
}}
	${(props) => {
    if (props.isonMonth === false) {
        //不是当月显示灰色
        return `color:${color.mediumdark};`;
    }
    return "";
}}
`;

const generateDate=(calData:calDataType)=>{
    return `${calData[0]}-${calData[1] + 1}-${calData[2]}`
};

const validateDate = (value: string) => {
    let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    if (reg.exec(value)) {
        return true;
    } else {
        return false;
    }
};

const getCalData = (state: string) => {
    let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    const result = state.match(reg);
    if (result && result?.[1] && result?.[2] && result?.[3] ) {
        return [
            Number(result?.[1]),
            Number(result?.[2]) - 1,
            Number(result?.[3]),
        ];
    } else {
        return false;
    }
};

type modeType = 'date'|'month'|'year';

const changeCalData = function(
    sign: number,
    calData: calDataType
): calDataType {
    const oldDate = new Date(calData[0], calData[1]);
    const newDate = oldDate.setMonth(oldDate.getMonth() +sign);
    return getYearMonthDay(newDate);
};

const changeCalYear = function(sign: number, calData: calDataType) {
    const oldDate = new Date(calData[0], calData[1]);
    const newDate = oldDate.setFullYear(oldDate.getFullYear()+ sign);
    return getYearMonthDay(newDate);
};


const MonthData = new Array(12).fill(1).map((_x, y) => y + 1);

const getStartYear =function(calData: calDataType){
    return calData[0]-calData[0]%10
}

export type DatepickerProps = {
    /** 日期选择的回调 */
    callback?: (v: string) => void;
    /**  动画速度 */
    delay?: number;
    /** 初始值*/
    initDate?: string;
    /** 外层样式*/
    style?: React.CSSProperties;
    /** 外层类名 */
    classname?: string;
};

export function DatePicker(props: DatepickerProps) {

    const {
        callback,
        delay,
        initDate,
        style,
        classname,
    } = props;
    // const [state, setState] = useState("");
    const [show, setShow] = useState(false);
    const [mode,setMode]=useState<modeType>('date')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    };
    const handleClick = () => {
        setShow(true);
    };
    const ref = useRef<HTMLDivElement>(null);
    const [calData, setCalData] = useState<calDataType>(() => {
        if (initDate && validateDate(initDate)) {
            //
            return getCalData(initDate) as calDataType;
        } else {
            return [
                // 需要对初始值进行转化 写一个正则进行匹配
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
            ];
        }
    });
    const [state, setState] = useState(
        // () => initDate || generateDate(calData)
        // 初始值 只运行一次
        () => {
            if (initDate && validateDate(initDate)) {
                //
                return initDate;
            } else {
                return generateDate(calData);
            }
        }
    );

    useEffect(()=>{
        setState(() => {
            if (initDate && validateDate(initDate)) {
                //
                return initDate;
            } else {
                return generateDate(calData);
            }
        });
        setCalData(() => {
            if (initDate && validateDate(initDate)) {
                //
                return getCalData(initDate) as calDataType;
            } else {
                return [
                    // 需要对初始值进行转化 写一个正则进行匹配
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                ];
            }
        });
    }, [initDate])

    const [st, setst, unmount] = useStateAnimation(setShow, 200);
    useClickOutside(ref, () => setst(false));

    // const dayData = useMemo(() => {
    //     // length 为6 的数组 ，数据的每一项都是 [1,1,1,1,1,1,1];
    // 	const arr = Array.from({ length: 6 }, () => new Array(7).fill(1));
    // 	return arr;
    // }, []);
    const dayData = useMemo(() => {
        // const arr = getDateData(2020, 8, 1); //传的8实际是9
        const arr = getDateData(...calData);
        // calData
        return arr;
    }, [calData]);

    useEffect(() => {
        if (callback) callback(state);
    }, [state, callback]);
    // const render = useMemo(() => {
    // 	if (!show) {
    // 		unmount();
    // 		return null;
    // 	} else {
    // 		return (
    // 			<CalendarWrapper visible={st} delay={500}>
    // 				<CalendarHeadWrapper>我是标题</CalendarHeadWrapper>
    // 				<table>
    // 					<thead>
    // 						<tr>
    // 							<CalendarHeadItem>日</CalendarHeadItem>
    // 							<CalendarHeadItem>一</CalendarHeadItem>
    // 							<CalendarHeadItem>二</CalendarHeadItem>
    // 							<CalendarHeadItem>三</CalendarHeadItem>
    // 							<CalendarHeadItem>四</CalendarHeadItem>
    // 							<CalendarHeadItem>五</CalendarHeadItem>
    // 							<CalendarHeadItem>六</CalendarHeadItem>
    // 						</tr>
    // 					</thead>
    // 					<tbody>
    // 						{dayData.map((v, index) => (
    // 							<CalendarDateRow key={index}>
    // 								{v.map((k, i) => (
    // 									<CalendarDate key={i}>{k}</CalendarDate>
    // 								))}
    // 							</CalendarDateRow>
    // 						))}
    // 					</tbody>
    // 				</table>
    // 			</CalendarWrapper>
    // 		);
    // 	}
    // }, [show, unmount, st, dayData]);
    // const render = useMemo(() => {
    // 	if (!show) {
    // 		unmount();
    // 		return null;
    // 	} else {
    // 		return (
    // 			<CalendarWrapper visible={st} delay={210}>
    // 				我是弹框
    // 			</CalendarWrapper>
    // 		);
    // 	}
    // }, [show, unmount, st]);

    const handleBlur = () => {
        if (state !== generateDate(calData)) {
            //如果相等，说明是calData赋值上去的
            let res = validateDate(state); //验证格式
            if (!res) {
                //错误用原来的
                setState(generateDate(calData));
            } else {
                //否则计算新值
                let p = state.split("-");
                let newDate = new Date(
                    parseInt(p[0]),
                    parseInt(p[1]) - 1,
                    parseInt(p[2])
                );
                const newCal: calDataType = [
                    newDate.getFullYear(),
                    newDate.getMonth(),
                    newDate.getDate(),
                ];
                setCalData(newCal);
                setState(generateDate(newCal));
            }
        }
    };

    const modeDay = (
        <table style={{ display: mode === "date" ? "flex" : "none", flexDirection: 'column', }}>
            <thead>
            <tr>
                <CalendarHeadItem>日</CalendarHeadItem>
                <CalendarHeadItem>一</CalendarHeadItem>
                <CalendarHeadItem>二</CalendarHeadItem>
                <CalendarHeadItem>三</CalendarHeadItem>
                <CalendarHeadItem>四</CalendarHeadItem>
                <CalendarHeadItem>五</CalendarHeadItem>
                <CalendarHeadItem>六</CalendarHeadItem>
            </tr>
            </thead>
            <tbody>
            {dayData.map((v, index) => (
                <CalendarDateRow key={index}>
                    {v.map((k, i) => (
                        <CalendarDate
                            isonDay={k.isonDay}
                            isonMonth={k.isonMonth}
                            key={i}
                            onClick={() => {
                                const origin = k.origin;
                                const newCal: calDataType = [
                                    origin.getFullYear(),
                                    origin.getMonth(),
                                    origin.getDate(),
                                ];
                                setCalData(newCal);
                                setState(generateDate(newCal));
                                setst(false);
                            }}
                        >
                            {k.day}
                        </CalendarDate>
                    ))}
                </CalendarDateRow>
            ))}
            </tbody>
        </table>
    );

    // const modeMonth = (
    //     <div style={{ display: mode === "month" ? "flex" : "none" }}>
    //         {MonthData.map((v, i) => {
    //             return (
    //                 <div
    //                     key={i}
    //                     onClick={() => {
    //                         //获取当前月，与点击相减得差
    //                         let diff = v - calData[1] - 1;
    //                         let res = changeCalData(diff, calData);
    //                         setCalData(res);
    //                         setMode("date");
    //                     }}
    //                 >
    //                     {v}月
    //                 </div>
    //             );
    //         })}
    //     </div>
    // );

    const modeMonth = (
        <MonthWrapper
            style={{ display: mode === "month" ? "flex" : "none",  }}
        >
            {MonthData.map((v, i) => {
                return (
                    <MonthItem
                        key={i}
                        onClick={() => {
                            //获取当前月，与点击相减得差
                            let diff = v - calData[1] - 1;
                            let res = changeCalData(diff, calData);
                            setCalData(res);
                            setMode("date");
                        }}
                    >
                        {v}月
                    </MonthItem>
                );
            })}
        </MonthWrapper>
    );

    const startYear = getStartYear(calData);
    const yearMap = new Array(12).fill(1).map((_x, y) => startYear + y - 1);
    const modeYear = (
        <MonthWrapper
            style={{ display: mode === "year" ? "flex" : "none" ,}}
        >
            {yearMap.map((v, i) => (
                <MonthItem
                    toGrey={i === 0 || i === 11}
                    key={i}
                    onClick={() => {
                        //获取选择的年与差值
                        let diff = v - calData[0];
                        let res = changeCalYear(diff, calData);
                        setCalData(res);
                        setMode("month");
                    }}
                >
                    {v}
                </MonthItem>
            ))}
        </MonthWrapper>
    );

    const render = useMemo(() => {
        // const handleLeft = () => {
        // 	const res = changeCalData(true, calData);
        // 	setCalData(res);
        // };
        // const handleRight = () => {
        // 	const res = changeCalData(false, calData);
        // 	setCalData(res);
        // };
        const handleLeft = () => {
            let res: calDataType;
            if (mode === "date") {
                res = changeCalData(-1, calData);
            } else if (mode === "month") {
                res = changeCalYear(-1, calData);
            } else {
                res = changeCalYear(-10, calData);
            }
            setCalData(res);
        };
        const handleRight = () => {
            let res: calDataType;
            if (mode === "date") {
                res = changeCalData(1, calData);
            } else if (mode === "month") {
                res = changeCalYear(1, calData);
            } else {
                res = changeCalYear(10, calData);
            }
            setCalData(res);
        };
        if (!show) {
            unmount();
            return null;
        } else {
            return (
                // <CalendarWrapper visible={st} delay={210}>
                // 	<CalendarHeadWrapper>
                // 		<div
                // 			style={{
                // 				display: "flex",
                // 				justifyContent: "center",
                // 			}}
                // 		>
                // 			<BtnDiv>
                // 				<Button
                // 					size="small"
                // 					style={btnStyle}
                // 					onClick={() => handleLeft()}
                // 				>
                // 					<IconWrapper>
                // 						<Icon icon="arrowleft"></Icon>
                // 					</IconWrapper>
                // 				</Button>
                // 			</BtnDiv>
                // 			{/* <BtnDiv>{`${calData[0]}年${calData[1] +
                // 				1}月`}</BtnDiv> */}
                //                 <BtnDiv>
                // 				<span>
                // 					<b
                // 						onClick={() => {
                // 							setMode("year");
                // 						}}
                // 					>{`${calData[0]}年`}</b>
                // 					<b
                // 						onClick={() => {
                // 							setMode("month");
                // 						}}
                // 						style={{
                // 							display:
                // 								mode === "date"
                // 									? "inline-block"
                // 									: "none",
                // 						}}
                // 					>{`${calData[1] + 1}月`}</b>
                // 				</span>
                // 			</BtnDiv>
                // 			<BtnDiv>
                // 				<Button
                // 					size="small"
                // 					style={btnStyle}
                // 					onClick={() => handleRight()}
                // 				>
                // 					<IconWrapper>
                // 						<Icon icon="arrowright"></Icon>
                // 					</IconWrapper>
                // 				</Button>
                // 			</BtnDiv>
                // 		</div>

                // 		<div style={{ padding: "10px" }}>
                // 				{modeDay}
                // 			{modeMonth}
                // 		</div>
                // 	</CalendarHeadWrapper>
                // </CalendarWrapper>
                <CalendarWrapper visible={st} delay={delay || 210}>
                    <CalendarHeadWrapper>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "240px",
                            }}
                        >
                            <BtnDiv style={{ marginLeft: "20px" }}>
                                <Button
                                    size="small"
                                    style={btnStyle}
                                    onClick={() => handleLeft()}
                                >
                                    <IconWrapper>
                                        <Icon icon="arrowleft"></Icon>
                                    </IconWrapper>
                                </Button>
                            </BtnDiv>
                            <BtnDiv style={{ flex: 1 }}>
                            <span>
                                <Bwrapper
                                    style={{
                                        display:
                                            mode === "year"
                                                ? "inline-block"
                                                : "none",
                                    }}
                                >{`${startYear}-${startYear +
                                9}`}</Bwrapper>
                                <Bwrapper
                                    onClick={() => {
                                        setMode("year");
                                    }}
                                    style={{
                                        display:
                                            mode === "month" ||
                                            mode === "date"
                                                ? "inline-block"
                                                : "none",
                                    }}
                                >{`${calData[0]}年`}</Bwrapper>
                                <Bwrapper
                                    onClick={() => {
                                        setMode("month");
                                    }}
                                    style={{
                                        display:
                                            mode === "date"
                                                ? "inline-block"
                                                : "none",
                                    }}
                                >{`${calData[1] + 1}月`}</Bwrapper>
                            </span>
                            </BtnDiv>
                            <BtnDiv style={{ marginRight: "20px" }}>
                                <Button
                                    size="small"
                                    style={btnStyle}
                                    onClick={() => handleRight()}
                                >
                                    <IconWrapper>
                                        <Icon icon="arrowright"></Icon>
                                    </IconWrapper>
                                </Button>
                            </BtnDiv>
                        </div>

                        <div
                            style={{
                                width: "240px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {modeDay}
                            {modeMonth}
                            {modeYear}
                        </div>
                    </CalendarHeadWrapper>
                </CalendarWrapper>
            );
        }
    }, [show, unmount, st, calData, dayData, setst, mode]);
    // 		return (
    // 			<CalendarWrapper visible={st} delay={210}>
    // 				<CalendarHeadWrapper>
    // 					<BtnDiv>
    // 						<Button
    // 							size="small"
    // 							style={btnStyle}
    // 							onClick={() => handleLeft()}
    // 						>
    // 							<IconWrapper>
    // 								<Icon icon="arrowleft"></Icon>
    // 							</IconWrapper>
    // 						</Button>
    // 					</BtnDiv>
    // 					<BtnDiv>{`${calData[0]}年${calData[1] + 1}月`}</BtnDiv>
    // 					<BtnDiv>
    // 						<Button
    // 							size="small"
    // 							style={btnStyle}
    // 							onClick={() => {
    // 								handleRight();
    // 							}}
    // 						>
    // 							<IconWrapper>
    // 								<Icon icon="arrowright"></Icon>
    // 							</IconWrapper>
    // 						</Button>
    // 					</BtnDiv>
    // 				</CalendarHeadWrapper>
    // 				<table>
    // 					<thead>
    // 						<tr>
    // 							<CalendarHeadItem>日</CalendarHeadItem>
    // 							<CalendarHeadItem>一</CalendarHeadItem>
    // 							<CalendarHeadItem>二</CalendarHeadItem>
    // 							<CalendarHeadItem>三</CalendarHeadItem>
    // 							<CalendarHeadItem>四</CalendarHeadItem>
    // 							<CalendarHeadItem>五</CalendarHeadItem>
    // 							<CalendarHeadItem>六</CalendarHeadItem>
    // 						</tr>
    // 					</thead>
    // 					<tbody>
    //                         {dayData.map((v, index) => (
    // 							<CalendarDateRow key={index}>
    // 								{v.map((k, i) => (
    //                                     <CalendarDate
    //                                         isonDay={k.isonDay}
    //                                         isonMonth={k.isonMonth}
    //                                         key={i}
    //                                         onClick={() => {
    //                                             const origin = k.origin;
    //                                             const newCal: calDataType = [
    //                                             origin.getFullYear(),
    //                                             origin.getMonth(),
    //                                             origin.getDate(),
    //                                         ];
    //                                         setCalData(newCal);
    //                                         setState(generateDate(newCal));
    //                                         setst(false);
    //                                         }}
    //                                      >
    //                                         {k.day}
    //                                     </CalendarDate>
    // 								))}
    // 							</CalendarDateRow>
    // 						))}
    // 					</tbody>
    // 				</table>
    // 			</CalendarWrapper>
    // 		);
    // 	}
    // }, [show, unmount, st, calData, dayData]);

    return (
        // <div ref={ref}>
        // 	{/* <input
        // 		value={state}
        // 		onChange={handleChange}
        // 		onClick={handleClick}
        // 	></input> */}
        //     <input
        //         aria-label="date picker"
        //         onBlur={handleBlur}
        //         value={state}
        //         onChange={handleChange}
        //         onClick={handleClick}
        //     ></input>
        // 	{render}
        // </div>
        <DatePickerWrapper ref={ref} onClick={handleClick} style={style} className={classname}>
            <input
                aria-label="date picker"
                onBlur={handleBlur}
                value={state}
                onChange={handleChange}
                style={{ border: "none", boxShadow: "none", outline: "none" }}
            ></input>
            <CalendarIcon>
                <Icon icon="calendar"></Icon>
            </CalendarIcon>
            {render}
        </DatePickerWrapper>
    );
}
