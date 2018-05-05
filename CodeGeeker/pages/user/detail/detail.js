import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
const app = getApp()

Page({
    data: {

    },

    onLoad: function() {

        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#008CD7',
            animation: {
                duration: 500,
                timingFunc: 'easeIn'
            }
        })

    },
    onShow: function() {},
    onReady: function() {},

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

})