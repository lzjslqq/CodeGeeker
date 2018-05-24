import { promisedApi } from '../../utils/promisify';
var app = getApp();
Page({

     /**
      * 页面的初始数据
      */
     data: {
          matchid: 0,
          voteid: 0,
          userInfo: {},
          hasVoted: false,
          selectedIds: [],
          vote: [{
               name: '梅西1',
               value: 1
          },
          {
               name: '梅西2',
               value: 2
          },
          {
               name: '梅西3',
               value: 3
          },
          {
               name: '梅西4',
               value: 4
          },
          {
               name: '梅西5',
               value: 5
          },
          {
               name: '梅西6',
               value: 6
          },
          {
               name: '梅西7',
               value: 7
          }],
          result: [{
               name: '梅西1',
               count: 54321
          },
          {
               name: '梅西2',
               count: 44321
          },
          {
               name: '梅西3',
               count: 32321
          },
          {
               name: '梅西4',
               count: 24321
          },
          {
               name: '梅西5',
               count: 18598
          },
          {
               name: '梅西6',
               count: 25483
          },
          {
               name: '梅西7',
               count: 15478
          }],
          totalVotedCount: 0,
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          this.setData({
               matchid: options.matchid,
               voteid: options.voteid,
               userInfo: app.globalData.userInfo
          });

          let sum = this.data.result.map((item) => item.count).reduce((pre, cur) => pre + cur);
          this.setData({ totalVotedCount: sum });
     },

     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function () {

     },

     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function () {

     },

     checkboxChange(e) {
          console.log('checkbox发生change事件，携带value值为：', e.detail.value)
          // 保存用户选择的选项id数组
          this.setData({ selectedIds: e.detail.value });

     },
     vote: function (e) {
          // let { voteid } = e.currentTarget.dataset;
          // 提交到服务器 用户id matchid voteid ids
          if (this.data.selectedIds.length == 0)
               promisedApi.ui.showToast({ title: '至少需要选择一项喔~', icon: 'none', duration: 2000 });
          else
               this.setData({ hasVoted: true });
     },

     /**
      * 页面相关事件处理函数--监听用户下拉动作
      */
     onPullDownRefresh: function () {

     },
     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function () {

     }
})