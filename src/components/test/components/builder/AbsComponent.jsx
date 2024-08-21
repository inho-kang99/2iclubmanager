import styled from 'styled-components';
import source from '../images/strikezoneFrame.png';

const AbsComponent = () => {
  const zones = [
    { label: '직구' },
    { label: '커/스' },
    { label: '슬/컷' },
    { label: '체/포' },
    { label: '싱/투' }
  ];
  return (
    <Wrap>
      <StanceLabel>우타자</StanceLabel>
      <ZoneContainer>
        {zones.map((i) => (
          <Zone key={`${i.label}ZoneKey`} label={i.label} />
        ))}
      </ZoneContainer>
    </Wrap>
  );
};

const Zone = ({ label }) => {
  return (
    <ZoneWrap>
      <img width={'100%'} height={'120px'} alt="img" src={source} />
      <Label>{label}</Label>
    </ZoneWrap>
  );
};

const Wrap = styled.div`
  display: flex;
  height: 140px;
`;

const ZoneContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const StanceLabel = styled.span`
  border: 1px solid #c8cace;
  width: 30px;
  height: 100%;
  white-space: pre-wrap;
  background-color: #d9d9d9;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
`;

const ZoneWrap = styled.div`
  width: 90px;
  height: 100%;
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
