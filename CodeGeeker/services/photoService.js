import { promisedApi } from '../utils/promisify';
import { common } from '../utils/util';
import { config } from '../configs/config';

export default class PhotoService {
    constructor() {}

    getPhotoListByCate({ cateid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getPhotoListByCate,
                data: { cateid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    getPhotoListByAlbum({ albumid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getPhotoListByAlbum,
                data: { albumid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    getPhotoListByGrapher({ grapherid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getPhotoListByGrapher,
                data: { grapherid },
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

    getPhotoDetail({ albumid, sortid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getPhotoDetail,
                data: { albumid, sortid },
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