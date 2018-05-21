import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
const app = getApp()

Page({
     data: {
          userInfo: {},
          isEditing: false,
     },

     onLoad: function () {
          this.setData({ userInfo: app.globalData.userInfo });
     },
     onShow: function () { },
     onReady: function () { },

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

     editUserDesc(e) {
          this.setData({ isEditing: true });
     },
     endEditUserDesc(e){

          this.setData({ isEditing: false });
          let newDesc = e.detail.value;
          this.setData({ 'userInfo.shortDesc': newDesc });
     }

})