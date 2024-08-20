import create from 'zustand';

const testStore = create((set) => ({
  count: 1,
  categorys: [],
  users: { user1: [], user2: [], user3: [] },
  copyUsers: { user1: [], user2: [], user3: [] },
  selectUser: '',
  setStoreState: ({ target, value }) => set(() => ({ [target]: value })),
  addItem: ({ item, userKey }) =>
    set((state) => {
      let copyUsers = {
        ...state.copyUsers,
        [userKey]: [...state.copyUsers[userKey], item]
      };
      return { copyUsers };
    }),
  removeItem: ({ userKey, id }) =>
    set((state) => {
      const copyUsers = {
        ...state.copyUsers,
        [userKey]: state.copyUsers[userKey].filter((i) => i.id !== id)
      };

      return { copyUsers };
    }),
  setLocation: ({ id, userKey, x, y }) =>
    set((state) => {
      const copyUsers = {
        ...state.copyUsers,
        [userKey]: state.copyUsers[userKey].map((user) =>
          user.id === id ? { ...user, locationLeft: x, locationTop: y } : user
        )
      };

      return { copyUsers };
    })
}));

export default testStore;
