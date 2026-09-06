/*
 * CINEMAX integration boundary.
 * Only sources explicitly configured by the application owner are accepted.
 * TMDB remains metadata-only and never supplies playback URLs.
 */
const movieTemplate=import.meta.env.VITE_PLAYER_MOVIE_URL||'';
const tvTemplate=import.meta.env.VITE_PLAYER_TV_URL||'';
const fill=(template,vars)=>template?template.replace(/\{(id|season|episode)\}/g,(_,k)=>encodeURIComponent(String(vars[k]??''))):'';
export function getAvailableServers(){
  return [
    {key:'configured-movie',label:'Movie Player',kind:'movie',configured:Boolean(movieTemplate)},
    {key:'configured-tv',label:'TV Player',kind:'tv',configured:Boolean(tvTemplate)}
  ].filter(s=>s.configured);
}
export function getMovieSource(id){return fill(movieTemplate,{id})}
export function getTVSource(id,season,episode){return fill(tvTemplate,{id,season,episode})}
export function getEpisodeSource(id,season,episode){return getTVSource(id,season,episode)}
export function hasPlayableSource(type){return type==='movie'?Boolean(movieTemplate):Boolean(tvTemplate)}
