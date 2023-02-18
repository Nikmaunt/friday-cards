const initialState = {
  isSignUp: false,
  isInitialized: false,
  isAuth: false,
  status: "idle" as RequestStatusType,
  error: null as ErrorType,
  currentPackId: "",
};

export const appReducer = (state = initialState, action: AppActionCreatorsType): InitialStateType => {
  switch (action.type) {
    case AppActions.ToggleIsSignUp:
      return { ...state, isSignUp: action.payload.value };
    case AppActions.SetAuth:
      return { ...state, isAuth: action.payload.value };
    case AppActions.SetInitialized:
      return { ...state, isInitialized: action.payload.value };
    case AppActions.SetStatus:
      return { ...state, status: action.payload.status };
    case AppActions.SetError:
      return { ...state, error: action.payload.error };
    case AppActions.SetCurrentPackId:
      return { ...state, currentPackId: action.payload.packId };
    default:
      return state;
  }
};

//////////////////////// ACTIONS CREATORS /////////////////////

export const toggleIsSignUp = (value: boolean) => ({ type: AppActions.ToggleIsSignUp, payload: { value } } as const);
export const setIsInitialized = (value: boolean) => ({ type: AppActions.SetInitialized, payload: { value } } as const);
export const setAppStatus = (status: RequestStatusType) =>
  ({ type: AppActions.SetStatus, payload: { status } } as const);
export const setAppError = (error: ErrorType) => ({ type: AppActions.SetError, payload: { error } } as const);
export const setAuth = (value: boolean) => ({ type: AppActions.SetAuth, payload: { value } } as const);
export const setCurrentPackId = (packId: string) =>
  ({ type: AppActions.SetCurrentPackId, payload: { packId } } as const);

//////////////////////// types  ///////////////////////////////

type InitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type ErrorType = null | string;
export type SetAppErrorType = ReturnType<typeof setAppError>;

export type AppActionCreatorsType =
  | ReturnType<typeof toggleIsSignUp>
  | ReturnType<typeof setIsInitialized>
  | ReturnType<typeof setAppStatus>
  | SetAppErrorType
  | ReturnType<typeof setAuth>
  | ReturnType<typeof setCurrentPackId>;

export const AppActions = {
  ToggleIsSignUp: "TOGGLE-IS-SIGN-UP",
  SetInitialized: "SET-INITIALIZED",
  SetStatus: "SET-STATUS",
  SetError: "SET-ERROR",
  SetAuth: "SET-AUTH",
  SetCurrentPackId: "SET-CURRENT-PACK-ID",
} as const;
