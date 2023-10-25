import { UserOwner } from "./user.model";

export interface Product {
  slug: string,
  title: string,
  description: string,
  price: Number,
  imgs: string[],
  category: string,
  liked: Boolean,
  countLikes: number,
  owner: string,
  ownerData?: UserOwner 
}
