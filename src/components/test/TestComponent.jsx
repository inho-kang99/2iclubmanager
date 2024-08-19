import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

import styled from 'styled-components';
import CommonDragItem from './components/common/CommonDragItem';
import testStore from '../../store/testStore';
import UserContainer from './components/common/UserContainer';
import { useEffect, useMemo } from 'react';
import ButtonContainer from './components/common/ButtonContainer';
import { components } from './components/common/NumOfComponents';
import option from './option.json';
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
      <UserContainer />
      <ItemContainer id={option.BUILD_TOOL_CONTAINER_ID}>
        {viewUser?.map((item) => (
          <CommonDragItem
            key={`${item?.id}${selectUser}userComponent`}
            locationLeft={item?.locationLeft}
            locationTop={item?.locationTop}
            item={item}
            lastList={viewUser}
            userKey={selectUser}
            id={item?.id}
          >
            {components[item?.componentNum]}
          </CommonDragItem>
        ))}
      </ItemContainer>
      <ButtonContainer />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  gap: 20px;
  user-select: none;
  padding: 20px;
`;

const ItemContainer = styled.div`
  width: 1200px;
  height: 900px;
  border-radius: 20px;
  border: 1px solid black;
  position: relative;
  overflow: hidden;
`;

export default TestComponent;
