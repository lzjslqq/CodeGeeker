import { promisedApi } from './utils/promisify';
import { common } from './utils/util';
import { config } from './configs/config';
import { UserInfo } from './configs/data';
import UserService from './services/userService';
let userService = new UserService();

App({
    onLaunch: function() {
        let that = this;

        this.login();

        wx.getSystemInfo({
            success: function(res) {
                that.globalData.window = {
                    height: res.windowHeight,
                    width: res.windowWidth,
                }
            }
        })
    },

    // 授权登录功能
    login(cb) {
        promisedApi.open.getSetting()
            .then(res => {
                common.out('==== getSetting ====', res);
                if (res.authSetting["scope.userInfo"]) {
                    // 确定授权

                    promisedApi.open.checkSession()
                        .then(res => {
                            // session_key 未过期，通过 key 来请求
                            promisedApi.data.getStorage({ key: 'token' })
                                .then(res => {
                                    let token = res.data;
                                    common.out('token ====', token);
                                    userService.checkToken({ token: token })
                                        .then(res => {
                                            if (res.data.errcode == 200) {
                                                // 成功
                                                userService.getUserInfoByToken({ token: token })
                                                    .then(res => {
                                                        common.out('userInfo ==== ', res.data.userInfo);
                                                        this.globalData.userInfo = res.data.userInfo;
                                                        cb && cb();
                                                    });
                                            } else {
                                                // token 过期                                    
                                                this.getUserInfoByLogin(cb);
                                            }
                                        });
                                })
                                .catch(() => {
                                    common.out('getStorage catch ====');
                                    // session_key 过期或未登录过，重新 wx.login
                                    this.getUserInfoByLogin(cb);
                                });
                        })
                        .catch(() => {
                            common.out('checkSession catch ====');
                            // session_key 过期或未登录过，重新 wx.login
                            this.getUserInfoByLogin(cb);
                        });
                } else {
                    // 拒绝授权
                    promisedApi.ui.showModal({ title: '提示', content: '拒绝授权将会影响部分功能的使用，确定取消授权？', cancelText: '取消', confirmText: '授权' })
                        .then(res => {
                            if (res.confirm) {
                                promisedApi.ui.switchTab({ url: `/pages/user/detail/detail` });
                            }
                        });
                }
            });
    },

    // 通过 wx.login 方式获取用户信息的流程
    getUserInfoByLogin(cb) {
        promisedApi.open.login()
            .then(res1 => {
                common.out('code ====', res1.code);
                userService.getUserInfoByCode({ code: res1.code })
                    .then(res2 => {
                        common.out('userInfo ====', res2.data);
                        if (res2.data.errcode == 200) {
                            // 1. 200-成功
                            this.globalData.userInfo = res2.data.userInfo;
                            let token = res2.data.userInfo.token;
                            promisedApi.data.setStorage({ key: 'token', data: token });
                            cb && cb();
                        } else if (res2.data.errcode == 201) {
                            // 2. 201-新增用户（需要进一步写入nickname等信息）
                            let token = res2.data.token;
                            promisedApi.open.getUserInfo()
                                .then(res3 => {
                                    // 3. 写入微信用户的主要字段信息
                                    userService.updateUser({ token, nickName: res3.userInfo.nickName, avatarUrl: res3.userInfo.avatarUrl })
                                        .then(res4 => {
                                            this.globalData.userInfo = res4.data.userInfo;
                                            let token = res4.data.userInfo.token;
                                            promisedApi.data.setStorage({ key: 'token', data: token });
                                            cb && cb();
                                        });
                                });
                        } else {
                            // 3. 101-失败
                            promisedApi.ui.showToast({ title: '服务器繁忙，请稍后再试！', duration: 2000 });
                        }
                    });
            });
    },

    globalData: {
        userInfo: {},
        window: {
            height: 0,
            width: 0
        },
        cateList: [],
        grapherList: [],
        matchList: [],
        albumList: [],
        photoList: [],
        followList: [],
        favList: [],
    }
})