import {RestService} from './Rest.service';
import {UrlBuilder} from './UrlBuilder';
import {SignUpResponse} from '../models/Response.model';
import {SignUpRequest} from '../models/Request.model';

export default {
  createCode(url: string): Promise<void> {
    return RestService.get(UrlBuilder.getInstance().append('authentication').append('code').create(url), false);
  },

  signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return RestService.post(
      UrlBuilder.getInstance().append('authentication').append('signUp').create(request.url),
      request,
    );
  },
};
