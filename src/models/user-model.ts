export class UserModel {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;

  constructor(json) {
    this.uid = json.uid;
    this.email = json.email;
    this.displayName = json.displayName || null;
    this.photoURL = json.photoURL || null;
    this.phoneNumber = json.phoneNumber || null;
  }
}
