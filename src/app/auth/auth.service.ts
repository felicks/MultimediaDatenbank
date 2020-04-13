import { Injectable } from  '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
    providedIn:  'root'
})
export  class  AuthService {
  user: User;
  errorMessage:  string;
  successMeesage:  string
  id: any; 
  mail: any; 
  constructor(public  afAuth:  AngularFireAuth) { 
   
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async  login(email: string, password: string) {

    try {
        await  this.afAuth.auth.signInWithEmailAndPassword(email, password)
    } catch (e) {
      this.errorMessage = this.cleanString(e.message)
    }
    location.reload();
  }
  cleanString(message){
    return message.replace('signInWithEmailAndPassword failed: ', '')
  }
  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
   
  }

   isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }
}