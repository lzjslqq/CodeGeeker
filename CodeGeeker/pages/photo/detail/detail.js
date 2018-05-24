import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
import { services } from '../../../services/services';
const app = getApp();
let albumService = new services.AlbumService();
let photoService = new services.PhotoService();

Page({
    data: {
        albumId: 0,
        sortId: 0,
        userId: 0,
        image: {},
        photoList: [],
        lastTouching: false,
        nextTouching: false,
        showInfo: true,
    },
    onLoad: function(options) {
        console.log(options);
        this.data.albumId = options.albumid;
        this.data.sortId = options.sortid;
        this.data.userId = app.globalData.userInfo.id;

        photoService.getPhotoDetail({ albumid: this.data.albumId, sortid: this.data.sortId, userid: this.data.userId })
            .then(res => {
                this.setData({ image: res });
            });
    },
    onShow: function() {},
    onReady: function() {},
    onShareAppMessage: function() {
        common.out('onShareAppMessage');
        let title = this.data.album.title;
        let path = `/pages/photo/detail/detail?albumid=${this.data.album.id}&sortid=${this.data.image.sortid}`;
        let icon = this.data.image.src;
        return {
            title: title,
            path: path,
            imageUrl: icon,
        }
    },

    gotoGrapher(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photographer/detail/detail?id=${e.currentTarget.dataset.id}` });
    },
    gotoPainting(e) {
        promisedApi.ui.navigateTo({ url: `/pages/painting/painting?id=${e.currentTarget.dataset.id}` });
    },
    last(e) {
        this.setData({ lastTouching: true });
        let sortid = e.currentTarget.dataset.sortid;
        promisedApi.ui.redirectTo({ url: `/pages/photo/detail/detail?albumid=${this.data.albumId}&sortid=${sortid}` })
    },
    next(e) {
        this.setData({ nextTouching: true });
        let sortid = e.currentTarget.dataset.sortid;
        promisedApi.ui.redirectTo({ url: `/pages/photo/detail/detail?albumid=${this.data.albumId}&sortid=${sortid}` })
    },
    fav(e) {
        let photoId = e.currentTarget.dataset.id;

        // 先判断，再做相应处理
        photoService.updateFav({ userid: this.data.userId, photoid: photoId })
            .then(res => {
                photoService.getPhotoDetail({ albumid: this.data.albumId, sortid: this.data.sortId, userid: this.data.userId })
                    .then(res => {
                        this.setData({ image: res });
                    });
            });
    },

    toggleInfo(e) {

        this.setData({ showInfo: !this.data.showInfo });
    },
    download(e) {

        promisedApi.open.getSetting()
            .then(res => {

                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            // 用户已经同意小程序使用相册
                            wx.downloadFile({
                                url: 'https://www.t278.cn//codegeek/authors/author09.jpg',
                                success: function(res) {

                                    if (res.statusCode === 200) {

                                        promisedApi.image.saveImageToPhotosAlbum({ filePath: res.tempFilePath })
                                    }
                                }
                            })




                        }
                    })
                } else
                    wx.downloadFile({
                        url: 'https://www.t278.cn//codegeek/authors/author09.jpg',
                        success: function(res) {

                            if (res.statusCode === 200) {

                                promisedApi.image.saveImageToPhotosAlbum({ filePath: res.tempFilePath })
                            }
                        }
                    })
            })
    }

})