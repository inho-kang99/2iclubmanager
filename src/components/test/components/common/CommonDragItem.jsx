import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CommonDragWrap from './CommonDragWrap';

import option from '../../option.json';
import testStore from '../../../../store/testStore';

// eslint-disable-next-line react/prop-types
export const CrossIcon = ({ fill }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 5L15 15" stroke={fill || '#242424'} />
    <path d="M15 5L5 15" stroke={fill || '#242424'} />
  </svg>
);

const CommonDragItem = ({
  children,
  locationLeft,
  locationTop,
  userKey,
  id
}) => {
  const { setLocation, removeItem } = testStore();
  const wrapRef = useRef();
  const removeRef = useRef();

  const [mouseDown, setMouseDown] = useState(false);
  const clickX = useRef(0);
  const clickY = useRef(0);
  const clickOffset = useRef({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });

  const RemoveItem = () => {
    removeItem({ id, userKey });
  };

  useEffect(() => {
    const instance = wrapRef.current;
    const downHandler = (e) => {
      const wrap = wrapRef.current.getBoundingClientRect();

      if (instance.contains(e.target) && e.target !== removeRef.current) {
        clickOffset.current = {
          top: e.offsetY,
          left: e.offsetX,
          right: wrap.width - e.offsetX,
          bottom: wrap.height - e.offsetY
        };
        clickX.current = e.clientX;
        clickY.current = e.clientY;
      }

      document.addEventListener('mouseup', upHandler);
      document.addEventListener('mousemove', moveHandler);
    };

    const moveHandler = (e) => {
      if (clickX.current && clickY.current) {
        setMouseDown(true);
        const moveX = e.clientX - clickX.current;
        const moveY = e.clientY - clickY.current;

        if (moveX && moveY) {
          const container = document
            .getElementById(option.BUILD_TOOL_CONTAINER_ID)
            .getBoundingClientRect();
          const wrap = wrapRef.current.getBoundingClientRect();
          const maxX = container.width - wrap.width;
          const maxY = container.height - wrap.height;

          let moveXValue = locationLeft + moveX;
          let moveYValue = locationTop + moveY;
          if (moveXValue < 0) {
            moveXValue = 0;
          }
          if (moveXValue > maxX) {
            moveXValue = maxX;
          }
          if (moveYValue < 0) {
            moveYValue = 0;
          }
          if (moveYValue > maxY) {
            moveYValue = maxY;
          }
          setLocation({ id, userKey, x: moveXValue, y: moveYValue });
        }
      }
    };

    const upHandler = async () => {
      clickX.current = 0;
      clickY.current = 0;
      clickOffset.current = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      };
      setMouseDown(false);
      document.removeEventListener('mouseup', upHandler);
      document.removeEventListener('mousemove', moveHandler);
    };

    instance.addEventListener('mousedown', downHandler);

    return () => {
      instance?.removeEventListener('mousedown', downHandler);
    };
  }, [locationLeft, locationTop, id, userKey, setLocation]);

  return (
    <CommonDragWrap
      $mouseDown={mouseDown}
      $left={locationLeft}
      $top={locationTop}
      ref={wrapRef}
    >
      <Container>{children}</Container>
      <IconBox ref={removeRef} onClick={RemoveItem}>
        <CrossIcon />
      </IconBox>
    </CommonDragWrap>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const IconBox = styled.span`
  position: absolute;
  right: 2px;
  top: 2px;
  cursor: pointer;
`;

export default CommonDragItem;
