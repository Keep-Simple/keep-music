import { gql } from '@apollo/client'
import Uppy from '@uppy/core'
import CloudinaryPlugin from '@zifahm/uppy-cloudinary'
import { createClient } from './withApollo'

type CreateUppyArgs = {
    id: string
    folder: string
    autoProceed: boolean
    filesType: 'photo' | 'music'
    maxFiles: number
}

export function createUppy({
    autoProceed,
    filesType,
    folder,
    id,
    maxFiles,
}: CreateUppyArgs) {
    const uppy = Uppy({
        id,
        restrictions: {
            maxNumberOfFiles: maxFiles,
            allowedFileTypes: filesType === 'photo' ? ['image/*'] : ['audio/*'],
        },
        autoProceed,
    })

    uppy.use(CloudinaryPlugin, {
        uploadPreset: 'ml_default',
        folder,
        cloudName: 'keep-music',
        apiKey: '751152961367519',
        async generateSignature(paramsToSign) {
            const { upload_preset, folder, timestamp, source } = paramsToSign

            const client = createClient()
            const signature = await client.query({
                query: gql`
                    query SignUpload($input: SignTokenInput!) {
                        signUpload(input: $input)
                    }
                `,
                variables: {
                    input: { upload_preset, folder, timestamp, source },
                },
            })

            return signature?.data?.signUpload ?? ''
        },
    })

    return uppy
}
