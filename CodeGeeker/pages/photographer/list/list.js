import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { Follow } from '../../../configs/data';
const app = getApp()

Page({
    data: {
        grapherList: [],
        followList: [],
        pageIndex: 1,
        pageSize: 10,
        pageCount: 0,
        totalCount: 0,
    },
    onLoad: function() {},
    onShow: function() {
        this.setData({
            followList: app.globalData.followList,
            grapherList: [],
            totalCount: 0,
            pageIndex: 1,
            pageCount: 0,
        });
        this.requestGrapherList();
    },
    onReady: function() {},
    onReachBottom: function() {
        console.log('reach bottom');
        this.requestGrapherList();
    },

    gotoDetail(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photographer/detail/detail?id=${e.currentTarget.dataset.id}` });
    },
    requestGrapherList() {
        if (this.data.pageCount > 0 && this.data.pageIndex > this.data.pageCount)
            return;

        // common.out(`加载第${this.data.pageIndex}页。`);
        let pageIndex = this.data.pageIndex,
            pageSize = this.data.pageSize,
            totalCount = this.data.totalCount;

        let start = (pageIndex - 1) * pageSize;
        let list = app.globalData.grapherList.slice(start, start + pageSize);

        // 关注字段
        let userId = app.globalData.userInfo.id;
        list.map(g => {
            g.focused = app.globalData.followList.findIndex(e => e.grapherid == g.id && e.userid == userId) > -1;
        });

        this.setData({
            grapherList: this.data.grapherList.concat(list),
            totalCount: app.globalData.grapherList.length,
            pageIndex: pageIndex + 1,
            pageCount: app.globalData.grapherList.length / pageSize | 1,
        });
    },
    focus(e) {
        let
            grapherId = e.currentTarget.dataset.gid,
            userId = this.data.userId;

        // 1. 除去的列表
        let list = [];
        app.globalData.followList.forEach(e => {
            if (e.grapherid != grapherId || e.userid != userId) {
                list.push(e);
            }
        });
        // 2. 操作后的列表
        if (app.globalData.followList.findIndex(f => f.userid == userId && f.grapherid == grapherId) > -1) {
            app.globalData.followList = list;
        } else {
            app.globalData.followList.push(new Follow({ userid: userId, grapherid: grapherId }));
        }

        // 更新界面
        this.data.grapherList.map(e => {
            if (e.id == grapherId) {
                e.focused = !e.focused;
            }
        });
        this.setData({ grapherList: this.data.grapherList });
    },
})