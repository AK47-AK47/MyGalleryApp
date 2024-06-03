import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
//store
import { Store } from '@ngrx/store';
import { removePhotoFromFavs } from '../store/favoritePhotos.actions';
import { favoritePhotoState } from '../store/favoritePhotos.reducer';
import { Observable, Subscription } from 'rxjs';
import { selectFavoritePhotoIDs } from '../store/favoritePhotos.selector';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit, OnDestroy {
  protected favoritePhotoIDs$: Observable<number[]> = new Observable<number[]>();
  private favoritePhotosIDsSubscription$: Subscription = new Subscription();
  //favoritePhotoIDs: Array<number> = [];

  //Attension to STore type declaration (take it from app.config.ts where is provided on all app)
  constructor(
    private store: Store<{ favoritePhotoState: favoritePhotoState }>
  ) {}

  ngOnInit(): void {
    
    this.favoritePhotoIDs$ = this.store.select(selectFavoritePhotoIDs);
    //otherone subscription on Observable just for the console log
    this.favoritePhotosIDsSubscription$ = this.store.select(selectFavoritePhotoIDs).subscribe((ids) =>
      console.log('favorite Photos IDs:', ids)
    );
    /*
    //MUST -> ON DESTROY unsubsribe
    this.store.select('favoritePhotoState').subscribe((state) => {
      console.log('favorite Photos IDs:', state.favoritePhotoList);
      this.favoritePhotoIDs = state.favoritePhotoList;
    });
    */
  }

  removeFromFavorites(phoID: number) {
    console.log('Remove photo #' + phoID + ' from favorites');
    this.store.dispatch(removePhotoFromFavs({ photoID: phoID }));
  }
  
  ngOnDestroy(): void {
    if(this.favoritePhotosIDsSubscription$){
      this.favoritePhotosIDsSubscription$.unsubscribe();
    }
  }
}
