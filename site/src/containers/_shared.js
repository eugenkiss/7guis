import React, {Fragment} from 'react'
import * as ReactStatic from 'react-static'
import {css} from 'emotion'

export const FloatClear = () => <div style={{clear: 'both'}}/>

// TODO: I need the scroll hack to retain the scroll position when going back/forth
// TODO: I need to manually put the path prefix here otherwise the client side
// routing will give me 404s on eugenkiss.github.io/7guis/... Such a hack
export const Link = ({children, to, ...rest}) =>
  <ReactStatic.Link
    {...rest}
    to={`/7guis${to}`}
    exact
    onClick={() => setTimeout(() => window.scrollTo(0,0), 0)}
    >
    {children}
  </ReactStatic.Link>

const Toc = (p) => (
  <div
    className={css`
    position: sticky;
    top: 1rem;
    padding-left: 0.5rem;
    border-left: 1px solid #eee;
  `}>
    {Object.values(p.toc).map(x =>
      <div key={x.id}><a href={'#' + x.id}>{x.name}</a></div>
    )}
  </div>
)

export const Heading = (p) => (<Fragment>
  <div id={p.id}/>
  <h2
    className={css`
  `}>
    {p.name}
  </h2>
</Fragment>)


const NavLink = (p) => (
  <Link
    to={p.to}
    activeStyle={{background: '#eee'}}
    className={css`
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background: #f7f7f7;
    &:hover {
      text-decoration: none;
      background: #eee;
    }
  `}>
    {p.children}
  </Link>
)

export const Layout = (p) => <Fragment>
  <div
    className={css`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  `}>
    {p.toc &&
      <div
        className={css`
        flex: 0 9999 12rem;
        @media (max-width: 47rem) {
          display: none;
        }
      `}/>
    }

    <div
      className={css`
      flex: 0 1 ${p.toc != null ? 57 : 44}rem;
      min-width: 0;
    `}>
      <div
        className={css`
        display: flex;
        flex-wrap: wrap;
        margin-right: -0.5rem;
        margin-bottom: -0.5rem;
      `}>
        <NavLink to='/'>7GUIs</NavLink>
        <NavLink to='/tasks'>Tasks</NavLink>
        <NavLink to='/dimensions'>Dimensions</NavLink>
        <NavLink to='/implementations'>Code</NavLink>
        <NavLink to='/contributing'>Contributing</NavLink>
        <NavLink to='/more'>More</NavLink>
      </div>
    </div>
  </div>

  <div
    className={css`
    display: flex;
    justify-content: center;
  `}>
    {p.toc &&
      <div
        className={css`
        flex: 0 9999 12rem;
        @media (max-width: 47rem) {
          display: none;
        }
      `}/>
    }

    <div
      className={css`
      flex: 0 1 44rem;
      min-width: 0;
    `}>
      {p.children}
    </div>

    {p.toc &&
      <div
        className={css`
        font-size: 1rem;
        margin-left: 1rem;
        flex: 0 0 12rem;
        @media (max-width: 47rem) {
          display: none;
        }
      `}>
        <Toc toc={p.toc}/>
      </div>
    }
  </div>
</Fragment>
