import { SongInputBase } from '../generated/graphql'
import { createUppy } from '../utils/createUppy'

class AlbumCreationService {
    private coverUrl?: string = undefined
    private songs: SongInputBase[] = []

    private fileNameRegex = new RegExp(
        `^(?:(?<order>\\d{1,3}).?\\s*[\\s-]\\s*)?(?:(?:\\S+(?:[ .-][^\\s.-]*)*?)\\s*-\\s*)?(?<name>[^.\\n]+(?:\.[^.\\n]*)*?)(?:\\.(?:mp3|flac|aac|ogg|alac|wav))?`,
        'mu'
    )

    songsUppy = createUppy({
        autoProceed: false,
        folder: 'songs',
        filesType: 'music',
        id: 'albumSongs',
        maxFiles: 30,
    })

    coverUppy = createUppy({
        autoProceed: false,
        folder: 'albumCovers',
        filesType: 'photo',
        id: 'albumCover',
        maxFiles: 1,
    })

    async upload() {
        this.onCoverUpload()
        this.onSongsUpload()

        await Promise.all([this.songsUppy.upload(), this.coverUppy.upload()])

        const response = { songs: this.songs, cover: this.coverUrl }

        this.resetState()

        return response
    }

    onCoverAdd(func: (base64Url: string) => void) {
        this.coverUppy.on('file-added', (file) => {
            const reader = new FileReader()
            reader.onloadend = () => func(reader.result as any)
            reader.readAsDataURL(file.data)
        })
    }

    private onSongsUpload() {
        this.songsUppy.on(
            'upload-success',
            (
                file,
                { secure_url, format, duration, bytes, original_filename }
            ) => {
                const fileName = file.meta.name || original_filename
                const defaultMatch = {
                    groups: {
                        order: this.songs.length + 1,
                        name: fileName,
                    },
                }
                let {
                    groups: { order, name },
                } = fileName.match(this.fileNameRegex) ?? defaultMatch

                this.songs.push({
                    name,
                    format,
                    order: parseInt(order || defaultMatch.groups.order),
                    link: secure_url,
                    byteSize: bytes,
                    duration: Math.ceil(duration),
                })
            }
        )
    }

    private resetState() {
        this.songs = []
        this.coverUrl = undefined
        this.coverUppy.reset()
        this.songsUppy.reset()
    }

    private onCoverUpload() {
        this.coverUppy.on(
            'upload-success',
            (_, response) => (this.coverUrl = response.secure_url)
        )
    }
}

export const albumCreationService = new AlbumCreationService()
