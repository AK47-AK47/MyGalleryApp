import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
//store
import { Store } from '@ngrx/store';
import { addPhotoToFavs } from '../store/favoritePhotos.actions';
import { favoritePhotoState } from '../store/favoritePhotos.model';
//rxjs
import { Subscription, find, map } from 'rxjs';
import { selectFavoritePhotoIDs } from '../store/favoritePhotos.selector';


type PhotosGallery = {
  id: number;
  isDisabled: boolean;
};

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css',
})

export class PhotosComponent implements OnInit, OnDestroy {

  photosList: Array<PhotosGallery> = [];
  private favoritePhotoSubscription$: Subscription = new Subscription();
  private disabledButtonsList$: Subscription = new Subscription();
  private isDisabledSubscription$: Subscription = new Subscription();
  

  //Attension to STore type declaration (take it from app.config.ts where is provided on all app)
  constructor(private store: Store<{ favoritePhotoState: favoritePhotoState }>) {}

  ngOnInit() {
    //photoIndex = new Array(100);
    for (let i = 0; i < 100; i++) {
      this.photosList[i] = { id: i, isDisabled: this.isDisabled(i) };
    }
    console.log('photoIndexes:', this.photosList);
  }

  addToFavorites(phoID: number) {
    console.log('Add photo #' + phoID + ' to favorites');
    this.store.dispatch(addPhotoToFavs({ photoID: phoID }));

    let photo = this.photosList.find((photoObject) => photoObject.id === phoID);
    photo!.isDisabled = true;

    //lets Observe what we add on favoritePhotoState
    this.favoritePhotoSubscription$ = this.store
      .select('favoritePhotoState')
      .subscribe((state) => {
        console.log('favorite IDs Array:', state.favoritePhotoList);
      });
  }

  isDisabled(id:number):boolean{
    let disabled:boolean = false;
    //check if id excist on favoritePhotoIDs Array
    this.isDisabledSubscription$ = this.store.select(selectFavoritePhotoIDs).subscribe(
      (favIDsArray) => disabled = favIDsArray.includes(id)
    );
    
    return disabled;
  }

  ngOnDestroy(): void {
    if (this.favoritePhotoSubscription$) {
      this.favoritePhotoSubscription$.unsubscribe();
    }
    if(this.isDisabledSubscription$){
      this.isDisabledSubscription$.unsubscribe();
    }
  }
}


