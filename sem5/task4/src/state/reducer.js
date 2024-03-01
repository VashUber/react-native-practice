export const reducer = (state, action) => {
  switch (action.type) {
    case "set-users":
      return {
        ...state,
        users: action.payload,
      };
  }

  return state;
};
