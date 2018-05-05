import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
const app = getApp()

Page({
    data: {
        messageList: [],
        userInfo: {},
    },
    onLoad: function(options) {
        let grapherId = 1;
        let msgs = app.globalData.messageList;
        this.setData({ messageList: msgs });
    },
    onShow: function() {},
    onReady: function() {},

})