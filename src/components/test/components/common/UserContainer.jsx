import styled from 'styled-components';
import testStore from '../../../../store/testStore';
import ReactToPrint from 'react-to-print';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCallback } from 'react';
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

const UserContainer = () => {
  const { selectUser, copyUsers } = testStore();
  const dummy = ['user1', 'user2', 'user3'];
  const printContent = document.getElementById('printArea');
  const SaveLocations = useCallback(async () => {
    const docRef = doc(db, 'drag', `info`);
    const docTarget = `users.${selectUser}`;

    await updateDoc(docRef, {
      [docTarget]: copyUsers[selectUser]
    });
    toast.success('저장이 완료되었습니다.');
  }, [copyUsers, selectUser]);
  const DeleteLocations = useCallback(async () => {
    const docRef = doc(db, 'drag', `info`);
    const docTarget = `users.${selectUser}`;

    await updateDoc(docRef, {
      [docTarget]: []
    });
    toast.success('삭제가 완료되었습니다.');
  }, [selectUser]);

  return (
    <Wrap>
      {dummy.map((item, index) => (
        <UserButton
          selected={item === selectUser}
          onClick={() => {
            const docRef = doc(db, 'drag', `info`);
            updateDoc(docRef, {
              selectUser: item
            });
          }}
          key={`${index}${item}`}
        >
          {item}
        </UserButton>
      ))}
      <UserButton style={{ marginTop: 'auto' }} onClick={SaveLocations}>
        이동 저장
      </UserButton>
      <UserButton style={{ marginTop: 'auto' }} onClick={DeleteLocations}>
        전체 삭제
      </UserButton>
      <ReactToPrint
        trigger={() => (
          <UserButton style={{ marginTop: 'auto' }}>프린트</UserButton>
        )}
        content={() => printContent}
      />
    </Wrap>
  );
};

export default UserContainer;
