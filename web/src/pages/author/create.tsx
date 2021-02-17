import {
    Box,
    Button,
    Flex,
    useBreakpointValue,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import * as yup from 'yup'
import { InputField } from '../../components/InputField'
import { Layout } from '../../components/Layout'
import { PhotoDragDrop } from '../../components/PhotoDragDrop'
import { useCreateAuthorMutation } from '../../generated/graphql'
import { createUppy } from '../../utils/createUppy'
import { withApollo } from '../../utils/withApollo'

const uppy = createUppy({
    autoProceed: false,
    folder: 'authors',
    filesType: 'photo',
    id: 'authorAvatar',
    maxFiles: 1,
})

const schema = yup.object({
    name: yup
        .string()
        .min(2, 'More than 2 characters')
        .max(30, 'Less than 30 characters')
        .required('Name is required'),
    info: yup.string().max(600, 'Less than 600 characters'),
})

const CreateAuthor = ({}) => {
    const [createAuthor] = useCreateAuthorMutation()
    const [avatar, setAvatar] = useState('')
    const toast = useToast()
    const router = useRouter()

    const avatarSize = useBreakpointValue({
        base: 250,
        xl: 300,
    }) as number

    uppy.on('file-added', (file) => {
        const reader = new FileReader()
        reader.onloadend = () => setAvatar(reader.result as any)
        reader.readAsDataURL(file.data)
    })

    return (
        <Layout>
            <Formik
                initialValues={{ name: '', info: '' }}
                validationSchema={schema}
                onSubmit={async (values) => {
                    let avatarUrl
                    if (avatar) {
                        uppy.on(
                            'upload-success',
                            (_, response) => (avatarUrl = response.secure_url)
                        )
                        await uppy.upload()
                    }

                    const { data } = await createAuthor({
                        variables: {
                            input: {
                                ...values,
                                avatar: avatarUrl,
                            },
                        },
                    })
                    if (data?.createAuthor) {
                        router.back()
                        toast({
                            title: `Artist ${data.createAuthor.name} was added.`,
                            description:
                                'Now you can mention him on album creation.',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                }}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        <Flex justify="center" mt={20}>
                            <Box w={avatarSize}>
                                <PhotoDragDrop
                                    uppy={uppy}
                                    src={avatar}
                                    imageSize={300}
                                    onDelete={() => {
                                        setAvatar('')
                                        uppy.reset()
                                    }}
                                />
                            </Box>
                            <VStack spacing={10} ml={10} w={avatarSize}>
                                <InputField
                                    name="name"
                                    placeholder="King Krule"
                                    label="Artists Name"
                                />
                                <InputField
                                    textarea
                                    name="info"
                                    placeholder={`Type in some info about the ${
                                        values.name || 'artist'
                                    }...`}
                                    label="Bio"
                                />
                                <Button
                                    mt={4}
                                    float="right"
                                    size="lg"
                                    isLoading={isSubmitting}
                                    type="submit"
                                    colorScheme="red"
                                >
                                    Create Artist
                                </Button>
                            </VStack>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(CreateAuthor)
