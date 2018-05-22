import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
const app = getApp()

Page({
    data: {
        userInfo: {},
        isEditing: false,
        inputValue: '',
    },

    onLoad: function() {
        this.setData({ userInfo: app.globalData.userInfo });
    },
    onShow: function() {},
    onReady: function() {},

    getUserInfo(e) {
        app.login(() => {
            this.setData({ userInfo: app.globalData.userInfo });
        });
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
        this.setData({
            'userInfo.shortDesc': this.data.inputValue,
            isEditing: false,
            inputValue: '',
        });
    },


})