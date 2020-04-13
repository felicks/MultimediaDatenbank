import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../auth/auth.service';
import { AppComponent } from '../app.component'
import { NgModel } from '@angular/forms';

@Component({
  selector: 'upload',
  templateUrl: './upload.html',
  styleUrls: ['../app.component.scss']
})
export class UploadComponent implements OnInit {
  styleSel:any;
  constructor( private authService:  AuthService, private app: AppComponent) { 

  }

  ngOnInit() {
  }

  addNew(){
    this.app.uploadComplete = false;
    this.app.type = null; 
    this.app.desc = null;
    this.app.title = null;
    this.app.category = null;
    this.app.styles = null;
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  
  selectAll(checkAll, select: NgModel, values) {
    //this.toCheck = !this.toCheck;
    if(checkAll){
      select.update.emit(values); 
    }
    else{
      select.update.emit([]);
    }
  }
}