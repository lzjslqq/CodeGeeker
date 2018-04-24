import { domain } from './website';


/**
 * 图片分类
 */
export const categories = [
    { id: 1, name: '最新' },
    { id: 2, name: '热门' },
    { id: 3, name: '梅西' },
    { id: 4, name: 'C罗' },
    { id: 5, name: '内马尔' },
    { id: 6, name: '布冯' },
    { id: 7, name: '西班牙' },
    { id: 8, name: '法国' },
];

/**
 * 摄影师
 */
export const authors = [
    { id: 1, name: '摄影师001', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
    { id: 2, name: '摄影师002', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
    { id: 3, name: '摄影师003', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
    { id: 4, name: '摄影师004', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
    { id: 5, name: '摄影师005', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
    { id: 6, name: '摄影师006', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
    { id: 7, name: '摄影师007', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
    { id: 8, name: '摄影师008', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
    { id: 9, name: '摄影师009', avatarUrl: `${domain}/codegeek/authors/author01.jpg`, fanscount: 2342, productcount: 12, desc: '收到反馈熟练搭建。说的贵方了石岛聚福林，四大金刚了圣诞节。是来得及发了圣诞节。', },
];


/**
 * 图集（专辑）
 */
export const albums = [
    { id: 1, title: '世界杯第1天', authorid: 1, addtime: '2018-04-10 23:23:23' },
    { id: 2, title: '世界杯第2天', authorid: 2, addtime: '2018-04-10 23:23:23' },
    { id: 3, title: '世界杯第3天', authorid: 2, addtime: '2018-04-10 23:23:23' },
    { id: 4, title: '世界杯第4天', authorid: 3, addtime: '2018-04-10 23:23:23' },
    { id: 5, title: '世界杯第5天', authorid: 2, addtime: '2018-04-10 23:23:23' },
    { id: 6, title: '世界杯第6天', authorid: 2, addtime: '2018-04-10 23:23:23' },
    { id: 7, title: '世界杯第7天', authorid: 2, addtime: '2018-04-10 23:23:23' },
];

/**
 * 图片列表
 */
export const pictures = [
    { id: 1, cateid: 1, authorid: 1, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/1.jpg` },
    { id: 2, cateid: 3, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/2.jpg` },
    { id: 3, cateid: 3, authorid: 2, albumid: 3, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/3.jpg` },
    { id: 4, cateid: 1, authorid: 2, albumid: 3, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/4.jpg` },
    { id: 5, cateid: 5, authorid: 2, albumid: 4, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/5.jpg` },
    { id: 6, cateid: 6, authorid: 6, albumid: 5, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/6.jpg` },
    { id: 7, cateid: 7, authorid: 7, albumid: 6, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/7.jpg` },
    { id: 8, cateid: 3, authorid: 2, albumid: 3, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/8.jpg` },
    { id: 9, cateid: 3, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/9.jpg` },
    { id: 10, cateid: 3, authorid: 2, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/10.jpg` },
    { id: 11, cateid: 6, authorid: 6, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/11.jpg` },
    { id: 12, cateid: 7, authorid: 2, albumid: 4, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/12.jpg` },
    { id: 13, cateid: 4, authorid: 6, albumid: 6, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/13.jpg` },
    { id: 14, cateid: 3, authorid: 2, albumid: 7, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/14.jpg` },
    { id: 15, cateid: 5, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/15.jpg` },
    { id: 16, cateid: 3, authorid: 2, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/16.jpg` },
    { id: 17, cateid: 3, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/17.jpg` },
    { id: 18, cateid: 1, authorid: 7, albumid: 3, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/18.jpg` },
    { id: 19, cateid: 3, authorid: 1, albumid: 5, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/19.jpg` },
    { id: 20, cateid: 6, authorid: 2, albumid: 2, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/20.jpg` },
    { id: 21, cateid: 4, authorid: 1, albumid: 1, favcount: 12333, commentcount: 22, src: `${domain}/codegeek/photos/21.jpg` },
];