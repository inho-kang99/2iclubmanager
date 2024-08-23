import create from 'zustand';

const testStore = create((set) => ({
  count: 1,
  categorys: [],
  selectedPage: '',
  pageComponents: [],
  copyPageComponents: [],
  selectUser: '',
  filterState: {},
  setStoreState: ({ target, value }) => set(() => ({ [target]: value })),
  addItem: ({ item }) =>
    set((state) => {
      let copyPageComponents = [...state.copyPageComponents, item];

      return { copyPageComponents };
    }),
  removeItem: ({ id, index }) =>
    set((state) => {
      const copyPageComponents = state.copyPageComponents.filter(
        (_, filterIndex) => index !== filterIndex
      );

      return { copyPageComponents };
    }),
  setLocation: ({ x, y, index }) =>
    set((state) => {
      let copyPageComponents = deepCopy(state.copyPageComponents);
      copyPageComponents[index].positionX = x;
      copyPageComponents[index].positionY = y;

      // [
      //   ...state.copyPageComponents
      //   [userKey]: state.copyPageComponents[userKey].map((user) =>
      //     user.id === id ? { ...user, positionX: x, positionY: y } : user
      //   )
      // ];
      return { copyPageComponents };
    }),
  deletePageContent: () => set({ copyPageComponents: [] }),
  setFilterState: ({ stateKey, value }) =>
    set((state) => {
      const filterState = {
        ...state.filterState,
        [stateKey]: value
      };
      return { filterState };
    })
}));

export default testStore;

function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const arrCopy = [];
    obj.forEach((item, index) => {
      arrCopy[index] = deepCopy(item);
    });
    return arrCopy;
  }

  const objCopy = {};
  Object.keys(obj).forEach((key) => {
    objCopy[key] = deepCopy(obj[key]);
  });

  return objCopy;
}
