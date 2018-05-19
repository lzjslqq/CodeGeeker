import { domain, apiUrl } from './apiUrl';
import { data } from './data';

export const config = {
    domain,
    apiUrl,
    users: data.users,
    categories: data.categories,
    graphers: data.users.filter(u => u.type == 'grapher'),
    matches: data.matches,
    albums: data.albums,
    photoes: data.photos,
    followes: data.follows,
    favs: data.favs,
    messages: data.messages,
    comments: data.comments,
}