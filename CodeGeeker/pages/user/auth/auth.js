import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
import { services } from '../../../services/services';
const app = getApp();
let userService = new services.UserService();

Page({
    data: {

    },
    onLoad: function(options) {

    },
    submitAuth() {
        userService.updateUserType({ userid: app.globalData.userInfo.id })
            .then(res => {
                if (res == 1) {
                    app.globalData.userInfo.type = 'grapher';
                    promisedApi.ui.showToast({ title: '恭喜，认证成功！', icon: 'success', duration: 2000 });
                    promisedApi.sleep(2000).then(() => {
                        promisedApi.ui.navigateBack({ delta: 1 });
                    })
                } else {
                    promisedApi.ui.showToast({ title: '恭喜，认证成功！', icon: 'none', duration: 2000 });
                }
            });
    }
})