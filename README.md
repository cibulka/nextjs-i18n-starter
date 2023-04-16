# Next.js 13 starter project

Bootstrapped with [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) with:

- [x] Typescript
- [x] Eslint
- [x] TailwindCSS
- [x] src directory
- [x] app directory

## i18n

Next.js 13 does not support i18n out of the box. There is a [helpful guide](https://locize.com/blog/next-13-app-dir-i18n/) how to setup `i18next` working though.

```
# Middleware locale negotiator
npm install accept-language
# i18n
npm install i18next react-i18next i18next-resources-to-backend
```

## Contentlayer.dev

My current mission is to obliterate CMS! ☠️ Because of this content of my page is comprised entirely from MDX files, commited to repository and managed by [Contentlayer](https://www.contentlayer.dev/).

```
npm install contentlayer next-contentlayer
```

The library is very cool, but a bit unstable. List of (temporary) compatibility fixes:

1. Build script is not triggered

- Link: [https://github.com/contentlayerdev/contentlayer/issues/415](GitHub issue)
- Solution: Replace `dev` script in package.json with `contentlayer dev & next dev`.

## TailwindCSS and HeadlessUI

Some plugins are used.

```
npm install @tailwindcss/forms @tailwindcss/typography --save-dev
```

For UI those libs are used:

- [HeadlessUI](https://headlessui.com/)
- [HeadelessUI Float](https://headlessui-float.vercel.app/)

```
npm install @headlessui-float/react --save-dev
```

## SVGR

Importing SVG icons as they are will turn them into React components.

Install:

```
npm install @svgr/webpack --save-dev
```

Webpack in Next.config.js

```
webpack(config) {
    config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
    })
    return config;
}
```

## Other tools

| Tool        | Why?                                                                  |
| ----------- | --------------------------------------------------------------------- |
| server-only | To mark server components similarly as 'client only', but for server. |
| Prettier    | Automatic formatting of files.                                        |
