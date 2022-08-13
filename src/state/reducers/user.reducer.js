import { SET_SIGNER_INFO } from "../actions/action.types";

const init = {
  signer: {},
};

const UserReducers = (state = init, action) => {
  switch (action.type) {
    case SET_SIGNER_INFO:
      return { 
        ...state, 
        signer: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducers;
