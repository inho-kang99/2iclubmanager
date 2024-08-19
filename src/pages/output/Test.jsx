import { useCommonStore } from '../../store';
import styled from 'styled-components';

export function Test() {
  const count = useCommonStore((state) => state.count);
  const setCount = useCommonStore((state) => state.setCount);

  const Div = styled.div`
    width: 4rem;
  `;
  return (
    <Div>
      <h1>COUNT : {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </Div>
  );
}

export default Test;
