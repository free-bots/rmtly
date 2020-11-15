import RestService from './Rest.service';
import {UrlBuilder} from './UrlBuilder';

export default {
  async isRmtlyServerAvailable(baseUrl: string): Promise<boolean> {
    try {
      const checkUrl = UrlBuilder.getInstance().append('').create(baseUrl);
      await RestService.get(checkUrl, false);
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  },
};
