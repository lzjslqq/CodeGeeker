import { promisedApi } from '../utils/promisify';
import { common } from '../utils/util';
import { config } from '../configs/config';

export default class UserService {
    constructor() {}

    getUserInfoByCode({ code }) {
        return promisedApi.http.request({
            url: config.apiUrl.getUserInfoByCode,
            data: { code },
            method: 'POST'
        });
    }

    updateUser({ token, nickName, avatarUrl }) {
        return promisedApi.http.request({
            url: config.apiUrl.updateUser,
            data: { token, nickName, avatarUrl },
            method: 'POST'
        });
    }

    checkToken({ token }) {
        return promisedApi.http.request({
            url: config.apiUrl.checkToken,
            data: { token },
            method: 'POST'
        });
    }

    getUserInfoByToken({ token }) {
        return promisedApi.http.request({
            url: config.apiUrl.getUserInfoByToken,
            data: { token },
            method: 'POST'
        });
    }
}