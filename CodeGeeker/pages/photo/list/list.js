import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
const app = getApp();
let leftH = 0;
let rightH = 0;

Page({
    data: {
        pageIndex: 1,
        pageSize: 8,
        totalCount: 0, // 当前页面的总
        tempPhotoList: [], // 用于加载每次加载的图集列表中间变量
        photoListLeft: [],
        photoListRight: [],
        authorId: 0,
        cateId: 0,
    },
    onLoad: function() {
        this.setData({
            photoList: config.pictures,
            userInfo: app.globalData.userInfo
        });
    },
    onShow: function() {},
    onReady: function() {},
    onReachBottom: function() {
        console.log('reach bottom');
    },

    onImageLoaded(e) {
        console.log(e.target.dataset.index);
        // 判断是否是加载当前页的最后一张

    },
})