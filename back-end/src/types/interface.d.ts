import { permissions } from "../enums/permissions"

export interface IUserAuthenticated{
    id:number,
    email:string
    role:permissions
    name:string
}