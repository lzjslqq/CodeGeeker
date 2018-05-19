import { promisedApi } from '../../../utils/promisify';
import { common } from '../../../utils/util';
import { config } from '../../../configs/config';
import { Fav } from '../../../configs/data';
const app = getApp()

Page({
     data: {
          image: {},
          album: {},
          lastTouching: false,
          nextTouching: false,
     },
     onLoad: function (options) {
          let id = options.id, // image.id
               sortId = options.sortid,
               albumId = options.albumid,
               userId = app.globalData.userInfo.id;

          let image = {},
               album = {};

          if (id > 0) {
               image = app.globalData.photoList.filter(e => e.id == id)[0];
               album = app.globalData.albumList.filter(e => e.id == image.albumid)[0];
          } else if (sortId > 0 && albumId > 0) {
               image = app.globalData.photoList.filter(e => e.albumid == albumId && e.sortid == sortId)[0];
               album = app.globalData.albumList.filter(e => e.id == albumId)[0];
          }

          image.faved = app.globalData.favList.filter(e => e.userid == userId && e.photoid == image.id).length > 0;

          this.setData({
               image: image,
               album: album,
          });
     },
     onShow: function () { },
     onReady: function () { },
     onShareAppMessage: function () {
          common.out('onShareAppMessage');
          let title = this.data.album.title;
          let path = `/pages/photo/detail/detail?albumid=${this.data.album.id}&sortid=${this.data.image.sortid}`;
          let icon = this.data.image.src;
          return {
               title: title,
               path: path,
               imageUrl: icon,
          }
     },

     gotoGrapher(e) {
          promisedApi.ui.navigateTo({ url: `/pages/photographer/detail/detail?id=${e.currentTarget.dataset.id}` });
     }, 
     gotoPainting(e) {
          promisedApi.ui.navigateTo({ url: `/pages/painting/painting?id=${e.currentTarget.dataset.id}` });
     },
     last(e) {
          this.setData({ lastTouching: true });
          let sortId = e.currentTarget.dataset.sort,
               albumId = this.data.album.id,
               userId = app.globalData.userInfo.id;
          let
               image = app.globalData.photoList.filter(e => e.albumid == albumId && e.sortid == sortId)[0],
               album = app.globalData.albumList.filter(e => e.id == albumId)[0];

          image.faved = app.globalData.favList.filter(e => e.userid == userId && e.photoid == image.id).length > 0;

          this.setData({
               image: image,
               album: album,
               lastTouching: false
          });
     },
     next(e) {
          this.setData({ nextTouching: true });
          let sortId = e.currentTarget.dataset.sort,
               albumId = this.data.album.id,
               userId = app.globalData.userInfo.id;
          let
               image = app.globalData.photoList.filter(e => e.albumid == albumId && e.sortid == sortId)[0],
               album = app.globalData.albumList.filter(e => e.id == albumId)[0];

          image.faved = app.globalData.favList.filter(e => e.userid == userId && e.photoid == image.id).length > 0;

          this.setData({
               image: image,
               album: album,
               nextTouching: false
          });
     },
     fav(e) {
          let
               photoId = e.currentTarget.dataset.id,
               userId = app.globalData.userInfo.id;

          // 先判断，再做相应处理
          let allFavList = app.globalData.favList;

          if (allFavList.findIndex(e => e.userid == userId && e.photoid == photoId) > -1) {
               // 更新全局变量
               app.globalData.favList = allFavList.filter(e => !(e.userid == userId && e.photoid == photoId));
               // 更新页面变量
               let favcount = this.data.image.favcount - 1;
               this.setData({
                    'image.faved': false,
                    'image.favcount': favcount,
               });
          } else {
               // 更新全局变量
               allFavList.push(new Fav({
                    photoid: photoId,
                    userid: userId,
               }));
               app.globalData.favList = allFavList;
               // 更新页面变量
               let favcount = this.data.image.favcount + 1;
               this.setData({
                    'image.faved': true,
                    'image.favcount': favcount,
               });
          }
     },



})