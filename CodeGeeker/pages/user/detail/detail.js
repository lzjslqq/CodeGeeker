import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
import { services } from '../../../services/services';
const app = getApp();
let userService = new services.UserService();

Page({
    data: {
        userInfo: {},
        isEditing: false,
        inputValue: '',
        messageCount: 0,
    },

    onLoad: function() {},
    onShow: function() {
        app.login(() => {
            this.setData({ userInfo: app.globalData.userInfo });
            this.interval = setInterval(this.getMessageUnreadCount, 5000);
        });
    },
    onReady: function() {},
    onHide: function() {
        clearInterval(this.interval);
    },
    getMessageUnreadCount() {
        userService.getUnReadMessageCount({ userid: this.data.userInfo.id })
            .then(res => {
                this.setData({ messageCount: res });
            });
    },
    getUserInfo(e) {
        app.login(() => {
            this.setData({ userInfo: app.globalData.userInfo });
        });
    },
    gotoAuth() {
        promisedApi.ui.navigateTo({ url: `/pages/user/auth/auth` });
    },
    // 我的作品列表，对应图集列表页
    gotoProductList(e) {
        promisedApi.ui.navigateTo({ url: `/pages/user/product/product` });
    },
    // 我的关注列表，对应摄影师列表页
    gotoGrapherList(e) {
        promisedApi.ui.navigateTo({ url: `/pages/user/followee/list/list` });
    },
    // 我的点赞列表，对应瀑布流页
    gotoFavList(e) {
        promisedApi.ui.navigateTo({ url: `/pages/user/fav/list/list` });
    },

    toEdit(e) {
        this.setData({ isEditing: !this.data.isEditing });
    },
    onInput(e) {
        this.data.inputValue = e.detail.value;
    },
    hideInput(e) {
        this.setData({ isEditing: false });
    },
    send(e) {
        userService.updateGrapherDesc({ grapherid: this.data.userInfo.id, desc: this.data.inputValue })
            .then(res => {
                this.setData({
                    'userInfo.shortDesc': this.data.inputValue,
                    isEditing: false,
                    inputValue: '',
                });
                promisedApi.ui.showToast({ title: '编辑成功！', icon: 'none', duration: 2000 });
            });
    },


})