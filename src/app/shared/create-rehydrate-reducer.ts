import {
  Action,
  ActionCreator,
  ActionReducer,
  ReducerTypes,
  createReducer,
} from '@ngrx/store';


/** Thanks to this guy https://www.npmjs.com/package/ngrx-rehydrate */
export interface RehydrateRecucerConfig {
  key: string;
}

export function createRehydrateReducer<S, A extends Action>(
  config: RehydrateRecucerConfig,
  initialState: S,
  ...ons: ReducerTypes<S, ActionCreator[]>[]
): ActionReducer<S, A> {
  const { key } = config;
  const item = localStorage.getItem(key);
  const newInitialState = (item && JSON.parse(item)) ?? initialState;
  const newOns: ReducerTypes<S, ActionCreator[]>[] = [];
  ons.forEach((oldOn) => {
    const newReducer = (state: S, action: object & { type: string }) => {
      const newState: S = oldOn.reducer(state, action);
      localStorage.setItem(key, JSON.stringify(newState));
      return newState;
    };
    newOns.push({ ...oldOn, reducer: newReducer });
  });
  return createReducer(newInitialState, ...newOns);
}
