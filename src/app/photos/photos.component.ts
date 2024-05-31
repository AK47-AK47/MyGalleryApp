import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

/**
 * @title Photos Cards with multiple sections
 */
@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css',
})
export class PhotosComponent {
  
  photoIndexes: Array<number> = [];

  constructor() {
    //photoIndex = new Array(100);
    for (let i = 0; i < 100; i++) {
      this.photoIndexes[i] = i;
    }
    console.log('photoIndexes:', this.photoIndexes);
  }
}
