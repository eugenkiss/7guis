

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import universal, { setHasBabelPlugin } from 'react-universal-component'
import { cleanPath } from 'react-static'



setHasBabelPlugin()

const universalOptions = {
  loading: () => null,
  error: props => {
    console.error(props.error);
    return <div>An error occurred loading this page's template. More information is available in the console.</div>;
  },
}

  const t_0 = universal(import('../src/containers/Home'), universalOptions)
const t_1 = universal(import('../src/containers/Tasks'), universalOptions)
const t_2 = universal(import('../src/containers/Dimensions'), universalOptions)
const t_3 = universal(import('../src/containers/Implementations'), universalOptions)
const t_4 = universal(import('../src/containers/Contributing'), universalOptions)
const t_5 = universal(import('../src/containers/More'), universalOptions)
const t_6 = universal(import('../src/containers/404'), universalOptions)
    

// Template Map
global.componentsByTemplateID = global.componentsByTemplateID || [
  t_0,
t_1,
t_2,
t_3,
t_4,
t_5,
t_6
]

// Template Tree
global.templateIDsByPath = global.templateIDsByPath || {
  '404': 6
}

// Get template for given path
const getComponentForPath = path => {
  path = cleanPath(path)
  return global.componentsByTemplateID[global.templateIDsByPath[path]]
}

global.reactStaticGetComponentForPath = getComponentForPath
global.reactStaticRegisterTemplateIDForPath = (path, id) => {
  global.templateIDsByPath[path] = id
}

export default class Routes extends Component {
  render () {
    const { component: Comp, render, children } = this.props

    const getFullComponentForPath = path => {
      let Comp = getComponentForPath(path)
      let is404 = path === '404'
      if (!Comp) {
        is404 = true
        Comp = getComponentForPath('404')
      }
      return newProps => (
        Comp
          ? <Comp {...newProps} {...(is404 ? {is404: true} : {})} />
          : null
      )
    }

    const renderProps = {
      componentsByTemplateID: global.componentsByTemplateID,
      templateIDsByPath: global.templateIDsByPath,
      getComponentForPath: getFullComponentForPath
    }

    if (Comp) {
      return (
        <Comp
          {...renderProps}
        />
      )
    }

    if (render || children) {
      return (render || children)(renderProps)
    }

    // This is the default auto-routing renderer
    return (
      <Route path='*' render={props => {
        let Comp = getFullComponentForPath(props.location.pathname)
        return <Comp key={props.location.pathname} {...props} />
      }} />
    )
  }
}

    