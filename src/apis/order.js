import { wrapRequest } from './_utils';

export const getOrderList = wrapRequest('getOrderList', {
  mock: true
});

export const getUserData2 = wrapRequest('getUser2', {
  mock: false,
});
