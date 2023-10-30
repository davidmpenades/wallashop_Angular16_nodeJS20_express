export interface User {
  username: string,
  email: string,
  bio: string,
  image: string,
  followers: boolean,
  following: boolean,
  countFollowers: number,
  countFollowing: number,
  countProducts: number,
  _id: string
}
export interface Register {
  username: string,
  email: string,
  password: string,
  passwordRepeat: string
}
export interface UserOwner {
  username: string,
  email: string,
  bio: string,
  image: string,
  _id: string
}

export interface Follower {
  _id: string,
  username: string,
  email: string,
  bio: string,
  image: string,
  followers: boolean,
  following: boolean,
  countFollowers: number,
  countFollowing: number,
  countProducts: number
}
