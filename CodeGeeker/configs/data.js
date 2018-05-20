import { domain } from './apiUrl';
import { promisedApi } from '../utils/promisify';

/**
 * 数据集：
 *  1. 用户信息（包括摄影师）UserInfo
 *  2. 首页分类 Category
 *  3. 图集 Album
 *  4. 图片列表 Photo
 *  5. 关注列表 Follow
 *  6. 点赞列表 Fav
 *  7. 比赛列表 Match
 *  8. 消息列表 Message
 *  9. 评论列表 Comment
 */

// type：1 user，2 grapher
export class UserInfo {
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
export class Match {
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
export class Album {
    constructor({ id, title, desc, grapherid, matchid, cateid, addtime, count }) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.grapherid = grapherid;
        this.matchid = matchid;
        this.cateid = cateid;
        this.addtime = addtime;
        this.count = count;
    }
}

// 图片。关联点：首页分类、图集（摄影师）、比赛
export class Photo {
    constructor({ id, title, src, grapherid, grapheravatar, albumid, cateid, matchid, favcount, commentcount, addtime, sortid }) {
        this.id = id;
        this.title = title;
        this.src = src;
        this.grapherid = grapherid;
        this.grapheravatar = grapheravatar;
        this.albumid = albumid;
        this.cateid = cateid;
        this.matchid = matchid;
        this.favcount = favcount;
        this.commentcount = commentcount;
        this.addtime = addtime;
        this.sortid = sortid;
    }
}

// 关注
export class Follow {
    constructor({ userid, grapherid }) {
        this.userid = userid;
        this.grapherid = grapherid;
    }
}

// 点赞
export class Fav {
    constructor({ photoid, userid }) {
        this.photoid = photoid;
        this.userid = userid;
    }
}

// 赛事评论
export class Comment {
    constructor({ id, userid, username, useravatar, matchid, content, type, touserid, toname, time }) {
        this.id = id;
        this.userid = userid;
        this.username = username;
        this.useravatar = useravatar;
        this.matchid = matchid;
        this.type = type; // 1.普通评论，2.回复评论
        this.touserid = touserid;
        this.toname = toname;
        this.content = content;
        this.time = time;
    }
}

// 消息
// type: fav/follow
export class Message {
    constructor({ id, grapherid, userid, username, type, time, photoid, photosrc, albumtitle }) {
        this.id = id;
        this.grapherid = grapherid;
        this.userid = userid;
        this.username = username;
        this.type = type;
        this.time = time;
        this.photoid = photoid;
        this.photosrc = photosrc;
        this.albumtitle = albumtitle;
    }
}



let
    categories = [],
    users = [],
    matches = [],
    albums = [],
    photos = [],
    follows = [],
    favs = [],
    messages = [],
    comments = [];

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
        avatarUrl: `${domain}/codegeek/authors/author${idx>9?idx:'0'+idx}.jpg`,
        type: isGrapher ? 'grapher' : 'user',
        fanscount: Math.random() * 1000 | 0,
        productcount: Math.random() * 100 | 0,
        desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。',
    }));
}

// MatchList
matches = [
    { id: 1, title: '阿根廷vs巴西', home: '阿根廷', homepic: '/images/flag/argentina.png', visit: '巴西', visitpic: '/images/flag/brazil.png', time: '2018-06-12 12:20:20' },
    { id: 2, title: '哥伦比亚vs法国', home: '哥伦比亚', homepic: '/images/flag/columbia.png', visit: '法国', visitpic: '/images/flag/france.png', time: '2018-06-12 12:20:20' },
    { id: 3, title: '德国vs日本', home: '德国', homepic: '/images/flag/germany.png', visit: '日本', visitpic: '/images/flag/japan.png', time: '2018-06-12 12:20:20' },
    { id: 4, title: '波兰vs葡萄牙', home: '波兰', homepic: '/images/flag/poland.png', visit: '葡萄牙', visitpic: '/images/flag/portugal.png', time: '2018-06-12 12:20:20' },
    { id: 5, title: '巴西vs德国', home: '巴西', homepic: '/images/flag/brazil.png', visit: '德国', visitpic: '/images/flag/germany.png', time: '2018-06-12 12:20:20' },
    { id: 6, title: '葡萄牙vs哥伦比亚', home: '葡萄牙', homepic: '/images/flag/portugal.png', visit: '哥伦比亚', visitpic: '/images/flag/columbia.png', time: '2018-06-12 12:20:20' },
    { id: 7, title: '法国vs日本', home: '法国', homepic: '/images/flag/france.png', visit: '日本', visitpic: '/images/flag/japan.png', time: '2018-06-12 12:20:20' },
    { id: 8, title: '波兰vs阿根廷', home: '波兰', homepic: '/images/flag/poland.png', visit: '阿根廷', visitpic: '/images/flag/argentina.png', time: '2018-06-12 12:20:20' },
    { id: 9, title: '阿根廷vs葡萄牙', home: '阿根廷', homepic: '/images/flag/argentina.png', visit: '葡萄牙', visitpic: '/images/flag/portugal.png', time: '2018-06-12 12:20:20' },
];

