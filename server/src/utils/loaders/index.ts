import { createAuthorLoader } from './createAuthorLoader'
import {
    createSongLoader,
    createSongOnAlbumLoader,
    createSongsByAuthorLoader,
} from './createSongLoader'
import { createUserLoader } from './createUserLoader'

export const createLoaders = () => ({
    users: createUserLoader(),
    authors: createAuthorLoader(),
    songs: createSongLoader(),
    songsByAlbumOrderByTrack: createSongOnAlbumLoader('track'),
    songsByAlbumOrderByViews: createSongOnAlbumLoader('views'),
    songsByAuthor: createSongsByAuthorLoader(),
})
