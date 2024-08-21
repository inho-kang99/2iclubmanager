import { useEffect, useMemo } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import './test.css';
import styled from 'styled-components';
import testStore from '../../store/testStore';

import CommonDragItem from './components/common/CommonDragItem';
import UserContainer from './components/common/UserContainer';
import ButtonContainer from './components/common/ButtonContainer';
import { components } from './components/common/NumOfComponents';
import option from './option.json';
import FilterContainer from './components/common/FilterContainer';
const TestComponent = () => {
  const { setStoreState, selectUser, copyUsers } = testStore();

  useEffect(() => {
    const docRef = doc(db, 'drag', `info`);
    const unsubscribe = onSnapshot(docRef, async (querySnapshot) => {
      if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        Object.keys(data).forEach((target) => {
          setStoreState({ target, value: data[target] });
        });
        setStoreState({ target: 'copyUsers', value: data.users });
      } else {
        console.log('noDocs');
      }
    });
    return () => unsubscribe();
  }, [setStoreState]);

  const viewUser = useMemo(() => {
    return copyUsers[selectUser];
  }, [selectUser, copyUsers]);

  return (
    <Wrap>
      <FilterContainer />
      <ItemContainer id={option.BUILD_TOOL_CONTAINER_ID}>
        {viewUser?.map((item) => (
          <CommonDragItem
            key={`${item?.id}${selectUser}userComponent`}
            locationLeft={item?.locationLeft}
            locationTop={item?.locationTop}
            item={item}
            userKey={selectUser}
            id={item?.id}
          >
            {components[item?.componentNum]}
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
