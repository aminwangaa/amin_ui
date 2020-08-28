import styled from "styled-components"

export const SelectModal = styled.div`
  padding: 0 0 24px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #efefef;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(31,56,88,.15);
`

export const Title = styled.div`
  margin: 0;
  border-bottom: none;
  padding: 16px 24px;
  font-size: 14px;
`

export const Tips = styled.div`
  font-size: 12px;
  color: #666;
`

export const SelectBox = styled.div`
  display: flex;
  width: 750px;
  overflow-x: auto;
  margin: 0 auto;
`

export const ItemBox = styled.div`
  display: inline-block;
  width: 150px;
  height: 300px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  min-height: 20px;
  min-width: 150px;
  overflow: auto;
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
`

export const Check = styled.input`
    margin-left: 16px;
`

export const Label = styled.span`
  margin-left: 8px;
  display: inline-block;
  min-width: 100px;
  font-size: 12px;
`

export const PreviewBox = styled.div`
  display: inline-block;
  padding: 8px;
  min-width: 200px;
  width: 200px;
  height: 300px;
  border: 1px solid #efefef;
  box-sizing: border-box;
  min-height: 20px;
  overflow: auto;
`

export const Preview = styled.div`
  font-size: 12px;
  margin-bottom: 4px;
`

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0 0;
`

export const ConfirmBtn = styled.button`
  padding: 8px 24px;
  margin-right: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 6px;
  color: #ffffff;
  background: #1890ff;
  font-size: 12px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }
`

export const CancelBtn = styled.button`
  padding: 8px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  border-radius: 6px;
  color: #1890ff;
  background: #ffffff;
  border: 1px solid #1890ff;
  font-size: 12px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }
`
