export interface User {
    username: string,
    email: string,
    bio: string,
    image: string,
}
export interface Register{
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
}
export interface UserOwner{
    username: string,
    email: string,
    bio: string,
    image: string,
    _id: string
}
