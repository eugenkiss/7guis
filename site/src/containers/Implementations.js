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
    title: 'ClojureScript/React/Reagent/Tailwind',
    technologies: ['ClojureScript', 'React', 'Reagent', 'Tailwind', 'shadow-cljs'],
    author: 'Alex Sumner',
    authorLink: 'https://github.com/alex-sumner/',
    link: 'http://seven-guis.s3-website.eu-west-2.amazonaws.com/',
    src: 'https://github.com/alex-sumner/seven-guis',
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
    author: 'Joaquin Oltra',
    authorLink: 'https://github.com/joakin/',
    notes: 'Elm 0.19',
    link: 'https://joakin.github.io/elm-7guis',
    src: 'https://github.com/joakin/elm-7guis',
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
    title: 'OCaml/LabGtk3',
    technologies: ['OCaml', 'LablGtk3'],
    author: 'Frédéric Loyer',
    authorLink: 'https://github.com/F-loyer/',
    link: 'https://github.com/F-loyer/7guis-ocaml-lablgtk3',
    src: 'https://github.com/F-loyer/7guis-ocaml-lablgtk3',
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
    author: 'Pete Lomax',
    authorLink: 'https://github.com/petelomax',
    link: 'https://github.com/petelomax/Phix/tree/master/demo/rosetta/7guis',
    src: 'https://github.com/petelomax/Phix/tree/master/demo/rosetta/7guis',
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
    authorLink: 'https://github.com/andrewgreenh',
    link: 'https://andrewgreenh.github.io/7guis/#/counter',
    src: 'https://github.com/andrewgreenh/7guis',
  },
  {
    title: 'Svelte',
    technologies: ['Svelte', 'JavaScript'],
    author: 'Rich Harris',
    authorLink: 'https://github.com/Rich-Harris',
    link: 'https://svelte.dev/examples#7guis-counter',
    src: 'https://github.com/sveltejs/svelte/tree/master/site/content/examples/20-7guis',
  },
  {
    title: 'Tcl/Tk',
    technologies: ['Tcl', 'Tk'],
    link: 'http://wiki.tcl.tk/41121',
    src: 'http://wiki.tcl.tk/41121',
  },
  {
    title: 'Angular',
    technologies: ['Angular', 'TypeScript', 'RxJs'],
    author: 'Alex Elarbee',
    authorLink: 'https://github.com/elarbee/',
    link: 'https://elarbee.github.io/7guis',
    src: 'https://github.com/elarbee/7guis-angular8',
  },
  {
    title: 'Vue, Angular, React, Svelte',
    technologies: ['Vue', 'Angular', 'React', 'Svelte'],
    author: 'Lars Kappert',
    authorLink: 'https://github.com/webpro',
    link: 'https://github.com/webpro/vars',
    src: 'https://github.com/webpro/vars',
  },
  {
    title: 'Flow9',
    technologies: ['flow', 'flow9'],
    author: 'Asger Palm',
    link: 'https://github.com/area9innovation/flow9/tree/master/demos/7guis',
    src: 'https://github.com/area9innovation/flow9/tree/master/demos/7guis',
  },
  {
    title: 'Fyne',
    technologies: ['Fyne', 'Go'],
    author: 'Various Contributors',
    authorLink: 'https://github.com/fyne-io/7guis/graphs/contributors',
    link: 'https://github.com/fyne-io/7guis/blob/master/README.md',
    src: 'https://github.com/fyne-io/7guis',
  },
  {
    title: 'Sciter.JS',
    technologies: ['Sciter.JS'],
    author: 'GirkovArpa',
    authorLink: 'https://github.com/GirkovArpa',
    link: 'https://github.com/GirkovArpa/sciter-js-7guis#sciterjs-7guis',
    src: 'https://github.com/GirkovArpa/sciter-js-7guis',
  },
  {
    title: 'C#/Unity',
    technologies: ['C#', 'Unity', 'Unity3D'],
    author: 'csutil.com',
    authorLink: 'https://github.com/cs-util',
    link: 'https://www.youtube.com/watch?v=AQAYrvcjqqw',
    src: 'https://github.com/cs-util-com/cscore/tree/master/CsCore/UnityTests/Assets/Plugins/CsCoreUnityDemoScenes/Ui24_7GUIsBechnmark',
  },
  {
    title: 'Godot Engine',
    technologies: ['Godot Engine', 'GDScript'],
    author: 'Andrew Wooldridge',
    authorLink: 'https://github.com/triptych',
    link: 'https://github.com/triptych/sevenguis/blob/master/README.md',
    src: 'https://github.com/triptych/sevenguis',
  },
  {
    title: 'Druid',
    technologies: ['Druid', 'Rust'],
    author: 'MrGibus',
    authorLink: 'https://github.com/MrGibus',
    link: 'https://github.com/MrGibus/Druid-7guis',
    src: 'https://github.com/MrGibus/Druid-7guis',
  },
  {
    title: 'React/Xstate',
    technologies: ['React', 'XState', 'Chakra'],
    author: 'Abhimanyu Pathania',
    authorLink: 'https://github.com/abhimanyuPathania',
    link: 'https://seven-guis.netlify.app/',
    src: 'https://github.com/abhimanyuPathania/seven-guis',
  },
  {
    title: 'fltk-rs',
    technologies: ['Rust', 'fltk-rs', 'FLTK'],
    author: 'Tom Dryer',
    authorLink: 'https://github.com/tdryer',
    link: 'https://github.com/tdryer/7guis-fltk-rs#7guis-fltk-rs',
    src: 'https://github.com/tdryer/7guis-fltk-rs',
  },
  {
    title: 'Clojurescript/Reagent',
    technologies: ['Clojurescript', 'Reagent'],
    author: 'Ar Nazeh',
    authorLink: 'https://github.com/Nazeh',
    link: 'https://7guis-cljs.nzh.io/',
    src: 'https://github.com/Nazeh/7guis-cljs',
  },
  {  
    title: 'Clojurescript/Reagent/2',
    technologies: ['Clojurescript', 'Reagent'],
    author: 'Camilo Polymeris',
    authorLink: 'https://github.com/polymeris',
    link: 'https://polymeris.github.io/7guis-clojurescript/',
    src: 'https://github.com/polymeris/7guis-clojurescript',
  },
  {
    title: 'gotoв',
    technologies: ['gotoв', 'JavaScript'],
    author: 'Federico Pereiro',
    authorLink: 'https://github.com/fpereiro/',
    link: 'https://altocode.nl/gotob/examples/7guis.html',
    src: 'https://github.com/fpereiro/gotoB/blob/master/examples/7guis.js'
  },
  {
    title: "HTML, CSS, JavaScript",
    technologies: ["HTML", "CSS", "JavaScript"],
    author: "Brad Woods",
    authorLink: "https://github.com/bradwoods/",
    link: "https://7guis.bradwoods.io",
    src: "https://github.com/bradwoods/7guis-html-css-js",
  },
  {
    title: "BANG!",
    technologies: ["BANG!", "Web Components"],
    author: "Cris",
    authorLink: "https://github.com/i5ik/",
    link: "https://i5ik.github.io/_____/7guis/",
    src: "https://github.com/i5ik/_____/tree/main/docs/7guis",
  },
  {
    title: "Racket",
    technologies: ["Racket", "racket/gui"],
    link: "https://github.com/mfelleisen/7GUI/",
    src: "https://github.com/mfelleisen/7GUI",
  },
  {
    title: "GUI-Easy declarative GUI",
    technologies: ["GUI-Easy", "Racket", "racket/gui"],
    author: "Bogdan Popa",
    authorLink: "https://github.com/Bogdanp/",
    link: "https://github.com/Bogdanp/racket-gui-easy/tree/master/examples",
    src: "https://github.com/Bogdanp/racket-gui-easy/tree/master/examples",
  }  
]
