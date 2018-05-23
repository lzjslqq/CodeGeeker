import { promisedApi } from '../utils/promisify';
import { common } from '../utils/util';
import { config } from '../configs/config';

export default class PhotoService {
    constructor() {}

    getPhotoListByCate({ cateid, userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getPhotoListByCate,
                data: { cateid, userid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    getPhotoListByAlbum({ albumid, userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getPhotoListByAlbum,
                data: { albumid, userid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    getPhotoListByGrapher({ grapherid, userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getPhotoListByGrapher,
                data: { grapherid, userid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    getPhotoListByFav({ userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getPhotoListByFav,
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

    getPhotoDetail({ albumid, sortid, userid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getPhotoDetail,
                data: { albumid, sortid, userid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.data) {
                    return JSON.parse(res.data.data);
                }
                return {};
            });
    }

    uploadImage({ tempPath }) {
        return promisedApi.http.uploadFile({
            url: `${config.domain}/upload/upload`,
            filePath: tempPath,
            name: 'file',
        });
    }

}