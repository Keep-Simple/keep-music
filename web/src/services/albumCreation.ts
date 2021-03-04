import { SongInputBase } from '../generated/graphql'
import { createUppy } from '../utils/createUppy'

class AlbumCreationService {
    private coverUrl = ''
    private songs: SongInputBase[] = []
    private onCoverAdded = (_: any) => {}

    private fileNameRegex = new RegExp(
        `^(?:(?<order>\\d{1,3}).?\\s*[\\s-]\\s*)?(?:(?:\\S+(?:[ .-][^\\s.-]*)*?)\\s*-\\s*)?(?<name>[^.\\n]+(?:\.[^.\\n]*)*?)(?:\\.(?:mp3|flac|aac|ogg|alac|wav))?`,
        'mu'
    )

    public songsUppy = createUppy({
        autoProceed: false,
        folder: 'songs',
        filesType: 'music',
        id: 'albumSongs',
        maxFiles: 30,
    })

    public coverUppy = createUppy({
        autoProceed: false,
        folder: 'albumCovers',
        filesType: 'photo',
        id: 'albumCover',
        maxFiles: 1,
    })

    constructor() {
        this.coverUppy.on(
            'upload-success',
            (_, response) => (this.coverUrl = response.secure_url)
        )

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

    async upload() {
        await Promise.all([this.songsUppy.upload(), this.coverUppy.upload()])

        const response = { songs: this.songs, cover: this.coverUrl }

        this.resetState()

        return response
    }

    onCoverAdd(func: (base64Url: string) => void) {
        this.onCoverAdded = (file) => {
            const reader = new FileReader()
            reader.onloadend = () => func(reader.result as any)
            reader.readAsDataURL(file.data)
        }

        this.coverUppy.on('file-added', this.onCoverAdded)
    }

    offCoverAdd() {
        this.coverUppy.off('file-added', this.onCoverAdded)
    }

    private resetState() {
        this.songs = []
        this.coverUrl = ''
        this.coverUppy.reset()
        this.songsUppy.reset()
    }
}

export const albumCreationService = new AlbumCreationService()
