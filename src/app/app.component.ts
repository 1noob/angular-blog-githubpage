import { Component, ElementRef, SimpleChange} from '@angular/core';
import { fromEvent} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KcNco\'s Blog';

  constructor(){

  }

  // ngOnInit(){
  //   fromEvent(window, 'resize').subscribe(e => {
  //     if (window.innerWidth < 500){
  //
  //     }
  //   })
  // }


}
