import { promisedApi } from '../../utils/promisify';
import { common } from '../../utils/util';
import { config } from '../../configs/config';

Page({
    data: {
        imgSrcList: [],
    },
    onLoad: function(options) {

    },

    // 图片批量上传
    uploadFileList: function(paths, idx) { //递归调用
        var that = this;
        promisedApi.http.uploadFile({
                url: `${config.domain}/upload/upload`, //仅为示例，非真实的接口地址
                filePath: paths[idx],
                name: 'file',
            })
            .then(res => {
                common.out('=======上传结果=====', res);
                let info = JSON.parse(res.data);
                if (info.errcode == 200) {
                    this.data.imgSrcList.push({ idx: idx + 1, src: info.path, });

                    if (!((idx + 1) == paths.length)) {
                        that.uploadFileList(paths, idx + 1);
                    } else {
                        that.setData({ imgSrcList: this.data.imgSrcList });
                    }
                } else {
                    // 监测出问题，则弹窗提示
                    console.log(info.errmsg);
                }
            })
            .catch(res => {
                console.log(res);
            });
    },

    chooseImg: function() {
        var that = this;
        promisedApi.image.chooseImage({
                count: 9, // 最多9张
                sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            })
            .then(res => {
                common.out('=========choose=======', res);
                var tempFilePaths = res.tempFilePaths;
                that.uploadFileList(tempFilePaths, 0);
            });
    },
})