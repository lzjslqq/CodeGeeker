import { domain } from './website';
import { data } from './data';

export const config = {
    domain,
    categories: data.categories,
    graphers: data.users.filter(u => u.type == 'grapher'),
    matches: data.matches,
    albums: data.albums,
    photoes: data.photos,
    followes: data.follows,
    favs: data.favs,
}