import { RootReducerType } from "../../../app/store";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("app-state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootReducerType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("app-state", serializedState);
  } catch {
    // ignore write errors
  }
};
// export const saveState = (state: LSType) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("app-state", serializedState);
//   } catch {
//     // ignore write errors
//   }
// };

// type LSType = {
//   cards: {
//     packName: string;
//     page: number;
//     pageCount: number;
//   };
//   packsParams: PackParamsType;
// };
