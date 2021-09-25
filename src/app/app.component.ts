import { Component, ElementRef, SimpleChange} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { fromEvent} from "rxjs";
import {ajax} from "rxjs/ajax";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jay\'s Note';


  constructor(){
  }

  ngOnInit(){

  }
}
