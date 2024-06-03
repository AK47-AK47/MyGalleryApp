import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
//store
import { Store } from '@ngrx/store';
import { addPhotoToFavs } from '../store/favoritePhotos.actions';
import { favoritePhotoState } from '../store/favoritePhotos.reducer';
//rxjs
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css',
})
export class PhotosComponent implements OnInit, OnDestroy {
  photoIDs: Array<number> = [];
  private favoritePhotoSubscription$:Subscription = new Subscription;
  
  //Attension to STore type declaration (take it from app.config.ts where is provided on all app)
  constructor(private store: Store<{ favoritePhotoState: favoritePhotoState }>) {}

  ngOnInit() {
    //photoIndex = new Array(100);
    for (let i = 0; i < 100; i++) {
      this.photoIDs[i] = i;
    }
    console.log('photoIndexes:', this.photoIDs);
  }

  addToFavorites(phoID: number) {
    console.log('Add photo #' + phoID + ' to favorites');
    this.store.dispatch(addPhotoToFavs({ photoID: phoID }));

    //lets Observe what we add on favoritePhotoState 
    this.favoritePhotoSubscription$ = this.store.select('favoritePhotoState').subscribe((state) => {
      console.log("favorite IDs Array:",state.favoritePhotoList);
    });
    //***AFTER ADD PHOTO DESABLE BUTTON */
  }

  ngOnDestroy(): void {
    if(this.favoritePhotoSubscription$){
      this.favoritePhotoSubscription$.unsubscribe();
    }
  }
}
