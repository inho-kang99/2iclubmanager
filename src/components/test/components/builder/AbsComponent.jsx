import styled from 'styled-components';
import source from '../images/strikezoneFrame.png';

const AbsComponent = () => {
  return (
    <Wrap>
      <img width={'100%'} height={'120px'} alt="img" src={source} />
      <Label>직구</Label>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 90px;
  height: 140px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c8cace;
  border: 1px solid #c8cace;
`;

export default AbsComponent;
