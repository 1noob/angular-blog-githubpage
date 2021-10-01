import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page_title = 'SONGJIE / NOTE';
  tab_title = '1noob\'s notes about deeplearning';


  constructor(public title: Title){
    if(screen.width<500){
      this.title.setTitle(this.tab_title);
    }
  }

  ngOnInit(){

  }
}
