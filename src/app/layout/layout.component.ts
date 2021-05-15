import { Component, OnInit } from '@angular/core';
import { BlogService } from "../service/blog.service";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [BlogService]
})
export class LayoutComponent implements OnInit {

  blogs = null;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    const {owner, repo} = this.blogService.getDefaultOwnerAndRepo();
    this.blogService.getBlogs$(owner, repo)
      .subscribe(blogs => {
        this.blogs = blogs;
      });
  }



}
