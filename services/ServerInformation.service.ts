import {ServerInformationResponseModel} from '../models/ServerInformationResponse.model';
import {RestService} from './Rest.service';
import {UrlBuilder} from './UrlBuilder';

export default {
  getInformation(url: string): Promise<ServerInformationResponseModel> {
    return RestService.get<ServerInformationResponseModel>(UrlBuilder.getInstance().append('information/').create(url));
  },
};
