import styled from 'styled-components';
import testStore from '../../../../store/testStore';
import { components, componentByFilter } from './NumOfComponents';
import { useCallback, useEffect, useRef, useState } from 'react';
import CommonDragWrap from './CommonDragWrap';
import option from '../../option.json';
import toast from 'react-hot-toast';

const Wrap = styled.div`
  padding: 20px;
  display: flex;
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
  const { selectUser, addItem } = testStore();
  const [mouseDown, setMouseDown] = useState(false);
  const [componentNum, setComponentNum] = useState(1);
  const [wrapLeft, setWrapLeft] = useState(0);
  const [wrapTop, setWrapTop] = useState(0);
  const dragRef = useRef();

  const MakeItem = (e, componentNum) => {
    setWrapLeft(e.clientX - option.DRAG_ITEM_WIDTH / 2);
    setWrapTop(e.clientY - option.DRAG_ITEM_HEIGHT / 2);
    setComponentNum(componentNum);
    setMouseDown(true);
  };

  const AddComponent = useCallback(
    (componentNum) => {
      const container = document.getElementById(option.BUILD_TOOL_CONTAINER_ID);
      let locationLeft = wrapLeft - container.offsetLeft;
      let locationTop = wrapTop - container.offsetTop;

      const maxLeft =
        container.getBoundingClientRect().width -
        dragRef.current.getBoundingClientRect().width;
      const maxTop =
        container.getBoundingClientRect().height -
        dragRef.current.getBoundingClientRect().height;

      if (locationLeft < 0) {
        locationLeft = 0;
      }

      if (locationLeft > maxLeft) {
        locationLeft = maxLeft;
      }
      if (locationTop < 0) {
        locationTop = 0;
      }
      if (locationTop > maxTop) {
        locationTop = maxTop;
      }
      addItem({
        item: {
          locationLeft,
          locationTop,
          componentNum,
          id: Math.random().toString(),
          filterId: componentByFilter[componentNum]
        },
        userKey: selectUser
      });
    },
    [addItem, selectUser, wrapLeft, wrapTop]
  );

  useEffect(() => {
    const container = document.getElementById(option.BUILD_TOOL_CONTAINER_ID);
    const item = dragRef.current;

    const moveHandler = (e) => {
      if (mouseDown) {
        setWrapLeft(e.clientX - item.getBoundingClientRect().width / 2);
        setWrapTop(e.clientY - item.getBoundingClientRect().height / 2);
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
          AddComponent(componentNum);
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
  }, [AddComponent, mouseDown, componentNum]);

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
          {components[componentNum]}
        </CommonDragWrap>
      )}
      {Object.keys(components).map((i) => (
        <UserButton
          key={`${i}addbutton`}
          onMouseDown={(e) => MakeItem(e, i)}
          onClick={() => AddComponent(i)}
        >
          {/* {components[i]} */}
          {i}
        </UserButton>
      ))}
    </Wrap>
  );
};

export default ButtonContainer;
