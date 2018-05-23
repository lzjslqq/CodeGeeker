import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
import { services } from '../../../services/services';
const app = getApp();
let userService = new services.UserService();

Page({
    data: {
        messageList: [],
        userInfo: {},
    },
    onLoad: function(options) {
        this.data.userInfo = app.globalData.userInfo;
        userService.getMessageList({ userid: this.data.userInfo.id })
            .then(res => {
                this.setData({ messageList: res });
            });
    },
    onShow: function() {},
    onReady: function() {},

})