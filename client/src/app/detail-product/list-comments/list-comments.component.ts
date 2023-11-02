import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core';
import { User } from 'src/app/core/model/user.model';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss'],
})
export class ListCommentsComponent {
  comments: any[] = [];
  user: User = {} as User;
  commentForm: FormGroup
  @Input() slug: string = '';
  @Output() delId = new EventEmitter<string>();

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) {
      this.commentForm = this.fb.group({
        body: [''],
      });
    }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments(this.slug).subscribe({
      next: (data) => {
        console.log(data);
        
        this.comments = data.comments;        
      },
      error: (err) => console.error(err),
    });
  }

  addComment() {  
    this.commentService.addComment(this.slug, this.commentForm.value).subscribe({      
      next: (data) => {
        this.toastr.success('Comentario agregado', 'Comentario');
        this.commentForm.reset();
        this.getComments();
      },
      error: (err) => console.error(err),
    });
  }
  deleteComment(id:string) {    
    this.delId.emit(id);
  }
}
