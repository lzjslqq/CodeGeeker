import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
import { services } from '../../../services/services';
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
        commentUser: 0,
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

        albumService.getAlbumList({ matchid: this.data.matchid })
            .then(res => {
                console.log(res);
                this.setData({ albumList: res });
            });

        commentService.getCommentList({ matchid: this.data.matchid })
            .then(res => {
                console.log(res);
                this.setData({ commentList: res });
            });



        // let albumList = app.globalData.albumList.filter(e => e.matchid == options.matchid);
        // let defaultSrc = app.globalData.photoList[0].src;
        // albumList.map(e => {
        //     e.bgimage = app.globalData.photoList.filter(p => p.albumid == e.id)[0].src;
        //     e.count = app.globalData.photoList.filter(c => c.albumid == e.id).length;
        // });
        // let commentList = app.globalData.commentList.filter(e => e.matchid == options.matchid).sort((a, b) => a.id < b.id);
        // let commentUser = app.globalData.userList.filter(e => commentList.findIndex(c => c.userid == e.id) > -1).length;
        // this.setData({
        //     matchId: options.matchid,
        //     matchTitle: options.title,
        //     userInfo: app.globalData.userInfo,
        //     albumList: albumList,
        //     commentList: commentList,
        //     commentUser: commentUser,
        // });
    },
    onShow: function() {},
    onReady: function() {},
    onShareAppMessage: function() {
        common.out('onShareAppMessage');
        let title = `${this.data.matchTitle} 新出炉的一波世界杯现场图集，速来加入讨论大军吧~`;
        let path = `/pages/match/detail/detail?matchid=${this.data.matchId}&title=${this.data.matchTitle}`;
        return {
            title: title,
            path: path,
        }
    },

    gotoPhotoList(e) {
        promisedApi.ui.navigateTo({ url: `/pages/photo/detail/detail?albumid=${e.currentTarget.dataset.id}&sortid=1` });
    },
    selectUser(e) {
        let uid = e.currentTarget.dataset.uid;
        let user = app.globalData.userList.filter(e => e.id == uid)[0];
        this.setData({
            toUserId: uid,
            toUserName: user.name,
            showInput: true,
        });
    },
    comment(e) {
        this.setData({ showInput: !this.data.showInput });
    },
    onInput(e) {
        this.data.inputValue = e.detail.value;
    },
    hideInput(e) {
        this.setData({ showInput: false });
    },
    send(e) {
        let that = this;
        let value = this.data.inputValue;
        value = value.replace(/\@.*：/, '');
        app.globalData.commentList.sort((a, b) => a.id < b.id);
        let maxId = app.globalData.commentList[0].id;

        app.globalData.commentList.push(new Comment({
            id: maxId + 1,
            userid: that.data.userInfo.id,
            username: that.data.userInfo.nickName,
            useravatar: that.data.userInfo.avatarUrl,
            matchid: that.data.matchId,
            content: value,
            type: that.data.toUserId > 0 ? 2 : 1,
            touserid: that.data.toUserId,
            toname: that.data.toUserName,
            time: '2018-05-01 12:23:23',
        }));

        // refresh data
        let commentList = app.globalData.commentList.filter(e => e.matchid == that.data.matchId).sort((a, b) => a.id < b.id);
        let commentUser = app.globalData.userList.filter(e => commentList.findIndex(c => c.userid == e.id)).length;
        this.setData({
            commentList: commentList,
            commentUser: commentUser,
            showInput: false,
            toUserId: 0,
        });
    },
    vote(e) {
        promisedApi.ui.navigateTo({ url: `/pages/vote/vote` });
    }
})