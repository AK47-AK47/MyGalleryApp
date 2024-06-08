import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
//store
import { Store } from '@ngrx/store';
import { addPhotoToFavs } from '../store/favoritePhotos.actions';
import { favoritePhotoState } from '../store/favoritePhotos.model';
import { selectFavoritePhotoIDs } from '../store/favoritePhotos.selector';
import { loginState } from '../store/login.reducer';
import { selectLoginStatus } from '../store/login.selector';
//rxjs
import { Subscription, find, map } from 'rxjs';

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
  constructor(private store: Store) {}

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

    //find the Photo that ^just add to favs^ and set it(photo's button) disabled
    let photo = this.photosList.find((photoObject) => photoObject.id === phoID);
    photo!.isDisabled = true;

    //lets Observe what we just add on favoritePhotoState
    this.favoritePhotoSubscription$ = this.store
      .select(selectFavoritePhotoIDs)
      .subscribe((IDs) => {
        console.log('favorite IDs Array:', IDs);
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


