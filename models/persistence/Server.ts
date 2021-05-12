import {Authentication} from './Authentication';
import {ServerConfiguration} from './ServerConfiguration';

export interface Server {
  id: string;
  name: string;
  url: string;
  authentication: Authentication;
  configuration?: ServerConfiguration;
}
