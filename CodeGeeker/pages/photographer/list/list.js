import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
import { services } from '../../../services/services';
const app = getApp();
let userService = new services.UserService();

Page({
    data: {
        userInfo: {},
        grapherList: [],
    },
    onLoad: function() {},
    onShow: function() {
        this.data.userInfo = app.globalData.userInfo;
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
    requestGrapherList() {
        userService.getGrapherList({ userid: app.globalData.userInfo.id })
            .then(res => {
                this.setData({ grapherList: res });
            });
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
})