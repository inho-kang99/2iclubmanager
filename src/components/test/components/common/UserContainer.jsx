import styled from 'styled-components';
import testStore from '../../../../store/testStore';
import ReactToPrint from 'react-to-print';
import { useCallback } from 'react';

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
  white-space: pre-line;
  text-align: center;
`;

const UserContainer = () => {
  const { selectedPage, setStoreState, deletePageContent, copyPageComponents } =
    testStore();
  const dummy = [
    { pageId: 'LTBENCH1', pageName: '롯데 \n시즌기록1' },
    { pageId: 'LTBENCH2', pageName: '롯데 \n시즌기록2' }
  ];
  const printContent = document.getElementById('printArea');
  const SaveLocations = useCallback(async () => {
    const payload = {
      pageId: 'BENCH1',
      pageName: '벤치리포트-시즌기록',
      userId: '롯데1군',
      componentList: copyPageComponents
    };
  }, [copyPageComponents]);

  const DeleteLocations = useCallback(async () => {
    deletePageContent();
  }, [deletePageContent]);

  return (
    <Wrap>
      {dummy.map((item, index) => (
        <UserButton
          selected={item.pageId === selectedPage}
          onClick={() => {
            setStoreState({ target: 'selectedPage', value: item.pageId });
          }}
          key={`${index}${item.pageId}`}
        >
          {item.pageName}
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
