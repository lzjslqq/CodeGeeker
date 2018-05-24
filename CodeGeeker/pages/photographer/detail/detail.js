import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
import { services } from '../../../services/services';
const app = getApp();
let userService = new services.UserService();
let photoService = new services.PhotoService();
let albumService = new services.AlbumService();

let leftH = 0;
let rightH = 0;

Page({
    data: {
        userInfo: {},
        grapher: {},
        tempTotalCount: 0, // 当前页面的总图片数，累加
        tempPhotoList: [], // 用于加载每次加载的图集列表中间变量
        leftPhotoList: [],
        rightPhotoList: [],
        listWidth: 0, // 一列的宽度
        selectedTab: 0,
        albumList: [], // 图集
    },
    onLoad: function(options) {
        // 初始化
        leftH = rightH = 0;

        this.data.userInfo = app.globalData.userInfo;
        this.data.grapher.id = options.id;

        userService.getGrapherDetail({ grapherid: this.data.grapher.id, userid: this.data.userInfo.id })
            .then(res => {
                console.log(!!res.shortDesc);
                promisedApi.ui.setNavigationBarTitle({ title: res.nickName });

                this.setData({
                    grapher: res,
                    listWidth: app.globalData.window.width * 0.48,
                });

                this.requestPhotoList();
                this.requestAlbumList();
            });
    },
    onShow: function() {},
    onReady: function() {},
    onReachBottom: function() {
        // common.out('reach bottom');
        // this.requestImageList();
    },
    onPageScroll: function(e) {
        common.out('滑动', e);
    },

    changeTab(e) {
        this.setData({ selectedTab: e.currentTarget.dataset.tabid });
    },
    gotoPhotoDetail(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photo/detail/detail?id=${e.currentTarget.dataset.id}` });
    },
    gotoPhotoList(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photo/detail/detail?albumid=${e.currentTarget.dataset.aid}&sortid=1` });
    },
    requestPhotoList() {
        photoService.getPhotoListByGrapher({ grapherid: this.data.grapher.id, userid: this.data.userInfo.id })
            .then(res => {
                this.setData({ tempPhotoList: res, tempTotalCount: res.length });
            });
    },
    requestAlbumList() {
        albumService.getAlbumList({ grapherid: this.data.grapher.id })
            .then(res => {
                this.setData({ albumList: res });
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
            leftH += scaleH + 60;
        } else {
            this.data.rightPhotoList.push(img);
            rightH += scaleH + 60;
        }

        // 3. 当最后一张加载完成时，更新页面数据
        if (this.data.leftPhotoList.length + this.data.rightPhotoList.length >= this.data.tempTotalCount) {
            this.setData({
                leftPhotoList: this.data.leftPhotoList,
                rightPhotoList: this.data.rightPhotoList
            });
        }
    },
    focus(e) {
        let
            grapherid = this.data.grapher.id,
            userid = this.data.userInfo.id;

        userService.updateFollow({ userid, grapherid })
            .then(res => {
                userService.getGrapherDetail({ grapherid, userid })
                    .then(res => {
                        console.log(res);
                        this.setData({ grapher: res });
                    });
            });
    },

})