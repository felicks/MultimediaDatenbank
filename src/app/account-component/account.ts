import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../auth/auth.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { AppComponent } from '../app.component'

@Component({
  selector: 'account',
  templateUrl: './account.html',
  styleUrls: ['../app.component.scss']
})
export class AccountComponent implements OnInit {
  username: string; 
  firstname: string;
  lastname: string;
  user:any; 
  constructor( private authService: AuthService, private afs: AngularFirestore, private app: AppComponent) { 
   
  }

  ngOnInit() {
    if(this.authService.id){
      this.user = this.afs.collection('/author', ref => ref.where('id','==', this.authService.id ))
        .valueChanges()
        .subscribe(val => this.username = (val[0] as any).firstname + " " + (val[0] as any).lastname);
    }
  }

  setUsername(){
    this.username = this.firstname + " " + this.lastname;
    this.addUser();
  }

  addUser(){
    this.afs.collection('/author').add(
      { id: this.authService.id,
        firstName : this.firstname,
        lastName: this.lastname,
        email: this.authService.mail,
      });
  }

}