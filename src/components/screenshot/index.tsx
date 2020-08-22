import * as React from 'react';
import catImg from "./img/cat.jpg"
import { ScreenshotBox, ImgBox, Img, Mask, Canvas } from "./components"

const { useState, useEffect, useRef } = React

const LEFT_TOP = "leftTop"
const RIGHT_TOP = "rightTop"
const LEFT_BOTTOM = "leftBottom"
const RIGHT_BOTTOM = "rightBottom"
const CENTER = "Center"

export interface ScreenshotProps {
    /** 获取图片参数 */
    onChange: (dataURL: string) => void
}

export const Screenshot:React.FC<ScreenshotProps> = (props: ScreenshotProps) => {
    const { onChange } = props

    const borderWidth: number = 24
    const minWidth: number = 100
    const minHeight: number = 100
    const canvasWidth: number = 400
    const canvasHeight: number = 400

    const [ctx, setCtx] = useState<any>({})
    const [canvas, setCanvas] = useState<any>({})
    const [start, setStart] = useState<boolean>(false)
    const [dataURL, setDataURL] = useState<string>("")

    const [startX, setStartX] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)
    const [startW, setStartW] = useState<number>(0)
    const [startH, setStartH] = useState<number>(0)
    const [startT, setStartT] = useState<number>(0)
    const [startL, setStartL] = useState<number>(0)
    const [direction, setDirection] = useState<string>("")

    const canvasRef: any = useRef()
    const imgRef: any = useRef()
    const maskRef: any = useRef()
    const imgBoxRef: any = useRef()
    const canvasOutRef: any = useRef()

    useEffect(() => {
        console.log("dataURL")
    }, [dataURL])

    const setTargetCanvas = () => {
        const canvas: any = canvasRef.current
        const ctx: any = canvas.getContext("2d")
        setCanvas(() => canvas)
        setCtx(() => ctx)
    }

    useEffect(() => {
        setTargetCanvas()
    }, [])

    const offsetDis = (obj: any) =>  {
        let l = 0, t = 0;
        while(obj) {
            l = l + obj.offsetLeft + obj.clientLeft;
            t = t + obj.offsetTop + obj.clientTop;
            obj = obj.offsetParent;
        }
        return {left: l, top: t};
    }

    const onMouseDown = (e: any) => {
        e.preventDefault()
        e.persist()
        const imgBox:HTMLDivElement = imgBoxRef.current!
        const canvasOutBox:HTMLDivElement = canvasOutRef.current!

        const outW = offsetDis(canvasOutBox).left
        const outH = offsetDis(canvasOutBox).top

        if (!start) {
            const startX = e.clientX
            const startY = e.clientY
            const mask: any = maskRef.current
            const startW: any = mask.clientWidth
            const startH: any = mask.clientHeight
            let direction: string = ""

            // 容器外层两个盒子都有30px的padding
            const diffX = startX - imgBox.offsetLeft - mask.offsetLeft - outW
            const diffY = startY - imgBox.offsetTop - mask.offsetTop - outH

            if (
                diffX > borderWidth &&
                diffY > borderWidth &&
                diffX < mask.clientWidth - borderWidth &&
                diffY < mask.clientHeight - borderWidth
            ) {
                direction = CENTER
            } else if (diffX <= borderWidth && diffY <= borderWidth) {
                direction = LEFT_TOP
            } else if (diffX >= mask.clientWidth - borderWidth && diffY <= borderWidth) {
                direction = RIGHT_TOP
            } else if (diffX <= borderWidth && diffY >= borderWidth) {
                direction = LEFT_BOTTOM
            } else if (
                diffX >= mask.clientWidth - borderWidth &&
                diffY >= mask.clientHeight - borderWidth
            ) {
                direction = RIGHT_BOTTOM
            }

            setStart(() => true)
            setStartX(() => startX)
            setStartY(() => startY)
            setStartW(() => startW)
            setStartH(() => startH)
            setDirection(() => direction)
            setStartT(() => mask.offsetTop)
            setStartL(() => mask.offsetLeft)
        }
    }


    const onMouseMove = async (e: any) => {
        e.preventDefault()
        const mask: any = maskRef.current
        const img: any = imgRef.current
        if (start) {
            let moveX =  e.clientX - startX
            let moveY = e.clientY - startY
            if (direction === LEFT_TOP) {
                const dLeftTopWidth = startW - moveX
                const dLeftTopHeight = startH - moveY
                const dLeft = startL + moveX
                if (dLeftTopWidth < minWidth || dLeftTopHeight < minHeight) return
                if ((mask.offsetLeft + mask.clientWidth) > img.clientWidth) return
                const dTop = startT + moveY
                mask.style.top = dTop <= 0 ? 0 : dTop  + "px"
                mask.style.left = dLeft <= 0 ? 0 : dLeft + "px"

                mask.style.width = dLeftTopWidth < minWidth ? minWidth : dLeftTopWidth + "px"
                mask.style.height = dLeftTopHeight < minHeight ? minHeight : dLeftTopHeight + "px"
            }
            if (direction === LEFT_BOTTOM) {
                const dLeft = startL + moveX
                const dLeftBottomWidth = startW - moveX
                const dLeftBottomHeight = startH + moveY
                if (dLeftBottomWidth < minWidth || dLeftBottomHeight < minHeight) return
                if ((mask.offsetTop + mask.clientHeight) > img.clientHeight) return
                mask.style.left = dLeft <= 0 ? 0 : dLeft + "px"
                mask.style.width = dLeftBottomWidth < minWidth ? minWidth : dLeftBottomWidth + "px"
                mask.style.height = dLeftBottomHeight < minHeight ? minHeight : dLeftBottomHeight + "px"
            }
            if (direction === RIGHT_BOTTOM) {
                const dRightBottomWidth = startW + moveX
                const dRightBottomHeight = startH + moveY
                if (dRightBottomWidth < minWidth || dRightBottomHeight < minHeight) return
                if ((mask.offsetTop + mask.clientHeight) > img.clientHeight) return
                if ((mask.offsetLeft + mask.clientWidth) > img.clientWidth) return
                mask.style.width = dRightBottomWidth < minWidth ? minWidth : dRightBottomWidth + "px"
                mask.style.height = dRightBottomHeight < minHeight ? minHeight : dRightBottomHeight + "px"
            }
            if (direction === RIGHT_TOP) {
                const dTop = startT + moveY
                const dRightTopWidth = startW + moveX
                const dRightTopHeight = startH - moveY
                if (dRightTopWidth < minWidth || dRightTopHeight < minHeight) return
                if ((mask.offsetLeft + mask.clientWidth) > img.clientWidth) return
                mask.style.top = dTop <= 0 ? 0 : dTop + "px"
                mask.style.width = dRightTopWidth < minWidth ? minWidth : dRightTopWidth + "px"
                mask.style.height = dRightTopHeight < minHeight ? minHeight : dRightTopHeight + "px"
            }

            if (direction === CENTER) {
                // 中间移动的
                const dLeft = startL + moveX
                const dTop = startT + moveY
                const mTop = img.clientHeight - mask.clientHeight
                const mLeft = img.clientWidth - mask.clientWidth
                const tTop = dTop > mTop
                const tLeft = dLeft > mLeft

                mask.style.top = (dTop <= 0 ? 0 : tTop ? mTop : dTop) + "px"
                mask.style.left = dLeft <= 0 ? 0 : tLeft ? mLeft : dLeft + "px"
            }
        }
    }

    const onMouseUp = async (e: any) => {
        e.preventDefault()
        const mask: any = maskRef.current
        setStart(() => false)
        setStartT(() => mask.offsetTop)
        setStartL(() => mask.offsetLeft)
        setCanvasImg()
    }

    const onMouseLeave = async (e: any) => {
        e.preventDefault()
        const mask: any = maskRef.current

        setStart(() => false)
        setStartT(() => mask.offsetTop)
        setStartL(() => mask.offsetLeft)
        setCanvasImg()
    }

    const setCanvasImg = () => {

        const mask: any = maskRef.current
        const img:any = imgRef.current
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            mask.offsetLeft * 2,
            mask.offsetTop * 2,
            mask.clientWidth * 2,
            mask.clientHeight * 2,
            0, 0, canvas.width, canvas.height)
        const dataURL:string = canvas.toDataURL("image/jpeg", 1.0);
        onChange && onChange(dataURL)

        setCtx(() => ctx)
        setDataURL(() => dataURL)
    }

    return (
        <ScreenshotBox ref={canvasOutRef}>
            <ImgBox ref={imgBoxRef}>
                <Img
                    id={"img"}
                    src={catImg}
                    alt=""
                    ref={imgRef}
                    onMouseMove={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={onMouseUp}
                />
                <Mask
                    ref={maskRef}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                />
            </ImgBox>
            <ImgBox>
                <Canvas
                    width={canvasWidth}
                    height={canvasHeight}
                    id={"canvas"}
                    ref={canvasRef}
                />
            </ImgBox>
        </ScreenshotBox>
    )
}

Screenshot.defaultProps = {
    onChange: (dataURL) => {}
}

export default Screenshot;

