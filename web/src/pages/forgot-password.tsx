import { Button, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import AlertUI from '../components/Alert'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useForgotPasswordMutation } from '../generated/graphql'
import { withApollo } from '../utils/withApollo'

const ForgotPassword: React.FC<{}> = ({}) => {
    const [isSent, setSent] = useState(false)
    const [forgotPassword] = useForgotPasswordMutation()

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const { data } = await forgotPassword({
                        variables: values,
                    })

                    if (!data?.forgotPassword) {
                        setErrors({ email: 'Invalid Email' })
                    } else {
                        setSent(true)
                    }
                }}
            >
                {({ isSubmitting, values: { email } }) => (
                    <Form>
                        <InputField
                            name="email"
                            placeholder="any@mail.com"
                            label="Email"
                        />

                        {isSent && (
                            <AlertUI
                                status="info"
                                message={
                                    <Link isExternal href={`mailto:${email}`}>
                                        {`Check: ${email}`}
                                    </Link>
                                }
                            />
                        )}

                        <Button
                            mt={4}
                            isLoading={isSubmitting}
                            type="submit"
                            variantColor="teal"
                        >
                            Send Code
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withApollo({ ssr: true })(ForgotPassword)
