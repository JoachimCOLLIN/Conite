export class Auth
{
    constructor(
        public email: string,
        public first_name: string,
        public family_name: string, 
        public password1: string,
        public password2: string,
    )
    {}
}
export class User
{
    constructor(
        public email: string,
        public password: string,
        public roles: string[],
        public isloggedIn: Boolean = false,
    )
    {}
}
