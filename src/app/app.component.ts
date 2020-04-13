import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { AuthService } from  './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public types: Observable<any[]>;
  public logos: Observable<any[]>;
  public authors: Observable<any[]>;
  public downloadURL: any; 
  public styles: Observable<any[]>;
  public categories: Observable<any[]>;
  public styleSelection: Array <any>;
  ref: any; 
  task: any; 
  desc:string;
  public valid: boolean = false; 
  source: any;
  title: any; 
  category: any; 
  style: any;
  link: any;
  uploadComplete: boolean = false; 
  user: any; 
  username: string;
  type: any;

  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage, private authService:  AuthService) {

    if(this.authService.isLoggedIn()){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.authService.id=this.user.uid
      this.authService.mail=this.user.email
      this.username = this.user.firstname + " " + this.user.lastname
    }

    this.types = afs.collection('/type').valueChanges();
    this.logos = afs.collection('/logo').valueChanges().pipe(
      map(logos => {
        logos.forEach((logo)=>{
          this.afStorage.ref(logo["src"]).getDownloadURL().subscribe(link => {
            logo["path"] = link;
           })
          return logo
        })
       return logos
       
      }))
    this.authors = afs.collection('/author').valueChanges();
    this.styles = afs.collection('/style').valueChanges();
    this.categories = afs.collection('/category').valueChanges();
    this.styleSelection =[this.types]  
    }
    removable = true;
    
  
    getImageLink(src){
      if(this.link){
        this.link = null; 
      }
      this.afStorage.ref(src).getDownloadURL().subscribe(link => {
      this.link = link;
      })
      return this.link;  
    }


    remove(type): void {
      const index = this.styleSelection.indexOf(type);
  
      if (index >= 0) {
        this.styleSelection.splice(index, 1);
      } 
    }

    
    writeLogoData(){
      var keywords = (this.title+ " " +this.desc).toLowerCase()
      var keywordsObject = keywords.split(" ")
      
      if(!this.style){
        this.style=['none']
      }

      this.afs.collection('/logo').doc(this.source.name).set(
        { title: this.title, 
          description: this.desc, 
          src: 'logos/' + this.source.name,
          categoryID: this.category,
          styles: this.style,
          authorID: this.authService.id,
          typeID: this.type,
          createdAt: Date.now(),
          keywords: keywordsObject,
        });
    }
    upload(event) {
      this.source = event.target.files[0];
    }
    submit(){
      this.ref = this.afStorage.ref('/logos/' + this.source.name);
      this.task = this.ref.put(this.source);
      this.uploadComplete = true;
      this.writeLogoData();
    }
}
