import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
const app = getApp()

Page({
    data: {
        image: {},
        hide: false,
        imageAnimation: {},
        commentAnimation: {},
        commentList: [
            "适得府君书来得及",
            "束带结发历史的就，水电费家连锁店几个。手动加个两三点。",
            "束带结发历史的就个。四大金刚了圣诞节，上的连接方式了的架构师。"
        ],
        window: {},
    },
    onLoad: function(options) {
        this.setData({
            image: config.pictures.filter(e => e.id == options.id)[0],
            window: app.globalData.window
        });
    },
    onShow: function() {},
    onReady: function() {},

    trans() {
        console.log('trans');
        this.data.hide ? this.rotate2() : this.rotate1();
    },
    // 动画
    rotate1() {
        let imageAnimation = wx.createAnimation({
            transformOrigin: "top",
            duration: 300,
            timingFunction: "ease-in",
            delay: 0
        });

        imageAnimation
            .rotateX(90)
            .scaleY(0.1)
            .translateY(-this.data.window.height)
            .step();

        let commentAnimation = wx.createAnimation({
            transformOrigin: "center",
            duration: 300,
            timingFunction: "ease-in",
            delay: 0
        });

        commentAnimation
            .translateY(-this.data.window.height)
            .step();

        this.setData({
            hide: true,
            imageAnimation: imageAnimation.export(),
            commentAnimation: commentAnimation.export()
        });
    },

    // 动画
    rotate2() {
        let commentAnimation = wx.createAnimation({
            transformOrigin: "center",
            duration: 300,
            timingFunction: "ease-in",
            delay: 0
        });

        commentAnimation
            .translateY(this.data.window.height)
            .step();

        let imageAnimation = wx.createAnimation({
            transformOrigin: "top",
            duration: 300,
            timingFunction: "ease-in",
            delay: 0
        });

        imageAnimation
            .rotateX(0)
            .scaleY(1)
            .translateY(0)
            .step();

        this.setData({
            hide: false,
            commentAnimation: commentAnimation.export(),
            imageAnimation: imageAnimation.export()
        });
    },

})