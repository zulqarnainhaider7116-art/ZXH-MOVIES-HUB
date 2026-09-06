import axios from 'axios';
const BASE=import.meta.env.VITE_TMDB_BASE_URL||'https://api.themoviedb.org/3';
export const IMAGE_BASE=import.meta.env.VITE_TMDB_IMAGE_BASE||'https://image.tmdb.org/t/p';
const KEY=import.meta.env.VITE_TMDB_API_KEY;
const client=axios.create({baseURL:BASE,timeout:12000});
client.interceptors.request.use(c=>{if(KEY)c.params={...(c.params||{}),api_key:KEY};return c});
const get=(path,params={})=>client.get(path,{params});
export const poster=(p,s='w500')=>p?`${IMAGE_BASE}/${s}${p}`:null;
export const backdrop=(p,s='w1280')=>p?`${IMAGE_BASE}/${s}${p}`:null;
export const profile=(p,s='w185')=>p?`${IMAGE_BASE}/${s}${p}`:null;
export const tmdb={
 trending:(type='all',window='week',language='en-US')=>get(`/trending/${type}/${window}`,{language}),
 popularMovies:(page=1,language='en-US')=>get('/movie/popular',{page,language}),
 popularTV:(page=1,language='en-US')=>get('/tv/popular',{page,language}),
 topMovies:(page=1,language='en-US')=>get('/movie/top_rated',{page,language}),
 topTV:(page=1,language='en-US')=>get('/tv/top_rated',{page,language}),
 nowPlaying:(page=1,language='en-US')=>get('/movie/now_playing',{page,language}),
 upcoming:(page=1,language='en-US')=>get('/movie/upcoming',{page,language}),
 discoverMovies:(params={})=>get('/discover/movie',{sort_by:'popularity.desc',...params}),
 discoverTV:(params={})=>get('/discover/tv',{sort_by:'popularity.desc',...params}),
 multi:(query,page=1,language='en-US')=>get('/search/multi',{query,page,language,include_adult:false}),
 movie:(id,language='en-US')=>get(`/movie/${id}`,{language,append_to_response:'credits,videos,similar,recommendations,watch/providers,release_dates,images'}),
 tv:(id,language='en-US')=>get(`/tv/${id}`,{language,append_to_response:'credits,videos,similar,recommendations,watch/providers,content_ratings,images'}),
 season:(id,s,language='en-US')=>get(`/tv/${id}/season/${s}`,{language,append_to_response:'credits'}),
 episode:(id,s,e,language='en-US')=>get(`/tv/${id}/season/${s}/episode/${e}`,{language}),
 person:(id,language='en-US')=>get(`/person/${id}`,{language,append_to_response:'combined_credits'}),
 movieGenres:(language='en-US')=>get('/genre/movie/list',{language}),
 tvGenres:(language='en-US')=>get('/genre/tv/list',{language})
};
export function tmdbReady(){return Boolean(KEY)}
