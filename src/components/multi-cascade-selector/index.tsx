import React, { useState, useEffect, useRef } from 'react';
import classNames from "classnames"
import {
    SelectModal,
    Title,
    Tips,
    SelectBox,
    ItemBox,
    Item,
    Check,
    Label,
    PreviewBox,
    Preview,
    BtnBox,
    ConfirmBtn,
    CancelBtn
} from "./style-select"
import { cloneDeep } from "lodash"

// 获取最大层级
const getMaxFloor = (treeData) => {
    let floor = 0
    let max = 0
    function each (data, floor) {
        data.forEach(e => {
            e.floor = floor
            if (floor > max) {
                max = floor
            }
            if (e.children && e.children.length > 0) {
                each(e.children, floor + 1)
            }
        })
    }
    each(treeData,1)
    return max
}

// 获取children
const getChildren = (treeData, deep, value) => {
    let children = []
    function each (data) {
        data &&
        data.length > 0 &&
        data.forEach(e => {
            if (deep === e.deep && e.value === value) {
                children = e.children
            }
            if (e.children && e.children.length > 0) {
                each(e.children)
            }
        })
    }
    each(treeData)
    return children
}

// 获取父节点
const getParent = (treeData, deep, value) => {
    let parent = {}
    function each (data) {
        data &&
        data.length > 0 &&
        data.forEach(e => {
            if (deep === e.deep + 1 && e.children && e.children.length > 0) {
                const flag = e.children.some(i => {
                    return i.value === value
                })
                if (flag) {
                    parent = e
                    return
                }
            }
            if (e.children && e.children.length > 0) {
                each(e.children)
            }
        })
    }
    each(treeData)
    return parent
}

