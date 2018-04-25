import { domain } from './website';

/**
 * 数据集：
 *  1. 用户信息（包括摄影师）UserInfo
 *  2. 首页分类 Category
 *  3. 图集 Album
 *  4. 图片列表 Photo
 *  5. 关注列表 Follow
 *  6. 点赞列表 Fav
 *  7. 比赛列表 Match
 */

// type：1 user，2 grapher
class UserInfo {
    constructor({ id, name, avatarUrl, type, fanscount, productcount, desc }) {
        this.id = id;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.fanscount = fanscount;
        this.productcount = productcount;
        this.desc = desc;
        this.type = type;
    }
}

// 比赛
class Match {
    constructor({ id, title, home, visit, homepic, visitpic, time }) {
        this.id = id;
        this.title = title;
        this.home = home;
        this.visit = visit;
        this.homepic = homepic;
        this.visitpic = visitpic;
        this.time = time;
    }
}

// 图集类别
class Album {
    constructor({ id, title, desc, grapherid, matchid, cateid, addtime }) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.grapherid = grapherid;
        this.matchid = matchid;
        this.cateid = cateid;
        this.addtime = addtime;
    }
}

// 图片。关联点：首页分类、图集（摄影师）、比赛
class Photo {
    constructor({ id, title, src, grapherid, albumid, cateid, matchid, favcount, commentcount }) {
        this.id = id;
        this.title = title;
        this.src = src;
        this.grapherid = grapherid;
        this.albumid = albumid;
        this.cateid = cateid;
        this.matchid = matchid;
        this.favcount = favcount;
        this.commentcount = commentcount;
    }
}

// 关注
class Follow {
    constructor({ userid, grapherid }) {
        this.userid = userid;
        this.grapherid = grapherid;
    }
}

// 点赞
class Fav {
    constructor({ photoid, userid }) {
        this.photoid = photoid;
        this.userid = userid;
    }
}



let
    categories = [],
    users = [],
    matches = [],
    albums = [],
    photos = [],
    follows = [],
    favs = [];

// CategoryList
categories = [
    { id: 1, name: '最新' },
    { id: 2, name: '热门' },
    { id: 3, name: '梅西' },
    { id: 4, name: 'C罗' },
    { id: 5, name: '内马尔' },
    { id: 6, name: '西班牙' },
    { id: 7, name: '德国' },
    { id: 8, name: '球迷风采' },
    { id: 9, name: '其他' },
];

// UserList
for (let i = 0; i < 20; i++) {
    let isGrapher = (Math.random() * 10 | 0) % 3 == 1;

    let idx = (i + 1) % 10 > 0 ? (i + 1) % 10 : 1;
    users.push(new UserInfo({
        id: i + 1,
        name: isGrapher ? `摄影师${i+1}` : `用户${i+1}`,
        avatarUrl: `${domain}/codegeek/authors/author${idx}.jpg`,
        type: isGrapher ? 'grapher' : 'user',
        fanscount: Math.random() * 1000 | 0,
        productcount: Math.random() * 100 | 0,
        desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。',
    }));
}

// MatchList
for (let i = 0; i < 32; i++) {
    let
        idx1 = (i + 1) % 10 > 0 ? (i + 1) % 10 : 1,
        idx2 = (i + 1) % 7 > 0 ? (i + 1) % 7 : 1;
    matches.push(new Match({
        id: i + 1,
        title: `比赛${i+1>9 ? i+1: '0'+(i+1)}`,
        homepic: `${domain}/codegeek/authors/author${idx1}.jpg`,
        home: '阿根廷',
        homepic: `${domain}/codegeek/authors/author${idx2}.jpg`,
        home: '德国',
        time: '2018-06-12 12:20:20',
    }));
}

// AlbumList
for (let i = 0; i < 30; i++) {
    let grapherList = users.filter(u => u.type == 'grapher');
    let
        cateId = Math.random() * categories.length | 0,
        matchId = Math.random() * matches.length | 0,
        idx = Math.random() * grapherList.length | 0,
        grahperId = grapherList[idx].id;

    albums.push(new Album({
        id: i + 1,
        title: `图集${i+1>9 ? i+1: '0'+(i+1)}`,
        desc: '束带结发历史的就了。适得府君书两地分居，数据的法律手段监理公司来得及。四大金刚了圣诞节发。老数据的过了圣诞节饭。',
        grapherid: grahperId,
        matchid: matchId,
        cateid: cateId,
        addtime: '2018-06-12 12:20:20',
    }));
}

