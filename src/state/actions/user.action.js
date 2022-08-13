import { SET_SIGNER_INFO } from "./action.types";

export const SetSignerInfo = (payload) => ({
  type: SET_SIGNER_INFO,
  payload,
});
