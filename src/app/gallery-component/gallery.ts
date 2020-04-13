import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../auth/auth.service';
import { AppComponent } from '../app.component'
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.html',
  styleUrls: ['../app.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor( private _lightbox: Lightbox, private app: AppComponent) { 

  }

  ngOnInit() {
  }
  open(src, desc): void {
    // open lightbox
    const img = {
      src: src,
      caption: desc,
      thumb: ""
   };
    var albums=[img]
    this._lightbox.open(albums, 0);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}