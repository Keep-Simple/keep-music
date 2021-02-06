import { createSongOnAlbumLoader } from './createSongLoader'
import { createAuthorLoader } from './createAuthorLoader'
import { createSongLoader } from './createSongLoader'
import { createUserLoader } from './createUserLoader'

export const createLoaders = () => ({
    users: createUserLoader(),
    authors: createAuthorLoader(),
    songs: createSongLoader(),
    songsByAlbumOrderByTrack: createSongOnAlbumLoader('track'),
    songsByAlbumOrderByViews: createSongOnAlbumLoader('views'),
})
