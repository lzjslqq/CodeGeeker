import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';

const app = getApp()

Page({
    data: {
        matchList: [],
    },
    onLoad: function() {
        let matches = app.globalData.matchList;
        let defaultSrc = app.globalData.photoList[0].src;
        matches.map(e => {
            if (app.globalData.photoList.findIndex(p => p.matchid == e.id) > -1) {
                e.bgimage = app.globalData.photoList.filter(p => p.matchid == e.id)[0].src;
            } else {
                e.bgimage = defaultSrc;
            }
            let commentList = app.globalData.commentList.filter(c => c.matchid == e.id);
            e.commentcount = app.globalData.userList.filter(u => commentList.findIndex(c => c.userid == u.id) > -1).length;
        });
        this.setData({ matchList: matches });
    },
    onShow: function() {},
    onReady: function() {},

    gotoMatch(e) {
        promisedApi.ui.navigateTo({ url: `/pages/match/detail/detail?matchid=${e.currentTarget.dataset.mid}&title=${e.currentTarget.dataset.title}` });
    },

})