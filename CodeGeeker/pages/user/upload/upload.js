import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
const app = getApp()

Page({
     data: {
          matchArray: ['美国VS德国', '中国VS巴西', '巴西VS阿根廷', '日本VS朝鲜', '韩国VS智利', '阿尔巴尼亚VS安哥拉', '伊朗VS泰国'],
          categoryArray: ['球迷风采', '梅西', 'C罗', '内马尔', '小罗', '阿根廷','其他'],
          selectedMatchId: null,
          selectedcategoryId:null,
     },

     onLoad: function () {

     },
     onShow: function () { },
     onReady: function () { },
     bindMatchChange: function (e) {
          console.log('picker发送选择改变，携带值为', e.detail.value)
          this.setData({
               selectedMatchId: e.detail.value
          })
     },
     bindCategoryChange: function (e) {
          console.log('picker发送选择改变，携带值为', e.detail.value)
          this.setData({
               selectedcategoryId: e.detail.value
          })
     },

})