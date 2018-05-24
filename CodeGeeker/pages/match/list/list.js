import { promisedApi } from '../../../utils/promisify';
import { config } from '../../../configs/config';
import { common } from '../../../utils/util';
import { services } from '../../../services/services';
const app = getApp();
let matchService = new services.MatchService();

Page({
    data: {
        groupList: [],
    },
    onLoad: function() {
        matchService.getMatchList()
            .then(res => {
                let matchList1 = [],
                    matchList2 = [],
                    groupList1 = [],
                    groupList2 = [];

                matchList1 = res.filter(m => m.ispass == 1).sort((m1, m2) => m1.playtime > m2.playtime);
                matchList2 = res.filter(m => m.ispass == 0).sort((m1, m2) => m1.playtime < m2.playtime);

                // 分组
                matchList1.forEach(m => {
                    let idx = groupList1.findIndex(g => g.playtime == m.playtime);
                    if (idx == -1) {
                        groupList1.push({
                            playtime: m.playtime,
                            stage: m.stage,
                            ispass: false,
                            matchList: [m]
                        });
                    } else {
                        groupList1[idx].matchList.push(m);
                    }
                });

                matchList2.forEach(m => {
                    let idx = groupList2.findIndex(g => g.playtime == m.playtime);
                    if (idx == -1) {
                        groupList2.push({
                            playtime: m.playtime,
                            stage: m.stage,
                            ispass: true,
                            matchList: [m]
                        });
                    } else {
                        groupList2[idx].matchList.push(m);
                    }
                });

                console.log(groupList1.concat(groupList2));

                this.setData({ groupList: groupList1.concat(groupList2) });
            });
    },
    onShow: function() {},
    onReady: function() {},

    gotoMatch(e) {
        promisedApi.ui.navigateTo({ url: `/pages/match/detail/detail?matchid=${e.currentTarget.dataset.mid}&title=${e.currentTarget.dataset.title}` });
    },

})