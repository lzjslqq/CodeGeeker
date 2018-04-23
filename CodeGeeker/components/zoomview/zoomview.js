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
            width: 0,
            height: 0,
            scaleWidth: 0,
            scaleHeight: 0,
            ratio: 1,
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
        onLongPress(e) {
            common.out('long press ', e);
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
                'image.width': e.detail.width,
                'image.height': e.detail.height,
                'image.scaleWidth': scaleW,
                'image.scaleHeight': scaleH,
                'image.left': imageL,
                'image.top': imageT,
                'image.ratio': ratioImg,
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
            // 按比例计算 image的size、position
            let scaleH, scaleW,
                imageL = this.data.image.left,
                imageT = this.data.image.top;

            if (e.touches.length == 1) {
                // 1. 单指拖动

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
                // 2. 双指缩放

                let centerX = this.data.touchesCenter.x,
                    centerY = this.data.touchesCenter.y;

                let sp1 = this.data.points[0],
                    sp2 = this.data.points[1],
                    ep1 = e.touches[0],
                    ep2 = e.touches[1];

                let sd = Math.sqrt(Math.pow(sp1.clientX - sp2.clientX, 2) + Math.pow(sp1.clientY - sp2.clientY, 2));
                let ed = Math.sqrt(Math.pow(ep1.clientX - ep2.clientX, 2) + Math.pow(ep1.clientY - ep2.clientY, 2));

                let ratio = (ed - sd) / this.data.window.width;

                scaleW = (1 + ratio / 2) * this.data.image.scaleWidth;
                scaleH = scaleW / this.data.image.ratio;
                imageL = centerX - (centerX - this.data.image.left) * scaleW / this.data.image.scaleWidth;
                imageT = centerY - (centerY - this.data.image.top) * scaleH / this.data.image.scaleHeight;

                if ((scaleW <= this.data.window.width || scaleH <= this.data.window.height) && scaleW >= 0.5 * this.data.window.width) {
                    this.setData({
                        'image.scaleHeight': scaleH,
                        'image.scaleWidth': scaleW,
                        'image.left': imageL,
                        'image.top': imageT,
                    });
                }

            }
        },
        onImageTouchEnd(e) {
            console.log('end');
            console.log(e);
        },
        // 计算缩放方向、比例
        calcScaleInfo(dx1, dx2, dy1, dy2) {
            let direction, d, ratio;
            let maxd = Math.max(Math.abs(dx1), Math.abs(dx2), Math.abs(dy1), Math.abs(dy2));
            switch (maxd) {
                case Math.abs(dx1):
                    direction = 'x';
                    d = dx1;
                    ratio = d / this.data.window.width;
                    break;
                case Math.abs(dx2):
                    direction = 'x';
                    d = dx2;
                    ratio = d / this.data.window.width;
                    break;
                case Math.abs(dy1):
                    direction = 'y';
                    d = dy1;
                    ratio = d / this.data.window.height;
                    break;
                case Math.abs(dy2):
                    direction = 'y';
                    d = dy2;
                    ratio = d / this.data.window.height;
                    break;
            }
            return { direction, d, ratio };
        },
    },
    behaviors: [],
    externalClasses: [],
    relations: {},
    options: { multipleSlots: true },
});