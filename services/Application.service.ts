import {ApplicationEntry} from '../models/ApplicationEntry';
import RestService from './Rest.service';
import {UrlBuilder} from './UrlBuilder';
import {ExecuteResponse} from '../models/Response.model';
import {ExecuteRequest} from '../models/Request.model';

export default {
  getAllApplications(): Promise<ApplicationEntry[]> {
    return RestService.get<ApplicationEntry[]>(
      UrlBuilder.getInstance().append('applications').create(),
    );
  },

  getApplicationById(applicationId: string): Promise<ApplicationEntry> {
    return RestService.get<ApplicationEntry>(
      UrlBuilder.getInstance()
        .append('applications')
        .append(applicationId)
        .create(),
    );
  },

  executeApplication(
    applicationId: string,
    request: ExecuteRequest,
  ): Promise<ExecuteResponse> {
    return RestService.post<ExecuteResponse>(
      UrlBuilder.getInstance()
        .append('applications')
        .append(applicationId)
        .append('execute')
        .create(),
      request,
    );
  },

  getIcon(applicationId: string): string {
    return UrlBuilder.getInstance()
      .append('applications')
      .append(applicationId)
      .append('icon')
      .create();
  },
};
