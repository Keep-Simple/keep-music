import { Link, LinkProps } from '@chakra-ui/core'
import NextJSLink from 'next/link'

type Props = {
    href: string
} & LinkProps

export const NextChakraLink: React.FC<Props> = ({
    href,
    children,
    ...rest
}) => {
    return (
        <NextJSLink href={href}>
            <Link {...rest}>{children}</Link>
        </NextJSLink>
    )
}
