import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title:"Login" },
  { path: 'photos', component: PhotosComponent, canActivate:[authGuard], title:"Photos" },
  { path: 'favorites', component: FavoritesComponent, canActivate:[authGuard], title:"Favorite Photos" },
  { path: 'photo-details', component: PhotoDetailsComponent, canActivate:[authGuard], title:"Favorite Photo Details"},
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Here, path: '' means to use the initial relative URL ('').
  { path: '**', component: PageNotFoundComponent, title:"Sorry for that" }, // Wildcard route for a 404 page
];
