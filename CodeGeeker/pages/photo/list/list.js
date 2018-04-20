import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
const app = getApp();
let leftH = 0;
let rightH = 0;

Page({
    data: {
        pageIndex: 1,
        pageSize: 10,
        pageCount: 0,
        totalCount: 0, // 当前页面的总图片数，累加
        tempPhotoList: [], // 用于加载每次加载的图集列表中间变量
        leftPhotoList: [],
        rightPhotoList: [],
        listWidth: 0, // 一列的宽度
        authorId: 0,
        cateId: 0,
    },
    onLoad: function(options) {
        wx.getSystemInfo({
            success: res => {
                this.setData({ listWidth: res.screenWidth * 0.48 });
                this.requestImageList();
            }
        });
    },
    onShow: function() {},
    onReady: function() {},
    onReachBottom: function() {
        common.out('reach bottom');
        this.requestImageList();
    },

    requestImageList() {
        if (this.data.pageCount > 0 && this.data.pageIndex > this.data.pageCount)
            return;

        common.out(`加载第${this.data.pageIndex}页。`);
        let pageIndex = this.data.pageIndex,
            pageSize = this.data.pageSize,
            totalCount = this.data.totalCount;

        let start = (pageIndex - 1) * pageSize;
        let list = config.pictures.slice(start, start + pageSize);
        common.out(list);

        totalCount += list.length;

        this.setData({
            userInfo: app.globalData.userInfo,
            tempPhotoList: list,
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
                tempPhotoList: [],
                leftPhotoList: this.data.leftPhotoList,
                rightPhotoList: this.data.rightPhotoList
            });
        }
    },

})