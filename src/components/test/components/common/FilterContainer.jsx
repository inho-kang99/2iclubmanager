import styled from 'styled-components';
import testStore from '../../../../store/testStore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CommonRadioSelect from './CommonRadioSelect';

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

const FilterContainer = () => {
  const { copyUsers, selectUser } = testStore();
  const filterRef = useRef();
  const filterNumbers = useMemo(() => {
    let arr = [];
    copyUsers[selectUser]?.forEach((i) => {
      let idArr = i?.filterId?.split('-');
      idArr.forEach((j) => {
        console.log(j);
        if (!arr.includes(j)) {
          arr.push(j);
        }
      });
    });

    arr.sort((a, b) => Number(a) - Number(b));
    filterRef.current = arr;
    return arr;
  }, [copyUsers, selectUser]);

  return (
    <Wrap>
      {filterNumbers.map((i) => (
        <React.Fragment key={`filterId${i}`}>
          {filterByNumber[i]}
        </React.Fragment>
      ))}
    </Wrap>
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
const DateBox = () => {
  return (
    <SelectBox type="date">
      <option disabled hidden selected>
        날짜
      </option>
    </SelectBox>
  );
};

const SelectBox = styled.select`
  width: 100px;
  height: 30px;
  border-radius: 10px;
`;
const filterByNumber = {
  1: (
    <SelectBox>
      <option disabled hidden selected>
        게임id
      </option>
    </SelectBox>
  ),
  2: <DateBox placeholder="날짜" />,
  3: <Radio />
};
export default FilterContainer;
