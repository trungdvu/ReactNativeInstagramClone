import { makeAutoObservable } from 'mobx';

export class SignupViewModel {
  loading = false;
  step = 1;
  username = '';
  password = '';

  constructor() {
    makeAutoObservable(this);
  }

  nextStep() {
    this.step = this.step + 1;
  }

  previousStep() {
    this.step = this.step - 1 === 0 ? 1 : this.step - 1;
  }

  onChangePassword(value: string) {
    this.password = value;
  }

  onChangeUsername(value: string) {
    this.username = value;
  }
}
