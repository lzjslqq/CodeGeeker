import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';

const app = getApp();
let leftH = 0;
let rightH = 0;

Page({
    data: {
        grapher: {},
        pageIndex: 1,
        pageSize: 4, // 每次加载两张
        pageCount: 0,
        totalCount: 0, // 当前页面的总图片数，累加
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

        let grapher = config.authors.filter(e => e.id == options.id)[0];

        let picList = config.pictures.filter(p => p.authorid == options.id);
        let albumList = config.albums.filter(e => e.authorid == options.id && picList.some(p => p.albumid == e.id));
        albumList.map(e => {
            e.src = config.pictures.filter(p => p.authorid == options.id && p.albumid == e.id)[0].src;
            e.count = config.pictures.filter(p => p.authorid == options.id && p.albumid == e.id).length;
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

    select(e) {
        this.setData({ selectedTab: e.currentTarget.dataset.tabid });
    },
    gotoDetail(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photo/preview/preview?id=${e.currentTarget.dataset.id}` });
    },
    requestImageList() {
        if (this.data.pageCount > 0 && this.data.pageIndex > this.data.pageCount)
            return;

        common.out(`加载第${this.data.pageIndex}页。`);
        let pageIndex = this.data.pageIndex,
            pageSize = this.data.pageSize,
            authorId = this.data.grapher.id,
            totalCount = this.data.totalCount;

        let start = (pageIndex - 1) * pageSize;
        let list = config.pictures;

        if (authorId > 0) {
            list = list.filter(e => e.authorid == authorId);
        }

        list = list.slice(start, start + pageSize);
        totalCount += list.length;

        this.setData({
            userInfo: app.globalData.userInfo,
            tempPhotoList: this.data.tempPhotoList.concat(list),
            totalCount: totalCount,
            pageIndex: pageIndex + 1,
            pageCount: config.pictures.length / pageSize | 1,
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
        if (this.data.leftPhotoList.length + this.data.rightPhotoList.length >= this.data.totalCount) {
            this.setData({
                leftPhotoList: this.data.leftPhotoList,
                rightPhotoList: this.data.rightPhotoList
            });
        }

    },
    gotoPhotoList(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photo/list/list?grapherid=${this.data.grapher.id}&albumid=${e.currentTarget.dataset.aid}&title=${e.currentTarget.dataset.title}` });
    },

})