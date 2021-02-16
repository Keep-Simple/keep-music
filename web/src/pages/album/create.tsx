import { gql } from '@apollo/client'
import { Avatar, Box, Button, useToast } from '@chakra-ui/react'
import { Dashboard, DragDrop } from '@uppy/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import * as yup from 'yup'
import { InputField } from '../../components/InputField'
import { Layout } from '../../components/Layout'
import { SelectField } from '../../components/SelectField'
import { SongInputBase, useCreateAlbumMutation } from '../../generated/graphql'
import { createUppy } from '../../utils/createUppy'
import { fetchAuthorsByQuery } from '../../utils/fetchAuthorsByQuery'
import { withApollo } from '../../utils/withApollo'

const songsUppy = createUppy({
    autoProceed: false,
    folder: 'songs',
    filesType: 'music',
    id: 'albumSongs',
    maxFiles: 30,
})

const coverUppy = createUppy({
    autoProceed: false,
    folder: 'albumCovers',
    filesType: 'photo',
    id: 'albumCover',
    maxFiles: 1,
})

const schema = yup.object({
    name: yup.string().label('Album title').min(2).max(30).required(),
    authorId: yup
        .number()
        .moreThan(0, 'Author is required')
        .required('Author is required'),
    releaseYear: yup
        .number()
        .label('Release Year')
        .moreThan(1000)
        .lessThan(new Date().getFullYear() + 1)
        .required(),
})

const CreateAlbum = ({}) => {
    const [createAlbum] = useCreateAlbumMutation()
    const [cover, setCover] = useState()
    const router = useRouter()
    const toast = useToast()

    coverUppy.on('file-added', (file) => {
        const reader = new FileReader()
        reader.onloadend = () => setCover(reader.result as any)
        reader.readAsDataURL(file.data)
    })

    return (
        <Layout variant="small">
            <Dashboard
                theme="dark"
                uppy={songsUppy}
                hideUploadButton
                proudlyDisplayPoweredByUppy={false}
                showProgressDetails
                metaFields={[{ id: 'name', name: 'File name' }]}
            />
            <Box color="black">
                <DragDrop
                    width="100%"
                    height="100%"
                    uppy={coverUppy}
                    locale={{
                        strings: {
                            dropHereOr: 'Drop here or %{browse}',
                            browse: 'browse',
                        },
                    }}
                />
            </Box>
            {cover && <Avatar size="2xl" src={cover} name="album_cover" />}
            <Formik
                initialValues={{
                    name: '',
                    releaseYear: new Date().getFullYear(),
                    authorId: 0,
                }}
                validationSchema={schema}
                onSubmit={async (values) => {
                    const fileNameRegex = new RegExp(
                        '^(\\d+).?\\s*-?(?:.*?-)?\\s*([\\p{L}\\d_ ,ёЁ]*)(?:\\..*)?$',
                        'u'
                    )
                    let coverUrl
                    let songs: SongInputBase[] = []
                    coverUppy.on(
                        'upload-success',
                        (_, response) => (coverUrl = response.secure_url)
                    )
                    songsUppy.on(
                        'upload-success',
                        (
                            file,
                            {
                                secure_url,
                                format,
                                duration,
                                bytes,
                                original_filename,
                            }
                        ) => {
                            const fileName = file.meta.name || original_filename

                            const match = fileName.match(fileNameRegex) ?? [
                                ,
                                fileName,
                                songs.length + 1,
                            ]
                            console.log({
                                match,
                                fileName,
                                file,
                                original_filename,
                            })
                            const order = parseInt(match[1])
                            const name = match[2]

                            songs.push({
                                name,
                                format,
                                order,
                                link: secure_url,
                                byteSize: bytes,
                                duration: Math.ceil(duration),
                            })
                        }
                    )
                    await Promise.all([songsUppy.upload(), coverUppy.upload()])

                    await createAlbum({
                        variables: {
                            input: {
                                ...values,
                                songs,
                                cover: coverUrl,
                            },
                        },
                        update(cache, { data }) {
                            if (!data?.createAlbum) return

                            cache.modify({
                                fields: {
                                    albums(existingAlbums = []) {
                                        const newAlbumRef = cache.writeFragment(
                                            {
                                                data: data.createAlbum,
                                                fragment: gql`
                                                    fragment NewAlbum on Album {
                                                        id
                                                        name
                                                        cover
                                                        releaseYear
                                                        tracksNumber
                                                        songs {
                                                            id
                                                            name
                                                            link
                                                            byteSize
                                                            duration
                                                            views
                                                            order
                                                            format
                                                            albumId
                                                            authorId
                                                        }
                                                        author {
                                                            id
                                                            name
                                                        }
                                                    }
                                                `,
                                            }
                                        )
                                        return [newAlbumRef, ...existingAlbums]
                                    },
                                },
                            })

                            router.back()
                            toast({
                                title: `${data.createAlbum.name} with ${data.createAlbum.tracksNumber} songs was added.`,
                                description: 'Enjoy! Find it on the Home Page.',
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                            })
                        },
                    })
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="name"
                            placeholder="Malibe Ken"
                            label="Album Title"
                        />
                        <Box mt={4}>
                            <SelectField
                                name="authorId"
                                label="Author"
                                loadOptions={fetchAuthorsByQuery}
                            />
                        </Box>
                        <Box mt={4} mb={4}>
                            <InputField
                                type="number"
                                name="releaseYear"
                                placeholder="1999"
                                label="Release year"
                            />
                        </Box>

                        <Button
                            isLoading={isSubmitting}
                            type="submit"
                            colorScheme="red"
                        >
                            Create Album
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(CreateAlbum)
