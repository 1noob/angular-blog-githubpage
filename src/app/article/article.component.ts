import { Component, OnInit } from '@angular/core';
import {BlogService} from "../service/blog.service";
import {formatDate} from "@angular/common";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {
    const {owner, repo} = this.blogService.getDefaultOwnerAndRepo();

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.blogService.getBlog$(owner, repo, params.get('id')))
    ).subscribe(blog => {
      this.article = blog;
      this.processBlog(this.article);
    });
  }

  processBlog(blog) {
    if (!blog.markdownRendered) {
      this.blogService.renderMarkdown$(blog.body)
        .subscribe(d => {
          blog.body = d;
          blog.markdownRendered = true;
        });
    }

    if (!blog.allComments || !blog.allComments.length) {
      this.blogService.getBlogComments$(blog)
        .subscribe((comments: Array<any>) => {
          blog.allComments = comments.map(c => {
            const createTime = new Date(c.created_at);
            const updateTime = new Date(c.updated_at);

            c.title = `${c.user.login} commented on ${formatDate(createTime, 'yyyy-MM-dd', 'en-US')}`;
            if (updateTime.getTime() > createTime.getTime()) {
              c.title += `, edited on ${formatDate(updateTime, 'yyyy-MM-dd', 'en-US')}`;
            }
            return c;
          });

        });
    }
  }

  addGithubComment(blog) {
    window.open(blog.html_url);
  }

  ngOnInit(): void {
  }

}
