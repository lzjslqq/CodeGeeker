import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
const app = getApp()

Page({
     data: {
          matchArray: ['美国', '中国', '巴西', '日本', '韩国', '阿尔巴尼亚', '朝鲜'],
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