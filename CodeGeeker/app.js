import { promisedApi } from './utils/promisify';
import { config } from './configs/config';

App({
    onLaunch: function() {
        let that = this;

        // mock 数据写入到 storage 中
        promisedApi.data.getStorage({ key: 'init' })
            .catch(res => {
                promisedApi.data.setStorage({ key: 'init', data: 'true' });
                promisedApi.data.setStorage({ key: 'categories', data: config.categories });
                promisedApi.data.setStorage({ key: 'graphers', data: config.graphers });
                promisedApi.data.setStorage({ key: 'matches', data: config.matches });
                promisedApi.data.setStorage({ key: 'albums', data: config.albums });
                promisedApi.data.setStorage({ key: 'photoes', data: config.photoes });
                promisedApi.data.setStorage({ key: 'followes', data: config.followes });
                promisedApi.data.setStorage({ key: 'favs', data: config.favs });
            });


        promisedApi.open
            .getUserInfo()
            .then(res => {
                this.globalData.userInfo = res.userInfo;
            });
        promisedApi.open
            .login()
            .then(code => {

            });
        wx.getSystemInfo({
            success: function(res) {
                that.globalData.window = {
                    height: res.windowHeight,
                    width: res.windowWidth,
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        window: {
            height: 0,
            width: 0
        },
    }
})