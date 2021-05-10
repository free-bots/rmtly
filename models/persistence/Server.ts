import {Authentication} from './Authentication';
import {Configuration} from './Configuration';

export interface Server {
  id: string;
  name: string;
  url: string;
  authentication: Authentication;
  configuration?: Configuration;
}
