export class UserModel {
  username: string;
  displayName?: string;

  constructor(json) {
    this.username = json.username;
    this.displayName = json.displayName;
  }
}
