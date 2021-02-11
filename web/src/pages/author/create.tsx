import { Avatar, Box, Button } from '@chakra-ui/react'
import { DragDrop } from '@uppy/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import * as yup from 'yup'
import { InputField } from '../../components/InputField'
import { Layout } from '../../components/Layout'
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
    const [avatar, setAvatar] = useState()
    const router = useRouter()

    uppy.on('file-added', (file) => {
        const reader = new FileReader()
        reader.onloadend = () => setAvatar(reader.result as any)
        reader.readAsDataURL(file.data)
    })

    return (
        <Layout variant="small">
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

                    const data = await createAuthor({
                        variables: {
                            input: {
                                ...values,
                                avatar: avatarUrl,
                            },
                        },
                    })
                    if (data?.data?.createAuthor) router.back()
                }}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        <InputField
                            name="name"
                            placeholder="King Krule"
                            label="Artists Name"
                        />
                        <Box mt={4} mb={4}>
                            <InputField
                                textarea
                                name="info"
                                placeholder={`Type in some further info about the ${
                                    values.name || 'artist'
                                }...`}
                                label="Bio"
                            />
                        </Box>

                        <Button
                            isLoading={isSubmitting}
                            type="submit"
                            colorScheme="red"
                        >
                            Create Author
                        </Button>
                    </Form>
                )}
            </Formik>
            <Box borderRadius="50%">
                <DragDrop
                    width="100%"
                    height="100%"
                    uppy={uppy}
                    locale={{
                        strings: {
                            browse: undefined,
                        },
                    }}
                />
            </Box>
            {avatar && <Avatar size="2xl" src={avatar} name="artists_avatar" />}
        </Layout>
    )
}

export default withApollo({ ssr: false })(CreateAuthor)
