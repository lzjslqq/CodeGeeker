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

}