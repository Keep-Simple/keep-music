import { Link, LinkProps } from '@chakra-ui/react'
import NextJSLink from 'next/link'

type Props = {
    href: string
} & LinkProps

export const StyledLink: React.FC<Props> = ({ href, children, ...rest }) => {
    return (
        <NextJSLink href={href}>
            <Link {...rest}>{children}</Link>
        </NextJSLink>
    )
}
