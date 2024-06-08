import { addPhotoToFavs, removePhotoFromFavs } from "./favoritePhotos.actions";
import { favoritePhotoState } from "./favoritePhotos.model";
import { createRehydrateReducer } from "../shared/create-rehydrate-reducer";
import { on } from "@ngrx/store";

const initialState: favoritePhotoState = {
  favoritePhotoList: [],
};

export const favoritePhotosListReducer = createRehydrateReducer(
  { key: 'favoritePhotoIDList' },
  initialState,
  on(addPhotoToFavs, (state, action) => ({
    favoritePhotoList: [...state.favoritePhotoList, action.photoID],
  })),
  on(removePhotoFromFavs, (state, action) => ({
    favoritePhotoList: [
      ...state.favoritePhotoList.filter((value: number) => value != action.photoID),
    ],
  }))
);


