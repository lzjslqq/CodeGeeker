import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { Follow } from '../../../configs/data';

const app = getApp();
let leftH = 0;
let rightH = 0;

Page({
    data: {
        grapher: {},
        pageIndex: 1,
        pageSize: 4, // 每次加载两张
        pageCount: 0,
        totalCount: 0,
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

        let grapher = app.globalData.grapherList.filter(e => e.id == options.id)[0];
        let userId = app.globalData.userInfo.id;
        let grapherId = grapher.id;
        grapher.focused = app.globalData.followList.findIndex(e => e.grapherid == grapherId && e.userid == userId) > -1;
        console.log(grapher);

        let picList = app.globalData.photoList.filter(p => p.grapherid == options.id);
        let albumList = app.globalData.albumList.filter(e => e.grapherid == options.id && picList.some(p => p.albumid == e.id));
        albumList.map(e => {
            e.src = app.globalData.photoList.filter(p => p.grapherid == options.id && p.albumid == e.id)[0].src;
            e.count = app.globalData.photoList.filter(p => p.grapherid == options.id && p.albumid == e.id).length;
        });

        promisedApi.ui.setNavigationBarTitle({ title: grapher.name });

        this.setData({
            grapher: grapher,
            albumList: albumList,
            listWidth: app.globalData.window.width * 0.48,
        });

        this.requestImageList();
    },
    onShow: function() {},
    onReady: function() {},
    onReachBottom: function() {
        common.out('reach bottom');
        this.requestImageList();
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
    requestImageList() {
        if (this.data.pageCount > 0 && this.data.pageIndex > this.data.pageCount)
            return;

        common.out(`加载第${this.data.pageIndex}页。`);
        let pageIndex = this.data.pageIndex,
            pageSize = this.data.pageSize,
            grapherId = this.data.grapher.id,
            totalCount = this.data.totalCount,
            tempTotalCount = this.data.tempTotalCount,
            userId = app.globalData.userInfo.id || 100;

        let start = (pageIndex - 1) * pageSize;
        let list = app.globalData.photoList;

        if (grapherId > 0) {
            list = list.filter(e => e.grapherid == grapherId);
        }

        // 关联字段处理
        list.map(p => {
            p.faved = app.globalData.favList.filter(e => e.userid == userId && e.photoid == p.id).length > 0;
        });

        totalCount = list.length;
        list = list.slice(start, start + pageSize);
        tempTotalCount += list.length;

        this.setData({
            userInfo: app.globalData.userInfo,
            tempPhotoList: this.data.tempPhotoList.concat(list),
            tempTotalCount: tempTotalCount,
            totalCount: totalCount,
            pageIndex: pageIndex + 1,
            pageCount: app.globalData.photoList.length / pageSize | 1,
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
        let list = [];
        let
            grapherId = e.currentTarget.dataset.gid,
            userId = app.globalData.userInfo.id;

        app.globalData.followList.forEach(e => {
            if (e.grapherid != grapherId || e.userid != userId) {
                list.push(e); // removed
            }
        });

        // check
        if (this.data.grapher.focused) {
            console.log('will 取关');
            app.globalData.followList = list;
            // 更新界
            this.data.grapher.focused = false;
            this.setData({
                grapher: this.data.grapher
            });
        } else {
            console.log('will 关注');
            list.push(new Follow({ userid: userId, grapherid: grapherId }));
            app.globalData.followList = list;
            // 更新界面
            this.data.grapher.focused = true;
            this.setData({
                grapher: this.data.grapher
            });
        }
    },

})