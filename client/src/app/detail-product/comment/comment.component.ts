import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/core/model/comment.model';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

@Input() data: Comment = {} as Comment;
@Output() delId = new EventEmitter<string>();

deleteComment(id:string) {
  this.delId.emit(id);
}
};


