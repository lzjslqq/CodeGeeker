import {
    promisedApi
} from '../../../utils/promisify';
import {
    config
} from '../../../configs/config';
import {
    common
} from '../../../utils/util';
import {
    services
} from '../../../services/services';
const app = getApp();
let albumService = new services.AlbumService();
let commentService = new services.CommentService();

Page({
    data: {
        matchId: 0,
        matchTitle: '',
        userInfo: {},
        albumList: [],
        commentList: [],
        commentUserCount: 0,
        showInput: false,
        inputValue: '',
        toUserId: 0,
        toUserName: '',
    },
    onLoad: function(options) {
        promisedApi.ui.setNavigationBarTitle({ title: options.title });
        this.data.matchId = options.matchid;
        this.data.matchTitle = options.title;
        this.data.userInfo = app.globalData.userInfo;
    },
    onShow: function() {},
    onReady: function() {
        this.interval = setInterval(this.requestData, 1000);
    },
    onShareAppMessage: function() {
        common.out('onShareAppMessage');
        let title = `${this.data.matchTitle} 新出炉的一波世界杯现场图集，速来加入讨论大军吧~`;
        let path = `/pages/match/detail/detail?matchid=${this.data.matchId}&title=${this.data.matchTitle}`;
        return {
            title: title,
            path: path,
        }
    },

    requestData() {
        albumService.getAlbumList({ matchid: this.data.matchId })
            .then(res => {
                this.setData({
                    albumList: res
                });
            });

        commentService.getCommentList({ matchid: this.data.matchId })
            .then(res => {
                this.setData({ commentList: res });
            });

        commentService.getCommentUserCount({ matchid: this.data.matchId })
            .then(res => {
                this.setData({ commentUserCount: res.count });
            });
    },
    gotoPhotoList(e) {
        promisedApi.ui.navigateTo({
            url: `/pages/photo/detail/detail?albumid=${e.currentTarget.dataset.id}&sortid=1`
        });
    },
    selectUser(e) {
        let uid = e.currentTarget.dataset.uid;
        let uname = e.currentTarget.dataset.uname;
        this.setData({
            toUserId: uid,
            toUserName: uname,
            showInput: true,
        });
    },
    comment(e) {
        this.setData({
            showInput: !this.data.showInput
        });
    },
    onInput(e) {
        this.data.inputValue = e.detail.value;
    },
    hideInput(e) {
        this.setData({
            showInput: false
        });
    },
    send(e) {
        console.log(this.data.inputValue.replace(/\@.+：/, ''));
        commentService.addComment({
                matchid: this.data.matchId,
                type: this.data.toUserId > 0 ? 2 : 1,
                userid: this.data.userInfo.id,
                content: this.data.inputValue.replace(/\@.+：/, ''),
                touserid: this.data.toUserId
            })
            .then(res => {
                console.log(res);
                this.setData({
                    toUserId: 0,
                    toUserName: '',
                    showInput: false,
                });
                this.requestData();
            });
    },
    vote(e) {
        promisedApi.ui.navigateTo({
            url: `/pages/vote/vote`
        });
    }
})