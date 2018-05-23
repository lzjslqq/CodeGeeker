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

    // ---- 摄影师

    getGrapherList() {
        return promisedApi.http.request({
                url: config.apiUrl.getGrapherList,
                data: {},
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    getGrapherListByFollow({ userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getGrapherListByFollow,
                data: { userid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    getGrapherDetail({ grapherid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getGrapherDetail,
                data: { grapherid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.data) {
                    return JSON.parse(res.data.data);
                }
                return {};
            });
    }

    // ---- 消息

    getMessageList({ userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getMessageList,
                data: { userid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    updateMessageStatus({ userid }) {
        return promisedApi.http.request({
            url: config.apiUrl.updateMessageStatus,
            data: { userid },
            method: 'POST'
        });
    }

    getUnReadMessageCount({ userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getUnReadMessageCount,
                data: { userid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200) {
                    return res.data.count;
                }
                return 0;
            });
    }


}