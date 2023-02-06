const initialState = {
  isSignIn: true,
  isSignUp: false,
  isInitialized: false,
  status: "idle" as RequestStatusType,
};

export const appReducer = (state = initialState, action: AppActionCreatorsType): InitialStateType => {
  switch (action.type) {
    case AppActions.ToggleIsSignUp:
      return { ...state, isSignUp: action.payload.value };
    case AppActions.SetInitialized:
      return { ...state, isInitialized: action.payload.value };
    case AppActions.SetStatus:
      return { ...state, status: action.payload.status };
    default:
      return state;
  }
};

//////////////////////// ACTIONS CREATORS /////////////////////
export const toggleIsSignUp = (value: boolean) => ({ type: AppActions.ToggleIsSignUp, payload: { value } } as const);
export const setIsInitialized = (value: boolean) => ({ type: AppActions.SetInitialized, payload: { value } } as const);
export const setAppStatus = (status: RequestStatusType) =>
  ({ type: AppActions.SetStatus, payload: { status } } as const);
//////////////////////// types  ///////////////////////////////
type InitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppActionCreatorsType =
  | ReturnType<typeof toggleIsSignUp>
  | ReturnType<typeof setIsInitialized>
  | ReturnType<typeof setAppStatus>;

export enum AppActions {
  ToggleIsSignUp = "TOGGLE-IS-SIGN-UP",
  SetInitialized = "SET-INITIALIZED",
  SetStatus = "SET-STATUS",
}
