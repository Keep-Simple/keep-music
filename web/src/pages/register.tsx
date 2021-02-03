import { Box, Button } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { withApollo } from '../utils/withApollo'
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter()
    const [register] = useRegisterMutation()

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: '', password: '', email: '' }}
                onSubmit={(values, { setErrors }) => {
                    return register({
                        variables: { options: values },
                        update(cache, { data }) {
                            if (data?.register.errors) {
                                setErrors(toErrorMap(data.register.errors))
                            } else if (data?.register.user) {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data.register.user,
                                    },
                                })
                                router.back()
                            }
                        },
                    })
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="email"
                            placeholder="any@mail.com"
                            label="Email"
                        />
                        <Box mt={4}>
                            <InputField
                                name="username"
                                placeholder="username"
                                label="Username"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            isLoading={isSubmitting}
                            type="submit"
                            variantColor="teal"
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withApollo({ ssr: false })(Register)
