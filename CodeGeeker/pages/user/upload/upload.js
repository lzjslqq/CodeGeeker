import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
const app = getApp()

Page({
    data: {
        albumId: 0,
        matchList: [],
        cateList: [],
        matchArray: [],
        categoryArray: [],
        selectedMatchId: null,
        selectedcategoryId: null,
        tempPhotoPathList: [],
    },
    onLoad: function(options) {
        console.log(options);
        let data = {};
        data.matchList = config.matches;
        data.cateList = config.categories;
        data.matchArray = data.matchList.map(m => m.title);
        data.categoryArray = data.cateList.map(e => e.name).slice(2);

        if (options.albumid > 0) {
            data.albumId = options.albumid;
            data.tempPhotoPathList = config.photoes.filter(p => p.albumid == data.albumId).map(e => e.src);

            let album = config.albums.filter(a => a.id == data.albumId)[0] || {};

            data.selectedcategoryId = config.categories.filter(c => c.id == album.cateid)[0].id || 0;
            data.selectedMatchId = (config.matches.filter(m => m.id == album.matchid)[0].sortid || 1) - 1;
        }

        this.setData(data);
    },
    onShow: function() {},
    onReady: function() {},
    bindMatchChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({ selectedMatchId: e.detail.value });
    },
    bindCategoryChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({ selectedcategoryId: e.detail.value });
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