import styled from 'styled-components';
import testStore from '../../../../store/testStore';
import { componentById } from './NumOfComponents';
import { useCallback, useEffect, useRef, useState } from 'react';
import CommonDragWrap from './CommonDragWrap';
import option from '../../option.json';
import toast from 'react-hot-toast';
import BuilderDatas from '../builder/BuilderDatas';

const Wrap = styled.div`
  padding: 20px;
  display: flex;
  min-width: 140px;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
  border-radius: 10px;
`;
const UserButton = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ selected }) => selected && '#d9d9d9'};
`;

const ButtonContainer = () => {
  const { addItem } = testStore();
  const [mouseDown, setMouseDown] = useState(false);
  const [clickComponent, setClickComponent] = useState(1);
  const [wrapLeft, setWrapLeft] = useState(0);
  const [wrapTop, setWrapTop] = useState(0);
  const dragRef = useRef();
  const { components = [] } = BuilderDatas();

  const MakeItem = (e, clickComponent) => {
    setWrapLeft(e.clientX - option.DRAG_ITEM_WIDTH / 2);
    setWrapTop(e.clientY - option.DRAG_ITEM_HEIGHT / 2);
    setClickComponent(clickComponent);
    setMouseDown(true);
  };

  const AddComponent = useCallback(
    (clickComponent) => {
      const container = document.getElementById(option.BUILD_TOOL_CONTAINER_ID);
      let positionX = Math.floor(wrapLeft - container.offsetLeft);
      let positionY = Math.floor(wrapTop - container.offsetTop);

      const maxLeft =
        container.getBoundingClientRect().width -
        dragRef.current.getBoundingClientRect().width;
      const maxTop =
        container.getBoundingClientRect().height -
        dragRef.current.getBoundingClientRect().height;

      if (positionX < 0) {
        positionX = 0;
      }

      if (positionX > maxLeft) {
        positionX = maxLeft;
      }
      if (positionY < 0) {
        positionY = 0;
      }
      if (positionY > maxTop) {
        positionY = maxTop;
      }

      const item = { ...clickComponent };
      item.positionX = positionX;
      item.positionY = positionY;

      addItem({
        item
      });
    },
    [addItem, wrapLeft, wrapTop]
  );

  useEffect(() => {
    const container = document.getElementById(option.BUILD_TOOL_CONTAINER_ID);
    const item = dragRef.current;

    const moveHandler = (e) => {
      if (mouseDown) {
        setWrapLeft(
          Math.floor(e.clientX - item.getBoundingClientRect().width / 2)
        );
        setWrapTop(
          Math.floor(e.clientY - item.getBoundingClientRect().height / 2)
        );
      }
    };
    const upHandler = (e) => {
      // mouse  범위 => container.offsetLeft < x  < container.offsetLeft + container width
      if (mouseDown) {
        const xCheck =
          container.offsetLeft <= e.clientX &&
          e.clientX <=
            container.offsetLeft + container.getBoundingClientRect().width;
        const yCheck =
          container.offsetTop <= e.clientY &&
          e.clientY <=
            container.offsetLeft + container.getBoundingClientRect().height;
        if (xCheck && yCheck) {
          AddComponent(clickComponent);
        } else {
          toast.error('놓을 수 없습니다.');
        }
        setMouseDown(false);
      }
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };
  }, [AddComponent, mouseDown, clickComponent]);

  return (
    <Wrap>
      {mouseDown && (
        <CommonDragWrap
          ref={dragRef}
          $mouseDown={mouseDown}
          $blur={mouseDown}
          $left={wrapLeft}
          $top={wrapTop}
        >
          {componentById[clickComponent?.componentCode]}
        </CommonDragWrap>
      )}
      {components.map((i) => (
        <UserButton
          key={`${i?.componentCode}addbutton`}
          onMouseDown={(e) => MakeItem(e, i)}
          onClick={() => AddComponent(i)}
        >
          {i?.componentCode}
        </UserButton>
      ))}
    </Wrap>
  );
};

export default ButtonContainer;
