import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
const app = getApp()

Page({
    data: {
        image: {},
        hover: false,
        showFront: true,
        showBack: false,
        comments: [
            "适得府君书来得及",
            "束带结发历史的就，水电费家连锁店几个。手动加个两三点。",
            "束带结发历史的就个。四大金刚了圣诞节，上的连接方式了的架构师。"
        ],
        flipAnimation: {},
        imageAnimation: {},
        textAnimation: {},
    },
    onLoad: function(options) {
        this.setData({ image: config.pictures.filter(e => e.id == options.id)[0] });
    },
    onShow: function() {},
    onReady: function() {},


    rotateFlipper() {
        this.setData({ hover: !this.data.hover });
        this.rotate();
    },
    rotateImage() {
        this.rotate();
        // this.setData({ showFront: false, showBack: true });
        // promisedApi.sleep(500).then(() => {
        //     // this.setData({ hover: false });
        // });
    },
    rotateText() {
        this.setData({ showFront: true, showBack: false });
    },

    // 动画
    rotate() {
        let animation = wx.createAnimation({
            transformOrigin: "center",
            duration: 1000,
            timingFunction: "ease-in",
            delay: 0
        });

        animation
            .rotateY(0)
            .scaleY(2)
            // .translateY(-100)
            .step();
        this.setData({ imageAnimation: animation.export() });
    },



})