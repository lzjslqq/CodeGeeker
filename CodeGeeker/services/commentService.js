import { promisedApi } from '../utils/promisify';
import { common } from '../utils/util';
import { config } from '../configs/config';

export default class CommentService {
    constructor() {}

    getCommentList({ matchid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getCommentList,
                data: { matchid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    getCommentUserCount({ matchid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getCommentUserCount,
                data: { matchid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200) {
                    return { code: 1, count: res.data.count };
                }
                return { code: 0, count: res.data.count };
            });
    }

    addComment({ matchid, type, userid, content, touserid }) {
        return promisedApi.http.request({
                url: config.apiUrl.addComment,
                data: { matchid, type, userid, content, touserid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200) {
                    return { code: 1, msg: res.data.errmsg };
                }
                return { code: 0, msg: res.data.errmsg };
            });
    }


}