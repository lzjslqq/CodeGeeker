import { promisedApi } from './utils/promisify';
import { config } from './configs/config';

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
        this.globalData.commentList = config.comments;

        promisedApi.data.setStorage({ key: 'data', data: this.globalData });

        promisedApi.open
            .getUserInfo()
            .then(res => {
                this.globalData.userInfo = res.userInfo;
                this.globalData.userInfo.id = 100;
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
        cateList: [],
        grapherList: [],
        matchList: [],
        albumList: [],
        photoList: [],
        followList: [],
        favList: [],
    }
})