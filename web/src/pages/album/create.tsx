import { gql } from '@apollo/client'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Stack,
    useBreakpointValue,
    useToast,
} from '@chakra-ui/react'
import { Dashboard } from '@uppy/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { InputField } from '../../components/ui/InputField'
import { Layout } from '../../components/ui/Layout'
import { PhotoDragDrop } from '../../components/ui/PhotoDragDrop'
import { SelectField } from '../../components/ui/SelectField'
import { useCreateAlbumMutation } from '../../generated/graphql'
import { albumCreationService } from '../../services/albumCreation'
import { fetchAuthorsByQuery } from '../../utils/fetchAuthorsByQuery'
import { useIsAuth } from '../../utils/hooks/useIsAuth'
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
    useIsAuth()
    const [cover, setCover] = useState('')
    const router = useRouter()
    const toast = useToast()

    const coverSize = useBreakpointValue({
        base: 250,
        xl: 300,
    }) as number

    useEffect(() => {
        albumCreationService.onCoverAdd((base64Url) => setCover(base64Url))
        return () => albumCreationService.offCoverAdd()
    }, [])

    const [createAlbum] = useCreateAlbumMutation({
        update(cache, { data }) {
            if (!data?.createAlbum) return

            cache.modify({
                fields: {
                    albums(existingAlbums = []) {
                        const newAlbumRef = cache.writeFragment({
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
                        })
                        return [...existingAlbums, newAlbumRef]
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

    return (
        <Layout>
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
                    })
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Flex justify="center" wrap="wrap">
                            <Stack w={coverSize} mr={10} spacing={4}>
                                <FormControl id="albumCover">
                                    <FormLabel>Album Cover</FormLabel>
                                    <PhotoDragDrop
                                        src={cover}
                                        imageSize={coverSize}
                                        uppy={albumCreationService.coverUppy}
                                        onDelete={() => {
                                            setCover('')
                                            albumCreationService.coverUppy.reset()
                                        }}
                                    />
                                </FormControl>
                                <InputField
                                    name="name"
                                    placeholder="Malibe Ken"
                                    label="Album Title"
                                />
                                <SelectField
                                    name="authorId"
                                    label="Author"
                                    loadOptions={fetchAuthorsByQuery}
                                />
                                <InputField
                                    type="number"
                                    name="releaseYear"
                                    placeholder="1999"
                                    label="Release year"
                                />
                            </Stack>
                            <Box>
                                <FormControl
                                    mb={4}
                                    id="songs"
                                    w={(coverSize * 7) / 3}
                                >
                                    <FormLabel>Songs</FormLabel>
                                    <Dashboard
                                        theme="dark"
                                        uppy={albumCreationService.songsUppy}
                                        hideUploadButton
                                        proudlyDisplayPoweredByUppy={false}
                                        showProgressDetails
                                        metaFields={[
                                            { id: 'name', name: 'File name' },
                                        ]}
                                    />
                                </FormControl>
                                <Button
                                    float="right"
                                    size="lg"
                                    isLoading={isSubmitting}
                                    type="submit"
                                    colorScheme="red"
                                >
                                    Create Album
                                </Button>
                            </Box>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(CreateAlbum)
