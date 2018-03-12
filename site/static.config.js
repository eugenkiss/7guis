import React, {Component} from 'react'
import FontAwesome from '@fortawesome/fontawesome'
import {renderStylesToString} from 'emotion-server'

// noinspection JSUnusedGlobalSymbols
export default {
  preact: true,

  siteRoot: 'https://eugenkiss.github.io/',
  basePath: '7guis',

  getRoutes: () => {
    return [
      {
        path: '',
        component: 'src/containers/Home',
      },
      {
        path: 'tasks',
        component: 'src/containers/Tasks',
      },
      {
        path: 'dimensions',
        component: 'src/containers/Dimensions',
      },
      {
        path: 'implementations',
        component: 'src/containers/Implementations',
      },
      {
        path: 'contributing',
        component: 'src/containers/Contributing',
      },
      {
        path: 'more',
        component: 'src/containers/More',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },

  devServer: {
    hot: false,
    inline: false,
  },

  webpack: (cfg) => {
    return cfg
  },

  renderToHtml: async (render, Comp, meta) => {
    meta.css = FontAwesome.dom.css()
    return renderStylesToString(render(<Comp/>))
  },

  Document: class CustomDocument extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props
      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>7GUIs</title>
            <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
            <style>{renderMeta.css}</style>
          </Head>
          <Body>
            {children}
          </Body>
        </Html>
      )
    }
  },
}
