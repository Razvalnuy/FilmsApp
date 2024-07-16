import { emptyUserState, USER_TYPE } from "../utils/utils";

const initialUserState = {
  user: emptyUserState,
};

export function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case USER_TYPE.token:
      return { ...state, user: { ...state.user, token: action.token } };
    case USER_TYPE.id:
      return { ...state, user: { ...state.user, id: action.id } };
    default:
      return state;
  }
}
