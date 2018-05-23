import { promisedApi } from '../../../../utils/promisify';
import { config } from '../../../../configs/config';
import { common } from '../../../../utils/util';
import { services } from '../../../../services/services';
const app = getApp();
let userService = new services.UserService();

Page({
    data: {
        userInfo: {},
        followIdList: [], // 关注的摄影师id列表
        grapherList: [],
        pageIndex: 1,
        pageSize: 10,
        pageCount: 0,
        totalCount: 0,
    },
    onLoad: function() {
        this.data.userInfo = app.globalData.userInfo;
    },
    onShow: function() {
        console.log('onShow');
        // 初始化数据
        this.setData({
            grapherList: [],
            totalCount: 0,
            pageIndex: 1,
            pageCount: 0,
        });

        this.requestGrapherList();
    },
    onReady: function() {},
    onReachBottom: function() {
        // console.log('reach bottom');
        // this.requestGrapherList();
    },

    gotoDetail(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photographer/detail/detail?id=${e.currentTarget.dataset.id}` });
    },
    focus(e) {
        let
            grapherid = e.currentTarget.dataset.gid,
            userid = this.data.userInfo.id;
        userService.updateFollow({ userid, grapherid })
            .then(res => {
                this.requestGrapherList();
            });
    },
    requestGrapherList() {
        userService.getGrapherListByFollow({ userid: this.data.userInfo.id })
            .then(res => {
                this.setData({ grapherList: res });
            });
    },
    requestGrapherList1() {
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
    focus1(e) {
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