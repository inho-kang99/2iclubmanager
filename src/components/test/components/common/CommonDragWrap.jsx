import styled from 'styled-components';

const CommonDragWrap = styled.div.attrs((props) => ({
  style: {
    top: `${props.$top}px`,
    left: `${props.$left}px`,
    zIndex: props.$mouseDown ? 10 : 6
  }
}))`
  color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  padding: 30px;
  background-color: white;
  border: 1px solid black;
  opacity: 0.8;
  border-radius: 16px;
  gap: 10px;
  overflow: hidden;
`;

export default CommonDragWrap;
