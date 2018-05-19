const app = getApp();

Page({

     data: {
          hasChoosedImg: false,
          canvasWidth: 0,
          canvasHeight: 0, // canvas的完整高度
          canvasTempHeight: 0, // canvas的临时高度（用在操作栏影响画布高度时）
          windowHeight: 0, // 屏幕高度
          fingerPosition: [0, 0], // 手指触摸的所在位置
          backgroundImg: undefined, // 背景图片，即导入的图片
          r: 33,
          g: 33,
          b: 33,
          w: 10,
          hasChoosedClear: false, // 是否开启清空栏
          hasChoosedEraser: false, // 是否开启橡皮擦
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          let id = options.id; // image.id
          let image = app.globalData.photoList.filter(e => e.id == id)[0];
          this.setData({ backgroundImg: image })

          let that = this;
          // 获取设备信息，canvas高度用
          wx.getSystemInfo({
               success: function (res) {
                    console.log(res);
                    that.setData({
                         canvasWidth: res.windowWidth,
                         canvasHeight: res.windowHeight - 110,
                         windowHeight: res.windowHeight
                    })
               },
          })

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
     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function () {

     }
})