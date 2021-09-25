import { Component, OnInit } from '@angular/core';
import {BlogService} from "../service/blog.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: any;
  markUrl: SafeResourceUrl;

  constructor(private sanitizer:DomSanitizer, private route: ActivatedRoute, private blogService: BlogService) {}


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
              console.log(this.article);
            }
          );
      }
    );
  }

}
