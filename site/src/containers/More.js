import React from 'react'
import FontAwesome from '@fortawesome/react-fontawesome'
import faEllipsisH from '@fortawesome/fontawesome-free-solid/faEllipsisH'

import {Layout, Heading, Link} from './_shared'

const thesisHref = 'https://eugenkiss.com/projects/thesis.pdf'
const hciHref = 'https://hci.uni-hannover.de/'

const toc = {
  about: { id: 'about', name: 'About'},
  analyses: { id: 'analyses', name: 'Analyses'},
  related: { id: 'related', name: 'Related Work'},
}

// noinspection JSUnusedGlobalSymbols
export default () => (<Layout toc={toc}>
  <h1 id='more'>
    More <sup><FontAwesome size='xs' icon={faEllipsisH}/></sup>
  </h1>

  <Heading {...toc.about}/>
  7GUIs has been created as a spin-off of
  {' '}<a target='_blank' href='https://eugenkiss.com'>my</a>{' '}
  master’s thesis
  {' '}<a target='_blank' href={thesisHref}>
    Comparison of Object-Oriented and Functional Programming for GUI Development
  </a>{' '}
  at the
  {' '}<a target='_blank' href={hciHref}>
  Human-Computer Interaction group
  {' '}</a>
  of the Leibniz Universität Hannover in 2014.
  The GUI programming sphere has anything but stopped evolving since then. Yet,
  the holy grail appears to still be out of reach. I believe projects such as
  7GUIs may help us find the right direction sooner.

  <Heading {...toc.analyses}/>
  <p>
    Having various implementations of 7GUI’s tasks is good. Having analyses of
    the different approaches to identify the pros and cons is even better. If
    you created a blog post, an article, a video, a short overview etc.
    comparing of one or more 7GUIs implementations
    {' '}<Link to='/contributing'>feel free to add</Link>{' '}
    your link here:
  </p>
  <ul>
    <li>
      <a target='_blank' href={thesisHref}>
        Comparison of Object-Oriented and Functional Programming for GUI Development
      </a>{' '}
    </li>
  </ul>

  <Heading {...toc.related}/>
  <ul>
    <li><p>
      <a target='_blank' href='http://todomvc.com/'>
        TodoMVC
      </a>{' '}
      is similar in spirit to 7GUIs in the sense that a task is compared between
      different application frameworks (in different languages and paradigms)
      mostly in terms of the clarity of the source code behind the resulting
      application but also in terms of the performance. Instead of several
      isolated tasks such as in 7GUIs, TodoMVC is about implementing one
      cohesive application. In terms of contributions and positioning, TodoMVC's
      focus lies on web-based (single-page and/or MV*) application frameworks.
    </p></li>
    <li><p>
      <a target='_blank' href='https://hnpwa.com/'>
        HNPWA
      </a>{' '}
      (Hacker News readers as Progressive Web Apps) describes itself as a
      “spiritual successor to TodoMVC”. Its focus lies even more on web based
      technology and performance, the app/task is larger and it optionally
      encompasses non-GUI aspects such as writing an API server.
    </p></li>
    <li><p>
      <a target='_blank' href='http://rosettacode.org/wiki/Category:GUI'>
        Rosettacode's GUI category
      </a>.{' '}
      Rosettacode is a general programming chrestomathy site with a category for
      GUI tasks. However, these tasks focus mainly on very specifics of a
      toolkit and not on fundamental GUI programming challenges.
    </p></li>
    <li><p>
      <a target='_blank' href='http://web.archive.org/web/20120414134638/http://wiki.java.net/bin/view/Javadesktop/LayoutManagerShowdown'>
        Layout Manager Showdown
      </a>.{' '}
      The author stumbled upon a complex layout task that could not be fulfilled
      by his GUI builder of choice. This task was used to compare different
      layout managers in terms of code clarity. The difference to 7GUIs is that
      complex layouts are but one GUI challenge (which is already somewhat
      reflected in 7GUIs' CRUD task) and not a mostly “complete” set of GUI
      challenges.
    </p></li>
    <li><p>
      <a target='_blank' href='https://github.com/staltz/flux-challenge'>
        Flux Challenge
      </a>{' '}
      is a “A frontend challenge to test UI architectures and solutions” in the
      same vein as TodoMVC. The main challenge lies in handling tricky
      asynchrony elegantly which I find interesting since I feel 7GUIs lacks in
      this regard.
    </p></li>

  </ul>

</Layout>)