export const CascadeSelect = (props) => {
    const { title, tips } = props
    const list = [
        {
            label: "水果",
            value: "fruit",
            deep: 0,
            children: [
                {
                    label: "热带水果",
                    value: "hotFruit",
                    deep: 1,
                    children: [
                        {
                            label: "香蕉",
                            value: "banana",
                            deep: 2,
                            children: [
                                {
                                    label: "海南香蕉",
                                    value: "hainan",
                                    deep: 3,
                                    // children: [
                                    //     {
                                    //         label: "小香蕉",
                                    //         value: "small",
                                    //         deep: 4,
                                    //         children: [
                                    //             {
                                    //                 label: "小香蕉一号",
                                    //                 value: "s1",
                                    //                 deep: 5
                                    //             },
                                    //             {
                                    //                 label: "小香蕉二号",
                                    //                 value: "s2",
                                    //                 deep: 5
                                    //             }
                                    //         ]
                                    //     },
                                    //     {
                                    //         label: "大香蕉",
                                    //         value: "big",
                                    //         deep: 4
                                    //     },
                                    // ]
                                },
                                {
                                    label: "越南香蕉",
                                    value: "vietnamBanana",
                                    deep: 3
                                }
                            ]
                        },
                        {
                            label: "榴莲",
                            value: "durian",
                            deep: 2,
                            children: [
                                {
                                    label: "泰国榴莲",
                                    value: "Thailand",
                                    deep: 3
                                },
                                {
                                    label: "越南榴莲",
                                    value: "vietnam",
                                    deep: 3
                                }
                            ]
                        },
                        {
                            label: "椰子",
                            value: "yezi",
                            deep: 2,
                            children: [
                                {
                                    label: "海南椰子",
                                    value: "yezi1",
                                    deep: 3
                                },
                                {
                                    label: "柬埔寨椰子",
                                    value: "yezi2",
                                    deep: 3
                                }
                            ]
                        },
                    ]
                },
                {
                    label: "温带水果",
                    value: "warmFruit",
                    deep: 1,
                    children: [
                        {
                            label: "苹果",
                            value: "apple",
                            deep: 2
                        },
                        {
                            label: "梨",
                            value: "pear",
                            deep: 2
                        }
                    ]
                }
            ]
        },
        {
            label: "水果1",
            value: "fruit1",
            deep: 0,
            children: [
                {
                    label: "热带水果1",
                    value: "hotFruit1",
                    deep: 1,
                    children: [
                        {
                            label: "香蕉1",
                            value: "banana1",
                            deep: 2,
                        },
                        {
                            label: "榴莲1",
                            value: "durian1",
                            deep: 2,
                        },
                    ]
                },
                {
                    label: "温带水果1",
                    value: "warmFruit1",
                    deep: 1,
                }
            ]
        },
    ]
    const levels = new Array(getMaxFloor(list)).fill(1)
    const currentLevelValue = new Map() // 当前等级选中项
    const currentLevelChildren = new Map() // 当前等级所有项
    const levelChildrenRef = useRef(currentLevelChildren) // 当前等级所有项ref
    const levelValueRef = useRef(currentLevelValue) // 当前等级选中项ref

    const valuesRef = useRef([])

    const [curValue, setCurValue] = useState(levelValueRef.current)
    const [levelChildren, setLevelChildren] = useState(levelChildrenRef.current)
    const [values, setValues] = useState(valuesRef.current)
    const [showValues, setShowValues] = useState([]) // 显示勾选的项的列表

    useEffect(() => {
        currentLevelChildren.set(0, list)
        levelChildrenRef.current = currentLevelChildren
        setLevelChildren(levelChildrenRef.current)
        // setLevelChild(list[0].children, 0)
    }, [])

    useEffect(() => {
        let t = []
        curValue.forEach(item => {
            item = item.filter(i => i)
            t.push(...item)
        })
        valuesRef.current = t
        setValues(valuesRef.current)
    }, [curValue])

    const setLevelChild = (children, deep) => {
        const target = cloneDeep(levelChildrenRef.current)
        const child = (children && children.length > 0 && children[0].children) || [] // 下下一级children
        const num = deep + 1
        target.set(num, children) // 设置下一级children
        levelChildrenRef.current = target // 设置下一级children
        setLevelChildren(levelChildrenRef.current) // 设置下一级children

        if (deep + 1 < levels.length - 1) {
            setTimeout(() => {
                setLevelChild(child, deep + 1) // 设置下下一级children
            })
        }
    }

    const setChildrenValues = (target, deep, i) => {
        let childValues = target.get(deep + 1) || []// 子级已选中元素
        const nextChildren = getChildren(list, deep, i) // 子级children
        const nextValues = (nextChildren && nextChildren.map(i => i.value)) || [] // 子级value
        childValues.push(...nextValues) // 添加子级value
        childValues = Array.from(new Set(childValues)) // 去重
        target.set(deep + 1, childValues) // 设置子级
        setCurValue(levelValueRef.current)

        nextChildren && nextChildren.length > 0 && nextChildren.forEach(item => {
            if (item.children && item.children.length > 0) {
                setChildrenValues(target, deep + 1, item.value)
            }
        })
    }

    const removeChildrenValues = (target, deep, i) => {
        let childValues = target.get(deep + 1) || []// 子级已选中元素
        const nextChildren = getChildren(list, deep, i) // 子级children
        const nextValues = (nextChildren && nextChildren.map(i => i.value)) || [] // 子级value

        nextValues.forEach(i => {
            const index = childValues.indexOf(i)
            childValues.splice(index, 1)
            setCurValue(levelValueRef.current)

            nextChildren.forEach(item => {
                if (item.children && item.children.length > 0) {
                    removeChildrenValues(target, deep + 1, item.value)
                }
            })
        })
    }

    const setCurrentValue = (value, values, deep, children) => {
        const target = cloneDeep(levelValueRef.current)
        target.set(deep, values)
        levelValueRef.current = target
        setCurValue(levelValueRef.current)


        if (values && values.includes(value)) {
            values &&
            values.length > 0 &&
            values.forEach(i => { // 遍历同层级元素 设置子级元素
                setChildrenValues(target, deep, i)
            })
        }  else {
            removeChildrenValues(target, deep, value)
        }
    }

    const valuesChange = (item) => {
        const {value, deep, children} = item
        let values = (curValue && curValue.get(deep)) || []
        // 处理当前元素
        if (values && values.length > 0 && values.includes(value)) {
            // 清除当前元素
            const index = values.indexOf(value)
            values.splice(index, 1)
        } else {
            // 添加当前元素
            values.push(value)
        }
        // 处理子级元素
        setLevelChild(children, deep)
        // 处理父级元素

        const parentDeal = (list, deep, value) => {
            const parent: any = getParent(list, deep, value)
            let target = cloneDeep(levelValueRef.current)
            const curChildsValues = target.get(deep)
            const tarChildren = parent.children || []
            const flag = tarChildren.every(i => curChildsValues ? !curChildsValues.includes(i.value) : true)

            if (!curChildsValues || flag) {
                const parentValues = target.get(deep - 1) || []
                const index = parentValues.indexOf(parent.value)
                if (index === -1) {
                    parentValues.push(parent.value)
                } else {
                    parentValues.splice(index, 1)
                }

                target.set(deep - 1, parentValues)
                levelValueRef.current = target
                setCurValue(levelValueRef.current)
            }
            if (parent && deep !== 0) {
                if (curChildsValues && !flag) {
                    const parentValues = target.get(deep - 1) || []
                    parentValues.push(parent.value)
                    const t = Array.from(new Set(parentValues))
                    target.set(deep - 1, t)
                    levelValueRef.current = target
                    setCurValue(levelValueRef.current)
                }
                console.log(parent.deep)
                parentDeal(list, parent.deep, parent.value)
            }
        }

        parentDeal(list, deep, value)

        values = Array.from(new Set(values))
        setCurrentValue(value, values, deep, children)
    }

    const showChildren = (item) => {
        const {value, deep, children} = item
        let values = (curValue && curValue.get(deep)) || []

        setLevelChild(children, deep)
        values = Array.from(new Set(values))
        setCurrentValue(value, values, deep, children)
    }

    const getTemplate = () => {
        const tarList = cloneDeep(list)

        const checkTarList = (tarList) => {
            tarList.forEach((item) => {
                if (
                    valuesRef.current &&
                    valuesRef.current.length > 0 &&
                    valuesRef.current.includes(item.value)
                ) {
                    item.selectd = true
                    if (item.children && item.children.length > 0) {
                        checkTarList(item.children)
                    }
                }
            })
        }
        checkTarList(tarList)
        setShowValues(() => tarList)
    }

    useEffect(() => {
        getTemplate()
    }, [values])

    const getTemp = () => {
        const temp = (list) => {
            if (list && list.length > 0) {
                const l = list.map((item, index) => {
                    if (item.selectd) {
                        const style = {
                            paddingLeft: `${8 * item.deep}px`,
                            fontSize: "12px",
                            width: "120px"
                        }
                        return (
                            <div key={index} style={style}>
                                {item.label}
                                {item.children && item.children.length > 0 && (
                                    temp(item.children)
                                )}
                            </div>
                        )
                    }
                })
                return l
            }
        }
        return temp(showValues)
    }
    return (
        <SelectModal>
            <Title>
                {title}
                {tips && (
                    <Tips>
                        tips: {tips}
                    </Tips>
                )}
            </Title>
            <SelectBox>
                {
                    levels.map((item, index) => {
                        const target = levelChildren && levelChildren.get(index)
                        const tValues = curValue.get(index) || []
                        return (
                            <ItemBox key={index}>
                                {
                                    target &&
                                    target.length > 0 &&
                                    target.map(item => {
                                        return (
                                            <Item key={item.value}>
                                                <Check
                                                    checked={tValues.includes(item.value)}
                                                    name={item.label}
                                                    value={item.value}
                                                    type={"checkbox"}
                                                    onChange={() => valuesChange(item)}
                                                />
                                                <Label
                                                    onClick={() => showChildren(item)}
                                                >
                                                  {item.label}
                                                </Label>
                                            </Item>
                                        )
                                    })}
                            </ItemBox>
                        )
                    })
                }
                <PreviewBox>
                    <Preview>已选择(预览)</Preview>
                    {getTemp()}
                </PreviewBox>
            </SelectBox>
            <BtnBox>
                <ConfirmBtn>确定</ConfirmBtn>
                <CancelBtn>取消</CancelBtn>
            </BtnBox>
        </SelectModal>
    )
}

CascadeSelect.defaultProps = {
    title: "选择内容",
    tips: "默认情况下，右侧卡片是左侧卡片第一项的子项"
}

export default CascadeSelect
