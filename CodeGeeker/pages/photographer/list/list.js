import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
const app = getApp()

Page({
    data: {
        grapherList: [],
        pageIndex: 1,
        pageSize: 10,
        pageCount: 0,
        totalCount: 0,
    },
    onLoad: function() {
        wx.setNavigationBarColor({ backgroundColor: '#008CD7', frontColor: '#ffffff' });
        this.requestGrapher();
    },
    onShow: function() {},
    onReady: function() {},
    onReachBottom: function() {
        console.log('reach bottom');
        this.requestGrapher();
    },

    gotoDetail(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photographer/detail/detail?id=${e.currentTarget.dataset.id}` });
    },
    requestGrapher() {
        if (this.data.pageCount > 0 && this.data.pageIndex > this.data.pageCount)
            return;

        // common.out(`加载第${this.data.pageIndex}页。`);
        let pageIndex = this.data.pageIndex,
            pageSize = this.data.pageSize,
            totalCount = this.data.totalCount;

        let start = (pageIndex - 1) * pageSize;
        let list = config.authors.slice(start, start + pageSize);

        this.setData({
            grapherList: this.data.grapherList.concat(list),
            totalCount: config.authors.length,
            pageIndex: pageIndex + 1,
            pageCount: config.authors.length / pageSize | 1,
        });
    },
})