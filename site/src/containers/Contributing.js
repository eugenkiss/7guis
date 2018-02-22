import React from 'react'
import FontAwesome from '@fortawesome/react-fontawesome'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'

import {Layout} from './_shared'

// noinspection JSUnusedGlobalSymbols
export default () => (<Layout>
  <h1 id='contributing'>
    Contributing <sup><FontAwesome size='xs' icon={faPlusCircle}/></sup>
  </h1>

  <p>
    Thank you for your interest in contributing! New implementations
    are always welcome as well as links to blog posts, articles and
    related work.
  </p>

  <h3>Setup</h3>
  <ol>
    <li>Fork <a target='_blank' href='https://github.com/eugenkiss/7guis'>the repo</a></li>
    <li>Clone your fork</li>
    <li>Make a branch for your changes</li>
    <li>Go into the <code>site</code> directory</li>
    <li><code>make install</code></li>
    <li><code>make run</code> to run a development server</li>
    <li>
      If you are adding a link to a new 7GUIs implementation add it as an entry to
      the array in <code>site/src/containers/Implementations.js</code>
    </li>
    <li>Create a pull request from your branch on your fork to <code>master</code> on this repo</li>
    <li>Have your branch get merged in!</li>
  </ol>

  <small>
    Note that in the past implementations could be merged directly into the repo.
    From now on the 7GUIs repo will contain this website and links to implementations
    but not implementations themselves. This makes ownership clearer and reduces
    maintainenance effort without any downsides.
  </small>

</Layout>)
