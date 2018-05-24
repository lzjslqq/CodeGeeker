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

    // 认证摄影师
    updateUserType({ userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.updateUserType,
                data: { userid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200) {
                    return 1;
                }
                return 0;
            });
    }

    // 更新摄影师介绍
    updateGrapherDesc({ grapherid, desc }) {
        return promisedApi.http.request({
                url: config.apiUrl.updateGrapherDesc,
                data: { grapherid, desc },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200) {
                    return 1;
                }
                return 0;
            });
    }


    // ---- 摄影师


    getGrapherList({ userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getGrapherList,
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

    getGrapherDetail({ grapherid, userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getGrapherDetail,
                data: { grapherid, userid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.data) {
                    return JSON.parse(res.data.data);
                }
                return {};
            });
    }

    updateFollow({ userid, grapherid }) {
        return promisedApi.http.request({
                url: config.apiUrl.updateFollow,
                data: { userid, grapherid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200) {
                    return res.data.count;
                }
                return 0;
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

    // updateMessageStatus({ userid }) {
    //     return promisedApi.http.request({
    //         url: config.apiUrl.updateMessageStatus,
    //         data: { userid },
    //         method: 'POST'
    //     });
    // }

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