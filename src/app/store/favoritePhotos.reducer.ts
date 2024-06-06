import { createReducer, on } from "@ngrx/store";
import { addPhotoToFavs, removePhotoFromFavs } from "./favoritePhotos.actions";
import { favoritePhotoState } from "./favoritePhotos.model";

const initialState: favoritePhotoState = {
  favoritePhotoList: [],
};

export const favoritePhotosListReducer = createReducer(
  initialState,
  on(addPhotoToFavs, (state, action) =>
    //destruction one level deep
    ({ favoritePhotoList: [...state.favoritePhotoList, action.photoID] })
  ),
  on(removePhotoFromFavs, (state, action) => 
    ({ favoritePhotoList: [...state.favoritePhotoList.filter((value) => value != action.photoID)] })
  )
);


/**
 * detailed logic
 *
export const favoritePhotosListReducer = createReducer(
  initialState,
  on(addPhotoToFavs, (state, action) => {
    console.log('Adding...');
    //get indexTable from state into a new(by reference) temp array  using destruction ...
    const tempTableAdd = [...state.favoritePhotoList]; // NO-NO-NO this -> const tempTableAdd = state.favoritePhotoList because doesn't change reference...
    //push new item to temp table
    tempTableAdd.push(action.photoID);
    //or more beautyfull in one line -> const tempTable = [...state.favoritePhotoList, action.photoID];

    console.log('Adding........completed');
    //console.log('Temp favorites photo index array:', tempTableAdd);

    return { favoritePhotoList: tempTableAdd };
  }),
  on(removePhotoFromFavs, (state, action) => {
      const tempTableRemove = [...state.favoritePhotoList];
      tempTableRemove.forEach((value,index) => {
        if(value ===action.photoID) {tempTableRemove.splice(index,1)}
      });
      
      return {favoritePhotoList: tempTableRemove};
    }
  )
  /or better writing:
  on(removePhotoFromFavs, (state, action) => {
      const tempTableRemove = [...state.favoritePhotoList];
      tempTableRemove.filter((value) => {value != action.photoID} );
      
      return {favoritePhotoList: tempTableRemove};
    }
  )
   
);
*/

//[...state.favoritePhotoList, action.photoID]