import styled from "styled-components"

export const ProgressContainer = styled.div`
   display: block;
`

export const LineProgress = styled.div`
   display: block;
`

export const ProgressBox = styled.div`
  display: inline-block;
  width: 200px;
  border-radius: 100px;
`

export const ProgressL = styled.div`
  width: 120px;
  height: 8px;
  border-radius: 100px;
  text-align: right;
  padding-right: 4px;
  color: #fff;
  font-size: 12px;
`

export const Num = styled.span`
  display: inline-block;
  margin-left: 8px;
  font-size: 12px;
`

export const CircleProgress = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`

export const CircleProgressInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Dashboard = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`

export const DashboardInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`
