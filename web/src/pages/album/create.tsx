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
import { useCreateAlbumMutation } from '../../generated/graphql'
import { albumCreationService } from '../../services/albumCreation'
import { fetchAuthorsByQuery } from '../../utils/fetchAuthorsByQuery'
import { withApollo } from '../../utils/withApollo'

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
    const [cover, setCover] = useState('')
    const router = useRouter()
    const toast = useToast()

    albumCreationService.onCoverAdd((base64Url) => setCover(base64Url))

    return (
        <Layout variant="small">
            <Dashboard
                theme="dark"
                uppy={albumCreationService.songsUppy}
                hideUploadButton
                proudlyDisplayPoweredByUppy={false}
                showProgressDetails
                metaFields={[{ id: 'name', name: 'File name' }]}
            />
            <Box color="black">
                <DragDrop
                    width="100%"
                    height="100%"
                    uppy={albumCreationService.coverUppy}
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
                    const { songs, cover } = await albumCreationService.upload()

                    await createAlbum({
                        variables: {
                            input: {
                                ...values,
                                songs,
                                cover,
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
