import './test.css';
import styled from 'styled-components';
import testStore from '../../store/testStore';

import CommonDragItem from './components/common/CommonDragItem';
import UserContainer from './components/common/UserContainer';
import ButtonContainer from './components/common/ButtonContainer';
import { componentById } from './components/common/NumOfComponents';
import option from './option.json';
import FilterContainer from './components/common/FilterContainer';
import BuilderDatas from './components/builder/BuilderDatas';
import { useEffect } from 'react';

const TestComponent = () => {
  const { copyPageComponents, setStoreState } = testStore();
  const { pageData = {} } = BuilderDatas();

  useEffect(() => {
    if (pageData.componentList) {
      setStoreState({
        target: 'copyPageComponents',
        value: pageData.componentList
      });
    }
  }, [setStoreState, pageData]);

  return (
    <Wrap>
      <FilterContainer />
      <ItemContainer id={option.BUILD_TOOL_CONTAINER_ID}>
        {copyPageComponents?.map((item, index) => (
          <CommonDragItem
            key={`${index}userComponent`}
            positionX={item?.positionX}
            positionY={item?.positionY}
            item={item}
            pageComponentId={item?.pageComponentId}
            index={index}
          >
            {componentById[item?.componentCode]}
          </CommonDragItem>
        ))}
      </ItemContainer>
      <ButtonContainer />
      <UserContainer />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  gap: 20px;
  user-select: none;
  padding: 20px;
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
  div {
    box-sizing: border-box;
  }
`;

const ItemContainer = styled.div`
  width: 1000px;
  height: 900px;
  border: 1px solid black;
  position: relative;
  overflow: hidden;
`;

export default TestComponent;
