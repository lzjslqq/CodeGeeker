import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
const app = getApp()

Page({
    data: {
        userId: 0,
        albumList: [],
    },
    onLoad: function() {

        let albumList = app.globalData.albumList;
        albumList.map(e => {
            e.src = app.globalData.photoList.filter(p => p.albumid == e.id)[0].src;
            e.count = app.globalData.photoList.filter(p => p.albumid == e.id).length;
        });

        this.setData({
            userId: app.globalData.userInfo.id,
            // albumList: app.globalData.albumList.filter(a => a.grapherid == app.globalData.userInfo.id),
            albumList: albumList,
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