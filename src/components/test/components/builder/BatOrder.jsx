import styled from 'styled-components';
import strikezone from '../images/strikezoneFrame.png';

// 타석별 데이터를 props로 받아서 표출
const BatOrder = () => {
  const BallRows = [1, 2, 3, 4, 5, 6, 7];
  return (
    <Wrap>
      <div className="row">
        <span>투</span>
        <span>29 김광현 좌</span>
      </div>
      <div className="row">
        <span>타</span>
        <span>29 김광현 좌</span>
      </div>
      <div className="row">
        <span>포</span>
        <span>29 김광현 좌</span>
      </div>
      <div className="row">
        <span className="left-cell">0B 0S</span>
        <span className="right-cell">2사 2루</span>
      </div>

      <div className="row">
        <span className="left-cell">4-1</span>
        <span className="right-cell"></span>
      </div>
      <div className="row title"></div>
      <div className="center-content">
        <div className="strike-zone">
          <img src={strikezone} width={'100%'} height={'100%'} />
        </div>
      </div>
      {BallRows.map((i) => (
        <BallRow key={`${i}BallRowKeys`} />
      ))}
    </Wrap>
  );
};

export default BatOrder;

const Wrap = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  border: 1px solid #c8cace;
  border-bottom: none;
  box-sizing: border-box;
  user-select: none;
  .row {
    height: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid #c8cace;
    .left-cell {
      width: 56px;
      border-right: 1px solid #c8cace;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right-cell {
      width: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .title {
    border-bottom: 2px solid #c8cace;
  }

  .center-content {
    width: 100%;
    height: 174px;
    display: flex;
    border-bottom: 1px solid #c8cace;
    justify-content: center;

    .strike-zone {
      width: 138px;
      height: 100%;
      position: relative;
      img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
      }
    }
  }

  .cell {
    width: 12.5%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #c8cace;
  }
`;

const BallRow = () => {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="row">
      {rows.map((item) => (
        <span key={`${item}cellKey`} className="cell"></span>
      ))}
    </div>
  );
};
