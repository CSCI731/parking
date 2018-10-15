import types from '../types' ;

const initState = {
  sings: [],
};

const signs = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SIGNS_BY_STREET:
      return {
        signs: payload,
      };
    default:
      return state;
  }
};

export default signs;

