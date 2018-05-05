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
        let msgs = app.globalData.messageList.filter(m => m.grapherid == grapherId);
        this.setData({ messageList: msgs });
    },
    onShow: function() {},
    onReady: function() {},

})