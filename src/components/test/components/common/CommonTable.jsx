import styled from 'styled-components';

const dummyTableOptions = [
  { width: '', headLabel: '', valueKey: '' },
  { width: '', headLabel: '', valueKey: '' },
  { width: '', headLabel: '', valueKey: '' },
  { width: '', headLabel: '', valueKey: '' }
];

const dummyData = [{}, {}, {}, {}, {}];

const CommonTable = ({ options = dummyTableOptions, data = dummyData }) => {
  return (
    <Wrap>
      <colgroup>
        {options.map((item, index) => (
          <col width={item.width} key={`${index}tableColKey`} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {options.map((item, index) => (
            <th scope="col" key={`${index}tableHeadKey`}>
              {item.headLabel}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((fItem, fIndex) => (
          <tr key={`${fIndex}tableRowKey`}>
            {options.map((sItem, sIndex) => (
              <td scope="col" key={`tableRowCellKey${fIndex}=${sIndex}`}>
                {fItem[sItem.valueKey]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Wrap>
  );
};
export default CommonTable;

const Wrap = styled.table`
  box-sizing: border-box;
  min-width: 333px;
  border: 1px solid black;
  thead {
  }
  th {
    background-color: #c8cace;
  }
  tr {
    td {
      border: 1px solid #d9d9d9;
      text-align: center;
      &:first-child {
        background-color: #c8cace;
      }
    }
  }
`;
