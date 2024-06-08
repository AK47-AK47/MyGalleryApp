import { on } from "@ngrx/store";
import { loginAction } from "./login.actions";
import { createRehydrateReducer } from "../shared/create-rehydrate-reducer";

export interface loginState {
  isLoggedIn: boolean;
}

const initialState:loginState = {
  isLoggedIn: false,
}

export const loginReducer = createRehydrateReducer(
  {key: "loginStatus"},
  initialState,
  on(loginAction, (state, action) => ({ ...state, isLoggedIn:true }))
);