// PhotoList
for (let i = 0; i < 100; i++) {
    let grapherList = users.filter(u => u.type == 'grapher');
    let
        albumId = Math.random() * albums.length | 0,
        cateId = Math.random() * categories.length | 0,
        matchId = Math.random() * matches.length | 0,
        idx = Math.random() * grapherList.length | 0,
        grahperId = grapherList[idx].id;
    let k = (i + 1) % 21 > 0 ? (i + 1) % 21 : 1;
    photos.push(new Photo({
        id: i + 1,
        title: `照片${i+1>9 ? i+1: '0'+(i+1)}`,
        src: `${domain}/codegeek/photos/${k}.jpg`,
        grapherid: grahperId,
        albumid: albumId,
        cateid: cateId,
        matchid: matchId,
        favcount: Math.random() * 1000 | 0,
        commentcount: Math.random() * 100 | 0,
    }));
}

// FollowList
for (let i = 0; i < 100; i++) {
    let grapherList = users.filter(u => u.type == 'grapher');
    let
        userId = Math.random() * users.length | 0,
        idx = Math.random() * grapherList.length | 0,
        grahperId = grapherList[idx].id;

    follows.push(new Follow({
        userid: userId,
        grapherid: grahperId,
    }));
}

// FavList
for (let i = 0; i < 100; i++) {
    let
        photoId = Math.random() * photos.length | 0,
        userId = Math.random() * users.length | 0;

    favs.push(new Fav({
        photoid: photoId,
        userid: userId,
    }));
}


export const data = {
    categories,
    users,
    matches,
    albums,
    photos,
    follows,
    favs,
}

// export const authors = [
//     { id: 1, name: '摄影师001', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
//     { id: 2, name: '摄影师002', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
//     { id: 3, name: '摄影师003', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
//     { id: 4, name: '摄影师004', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
//     { id: 5, name: '摄影师005', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
//     { id: 6, name: '摄影师006', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
//     { id: 7, name: '摄影师007', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
//     { id: 8, name: '摄影师008', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
//     { id: 9, name: '摄影师009', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
// ];


// export const albums = [
//     { id: 1, title: '世界杯第1天', authorid: 1, addtime: '2018-04-10 23:23:23' },
//     { id: 2, title: '世界杯第2天', authorid: 2, addtime: '2018-04-10 23:23:23' },
//     { id: 3, title: '世界杯第3天', authorid: 2, addtime: '2018-04-10 23:23:23' },
//     { id: 4, title: '世界杯第4天', authorid: 3, addtime: '2018-04-10 23:23:23' },
//     { id: 5, title: '世界杯第5天', authorid: 2, addtime: '2018-04-10 23:23:23' },
//     { id: 6, title: '世界杯第6天', authorid: 2, addtime: '2018-04-10 23:23:23' },
//     { id: 7, title: '世界杯第7天', authorid: 2, addtime: '2018-04-10 23:23:23' },
// ];

// export const pictures = [
//     { id: 1, cateid: 1, authorid: 1, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/1.jpg` },
//     { id: 2, cateid: 3, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/2.jpg` },
//     { id: 3, cateid: 3, authorid: 2, albumid: 3, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/3.jpg` },
//     { id: 4, cateid: 1, authorid: 2, albumid: 3, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/4.jpg` },
//     { id: 5, cateid: 5, authorid: 2, albumid: 4, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/5.jpg` },
//     { id: 6, cateid: 6, authorid: 6, albumid: 5, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/6.jpg` },
//     { id: 7, cateid: 7, authorid: 7, albumid: 6, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/7.jpg` },
//     { id: 8, cateid: 3, authorid: 2, albumid: 3, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/8.jpg` },
//     { id: 9, cateid: 3, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/9.jpg` },
//     { id: 10, cateid: 3, authorid: 2, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/10.jpg` },
//     { id: 11, cateid: 6, authorid: 6, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/11.jpg` },
//     { id: 12, cateid: 7, authorid: 2, albumid: 4, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/12.jpg` },
//     { id: 13, cateid: 4, authorid: 6, albumid: 6, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/13.jpg` },
//     { id: 14, cateid: 3, authorid: 2, albumid: 7, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/14.jpg` },
//     { id: 15, cateid: 5, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/15.jpg` },
//     { id: 16, cateid: 3, authorid: 2, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/16.jpg` },
//     { id: 17, cateid: 3, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/17.jpg` },
//     { id: 18, cateid: 1, authorid: 7, albumid: 3, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/18.jpg` },
//     { id: 19, cateid: 3, authorid: 1, albumid: 5, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/19.jpg` },
//     { id: 20, cateid: 6, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/20.jpg` },
//     { id: 21, cateid: 4, authorid: 1, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/21.jpg` },
// ];