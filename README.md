# ZXH MOVIE APP

Original React/Vite cinematic movie & TV discovery app using TMDB for metadata. The supplied CINEMAX player integration is isolated behind `src/services/streaming.js`; this build only activates playback when an authorized source is explicitly configured through environment variables.

## Run
1. `npm install`
2. Copy `.env.example` to `.env`
3. Add `VITE_TMDB_API_KEY`
4. `npm run dev`
5. `npm run build`

## Environment
- `VITE_TMDB_API_KEY`
- `VITE_TMDB_BASE_URL`
- `VITE_TMDB_IMAGE_BASE`
- `VITE_SITE_NAME`
- `VITE_SITE_URL`
- `VITE_PLAYER_MOVIE_URL` (optional authorized source template; `{id}` is replaced)
- `VITE_PLAYER_TV_URL` (optional authorized source template; `{id}`, `{season}`, `{episode}` are replaced)

TMDB is metadata-only. This project does not fabricate stream, download, rating, payment, comment, or account data.
