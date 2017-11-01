export class UserAuthInfo{
    userName:string;
    password:string;
}

export class ExtendedUserAuthInfo extends UserAuthInfo{
    email:string;
}