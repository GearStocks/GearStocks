export class AuthData {
  constructor(
    public firstName: string,
    public lastName: string,
    public birthDay: string,
    public userName: string,
    public email: string,
    public password: string,
    public rememberMe: boolean
  ) {}
}
