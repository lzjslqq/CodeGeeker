import { promisedApi } from './utils/promisify';
import { common } from './utils/util';
import { config } from './configs/config';
import { UserInfo } from './configs/data';

App({
    onLaunch: function() {
        let that = this;

        this.globalData.userList = config.users;
        this.globalData.cateList = config.categories;
        this.globalData.grapherList = config.graphers;
        this.globalData.matchList = config.matches;
        this.globalData.albumList = config.albums;
        this.globalData.photoList = config.photoes;
        this.globalData.followList = config.followes;
        this.globalData.favList = config.favs;
        this.globalData.messageList = config.messages;
        this.globalData.commentList = config.comments;

        promisedApi.open
            .getUserInfo()
            .then(res => {
                common.out('用户信息：', res);
                let userInfo = res.userInfo;
                userInfo.id = 100;
                this.globalData.userInfo = userInfo;

                this.globalData.userList.push(new UserInfo({
                    id: userInfo.id,
                    name: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl,
                    type: 'grapher',
                    fanscount: Math.random() * 1000 | 0,
                    productcount: Math.random() * 100 | 0,
                    desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。',
                }));

                // 存入缓存
                promisedApi.data.setStorage({ key: 'data', data: this.globalData });
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