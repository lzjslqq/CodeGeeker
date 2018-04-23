import { promisedApi } from './utils/promisify';

App({
    onLaunch: function() {
        promisedApi.open
            .getUserInfo()
            .then(res => {
                this.globalData.userInfo = res.userInfo;
            });
        promisedApi.open
            .login()
            .then(code => {

            });
    },
    globalData: {
        userInfo: null
    }
})