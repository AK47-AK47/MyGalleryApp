import { createReducer, on } from "@ngrx/store";
import { addPhotoToFavs, removePhotoFromFavs } from "./favoritePhotos.actions";

export interface favoritePhotoState {
  favoritePhotoList: Array<number>;
}

const initialState: favoritePhotoState = {
  favoritePhotoList: [],
};

export const favoritePhotosListReducer = createReducer(
  initialState,
  on(addPhotoToFavs, (state,action) => (
    //destruction one level deep
    {favoritePhotoList: [...state.favoritePhotoList, action.photoID]}),
  ),
);


/**
 * detailed logic
 *
export const favoritePhotosListReducer = createReducer(
  initialState,
  on(addPhotoToFavs, (state, action) => {
    console.log('Adding...');
    //get indexTable from state into a new(by reference) temp array  using destruction ...
    const tempTable = [...state.favoritePhotoList]; // NO-NO-NO this -> const tempTable = state.favoritePhotoList because doesn't change reference...
    //push new item to temp tample
    tempTable.push(action.photoID);
    //or more beautyfull in one line -> const tempTable = [...state.favoritePhotoList, action.photoID];

    console.log('Adding........completed');
    //console.log('Temp favorites photo index array:', tempTable);

    return { favoritePhotoList: tempTable };
  }),
);
*/

//[...state.favoritePhotoList, action.photoID]