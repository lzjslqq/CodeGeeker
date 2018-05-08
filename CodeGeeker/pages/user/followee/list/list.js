import { promisedApi } from '../../../../utils/promisify';
import { common } from '../../../../utils/util';
import { Follow } from '../../../../configs/data';
const app = getApp()

Page({
    data: {
        userId: 0,
        followIdList: [], // 关注的摄影师id列表
        grapherList: [],
        pageIndex: 1,
        pageSize: 10,
        pageCount: 0,
        totalCount: 0,
    },
    onLoad: function() {
        this.data.userId = app.globalData.userInfo.id;
    },
    onShow: function() {
        console.log('onShow');
        // 初始化数据
        this.setData({
            grapherList: [],
            totalCount: 0,
            pageIndex: 1,
            pageCount: 0,
        })
        this.data.followIdList = app.globalData.followList.filter(f => f.userid == this.data.userId).map(e => e.grapherid);

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
            totalCount = this.data.totalCount,
            pageCount = this.data.pageCount;

        // 总数据
        let list = app.globalData.grapherList.filter(g => this.data.followIdList.findIndex(gid => gid == g.id) > -1);
        totalCount = list.length;
        pageCount = list.length / pageSize | 1;

        // 分页
        let start = (pageIndex - 1) * pageSize;
        list = list.slice(start, start + pageSize);

        // 关注字段
        list.map(g => { g.focused = true; });

        this.setData({
            grapherList: this.data.grapherList.concat(list),
            totalCount: totalCount,
            pageIndex: pageIndex + 1,
            pageCount: pageCount,
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