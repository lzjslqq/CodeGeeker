import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
const app = getApp()

Page({
     data: {

     },

     onLoad: function () {

          wx.setNavigationBarColor({
               frontColor: '#ffffff',
               backgroundColor: '#008CD7',
               animation: {
                    duration: 500,
                    timingFunc: 'easeIn'
               }
          })

     },
     onShow: function () { },
     onReady: function () { },

})