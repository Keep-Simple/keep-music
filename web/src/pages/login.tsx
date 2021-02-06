import { Box, Button, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { withApollo } from '../utils/withApollo'

const Login: React.FC = ({}) => {
    const router = useRouter()
    const [login] = useLoginMutation()

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={(values, { setErrors }) => {
                    return login({
                        variables: values,
                        update(cache, { data }) {
                            if (data?.login.errors) {
                                setErrors(toErrorMap(data.login.errors))
                            } else if (data?.login.user) {
                                cache.evict({ fieldName: 'posts' })

                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data.login.user,
                                    },
                                })

                                if (typeof router.query.next === 'string') {
                                    router.push(router.query.next)
                                } else {
                                    router.push('/')
                                }
                            }
                        },
                    })
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            placeholder="user | any@mail.com"
                            label="Username | Email"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>

                        <Flex mt={4} justifyContent="space-between">
                            <Button
                                onClick={() => router.push('/forgot-password')}
                                variant="outline"
                                variantColor="teal"
                            >
                                Forgot Password
                            </Button>
                            <Button
                                isLoading={isSubmitting}
                                type="submit"
                                variantColor="teal"
                            >
                                Login
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withApollo({ ssr: true })(Login)
