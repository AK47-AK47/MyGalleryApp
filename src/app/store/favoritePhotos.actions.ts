import { createAction, props } from "@ngrx/store";

export const addPhotoToFavs = createAction("Add photo to Favorites", props<{photoID:number}>());
export const removePhotoFromFavs = createAction("Remove photo from Favorites", props<{photoID:number}>());