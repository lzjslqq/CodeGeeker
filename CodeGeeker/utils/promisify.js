import { common } from './util';

let debug = false; // out 开关

const promisify = (fn) => {
    return (args = {}) => {
        return new Promise((resolve, reject) => {
            args.success = function(res) {
                // 成功回调
                debug && common.out('promise success!', res);
                resolve(res);
            }
            args.fail = function(res) {
                // 失败回调
                debug && common.out('promise fail....', res);
                reject(res);
            }
            fn(args);
        });
    }
};

Promise.prototype.finally = function(cb) {
    let instance = this.constructor;
    return this.then(
        value => instance.resolve(cb()).then(() => value),
        reason => { debug && common.out('promise finally 异常：', reason); }
    );
};


// promise 实现sleep
const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}



/*----------------- 网络接口 -----------------*/
const request = ({ url, data, method = 'GET', header }) => { return promisify(wx.request)({ url, data, method, header }); };
const uploadFile = ({ url, filePath, name, header = {}, formData = {} }) => { return promisify(wx.uploadFile)({ url, filePath, name, header, formData }); };
const downloadFile = ({ url }) => { return promisify(wx.downloadFile)({ url }); };


/*----------------- 开放接口 -----------------*/
const getUserInfo = () => { return promisify(wx.getUserInfo)(); };
// 获取临时登录凭证（code）
const login = () => { return promisify(wx.login)(); };


/*----------------- 客服消息接口 -----------------*/




/*----------------- 界面交互 -----------------*/
const showToast = ({ title, icon, image, mask, duration = 500 }) => { return promisify(wx.showToast)({ title, icon, image, mask, duration }); };
const showLoading = ({ title, mask } = {}) => { return promisify(wx.showLoading)({ title, mask }); };
const showModal = ({ title, content, showCancel, cancelText, cancelColor, confirmText, confirmColor } = {}) => { return promisify(wx.showModal)({ title, content, showCancel, cancelText, cancelColor, confirmText, confirmColor }); };
// 页面底部的菜单栏
const showActionSheet = ({ itemList }) => { return promisify(wx.showActionSheet)({ itemList }); };
const navigateTo = ({ url }) => { return promisify(wx.navigateTo)({ url }); };
const redirectTo = ({ url }) => { return promisify(wx.redirectTo)({ url }); };
const navigateBack = ({ delta } = {}) => { return promisify(wx.navigateBack)({ delta }); };
const switchTab = ({ url }) => { return promisify(wx.switchTab)({ url }); };
// 设置导航栏
const setNavigationBarTitle = ({ title }) => { return promisify(wx.setNavigationBarTitle({ title })) };
const setNavigationBarColor = ({ frontColor = '#000000', backgroundColor = '#ffffff' }) => { return promisify(wx.setNavigationBarColor({ frontColor, backgroundColor })) };
// 设置选项卡


/*----------------- 动画操作 -----------------*/



/*----------------- 媒体接口 - 图片 -----------------*/
// 调起本地图片选择窗口
const chooseImage = ({ count = 9, sizeType = 'original', sourceType = 'album' } = {}) => {
    return promisify(wx.chooseImage)({
        count, // 最多可以选择的图片张数，默认9
        sizeType, // original 原图，compressed 压缩图，默认二者都有
        sourceType // album 从相册选图，camera 使用相机，默认二者都有
    });
};
// 预览图片列表（本地或外网）
const previewImage = ({ current = undefined, urls = [] } = {}) => { return promisify(wx.previewImage)({ current, urls }); };
// 获取图片信息（本地或外网）
const getImageInfo = ({ src } = {}) => { return promisify(wx.getImageInfo)({ src }); };
// 保存本地图片到相册
const saveImageToPhotosAlbum = ({ filePath }) => { return promisify(wx.saveImageToPhotosAlbum)({ filePath }); };


/*----------------- 媒体接口 - 音频 -----------------*/
// const func = ({}) => { return promisify(); };
// const func = ({}) => { return promisify(); };
// const func = ({}) => { return promisify(); };
// const func = ({}) => { return promisify(); };
// const func = ({}) => { return promisify(); };



/*----------------- 文件操作 -----------------*/
// 将文件保存至本地
const saveFile = ({ filePath }) => { return promisify(wx.saveFile)({ tempFilePath: filePath }); };
// 获取本地文件信息（通用）
const getFileInfo = ({ filePath }) => { return promisify(wx.getFileInfo)({ filePath }); };
// 获取本地已保存的文件列表
const getSavedFileList = () => { return promisify(wx.getSavedFileList)(); };
// 获取本地文件信息（不支持临时文件）
const getSavedFileInfo = ({ filePath }) => { return promisify(wx.getSavedFileInfo)({ filePath }); };
// 删除本地保存的文件
const removeSavedFile = ({ filePath }) => { return promisify(wx.removeSavedFile)({ filePath }); };
// 打开本地文件。fileType: doc, xls, ppt, pdf, docx, xlsx, pptx
const openDocument = ({ filePath }) => { return promisify(wx.openDocument)({ filePath }); };



/*----------------- 文件操作 -----------------*/
const getStorage = ({ key = '' }) => { return promisify(wx.getStorage)({ key }); };
const setStorage = ({ key = '', data } = {}) => { return promisify(wx.setStorage)({ key, data }); };




export const promisedApi = {
    sleep: sleep,
    http: {
        request,
        uploadFile,
        downloadFile,
    },
    open: {
        getUserInfo,
        login,
    },
    ui: {
        showToast,
        showLoading,
        showModal,
        showActionSheet,
        navigateTo,
        navigateBack,
        redirectTo,
        switchTab,
        setNavigationBarTitle,
        setNavigationBarColor,
    },
    image: {
        chooseImage,
        previewImage,
        getImageInfo,
        saveImageToPhotosAlbum,
    },
    file: {
        saveFile,
        getFileInfo,
        getSavedFileList,
        getSavedFileInfo,
        removeSavedFile,
        openDocument,
    },
    data: {
        getStorage,
        setStorage,
    },
};