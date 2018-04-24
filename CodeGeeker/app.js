import { promisedApi } from './utils/promisify';

App({
    onLaunch: function() {
        let that = this;

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