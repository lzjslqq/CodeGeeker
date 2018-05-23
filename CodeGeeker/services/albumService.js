import { promisedApi } from '../utils/promisify';
import { common } from '../utils/util';
import { config } from '../configs/config';

export default class AlbumService {
    constructor() {}

    getAlbumList({ matchid, grapherid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getAlbumList,
                data: { matchid, grapherid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200 && res.data.list) {
                    return JSON.parse(res.data.list);
                }
                return [];
            });
    }

    getAlbumDetail({ albumid }) {
        return promisedApi.http.request({
                url: config.apiUrl.getAlbumDetail,
                data: { albumid },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200) {
                    return JSON.parse(res.data.data);
                }
                return {};
            });
    }

    /**
     * albumid , 0-新增，1-修改 
     */
    updateAlbum({ albumid, matchid, grapherid, title, desc }) {
        return promisedApi.http.request({
                url: config.apiUrl.updateAlbum,
                data: { albumid, matchid, grapherid, title, desc },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200) {
                    return res.data.data;
                }
                return 0;
            });
    }

    /**
     * 新增或修改相册对应的图片数据
     */
    updateAlbumPhotos({ albumid, photoPathList }) {
        return promisedApi.http.request({
                url: config.apiUrl.updateAlbumPhotos,
                data: { albumid, photoPathList },
                method: 'POST'
            })
            .then(res => {
                if (res && res.data.errcode == 200) {
                    return 1;
                }
                return 0;
            });
    }

}