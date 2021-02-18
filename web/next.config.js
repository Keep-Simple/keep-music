module.exports = {
    images: {
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/keep-music',
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack', 'url-loader'],
        })

        return config
    },
}
