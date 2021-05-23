import { Component, OnInit } from '@angular/core';
import {BlogService} from "../service/blog.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article;
  error_code = [
    "404", "410"
  ];

  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.article = {
      "status": 404
    }
  }

  addGithubComment(blog) {
    window.open(blog.html_url);
  }

  ngOnInit(): void {
    const {owner, repo} = this.blogService.getDefaultOwnerAndRepo();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.blogService.getBlog$(owner, repo, params.get('id')))
    ).subscribe(blog => {
      this.article = blog;
      if (this.article.status == null){
        this.blogService.processBlog(this.article);
      }
    });
  }

}
