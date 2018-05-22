import { promisedApi } from '../utils/promisify';
import { common } from '../utils/util';
import { config } from '../configs/config';

export default class CateService {
    constructor() {}

    getCateList({ cateid }) {
        return promisedApi.http.request({
            url: config.apiUrl.getCateList,
            data: { cateid },
            method: 'POST'
        });
    }



}