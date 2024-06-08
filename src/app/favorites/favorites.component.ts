import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
//store
import { Store } from '@ngrx/store';
import { removePhotoFromFavs } from '../store/favoritePhotos.actions';
import { favoritePhotoState } from '../store/favoritePhotos.model';
import { selectFavoritePhotoIDs } from '../store/favoritePhotos.selector';
//rxjs
import { Observable, Subscription } from 'rxjs';
//routing
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgFor,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit, OnDestroy {
  protected favoritePhotoIDs: number[] = [];
  private favoritePhotosIDsSubscription$: Subscription = new Subscription();
  protected isFavoriteListEmpty:boolean = true;
  
  //Attention! Store type declaration (take it from app.config.ts where is provided on all app)
  constructor(private store: Store<{ favoritePhotoState: favoritePhotoState }>) {}

  ngOnInit(): void {
    
    //this.favoritePhotoIDs$ = this.store.select(selectFavoritePhotoIDs);
    //otherone subscription on Observable just for the console log
    this.favoritePhotosIDsSubscription$ = this.store
      .select(selectFavoritePhotoIDs)
      .subscribe((ids) => {
        this.favoritePhotoIDs = ids;
        (ids.length > 0 ) ? (this.isFavoriteListEmpty = false) : (this.isFavoriteListEmpty = true);
        console.log('favorite Photos List is empty? :', this.isFavoriteListEmpty);
        console.log('favorite Photos IDs:', ids)
      });
  }

  removeFromFavorites(phoID: number) {
    console.log('Remove photo #' + phoID + ' from favorites');
    this.store.dispatch(removePhotoFromFavs({ photoID: phoID }));
  }

  ngOnDestroy(): void {
    if (this.favoritePhotosIDsSubscription$) {
      this.favoritePhotosIDsSubscription$.unsubscribe();
    }
  }
}
