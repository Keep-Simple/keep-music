import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'

import AlertUI from '../../components/Alert'
import { InputField } from '../../components/InputField'
import { Wrapper } from '../../components/Wrapper'

import {
    MeDocument,
    MeQuery,
    useChangePasswordMutation,
} from '../../generated/graphql'
import { toErrorMap } from '../../utils/toErrorMap'
import { withApollo } from '../../utils/withApollo'

const ChangePassword: React.FC = () => {
    const router = useRouter()
    const [changePassword] = useChangePasswordMutation()

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ newPassword: '', tokenError: '' }}
                onSubmit={(values, { setErrors }) => {
                    return changePassword({
                        variables: {
                            newPassword: values.newPassword,
                            token:
                                typeof router.query.token === 'string'
                                    ? router.query.token
                                    : '',
                        },
                        update(cache, { data }) {
                            if (data?.changePassword.errors) {
                                setErrors(
                                    toErrorMap(data.changePassword.errors)
                                )
                            } else if (data?.changePassword.user) {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data.changePassword.user,
                                    },
                                })
                                router.push('/')
                            }
                        },
                    })
                }}
            >
                {({ isSubmitting, errors: { tokenError } }) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            placeholder="new password"
                            label="New Password"
                            type="password"
                        />

                        <AlertUI message={tokenError} />

                        {tokenError ? (
                            <Button
                                mt={4}
                                onClick={() => router.push('/forgot-password')}
                                variantColor="teal"
                                variant="outline"
                            >
                                Resend Email
                            </Button>
                        ) : (
                            <Button
                                mt={4}
                                isLoading={isSubmitting}
                                type="submit"
                                variantColor="teal"
                            >
                                Change Password
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withApollo({ ssr: true })(ChangePassword)
