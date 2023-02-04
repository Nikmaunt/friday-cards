const initialState = {
  isSignIn: true,
  isSignUp: false,
};

export const appReducer = (state = initialState, action: AppActionCreatorsType): InitialStateType => {
  switch (action.type) {
    case AppActions.ToggleIsSignUp:
      return { ...state, isSignUp: !state.isSignUp };
    default:
      return state;
  }
};

//////////////////////// ACTIONS CREATORS /////////////////////
export const toggleIsSignUp = () => ({ type: AppActions.ToggleIsSignUp } as const);

//////////////////////// types  ///////////////////////////////
export type InitialStateType = {
  isSignIn: boolean;
  isSignUp: boolean;
};

export type AppActionCreatorsType = ReturnType<typeof toggleIsSignUp>;

export enum AppActions {
  ToggleIsSignUp = "TOGGLE-IS-SIGN-UP",
}
