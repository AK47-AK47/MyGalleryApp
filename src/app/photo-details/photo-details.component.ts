import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
//store
import { Store } from '@ngrx/store';
import { favoritePhotoState } from '../store/favoritePhotos.reducer';
import { removePhotoFromFavs } from '../store/favoritePhotos.actions';
import { selectFavoritePhotoIDs } from '../store/favoritePhotos.selector';
//rxjs
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.css',
})
export class PhotoDetailsComponent implements OnInit, OnDestroy {
  favoriteIDsSubscription$: Subscription = new Subscription();
  detailsID!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ favoritePhotoState: favoritePhotoState }>
  ) {}

  ngOnInit(): void {
     this.detailsID = this.route.snapshot.params['id'];
  }
  
  removeFromFavorites(id: number) {
    console.log('Remove photo #' + id + ' from favorites');
    this.store.dispatch(removePhotoFromFavs({ photoID: id }));

    //lets observe what we remove from favoritePhotoState
    this.favoriteIDsSubscription$ = this.store.select(selectFavoritePhotoIDs).subscribe((IDs) => {
        console.log('updated favorite IDs list', IDs);
      });

    this.router.navigateByUrl("/favorites");
  }
  
  ngOnDestroy(): void {
    if (this.favoriteIDsSubscription$) {
      this.favoriteIDsSubscription$.unsubscribe();
    }
  }
}
