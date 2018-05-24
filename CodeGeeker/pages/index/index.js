import { promisedApi } from '../../utils/promisify';
import { config } from '../../configs/config';
import { common } from '../../utils/util';
import { services } from '../../services/services';
const app = getApp();
let cateService = new services.CateService();
let userService = new services.UserService();
let photoService = new services.PhotoService();
let albumService = new services.AlbumService();

let leftH = 0;
let rightH = 0;

Page({
    data: {
        cateList: [],
        selectedCateId: 0,
        tempTotalCount: 0, // 当前页面的总图片数，累加
        tempPhotoList: [], // 用于加载每次加载的图集列表中间变量
        leftPhotoList: [],
        rightPhotoList: [],
        listWidth: 0, // 一列的宽度
        ad: {
            src: '/images/index/ad.png',
            height: 240,
            width: app.globalData.window.width * 0.48,
        }
    },

    onLoad: function() {},
    onShow: function() {
        // 初始化
        leftH = this.data.ad.height;
        rightH = 0;

        this.setData({
            listWidth: app.globalData.window.width * 0.48
        });

        cateService.getCateList()
            .then(res => {
                this.setData({ cateList: res, selectedCateId: res[0].sortid });
            })
            .then(() => {
                photoService.getPhotoListByCate({ sortid: this.data.selectedCateId })
                    .then(res => {
                        this.setData({ tempPhotoList: res, tempTotalCount: res.length });
                    });
            });
    },
    onReady: function() {},
    onReachBottom: function() {},

    selectCate(e) {
        let sortid = e.currentTarget.dataset.sortid;
        this.setData({
            selectedCateId: sortid,
            tempTotalCount: 0,
            tempPhotoList: [],
            leftPhotoList: [],
            rightPhotoList: [],
        });

        if (sortid == this.data.cateList[0].sortid) {
            leftH = this.data.ad.height;
            rightH = 0;
        } else {
            leftH = rightH = 0;
        }

        photoService.getPhotoListByCate({ sortid })
            .then(res => {
                this.setData({ tempPhotoList: res, tempTotalCount: res.length });
            });
    },
    gotoAd() {
        promisedApi.ui.navigateTo({ url: `/pages/match/list/list` });
    },
    gotoDetail(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photo/detail/detail?albumid=${e.currentTarget.dataset.albumid}&sortid=${e.currentTarget.dataset.sortid}` });
    },
    onImageLoaded(e) {
        let img = this.data.tempPhotoList.filter(p => p.id == e.target.dataset.pid)[0];

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