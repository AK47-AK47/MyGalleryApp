import { createFeatureSelector, createSelector } from "@ngrx/store";
import { favoritePhotoState } from "./favoritePhotos.reducer";

export const favoritePhotoStateSelector = createFeatureSelector<favoritePhotoState>('favoritePhotoState');

export const selectFavoritePhotoIDs = createSelector(
                                        favoritePhotoStateSelector,
                                        (favPhotoState) => favPhotoState.favoritePhotoList
);