const initialState = {
  id: 0,
  email: ""
};

export const SAVE_USER = "SAVE_USER";
export const CLEAR_USER = "CLEAR_USER";

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SAVE_USER:
      const { user_id, email } = payload;
      return { ...state, id: user_id, email };
    case CLEAR_USER:
      return { ...state, id: 0, email: "" };
    default:
      return { ...state };
  }
}
