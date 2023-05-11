import { HTTP_METHODS, AUTH_ENDPOINTS } from '@constants';
import { apiClient } from '../apiClient';

const { GET, PUT } = HTTP_METHODS;

const { JOURNALS } = AUTH_ENDPOINTS;

const getJournals = (data) =>
  apiClient.authorizedRequest({
    method: GET,
    url: JOURNALS,
    data
  });

const updateJournal = (data) =>
  apiClient.authorizedRequest({
    method: PUT,
    url: `${JOURNALS}/${data.id}`,
    data
  });

export const api = {
  getJournals,
  updateJournal
};
