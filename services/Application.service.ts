import {ApplicationEntry} from '../models/ApplicationEntry';
import {RestService} from './Rest.service';
import {UrlBuilder} from './UrlBuilder';
import {
  ExecuteResponse,
  SortedApplicationResponse,
  SortKey,
} from '../models/Response.model';
import {ExecuteRequest} from '../models/Request.model';

export default {
  getAllApplications(): Promise<ApplicationEntry[]> {
    const url = UrlBuilder.getInstance().append('applications').create();
    return RestService.get<ApplicationEntry[]>(url);
  },

  getApplicationById(applicationId: string): Promise<ApplicationEntry> {
    const url = UrlBuilder.getInstance()
      .append('applications')
      .append(applicationId)
      .create();
    return RestService.get<ApplicationEntry>(url);
  },

  executeApplication(
    applicationId: string,
    request: ExecuteRequest,
  ): Promise<ExecuteResponse> {
    const url = UrlBuilder.getInstance()
      .append('applications')
      .append(applicationId)
      .append('execute')
      .create();
    return RestService.post<ExecuteResponse>(url, request);
  },

  getIcon(applicationId: string): string {
    return UrlBuilder.getInstance()
      .append('applications')
      .append(applicationId)
      .append('icon')
      .create();
  },

  sortApplicationBy(sortKey: SortKey): Promise<SortedApplicationResponse> {
    const url = UrlBuilder.getInstance()
      .append(`applications?sortedBy=${sortKey}`)
      .create();
    return RestService.get<SortedApplicationResponse>(url);
  },
};
