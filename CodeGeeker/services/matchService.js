import { promisedApi } from '../utils/promisify';
import { common } from '../utils/util';
import { config } from '../configs/config';

export default class MatchService {
    constructor() {}

    getMatchList() {
        return promisedApi.http.request({
                url: config.apiUrl.getMatchList,
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



}