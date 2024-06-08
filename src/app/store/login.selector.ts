import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loginState } from "./login.reducer";

//the parameter <name> of featureSelector must be one of the desired properties(aka store-features) of Store as decrared on app.config.ts
export const loginStateSelector = createFeatureSelector<loginState>('isLoggedInState');
export const selectLoginStatus = createSelector(
  loginStateSelector,
  (loginStatus) => loginStatus.isLoggedIn
);
