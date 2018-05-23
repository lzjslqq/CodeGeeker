import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
import { services } from '../../../services/services';
const app = getApp();
let userService = new services.UserService();
let albumService = new services.AlbumService();

Page({
    data: {
        userInfo: {},
        albumList: [],
    },
    onLoad: function() {
        this.data.userInfo = app.globalData.userInfo;

        albumService.getAlbumList({ grapherid: this.data.userInfo.id })
            .then(res => {
                this.setData({ albumList: res });
            });
    },
    onShow: function() {},
    onReady: function() {},

    gotoAlbumDetail(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photo/detail/detail?albumid=${e.currentTarget.dataset.aid}&sortid=1` });
    },
    gotoEdit(e) {
        promisedApi.ui.navigateTo({ url: `/pages/user/upload/upload?albumid=${e.currentTarget.dataset.aid}` });
    },

})