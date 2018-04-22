import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
const app = getApp()

Page({
    data: {
        image: {},
    },
    onLoad: function(options) {
        this.setData({ image: config.pictures.filter(e => e.id == options.id)[0] });
    },
    onShow: function() {},
    onReady: function() {},

    goBack() {
        promisedApi.ui.navigateBack({});
    },
    onTouchStart(e) {
        console.log('---start---');
        console.log(e);
    },
    onTouchMove(e) {
        console.log('---move---');
        console.log(e);
    },
    onTouchEnd(e) {
        console.log('---end---');
        console.log(e);
    },

})