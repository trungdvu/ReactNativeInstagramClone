import { ResponseModel } from 'models';
import { HttpService } from './http-service';

export class AuthService {
  async doSignup(payload: any): Promise<ResponseModel> {
    const data = await HttpService.post('', payload);
    return data;
  }

  async doLogin(payload: any): Promise<ResponseModel> {
    const data = await HttpService.post('', payload);
    return data;
  }

  async doLogout(payload?: any): Promise<ResponseModel> {
    const data = await HttpService.post('', payload);
    return data;
  }
}
