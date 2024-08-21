import styled from 'styled-components';
import source from '../images/strikezoneFrame.png';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CommonStrikeZone = ({ children }) => {
  return (
    <Wrap>
      <img width={'100%'} height={'100%'} alt="zone" src={source} />
      {children}
    </Wrap>
  );
};

export default CommonStrikeZone;
