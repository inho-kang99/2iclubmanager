import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import testStore from '../../../../store/testStore';

const BuilderDatas = () => {
  const { selectedPage } = testStore();
  const { data: systemCode } = useQuery({
    queryKey: ['filter'],
    queryFn: () =>
      axios
        .get('http://211.188.52.31:8080/api/systemcode/searchall')
        .then((res) => res.data.data)
  });

  const { data: components } = useQuery({
    queryKey: ['filter'],
    queryFn: () =>
      axios
        .get('http://211.188.52.31:8080/api/component/searchprototype')
        .then((res) => res.data.data)
  });

  const filters = useMemo(() => {
    return systemCode?.filter((i) => i?.codeCategory === 'Filter');
  }, [systemCode]);

  // const components = useMemo(() => {
  //   return systemCode?.filter((i) => i?.codeCategory === 'Component');
  // }, [systemCode]);

  const { data: pageData } = useQuery({
    queryKey: ['pageData', selectedPage],
    queryFn: () =>
      axios
        .get(`http://211.188.52.31:8080/api/page/search?pageId=${selectedPage}`)
        .then((res) => res.data.data)
  });

  return {
    filters,
    components,
    pageData
  };
};

export default BuilderDatas;
