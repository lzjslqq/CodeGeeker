import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
const app = getApp()

Page({
    data: {
        image: {},
        album: {},
    },
    onLoad: function(options) {
        let id = options.id; // image.id
        let image = app.globalData.photoList.filter(e => e.id == options.id)[0];
        let album = app.globalData.albumList.filter(e => e.id == image.albumid)[0];
        this.setData({
            image: image,
            album: album
        });
    },
    onShow: function() {},
    onReady: function() {},

    last(e) {
        // let 
    },
    next(e) {

    },



})