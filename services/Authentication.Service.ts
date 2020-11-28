import RestService from './Rest.service';
import {UrlBuilder} from './UrlBuilder';
import {SignUpResponse} from '../models/Response.model';
import {SignUpRequest} from '../models/Request.model';
import {ConfigService} from './Config.service';

export default {
  createCode(): Promise<void> {
    return RestService.get(
      UrlBuilder.getInstance().append('authentication').append('code').create(),
      false,
    );
  },

  signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return RestService.post(
      UrlBuilder.getInstance()
        .append('authentication')
        .append('signUp')
        .create(),
      request,
    );
  },

  login(response: SignUpResponse): Promise<void> {
    return ConfigService.setToken(response.token);
  },

  logOut(): Promise<void> {
    return ConfigService.setToken(null);
  },
};
