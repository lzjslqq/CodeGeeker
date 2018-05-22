import { promisedApi } from '../utils/promisify';
import { common } from '../utils/util';
import { config } from '../configs/config';

export default class SecurityService {
    constructor() {}

    checkContent({ content }) {
        return promisedApi.http.request({
            url: config.apiUrl.checkContent,
            data: { content },
            method: 'POST'
        });
    }

    checkImage({ file }) {
        return promisedApi.http.request({
            url: config.apiUrl.checkImage,
            data: { file },
            method: 'POST'
        });
    }



}