import Taro from '@tarojs/taro'
import { hostname, isBuild } from '@utils/global'

export const wrapRequest = (url = '', config) => {
  return (data = {}, params = {}) => {
    // 返回一个promise的request
    return request(data, params, url, config);
  };
};

export const request = (data, params, url, config) => {
  const base = {
    method: 'POST',
    ...config,
  };

  const origin = base.mock && !isBuild ? 'mock' : 'apis';

  const baseUrl = `${hostname}/${origin}/${url}`;

  params = { ...base, ...params };

  const { method, loading } = params;

  return new Promise((resolve, reject) => {
    if (loading) {
      Taro.showLoading({ title: '加载中...', mask: true })
    }

    Taro.request({
      method: method,
      // 客户端发送服务端的数据格式为json
      headers: { 'content-type': 'application/json; charset=utf-8' },
      url: baseUrl,
      data: data,
    })
      .then((response) => {
        // eslint-disable-next-line no-shadow
        const { data } = response;

        if (loading) {
          Taro.hideLoading()
        }

        if (!data) {
          // errorMsg('服务器未响应数据');
          // return;
        }
        if (params.okMsg) {
          // okMsg(params.okMsg);
          // return;
        }
        resolve(data);
      })
      .catch(error => {
        if (loading) {
          Taro.hideLoading()
        }
        // console.info(error);
        reject(error);
      })
  })
};
