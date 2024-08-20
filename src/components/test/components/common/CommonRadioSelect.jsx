import styled from 'styled-components';

const CommonRadioSelect = ({ options, handler, checkedValue, direction }) => {
  const option = Array.isArray(options) ? options : [];

  return (
    <>
      <Wrap direction={direction}>
        {option?.map((i, index) => {
          const { label, value } = i;
          return (
            <RadioContainer
              key={`${index}_${value}`}
              $select={value === checkedValue}
            >
              <RadioCircle
                $select={value === checkedValue}
                onClick={() => handler(value)}
              >
                <InnerCircle />
              </RadioCircle>
              <span>{label}</span>
            </RadioContainer>
          );
        })}
      </Wrap>
    </>
  );
};

export default CommonRadioSelect;

const Wrap = styled.div`
  display: flex;
  gap: 12px;
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 6px;
  color: ${(p) => (p.$select ? 'black' : '#888C95')};
  align-items: center;
  font-size: 16px;
  font-weight: 500;
`;

const RadioCircle = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(p) => (p.$select ? 'red' : 'none')};
  border: ${(p) => (p.$select ? 'none' : '2px solid #323741 ')};

  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const InnerCircle = styled.div`
  display: flex;
  width: 8px;
  height: 8px;
  background-color: #22242a;
  border-radius: 50%;
`;