// AlbumList
let ak = 0;
users.filter(e => e.type == 'grapher').forEach(e => {
    let num = Math.random() * 10 | 1;
    for (let j = 0; j < num; j++) {
        let
            cateId = Math.random() * categories.length | 0,
            matchId = Math.random() * matches.length | 0,
            grapherId = e.id;

        albums.push(new Album({
            id: ak + 1,
            title: `图集${ak+1>9 ? ak+1: '0'+(ak+1)}`,
            desc: '束带结发历史的就了。适得府君书两地分居，数据的法律手段监理公司来得及。四大金刚了圣诞节发。老数据的过了圣诞节饭。',
            grapherid: grapherId,
            matchid: matchId,
            cateid: cateId,
            addtime: '2018-06-12',
        }));
        ak++;
    }
});

// PhotoList
let pk = 0;
for (let i = 0; i < albums.length; i++) {
    let num = Math.random() * 10 | 1;
    for (let j = 0; j < num; j++) {
        let
            album = albums[i],
            albumId = album.id,
            cateId = album.cateid,
            matchId = album.matchid,
            grapherId = album.grapherid;
        let garpher = users.filter(e => e.id == grapherId)[0];
        let k = (pk + 1) % 21 > 0 ? (pk + 1) % 21 : 1;
        photos.push(new Photo({
            id: pk + 1,
            title: `照片${pk+1>9 ? pk+1: '0'+(pk+1)}`,
            src: `${domain}/codegeek/photos/${k}.jpg`,
            grapherid: grapherId,
            grapheravatar: garpher.avatarUrl,
            albumid: albumId,
            cateid: cateId,
            matchid: matchId,
            favcount: Math.random() * 1000 | 0,
            commentcount: Math.random() * 100 | 0,
            addtime: '2018-06-12',
            sortid: j + 1,
        }));
        pk++;
        album.count = num;
    }
}

// FollowList
let fk = 0,
    userId = 100,
    grapherList = users.filter(u => u.type == 'grapher');
while (true) {
    let
        idx = Math.random() * grapherList.length | 0,
        grapherId = grapherList[idx].id;

    if (follows.length > (grapherList.length / 3 | 1)) {
        break;
    } else if (follows.findIndex(e => e.grapherid == grapherId) == -1) {
        follows.push(new Follow({
            userid: userId,
            grapherid: grapherId,
        }));
    }
}

// FavList
for (let i = 0; i < 20; i++) {
    let photoId = Math.random() * photos.length | 1;
    if (favs.findIndex(e => e.photoid == photoId) == -1) {
        favs.push(new Fav({
            photoid: photoId,
            userid: userId,
        }));
    }
}

// MessageList
let mk = 0;
let gList = users.filter(u => u.type == 'grapher');
for (let i = 0; i < gList.length; i++) {
    let rand = Math.random() * 20 | 1;
    let photoList = photos.filter(p => p.grapherid == gList[i].id);
    for (let j = 0; j < rand; j++) {
        let type = Math.round(Math.random()) == 1 ? 'fav' : 'follow';
        let idx = Math.random() * users.length | 0;
        let msg = new Message({
            id: mk + 1,
            grapherid: gList[i].id,
            userid: users[idx].id,
            username: users[idx].name,
            type: type,
            time: '2018-05-05 12:12:12',
        });
        if (type == 'fav') {
            idx = Math.random() * photoList.length | 0;
            msg.photoid = photoList[idx].id;
            msg.photosrc = photoList[idx].src;
            msg.albumtitle = albums.filter(a => a.id == photoList[idx].albumid)[0].title;
        }

        messages.push(msg);
        mk++;
    }
}

// CommentList
let ck = 0;
for (let i = 0; i < matches.length; i++) {
    let num = Math.random() * 10 | 1;
    let touserid = Math.random() * users.length | 0;
    for (let j = 0; j < num; j++) {
        let
            match = matches[i],
            matchId = match.id,
            userIdx = Math.random() * users.length | 1,
            userId = users[userIdx].id,
            userName = users[userIdx].name,
            userAvatar = users[userIdx].avatarUrl;
        let
            type = Math.round(Math.random() * 2),
            touserId = 0,
            toName = '';

        if (type == 2) {
            touserId = touserid;
            toName = users[touserid].name;
        }

        comments.push(new Comment({
            id: ck + 1,
            userid: userId,
            username: userName,
            useravatar: userAvatar,
            matchid: matchId,
            type: type,
            touserid: touserId,
            toname: toName,
            content: '水电费家连锁店几个。说了的快感尽量少的附加费。数据量大附件管理是的，四大金刚了圣诞节发。说了的反光镜上了的。是否登录个建设了大姐夫我了。了房价高了圣诞节。圣诞节发过来时代额外热耳机我了。',
            time: '2018-06-12',
        }));
        ck++;
    }
}



export const data = {
    categories,
    users,
    matches,
    albums,
    photos,
    follows,
    favs,
    messages,
    comments,
}