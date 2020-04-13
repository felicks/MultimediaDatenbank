import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

//Components
import { AppComponent } from './app.component';
import { AccountComponent } from './account-component/account'
import { UploadComponent } from './upload-component/upload'
import { GalleryComponent } from './gallery-component/gallery'
import { SearchComponent } from './search-component/search'

//Firebase
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage  } from '@angular/fire/storage';

//Angular Material
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSelectModule} from '@angular/material/select';
import { MatChipsModule} from '@angular/material/chips';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'
import { AngularFireAuthModule } from "@angular/fire/auth";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatListModule} from '@angular/material/list';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

//Lightbox
import { LightboxModule } from 'ngx-lightbox';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    UploadComponent,
    GalleryComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatChipsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatProgressSpinnerModule,
    LightboxModule
  ],
  providers: [AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
