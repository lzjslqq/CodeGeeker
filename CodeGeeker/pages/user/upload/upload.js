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
        matchList: [],
        textArray: [],
        selectedMatchId: null,
        inputTitle: '',
        inputDesc: '',
        album: {},
        photoList: [],
        tempPhotoList: [], // {id:0, src:''}
        newPhotoPathList: [], // 新的图片列表
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
                                selectedMatchId: idx,
                                inputTitle: album.title,
                                inputDesc: album.desc,
                            });
                        });
                    photoService.getPhotoListByAlbum({ albumid: albumId })
                        .then(res => {
                            let photos = res;
                            let paths = res.map(p => { return { src: p.src, id: p.id } });
                            this.setData({
                                photoList: photos,
                                tempPhotoList: paths,
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
    // input 输入框变动时
    onInputTitle(e) {
        console.log(e);
        this.setData({ inputTitle: e.detail.value });
    },
    // textarea 变动时
    onInputDesc(e) {
        console.log(e);
        this.setData({ inputDesc: e.detail.value });
    },
    bindChooseImage(e) {
        promisedApi.image.chooseImage()
            .then((res) => {
                if (res.tempFilePaths && res.tempFilePaths.length > 0) {
                    res.tempFilePaths.forEach(e => {
                        this.data.tempPhotoList.push({ id: 0, src: e });
                        this.setData({ tempPhotoList: this.data.tempPhotoList });
                    });
                }
            });
    },
    bindDeleteImage(e) {
        let index = e.currentTarget.dataset.index;
        this.data.tempPhotoList.splice(index, 1);
        this.setData({ tempPhotoList: this.data.tempPhotoList });
    },
    bindPublish(e) {
        if (!this.data.selectedMatchId) {
            promisedApi.ui.showToast({ title: '需要先选择比赛喔~', icon: 'none', duration: 2000 });
        } else if (this.data.tempPhotoList.length == 0) {
            promisedApi.ui.showToast({ title: '图片还没选择呢~', icon: 'none', duration: 2000 });
        } else {
            common.out('===========文本=========', this.data);
            // 最终提交时的 src 列表
            this.data.newPhotoPathList = this.data.tempPhotoList.filter(e => e.id > 0).map(e => e.src);
            // 需要上传的图片路径
            let uploadPhotoPathList = this.data.tempPhotoList.filter(e => e.id == 0).map(e => e.src);
            console.log(uploadPhotoPathList);

            if (uploadPhotoPathList.length > 0) {
                // 上传
                let idx = 0;
                this.uploadFileList(uploadPhotoPathList, idx, this.onUploaded);
            } else {
                this.onUploaded();
            }
        }
    },

    // 图片批量上传
    uploadFileList: function(paths, idx, cb) { //递归调用
        var that = this;
        promisedApi.http.uploadFile({
                url: `${config.domain}/upload/upload`,
                filePath: paths[idx],
                name: 'file',
            })
            .then(res => {
                let data = JSON.parse(res.data);
                common.out('=======上传结果=====', data);
                if (data.errcode == 200) {

                    that.data.newPhotoPathList.push(data.info.path);

                    if (((idx + 1) != paths.length)) {
                        that.uploadFileList(paths, idx + 1, cb);
                    } else {
                        // 上传完成
                        cb && cb();
                    }
                } else {
                    // 监测出问题，则弹窗提示
                    promisedApi.ui.showToast({ title: data.errmsg, icon: 'none', duration: 2000 });
                }
            })
            .catch(res => {
                promisedApi.ui.showToast({ title: '上传出现异常！', icon: 'none', duration: 2000 });
            });
    },

    onUploaded() {
        let matchid = this.data.matchList[this.data.selectedMatchId].id;
        if (this.data.album.id) {
            // 修改
            albumService.updateAlbum({
                    albumid: this.data.album.id,
                    title: this.data.inputTitle,
                    desc: this.data.inputDesc,
                    matchid,
                    grapherid: app.globalData.userInfo.id
                })
                .then(res => {
                    // 新增或减少的图片
                    if (res > 0) {
                        albumService.updateAlbumPhotos({ albumid: this.data.album.id, photoPathList: this.data.newPhotoPathList })
                            .then(res => {
                                if (res > 0) {
                                    promisedApi.ui.showToast({ title: '修改成功！', duration: 2000 })
                                        .then(() => {
                                            promisedApi.sleep(2000).then(() => {
                                                promisedApi.ui.navigateBack({ delta: 1 });
                                            });
                                        });
                                }
                            });
                    }
                });
        } else {
            // 新增
            albumService.updateAlbum({
                    albumid: 0,
                    title: this.data.inputTitle,
                    desc: this.data.inputDesc,
                    matchid,
                    grapherid: app.globalData.userInfo.id
                })
                .then(res => {
                    // 新增的图片
                    if (res > 0) {
                        albumService.updateAlbumPhotos({ albumid: res, photoPathList: this.data.newPhotoPathList })
                            .then(res => {
                                if (res > 0) {
                                    promisedApi.ui.showToast({ title: '发布成功！', duration: 2000 })
                                        .then(() => {
                                            promisedApi.sleep(2000).then(() => {
                                                promisedApi.ui.navigateBack({ delta: 1 });
                                            });
                                        });
                                }
                            });
                    }
                });

        }
    }

})