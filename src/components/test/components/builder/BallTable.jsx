import CommonTable from '../common/CommonTable';

const BallTable = () => {
  const tableOptions = [
    { width: '20%', headLabel: '구질', valueKey: 'title' },
    { width: '', headLabel: '최저', valueKey: 'minimum' },
    { width: '', headLabel: '최고', valueKey: 'maximum' },
    { width: '', headLabel: '평균', valueKey: 'average' }
  ];

  const dummyData = [
    {
      title: '직구',
      minimum: 0,
      maximum: 0,
      average: 0
    },
    {
      title: '커/스',
      minimum: 1,
      maximum: 2,
      average: 1.5
    },
    {
      title: '슬/컷',
      minimum: 1,
      maximum: 1,
      average: 1
    },
    {
      title: '체/포',
      minimum: 2,
      maximum: 2,
      average: 2
    },
    {
      title: '싱/투',
      minimum: 1,
      maximum: 5,
      average: 3
    }
  ];
  return <CommonTable options={tableOptions} data={dummyData} />;
};

export default BallTable;
