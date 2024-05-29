import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'photos', component: PhotosComponent, canActivate: [authGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate:[authGuard] },
  { path: 'photo-details', component: PhotoDetailsComponent, canActivate:[authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
