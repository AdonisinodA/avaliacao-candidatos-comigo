import { permissions } from "../enums/permissions"

export interface IUserAuthenticated{
    email:string
    role:permissions
    name:string
}