// export const domain = 'https://www.t278.cn/';
export const domain = 'http://localhost:61764/';

export const apiUrl = {
    // 授权登录
    getUserInfoByCode: `${domain}/wxa/userlogin`,
    updateUser: `${domain}/wxa/updateUser`,
    checkToken: `${domain}/wxa/checktoken`,
    getUserInfoByToken: `${domain}/wxa/getuserinfo`,
    // 分类
    getCateList: `${domain}/wxa/getCateList`,
    // 主题
    getThemeList: `${domain}/wxa/getThemeList`,
    // 赛事
    getMatchList: `${domain}/wxa/getMatchList`,
    // 摄影师
    getGrapherList: `${domain}/wxa/getGrapherList`,
    getGrapherDetail: `${domain}/wxa/getGrapherDetail`,
    // 消息
    getMessageList: `${domain}/wxa/getMessageList`,
    // 图片
    getAlbumList: `${domain}/wxa/getAlbumList`,
    getPhotoListByCate: `${domain}/wxa/getPhotoListByCate`,
    getPhotoListByGrapher: `${domain}/wxa/getPhotoListByGrapher`,
    getPhotoListByUser: `${domain}/wxa/getPhotoListByUser`,
    getPhotoDetail: `${domain}/wxa/getPhotoDetail`,
    // 安全监测
    checkContent: `${domain}/wxa/checkContent`,
    checkImage: `${domain}/wxa/checkImage`,
}