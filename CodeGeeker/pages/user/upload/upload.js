import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
import { services } from '../../../services/services';
const app = getApp();
let matchService = new services.MatchService();
let albumService = new services.AlbumService();
let photoService = new services.PhotoService();

Page({
    data: {
        album: {},
        matchList: [],
        textArray: [],
        selectedMatchId: null,
        tempPhotoPathList: [],
        uploadPhotoPathList: [], // 上传后的图片路径
    },
    onLoad: function(options) {
        console.log(options);

        matchService.getMatchList()
            .then(res => {
                common.out('======match list ======', res);
                let textArray = res.map(m => `[${m.stage}] ${m.title} ${m.ispass==0?'（完场）':''}`);
                this.setData({
                    matchList: res,
                    textArray: textArray
                });
            })
            .then(() => {
                if (options.albumid > 0) {
                    let albumId = options.albumid;
                    albumService.getAlbumDetail({ albumid: albumId })
                        .then(res => {
                            let album = res;
                            let idx = this.data.matchList.findIndex(e => e.id == album.funcid);
                            this.setData({
                                album: album,
                                selectedMatchId: idx
                            });
                        });
                    photoService.getPhotoListByAlbum({ albumid: albumId })
                        .then(res => {
                            let paths = res.map(p => p.src);
                            this.setData({
                                tempPhotoPathList: paths,
                                uploadPhotoPathList: paths
                            });
                        });
                }
            });



    },
    onShow: function() {},
    onReady: function() {},
    bindMatchChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({ selectedMatchId: e.detail.value });
    },
    bindChooseImage(e) {
        promisedApi.image.chooseImage()
            .then((res) => {
                if (res.tempFilePaths && res.tempFilePaths.length > 0) {
                    this.setData({ tempPhotoPathList: this.data.tempPhotoPathList.concat(res.tempFilePaths) });
                }
            });
    },
    bindDeleteImage(e) {
        let index = e.currentTarget.dataset.index;
        this.data.tempPhotoPathList.splice(index, 1);
        this.setData({ tempPhotoPathList: this.data.tempPhotoPathList });
    },
    bindPublish(e) {
        if (!this.data.selectedMatchId || !this.data.selectedcategoryId || this.data.tempPhotoPathList.length == 0) {
            promisedApi.ui.showToast({ title: '还未上传图片', icon: 'none', duration: 1000 });
        }
    },

})