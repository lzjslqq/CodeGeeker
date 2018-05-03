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
export class Photo {
    constructor({ id, title, src, grapherid, albumid, cateid, matchid, favcount, commentcount, addtime }) {
        this.id = id;
        this.title = title;
        this.src = src;
        this.grapherid = grapherid;
        this.albumid = albumid;
        this.cateid = cateid;
        this.matchid = matchid;
        this.favcount = favcount;
        this.commentcount = commentcount;
        this.addtime = addtime;
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
    constructor({ id, userid, username, matchid, content, type, touserid, toname, time }) {
        this.id = id;
        this.userid = userid;
        this.username = username;
        this.matchid = matchid;
        this.type = type; // 1.普通评论，2.回复评论
        this.touserid = touserid;
        this.toname = toname;
        this.content = content;
        this.time = time;
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
    { id: 1, title: '德国vs西班牙', home: '德国', homepic: '', visit: '西班牙', visitpic: '', time: '2018-06-12 12:20:20' },
    { id: 2, title: '英格兰vs葡萄牙', home: '英格兰', homepic: '', visit: '葡萄牙', visitpic: '', time: '2018-06-12 12:20:20' },
    { id: 3, title: '俄罗斯vs巴西', home: '俄罗斯', homepic: '', visit: '巴西', visitpic: '', time: '2018-06-12 12:20:20' },
    { id: 4, title: '挪威vs比利时', home: '挪威', homepic: '', visit: '比利时', visitpic: '', time: '2018-06-12 12:20:20' },
    { id: 5, title: '爱尔兰vs乌拉圭', home: '爱尔兰', homepic: '', visit: '乌拉圭', visitpic: '', time: '2018-06-12 12:20:20' },
    { id: 6, title: '埃及vs玻利维亚', home: '埃及', homepic: '', visit: '玻利维亚', visitpic: '', time: '2018-06-12 12:20:20' },
    { id: 7, title: '法国vs日本', home: '法国', homepic: '', visit: '日本', visitpic: '', time: '2018-06-12 12:20:20' },
    { id: 8, title: '土耳其vs刚果', home: '土耳其', homepic: '', visit: '刚果', visitpic: '', time: '2018-06-12 12:20:20' },
    { id: 9, title: '冰岛vs威尔士', home: '冰岛', homepic: '', visit: '威尔士', visitpic: '', time: '2018-06-12 12:20:20' },
];

// AlbumList
let ak = 0;
users.filter(e => e.type == 'grapher').forEach(e => {
    let num = Math.random() * 10 | 1;
    for (let j = 0; j < num; j++) {
        let
            cateId = Math.random() * categories.length | 0,
            matchId = Math.random() * matches.length | 0,
            grahperId = e.id;

        albums.push(new Album({
            id: ak + 1,
            title: `图集${ak+1>9 ? ak+1: '0'+(ak+1)}`,
            desc: '束带结发历史的就了。适得府君书两地分居，数据的法律手段监理公司来得及。四大金刚了圣诞节发。老数据的过了圣诞节饭。',
            grapherid: grahperId,
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
            grahperId = album.grapherid;
        let k = (pk + 1) % 21 > 0 ? (pk + 1) % 21 : 1;
        photos.push(new Photo({
            id: pk + 1,
            title: `照片${pk+1>9 ? pk+1: '0'+(pk+1)}`,
            src: `${domain}/codegeek/photos/${k}.jpg`,
            grapherid: grahperId,
            albumid: albumId,
            cateid: cateId,
            matchid: matchId,
            favcount: Math.random() * 1000 | 0,
            commentcount: Math.random() * 100 | 0,
            addtime: '2018-06-12',
        }));
        pk++;
    }
}

// FollowList
let fk = 0,
    userId = 1000,
    grapherList = users.filter(u => u.type == 'grapher');
while (true) {
    let
        idx = Math.random() * grapherList.length | 0,
        grahperId = grapherList[idx].id;

    if (follows.length > (grapherList.length / 3 | 1)) {
        break;
    } else if (follows.findIndex(e => e.grapherid == grahperId) == -1) {
        follows.push(new Follow({
            userid: userId,
            grapherid: grahperId,
        }));
    }
}

// FavList
let fak = 0;
for (let i = 0; i < 20; i++) {
    let photoId = Math.random() * photos.length | 1;
    if (favs.findIndex(e => e.photoid == photoId) == -1) {
        favs.push(new Fav({
            photoid: photoId,
            userid: userId,
        }));
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
            userName = users[userIdx].name;
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
    comments,
}