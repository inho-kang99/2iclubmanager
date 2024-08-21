import AbsComponent from '../builder/AbsComponent';
import BallTable from '../builder/BallTable';
import BatOrder from '../builder/BatOrder';

export const components = {
  1: <BatOrder />,
  2: <AbsComponent />,
  3: <BallTable />
};

export const componentByFilter = {
  1: '1-2',
  2: '1-3-4',
  3: '1-2-4'
};
