import {Component, OnInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {BlogService} from "../service/blog.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {DomSanitizer, SafeResourceUrl, Title} from "@angular/platform-browser";
import {NONE_TYPE} from "@angular/compiler";
import {fromEvent, Observable, range} from 'rxjs';



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
    private renderer:Renderer2,

  ) {
  }


  ngOnInit(): void {

    this.mobile = screen.width <= 500;

    const {owner, repo} = this.blogService.getDefaultOwnerAndRepo();

    this.route.params.subscribe(
      (result: any) => {
        let res_name = result.articleName.replaceAll(' ','-').concat('.html');
        this.blogService.getBlog$(owner, repo, res_name)
          .subscribe(
            (data:any) => {
              if(!data)
                this.article = data;
              else{

                this.html = (new DOMParser).parseFromString(data.toString(), 'text/html');

                // 移除自动生成的 href 跳转

                let toc = this.html.getElementsByClassName('md-toc-inner');
                for (let x of toc){
                  x.removeAttribute('href');
                }

                // 修改下样式

                let urls = this.html.getElementsByTagName('a');
                for (let x of urls){
                  this.renderer.setStyle(x,'color','#002FA7');
                }

                // 跳转监听

                this.renderer.listen(document,'click',(e)=>{
                  let el = e['originalTarget']['attributes']['class'];
                  if (el && el['nodeValue']=='md-toc-inner'){
                    el = e['originalTarget']['innerText'].toString().replaceAll(' ','-').toLowerCase();
                    // console.log(el);
                    this.myScroll(el);
                  }
                });

                // 适配一下手机尺寸

                if (screen.width<500){
                  this.renderer.setStyle(this.html.getElementById('write'),'padding','0 0.7rem');
                  this.renderer.setStyle(this.html.getElementById('write'),'font-size','0.7rem');
                }

                const html_el = this.html.documentElement as HTMLElement;
                this.article = this.sanitizer.bypassSecurityTrustHtml(html_el.innerHTML);



              }
            }
          );
      }
    );

  }

  ngAfterViewInit(){

  }

  /***
   * TOC Anchor
   * @Param id element id
   */
  myScroll(id: any){
    document.getElementById(id).scrollIntoView({behavior: "smooth"});
  }



}
