import { Component, OnInit } from '@angular/core';
import { map, switchMap, combineAll } from 'rxjs/operators';

import { AppComponent } from '../app.component'
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Lightbox } from 'ngx-lightbox';
import { forkJoin, Observable, of, zip, merge } from 'rxjs';
import { take } from 'rxjs/operators';
import { cloneDeep } from 'lodash';


@Component({
  selector: 'search',
  templateUrl: './search.html',
  styleUrls: ['../app.component.scss']
})

export class SearchComponent implements OnInit {
  author:any;
  type: any;
  category:any;
  color:any;
  searchterm:string;
  results:any;
  timestamp:any;
  styles:any; 
  showResults: boolean = false;
  showSpinner: boolean = false;
  length: number = 0;
  result2:any;
  resultObs:any;
  resultStream: Observable<any>
  newObs:any;
  constructor( private afStorage: AngularFireStorage, private app: AppComponent, private _lightbox: Lightbox, private afs: AngularFirestore) {}

  ngOnInit() {
    this.createList()
  }

  search(){
    if(this.length !=0){
      this.length = 0;
    }

    this.buildQuery();
  }


  getAuthor(id){
    return id;
  }

  reset(){
    this.author = null;
    this.type = null; 
    this.searchterm =null;
    this.color = null;
    this.category = null;
    this.styles = null;
  }

  buildQuery(){
    this.results = null;
    var query = this.afs.collection('/logo').ref
    .limit(150) 
   
    if(this.searchterm){
      query = query.where('keywords','array-contains', this.searchterm.toLowerCase())
    }
  
    if(this.styles && this.styles!=0){
      query = query.where('styles','array-contains', this.styles)
    }
  
    if(this.type && this.type!=0){
      query = query.where('typeID','==', this.type)
    }

    if(this.author && this.author!=0){
      query = query.where('authorID','==', this.author)
    }
    
    if(this.color && this.color!=2){
      query = query.where('colorType','==', Number(this.color))
    }
   
    if(this.timestamp && this.timestamp!="any"){
      if(this.timestamp == "day"){
        var time = Date.now()-86400000;
        query = query.where('createdAt','>=', time)
      }
      if(this.timestamp == "week"){
        var time = Date.now()-(86400000*7);
        query = query.where('createdAt','>=', time)
      }
      if(this.timestamp == "month"){
        var time = Date.now()-(86400000*30);
        query = query.where('createdAt','>=', time)
      }
    }
   
      if(this.category){
        this.resultObs=[];
        
        this.category.forEach(element => {
          const q = query.where('categoryID','==', element)
          console.log("adding", element, )
          this.resultObs.push(this.afs.collection('/logo', ref => q).valueChanges().pipe(take(1)))
        });
         forkJoin(this.resultObs).subscribe(
          (data:any) => {
             this.results = data.flat().map(r => {
              this.length = this.length + 1;
              this.afStorage.ref(r.src).getDownloadURL().subscribe(link => {
                r.src = link;
              }) 
              return r;
             });
          },
          (error) => {
            console.warn("FML", error)
          }
        );
      }else{
        this.afs.collection('/logo', ref => query).valueChanges().pipe(take(1)).subscribe( 
          (data:any) => {
             this.results = data.flat().map(r => {
              this.length = this.length + 1;
              this.afStorage.ref(r.src).getDownloadURL().subscribe(link => {
                r.src = link;
              }) 
              return r;
             });
          },
          (error) => {
            console.warn("FML", error)
          }
        );
      } 
    
    
   /*this.results = this.afs.collection('/logo', ref => query).valueChanges().pipe(
    map(logos => {
      logos.forEach((logo)=>{
        this.length = this.length + 1;
        this.afStorage.ref(logo["src"]).getDownloadURL().subscribe(link => {
          logo["path"] = link;
         })
        return logo
      })
     return logos
     
    })) */
   this.showResults = true;
   this.showSpinner = true;
  
 setTimeout(() => {
    this.showSpinner = false;
    var element = document.getElementById("results");
  
    element.scrollIntoView({behavior: "smooth"})
   }, 900);
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
 

  async createList(){

 
  }
/*

    var query1 = this.afs.collection('/logo').ref.where('typeID','==', 1)
    var query2 = this.afs.collection('/logo').ref.where('typeID','==', 2)
    var Query1 = this.afs.collection('/logo', ref => query1)
    var Query2 = this.afs.collection('/logo', ref => query1)

    this.afs.collection('/logo', ref => query2)
    this.result2 = combineLatest(Query1.valueChanges(),Query2.valueChanges())
    
    this.result2.switchMap(cities => {
        const [californiaCities, coloradoCities] = cities;
        const combined = californiaCities.concat(coloradoCities);
        console.log(combined);
    });
  }*/
}

