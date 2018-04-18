import { promisedApi } from './utils/promisify';

App({
    onLaunch: function() {
        promisedApi.open
            .login()
            .then(code => {
                console.log(code);
            });
    },
    globalData: {
        userInfo: null
    }
})