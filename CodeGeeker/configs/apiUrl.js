export const domain = 'https://www.t278.cn/';
// export const domain = 'http://localhost:61764/';

export const apiUrl = {
    // 授权登录
    getUserInfoByCode: `${domain}/wxa/userlogin`,
    updateUser: `${domain}/wxa/updateUser`,
    checkToken: `${domain}/wxa/checktoken`,
    getUserInfoByToken: `${domain}/wxa/getuserinfo`,
    updateGrapherDesc: `${domain}/wxa/updateGrapherDesc`,
    updateUserType: `${domain}/wxa/updateUserType`,
    // 分类
    getCateList: `${domain}/wxa/getCateList`,
    // 主题
    getThemeList: `${domain}/wxa/getThemeList`,
    // 赛事
    getMatchList: `${domain}/wxa/getMatchList`,
    // 评论
    getCommentList: `${domain}/wxa/getCommentList`,
    getCommentUserCount: `${domain}/wxa/getCommentUserCount`,
    addComment: `${domain}/wxa/addComment`,
    // 摄影师
    getGrapherList: `${domain}/wxa/getGrapherList`,
    getGrapherListByFollow: `${domain}/wxa/getGrapherListByFollow`,
    getGrapherDetail: `${domain}/wxa/getGrapherDetail`,
    updateFollow: `${domain}/wxa/updateFollow`,
    // 消息
    getMessageList: `${domain}/wxa/getMessageList`,
    updateMessageStatus: `${domain}/wxa/updateMessageStatus`,
    getUnReadMessageCount: `${domain}/wxa/getUnReadMessageCount`,
    // 图集
    getAlbumList: `${domain}/wxa/getAlbumList`,
    getAlbumDetail: `${domain}/wxa/getAlbumDetail`,
    updateAlbum: `${domain}/wxa/updateAlbum`,
    updateAlbumPhotos: `${domain}/wxa/updateAlbumPhotos`,
    // 图片
    getPhotoListByCate: `${domain}/wxa/getPhotoListByCate`,
    getPhotoListByAlbum: `${domain}/wxa/getPhotoListByAlbum`,
    getPhotoListByGrapher: `${domain}/wxa/getPhotoListByGrapher`,
    getPhotoListByFav: `${domain}/wxa/getPhotoListByFav`,
    getPhotoDetail: `${domain}/wxa/getPhotoDetail`,
    updateFav: `${domain}/wxa/updateFav`,
}