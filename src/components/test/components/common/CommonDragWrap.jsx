import styled from 'styled-components';

const CommonDragWrap = styled.div.attrs((props) => ({
  style: {
    top: `${props.$top}px`,
    left: `${props.$left}px`,
    zIndex: props.$mouseDown ? 10 : 6,
    opacity: props.$blur ? 0.6 : 1
  }
}))`
  color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  background-color: white;
  gap: 10px;
  overflow: hidden;
`;

export default CommonDragWrap;
