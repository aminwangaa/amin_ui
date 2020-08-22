import React from "react"
import styled from "styled-components";
import { ScreenshotProps } from "./index"


export const ScreenshotBox = styled.div`
    position: relative;
    display: flex;
    justify-content: space-evenly;
`

export const ImgBox = styled.div`
    position: relative;
    display: inline-block;
    margin-top: 1px;
    width: 200px;
    height: 200px;
    border: 1px solid #efefef;
    overflow: hidden;
`

export const Img = styled.img`
    position: relative;
    display: inline-block;
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    user-select: none;
    user-focus: none;
`

export const Mask = styled.div`
    position: absolute;
    height: 200px;
    width: 200px;
    max-width: 200px;
    max-height: 200px;
    top: 0;
    left: 0;
    background: linear-gradient(#d9d9d9, #d9d9d9) left top,
    linear-gradient(#d9d9d9, #d9d9d9) left top,
    linear-gradient(#d9d9d9, #d9d9d9) right top,
    linear-gradient(#d9d9d9, #d9d9d9) right top,
    linear-gradient(#d9d9d9, #d9d9d9) left bottom,
    linear-gradient(#d9d9d9, #d9d9d9) left bottom,
    linear-gradient(#d9d9d9, #d9d9d9) right bottom,
    linear-gradient(#d9d9d9, #d9d9d9) right bottom;
    background-repeat: no-repeat;
    background-size: 3px 24px, 24px 3px;
    cursor: grab;
}
`

export const Canvas = styled.canvas`
    width: 200px;
    height: 200px;
`
