import { promisedApi } from '../utils/promisify';
import { common } from '../utils/util';
import { config } from '../configs/config';

export default class ThemeService {
    constructor() {}

    getThemeList() {
        return promisedApi.http.request({
                url: config.apiUrl.getThemeList,
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