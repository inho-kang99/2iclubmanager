import styled from 'styled-components';
import testStore from '../../../../store/testStore';
import React, { useEffect, useMemo, useState } from 'react';
import CommonRadioSelect from './CommonRadioSelect';
import CommonDatePicker from './CommonDatePicker';
import BuilderDatas from '../builder/BuilderDatas';

const Wrap = styled.div`
  padding: 20px;
  display: flex;
  min-width: 300px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  border-radius: 10px;
`;

// => { gameId : null, gameDate : null, ballKind : null, tb_sc : null }

// 컴포넌트들의 필터 번호에 해당하는 필터들 렌더링
// 필터들은 지정된 저장소에 렌더링 될 때 마다 미리 정의된 state를 조작
// 컴포넌트들은 조작되는 state를 각각 필요한 만큼 사용
// 필터 번호 : 지정 state 대응
// filterRow => { id:1, type:select, stateKey:gamdId }

const FilterContainer = () => {
  // 필터 영역이 렌더링 될 때, user정보 + 페이지 정보의 조합으로 공용 저장소의 state 추가
  // 각각의 필터 마다 가리키는 state 변수 명 따로 존재
  // user정보 + page정보
  const { copyPageComponents, filterState } = testStore();
  const { filters = [] } = BuilderDatas();
  const filterRows = useMemo(() => {
    const map = new Map();

    copyPageComponents?.forEach((i) => {
      let idArr = i?.codeValue?.split('-');

      idArr?.forEach((j) => {
        map.set(j, j);
      });
    });

    return filters.filter((i) => map.has(i?.codeId));
  }, [copyPageComponents, filters]);

  // const filterObject = useMemo(() => {
  //   const obj = {};
  //   filters.forEach((i) => {
  //     const key = i.stateKey;

  //     obj[key] = null;
  //   });
  //   return obj;
  // }, [filters]);

  return (
    <Wrap>
      {filterRows.map((i) => (
        <React.Fragment key={`filterId${i?.codeId}`}>
          {filterComponents[i?.codeType]?.({ stateKey: i?.stateKey })}
        </React.Fragment>
      ))}
    </Wrap>
  );
};

const filterComponents = {
  SELECT: (props) => <FilterSelect {...props} />,
  RADIO: (props) => <Radio {...props} />,
  DATE: (props) => <CommonDatePicker {...props} />
};

const dummyOptions = [
  { label: '1번게임', value: 1 },
  { label: '2번게임', value: 2 },
  { label: '3번게임', value: 3 },
  { label: '4번게임', value: 4 }
];

const FilterSelect = ({ stateKey, options }) => {
  const { filterState, setFilterState } = testStore();

  const value = useMemo(() => filterState[stateKey], [filterState, stateKey]);

  const handler = (value) => {
    setFilterState({ stateKey, value });
  };

  return (
    <SelectBox
      value={value}
      onSelect={(e) => {
        console.log(e);
      }}
      onChange={(e) => {
        handler(e.target.value);
      }}
    >
      {dummyOptions.map((i) => (
        <option key={`${i.value}optionKey`}>{i.label}</option>
      ))}
    </SelectBox>
  );
};

const Radio = () => {
  const [value, setValue] = useState('t');
  return (
    <CommonRadioSelect
      options={[
        { label: '초', value: 't' },
        { label: '말', value: 'b' }
      ]}
      checkedValue={value}
      handler={setValue}
    />
  );
};

const SelectBox = styled.select`
  width: 100px;
  height: 30px;
  border-radius: 10px;
`;

export default FilterContainer;
