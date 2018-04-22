import { promisedApi } from '../../utils/promisify';
import { common } from '../../utils/util';
import { config } from '../../configs/config';
let app = getApp();
let logout = false;

Component({
    properties: {
        imageSrc: {
            type: String,
            value: '',
            observer(value) {
                this.setData({ 'image.src': value });
            }
        }
    },
    data: {
        image: {
            src: '',
            scaleWidth: 0,
            scaleHeight: 0,
            left: 0,
            top: 0,
        },
        window: {
            width: 0,
            height: 0,
            ratio: 1,
        },
        points: [], // 触摸点
        touchesCenter: { x: 0, y: 0 }, // 缩放触摸点中心
    },
    created: function() {
        logout && common.out('zoomview created...1');
        // can't use setData here.
    },
    attached: function() {
        logout && common.out('zoomview attached...2');
        let that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    window: {
                        width: res.windowWidth,
                        height: res.windowHeight,
                        ratio: res.windowWidth / res.windowHeight, // 宽高比
                    }
                });
            }
        });
    },
    ready: function() {
        logout && common.out('zoomview ready...3');
    },
    moved: function() {
        logout && common.out('zoomview moved...');
    },
    detached: function() {
        logout && common.out('zoomview detached...');
    },
    methods: {
        goBack(e) {
            promisedApi.ui.navigateBack();
        },
        onImageLoaded(e) {
            // 按比例计算 image 的 scale、position（默认适屏居中）
            let ratioImg = e.detail.width / e.detail.height;
            let scaleW, scaleH, imageL, imageT;
            if (ratioImg >= this.data.window.ratio) {
                scaleW = this.data.window.width;
                scaleH = scaleW / ratioImg;
                imageL = 0;
                imageT = (this.data.window.height - scaleH) / 2;
            } else {
                scaleH = this.data.window.height;
                scaleW = scaleH * ratioImg;
                imageL = (this.data.window.width - scaleW) / 2;
                imageT = 0;
            }

            this.setData({
                'image.scaleWidth': scaleW,
                'image.scaleHeight': scaleH,
                'image.left': imageL,
                'image.top': imageT,
            });
        },
        onImageTouchStart(e) {
            console.log('start---');
            if (e.touches.length == 1) {
                this.data.points = e.touches;
            } else if (e.touches.length >= 2) {
                this.data.points = e.touches;
                this.data.touchesCenter = {
                    x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                    y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
                }
            }
        },
        onImageTouchMove(e) {
            console.log('move===');
            console.log(e);
            // 按比例计算 image的size、position
            let
                imageL = this.data.image.left,
                imageT = this.data.image.top;

            if (e.touches.length == 1) {
                let sp = this.data.points[0],
                    ep = e.touches[0];
                let distX = ep.clientX - sp.clientX;
                let distY = ep.clientY - sp.clientY;

                this.setData({
                    'image.left': imageL + distX,
                    'image.top': imageT + distY,
                    'points': e.touches,
                });
            } else if (e.touches.length >= 2) {
                let scaleH, scaleW, ratio;

                let sp1 = this.data.points[0],
                    sp2 = this.data.points[1],
                    ep1 = e.touches[0],
                    ep2 = e.touches[1];

                let dX1 = ep1.clientX - sp1.clientX,
                    dX2 = ep2.clientX - sp2.clientX,
                    dY1 = ep1.clientY - sp1.clientY,
                    dY2 = ep2.clientY - sp2.clientY;

                let centerX = this.data.touchesCenter.x,
                    centerY = this.data.touchesCenter.y;

                // 1. 判断阀值：30px
                if (Math.abs(dX1) > 30 || Math.abs(dX2) > 30 || Math.abs(dY1) > 30 || Math.abs(dY2) > 30) {
                    // 2. 判断中心点是否在图片区域内
                    if (centerX > this.data.image.left && centerX < this.data.image.left + this.data.image.scaleWidth &&
                        centerY > this.data.image.top && centerY < this.data.image.top + this.data.image.scaleHeight) {

                        let d = Math.max(dX1, dX2, dY1, dY2);
                        if (d == dX1 || d == dX2) {
                            ratio = d / this.data.window.width;

                        } else {
                            ratio = d / this.data.window.height;

                        }
                    }
                }
            }
        },
        onImageTouchEnd(e) {
            console.log('end');
            console.log(e);
        },
        meetScaleCondition(sp1, ep1, sp2, ep2) {
            let dX1 = ep1.clientX - sp1.clientX,
                dX2 = ep2.clientX - sp2.clientX,
                dY1 = ep1.clientY - sp1.clientY,
                dY2 = ep2.clientY - sp2.clientY;

            // 1. 判断阀值：30px
            if (Math.abs(dX1) > 30 || Math.abs(dX2) > 30 || Math.abs(dY1) > 30 || Math.abs(dY2) > 30) {
                // 2. 判断中心点是否在图片区域内
                let centerX = this.data.touchesCenter.x,
                    centerY = this.data.touchesCenter.y;
                if (centerX > this.data.image.left && centerX < this.data.image.left + this.data.image.scaleWidth &&
                    centerY > this.data.image.top && centerY < this.data.image.top + this.data.image.scaleHeight) {
                    return true;
                }
            }
            return false;
        },
    },
    behaviors: [],
    externalClasses: [],
    relations: {},
    options: { multipleSlots: true },
});