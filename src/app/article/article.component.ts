import {Component, OnInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {BlogService} from "../service/blog.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NONE_TYPE} from "@angular/compiler";


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: any;
  markUrl: SafeResourceUrl;

  @ViewChild('divContent') greetDiv: ElementRef;

  constructor(
    private sanitizer:DomSanitizer,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private el: ElementRef,
    private renderer:Renderer2
  ) {}


  ngOnInit(): void {
    const {owner, repo} = this.blogService.getDefaultOwnerAndRepo();
    this.route.params.subscribe(
      (result: any) => {
        this.markUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://raw.githubusercontent.com/${owner}/${repo}/main/${result.articleName}`);
        this.blogService.getBlog$(owner, repo, result.articleName)
          .subscribe(
            (data:any) => {
              if(!data)
                this.article = data;
              else
                this.article = this.sanitizer.bypassSecurityTrustHtml(data);

              if(screen.width<500){
                this.renderer.setStyle(this.greetDiv.nativeElement, 'font-size', '0.7rem');
              }
            }
          );
      }
    );
  }

  getDomTest() {
    // this.renderer.setStyle(document.getElementById('write'), 'padding', '0.7rem');
    // this.renderer.setStyle(this.greetDiv.nativeElement.querySelectorAll('div')[3], 'padding-left', '0.7rem');
    // console.log(this.el.nativeElement.querySelectorAll("div"));
  }

}
