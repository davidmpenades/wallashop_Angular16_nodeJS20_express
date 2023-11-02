import { UserOwner } from "./user.model";

export interface Comment {
    id: string,
    body: string,
    date: Date,
    author: string,
    isAuthor: boolean,
    ownerData: UserOwner
}