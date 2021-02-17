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
    songsByAlbum: createSongOnAlbumLoader(),
    songsByAuthor: createSongsByAuthorLoader(),
})
