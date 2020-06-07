import rest from '@feathersjs/rest-client';
import axios from 'axios';
import { apiServer } from '../config';

export default () => {
  const restClient = rest(apiServer);
  return restClient.axios(axios);
};
