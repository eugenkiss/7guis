import React, {Fragment} from 'react'
import {css} from 'emotion'
import FontAwesome from '@fortawesome/react-fontawesome'
import faCode from '@fortawesome/fontawesome-free-solid/faCode'
import faFileCode from '@fortawesome/fontawesome-free-solid/faFileCode'

import {Layout} from './_shared'


// noinspection JSUnusedGlobalSymbols
export default () => (<Layout>
  <h1 id='implementations'>
    Implementations <sup><FontAwesome size='xs' icon={faCode}/></sup>
  </h1>

  <div
    className={css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 40rem) {
       display: block;
    }
  `}>
    {implementations.sort((a, b) => a.title.localeCompare(b.title)).map((x, i) =>
      <p
        key={i}
        className={css`
        width: 47%;
        @media (max-width: 40rem) {
           width: 100%;
        }
      `}>
        <a target='_blank' href={x.link}>
          <span
            className={css`
            font-size: 1.35rem;
            font-weight: 500;
          `}>
            {x.title}
          </span>
        </a>
        {' — '}
        <a target='_blank' href={x.src}>source <FontAwesome size='sm' icon={faFileCode}/></a>
        {x.author != null && <React.Fragment>
        <br/>
        Author: <a target='_blank' href={x.authorLink}>{x.author}</a>
        </React.Fragment>}
        <br/>
        Techs: {x.technologies.join(', ')}.
        {x.notes && <Fragment>
          <br/>
          Notes: {x.notes}
        </Fragment>}
      </p>
    )}
  </div>

</Layout>)

const implementations = [
  {
    title: 'React/MobX',
    technologies: ['React', 'TypeScript', 'MobX'],
    author: 'Eugen Kiss',
    authorLink: 'https://github.com/eugenkiss/',
    link: 'https://eugenkiss.github.io/7guis-React-TypeScript-MobX/',
    src: 'https://github.com/eugenkiss/7guis-React-TypeScript-MobX',
  },
  {
    title: 'Java7/Swing',
    technologies: ['Java7', 'Swing'],
    author: 'Eugen Kiss',
    authorLink: 'https://github.com/eugenkiss/',
    notes: 'Reference implementation',
    link: 'https://github.com/eugenkiss/7guis-Java7-Swing',
    src: 'https://github.com/eugenkiss/7guis-Java7-Swing',
  },
  {
    title: 'Clojure/Seesaw',
    technologies: ['Clojure', 'Seesaw'],
    author: 'Eugen Kiss',
    authorLink: 'https://github.com/eugenkiss/',
    link: 'https://github.com/eugenkiss/7guis-Clojure-Seesaw',
    src: 'https://github.com/eugenkiss/7guis-Clojure-Seesaw',
  },
  {
    title: 'Java8/JavaFX|ReactFX',
    technologies: ['Java8', 'JavaFX', 'ReactFX'],
    author: 'Eugen Kiss',
    authorLink: 'https://github.com/eugenkiss/',
    link: 'https://github.com/eugenkiss/7guis-Java8-JavaFX',
    src: 'https://github.com/eugenkiss/7guis-Java8-JavaFX',
  },
  {
    title: 'Scala/ScalaFX|Scala.Rx|ReactFX',
    technologies: ['Scala', 'ScalaFX', 'Scala.Rx', 'ReactFX'],
    author: 'Eugen Kiss',
    authorLink: 'https://github.com/eugenkiss/',
    link: 'https://github.com/eugenkiss/7guis-Scala-ScalaFX',
    src: 'https://github.com/eugenkiss/7guis-Scala-ScalaFX',
  },
  {
    title: 'Elm',
    technologies: ['Elm'],
    author: 'Eugen Kiss',
    authorLink: 'https://github.com/eugenkiss/',
    notes: 'Incomplete and rather old (2014)',
    link: 'https://github.com/eugenkiss/7guis-Elm',
    src: 'https://github.com/eugenkiss/7guis-Elm',
  },
  {
    title: 'ClojureScript/Om',
    technologies: ['ClojureScript', 'Om'],
    author: 'Dave Clayton',
    authorLink: 'https://github.com/davedx',
    link: 'https://github.com/eugenkiss/7guis/tree/master/ClojureScript-Om',
    src: 'https://github.com/eugenkiss/7guis/tree/master/ClojureScript-Om',
  },
  {
    title: 'Qt5',
    technologies: ['Qt5'],
    author: 'Jean-Michaël Celerier',
    authorLink: 'https://github.com/jcelerier',
    link: 'https://github.com/eugenkiss/7guis/tree/master/Qt5',
    src: 'https://github.com/eugenkiss/7guis/tree/master/Qt5',
  },
  {
    title: 'C#/WinForms',
    technologies: ['C#', 'WinForms'],
    author: 'Dmitri Suvorov',
    authorLink: 'https://github.com/suvjunmd',
    link: 'https://github.com/eugenkiss/7guis/tree/master/C%23-WinForms',
    src: 'https://github.com/eugenkiss/7guis/tree/master/C%23-WinForms',
  },
  {
    title: 'Kotlin/TornadoFX',
    technologies: ['Kotlin', 'TornadoFX'],
    author: 'Karl',
    authorLink: 'https://github.com/KarlFish',
    link: 'https://github.com/KarlFish/7guis-tornadofx',
    src: 'https://github.com/KarlFish/7guis-tornadofx',
  },
  {
    title: 'GHCi GUI toolkit',
    technologies: ['Haskell', 'GHCi-GUI'],
    author: 'Péter Diviánszky',
    authorLink: 'https://github.com/divipp',
    link: 'https://github.com/divipp/lensref/wiki',
    src: 'https://github.com/divipp/lensref',
  },
  {
    title: 'FOAM',
    technologies: ['FOAM'],
    author: 'Kevin Glen Roy Greer',
    authorLink: 'https://github.com/kgrgreer',
    link: 'http://foam-framework.github.io/foam/foam/js/foam/demos/sevenguis/',
    src: 'http://foam-framework.github.io/foam/foam/js/foam/demos/sevenguis/',
  },
  {
    title: 'reflex-dom',
    technologies: ['Haskell', 'reflex-dom'],
    author: 'Moritz Drexl',
    authorLink: 'https://github.com/themoritz',
    link: 'https://github.com/themoritz/7guis-reflex',
    src: 'https://github.com/themoritz/7guis-reflex',
  },
  {
    title: 'Groovy/Fenja (SodiumFRP)',
    technologies: ['Groovy', 'Fenja', 'SodiumFRP'],
    author: 'Sven Reinck',
    authorLink: 'https://github.com/FLUXparticle',
    link: 'https://github.com/FLUXparticle/7guis',
    src: 'https://github.com/FLUXparticle/7guis',
  },
  {
    title: 'Red',
    technologies: ['Red'],
    author: 'Gregg Irwin',
    authorLink: 'https://github.com/greggirwin',
    link: 'https://github.com/greggirwin/7guis/tree/master/Red',
    src: 'https://github.com/greggirwin/7guis/tree/master/Red',
  },
  {
    title: 'Phix',
    technologies: ['Phix'],
    author: 'petelomax NA',
    authorLink: 'https://bitbucket.org/petelomax/',
    link: 'https://bitbucket.org/petelomax/phix/src/06e8ba8c8c7f6beb6cf8e9a0335059906439974a/demo/rosetta/7guis/',
    src: 'https://bitbucket.org/petelomax/phix/src/06e8ba8c8c7f6beb6cf8e9a0335059906439974a/demo/rosetta/7guis/',
  },
  {
    title: 'VFP',
    technologies: ['VFP'],
    author: 'Hernan Cano M',
    authorLink: 'https://github.com/jhernancanom',
    link: 'https://github.com/jhernancanom/7GUIs_VFP',
    src: 'https://github.com/jhernancanom/7GUIs_VFP',
  },
  {
    title: 'Vanilla React',
    technologies: ['React'],
    author: 'Andrew Greenh',
    authorLink: 'https://github.com/andreasgruenh',
    link: 'https://andreasgruenh.github.io/7guis/#/counter',
    src: 'https://github.com/andreasgruenh/7guis',
  },
    title: 'Svelte',
    technologies: ['Svelte', 'JavaScript'],
    author: 'Rich Harris',
    authorLink: 'https://github.com/Rich-Harris',
    link: 'https://svelte.technology/repl',
    src: 'https://github.com/sveltejs/svelte.technology/tree/master/content/examples',
  },
  {
    title: 'Tcl/Tk',
    technologies: ['Tcl', 'Tk'],
    link: 'http://wiki.tcl.tk/41121',
    src: 'http://wiki.tcl.tk/41121',
  },
]
