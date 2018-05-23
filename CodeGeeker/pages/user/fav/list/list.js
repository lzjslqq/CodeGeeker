import { promisedApi } from '../../../../utils/promisify';
import { config } from '../../../../configs/config';
import { common } from '../../../../utils/util';
import { services } from '../../../../services/services';
const app = getApp();
let photoService = new services.PhotoService();
let leftH = 0;
let rightH = 0;

Page({
    data: {
        userId: 0,
        favPhotoList: [], // 点赞的图片的id列表
        pageIndex: 1,
        pageSize: 4, // 每次加载两张
        pageCount: 0,
        tempTotalCount: 0, // 当前页面的总图片数，累加
        tempPhotoList: [], // 用于加载每次加载的图集列表中间变量
        leftPhotoList: [],
        rightPhotoList: [],
        screenHeight: 0, // 屏幕高度
        listWidth: 0, // 一列的宽度
    },
    onLoad: function() {
        this.data.userId = app.globalData.userInfo.id;
    },
    onShow: function() {
        // 初始化
        leftH = rightH = 0;

        this.requestImageList();
    },
    onReady: function() {},
    onReachBottom: function() {},

    gotoDetail(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photo/detail/detail?id=${e.currentTarget.dataset.id}` });
    },
    requestImageList() {
        photoService.getPhotoListByFav({ userid: this.data.userId })
            .then(res => {
                this.setData({
                    favPhotoList: res,
                    screenHeight: app.globalData.window.height,
                    listWidth: app.globalData.window.width * 0.48,
                    tempPhotoList: res,
                    tempTotalCount: res.length,
                });
            });
    },
    onImageLoaded(e) {
        let img = this.data.tempPhotoList.filter(p => p.id == e.target.dataset.index)[0];

        // 1. 计算缩放后的高度
        let scaleH = this.data.listWidth * e.detail.height / e.detail.width;
        img.width = this.data.listWidth;
        img.height = scaleH;

        // 2. 判断两边总高后，放入列表
        if (leftH <= rightH) {
            this.data.leftPhotoList.push(img);
            leftH += scaleH;
        } else {
            this.data.rightPhotoList.push(img);
            rightH += scaleH;
        }

        // 3. 当最后一张加载完成时，更新页面数据
        if (this.data.leftPhotoList.length + this.data.rightPhotoList.length >= this.data.tempTotalCount) {
            this.setData({
                leftPhotoList: this.data.leftPhotoList,
                rightPhotoList: this.data.rightPhotoList
            });
        }

    },

})