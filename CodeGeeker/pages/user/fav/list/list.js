import { promisedApi } from '../../../../utils/promisify';
import { common } from '../../../../utils/util';
const app = getApp()
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

        let favPhotoList = app.globalData.favList.filter(f => f.userid == this.data.userId).map(e => e.photoid);

        this.setData({
            favPhotoList: favPhotoList,
            screenHeight: app.globalData.window.height,
            listWidth: app.globalData.window.width * 0.48,
            tempTotalCount: 0,
            tempPhotoList: [],
            leftPhotoList: [],
            rightPhotoList: [],
            pageIndex: 1,
            pageCount: 0,
        });

        this.requestImageList();
    },
    onReady: function() {},
    onReachBottom: function() {
        common.out('reach bottom');
        this.requestImageList();
    },

    selectCate(e) {
        let id = e.currentTarget.dataset.id;
        this.setData({
            selectedCateId: id,
            tempTotalCount: 0,
            tempPhotoList: [],
            leftPhotoList: [],
            rightPhotoList: [],
            pageIndex: 1,
            pageCount: 0,
        });
        leftH = rightH = 0;

        this.requestImageList();
    },
    gotoDetail(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photo/detail/detail?id=${e.currentTarget.dataset.id}` });
    },
    requestImageList() {
        if (this.data.pageCount > 0 && this.data.pageIndex > this.data.pageCount)
            return;

        common.out(`加载第${this.data.pageIndex}页。`);
        let
            favPhotoList = this.data.favPhotoList,
            pageIndex = this.data.pageIndex,
            pageSize = this.data.pageSize,
            tempTotalCount = this.data.tempTotalCount,
            pageCount = this.data.pageCount;

        // 总数据
        let list = app.globalData.photoList.filter(p => favPhotoList.findIndex(pid => pid == p.id) > -1);
        pageCount = list.length / pageSize | 1;

        // 分页
        let start = (pageIndex - 1) * pageSize;
        list = list.slice(start, start + pageSize);

        // 关联字段处理
        list.map(p => {
            let g = app.globalData.grapherList.filter(e => e.id == p.grapherid)[0];
            p.grapherName = g.name;
            p.grapherAvatarUrl = g.avatarUrl;
            p.faved = true;
        });

        tempTotalCount += list.length;

        this.setData({
            tempPhotoList: this.data.tempPhotoList.concat(list),
            tempTotalCount: tempTotalCount,
            pageIndex: pageIndex + 1,
            pageCount: pageCount,
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
            // 循环初始化加载页面
            if (Math.min(leftH, rightH) + 10 < this.data.screenHeight) {
                console.log('load more...')
                this.requestImageList();
            }
        }

    },

})