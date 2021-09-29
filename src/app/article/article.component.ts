import {Component, OnInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {BlogService} from "../service/blog.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NONE_TYPE} from "@angular/compiler";
import {fromEvent, Observable} from 'rxjs';



const cache = {};


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: any;
  html: any;
  mobile: boolean;

  @ViewChild('divContent') el: ElementRef;

  constructor(
    private sanitizer:DomSanitizer,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private renderer:Renderer2
  ) {

  }


  ngOnInit(): void {

    this.mobile = screen.width <= 500;

    const {owner, repo} = this.blogService.getDefaultOwnerAndRepo();

    this.route.params.subscribe(
      (result: any) => {
        this.blogService.getBlog$(owner, repo, result.articleName)
          .subscribe(
            (data:any) => {
              if(!data)
                this.article = data;
              else{

                this.html = (new DOMParser).parseFromString(data.toString(), 'text/html');

                if (screen.width<500){
                  this.renderer.setStyle(this.html.getElementById('write'),'padding','0 0.5rem');
                  this.renderer.setStyle(this.html.getElementById('write'),'font-size','0.7rem');
                }

                const html_el = this.html.documentElement as HTMLElement;
                this.article = this.sanitizer.bypassSecurityTrustHtml(html_el.innerHTML);

              }
            }
          );
      }
    );

    // fromEvent(window,'resize').subscribe(()=>{
    //   // console.log(window.innerWidth);
    //
    //   if (!this.mobile && screen.width<500){
    //     this.renderer.setStyle(this.html.getElementById('write'),'padding','0.7rem');
    //     this.renderer.setStyle(this.html.getElementById('write'),'font-size','0.7rem');
    //   }
    //
    //   const html_el = this.html.documentElement as HTMLElement;
    //   this.article = this.sanitizer.bypassSecurityTrustHtml(html_el.innerHTML);
    // });

  }

  ngAfterViewInit(){

  }



}
