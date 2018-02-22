import React from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
import {css, injectGlobal} from 'emotion'

export default () => (
  <Router autoScrollToTop={false}>
    <div
      className={css`
      margin-left: auto;
      margin-right: auto;
      padding: 1.5rem 1.125rem;
    `}>
      <Routes/>
    </div>
  </Router>
)

injectGlobal`
* {
  box-sizing: border-box;
}

html {
  font-size: 1em;
}

body {
  margin: 0;
  padding: 0;
  background-color: white;
  line-height: 1.55;

  font-size: 1.1rem;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  color: hsla(0,0%,0%,0.8);
  font-weight: normal;
}

a {
  color: #0366d6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

p {
  word-wrap: break-word;
  hyphens: auto;
  margin-bottom: 1.3em;
}

h1, h2, h3, h4 {
  margin-bottom: 0.5em;
  margin-top: 1.414em;
  line-height: 1.2;
  hyphens: none;

  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  font-weight: 600;
  text-rendering: optimizeLegibility;
}

h1 {
  margin-top: 0;
  font-size: 2.074em;
}

h2 {
  font-size: 1.728em;
}

h3 {
  font-size: 1.44em;
}

h4 {
  font-size: 1.2em;
}

small, .font_small {
  font-size: 0.833em;
}

.sans-serif {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
}

tt, code {
  word-break: break-all;
  font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
  font-size: 85%;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  background-color: rgba(27,31,35,0.05);
}

/* https://gist.github.com/unruthless/413930 */
sub, sup {
  /* Specified in % so that the sup/sup is the
     right size relative to the surrounding text */
  font-size: 75%;

  /* Zero out the line-height so that it doesn't
     interfere with the positioning that follows */
  line-height: 0;

  /* Where the magic happens: makes all browsers position
     the sup/sup properly, relative to the surrounding text */
  position: relative;

  /* Note that if you're using Eric Meyer's reset.css, this
     is already set and you can remove this rule */
  vertical-align: baseline;
}

sup {
  /* Move the superscripted text up */
  top: -0.5em;
}

sub {
  /* Move the subscripted text down, but only
     half as far down as the superscript moved up */
  bottom: -0.25em;
}
`
