import { promisedApi } from '../../utils/promisify';
import { common } from '../../utils/util';

const app = getApp();

Page({
    data: {

    },

    onLoad: function() {

    },
    onShow: function() {},
    onReady: function() {},

    gotoPage(e) {
        let item = e.target.dataset.item;
        switch (item) {
            case 'photo':
                promisedApi.ui.navigateTo({ url: '/pages/photo/detail/detail' });
                break;
            case 'photolist':
                promisedApi.ui.navigateTo({ url: '/pages/photo/list/list' });
                break;
            case 'matchphotos':
                promisedApi.ui.navigateTo({ url: '/pages/match/detail/detail' });
                break;
            default:
                break;
        }
    },

})