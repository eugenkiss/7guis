import React from 'react'
import {css} from 'emotion'
import FontAwesome from '@fortawesome/react-fontawesome'
import faTasks from '@fortawesome/fontawesome-free-solid/faTasks'

import {Layout, Heading, FloatClear} from './_shared'

import counterScreenshot from '../screenshots/counter.png'
import tempConvScreenshot from '../screenshots/tempconv.png'
import flightBookerScreenshot from '../screenshots/bookflight.png'
import timerScreenshot from '../screenshots/timer.png'
import crudScreenshot from '../screenshots/crud.png'
import circleDrawerScreenshot from '../screenshots/circledraw.png'
import cellsScreenshot from '../screenshots/cells.png'

const foamHref = 'http://foam-framework.github.io/foam/foam/js/foam/demos/sevenguis'
const scalaTempConvHref = 'https://www.artima.com/pins1ed/gui-programming.html#32.4'
const sodiumFlightHref = 'http://blog.reactiveprogramming.org/?p=21'
const crossingStateLinesHref = 'http://cs.brown.edu/~sk/Publications/Papers/Published/ick-adapt-oo-fwk-frp/paper.pdf'
const frpHref = 'http://apfelmus.nfshost.com/blog/2012/03/29-frp-three-principles-bidirectional-gui.html'
const dialogControlHref = 'http://ceur-ws.org/Vol-610/paper11.pdf'
const scellsHref = 'https://www.artima.com/pins1ed/the-scells-spreadsheet.html'

const Img = (p) => {
  return <img
    src={p.src}
    className={css`
    margin-top: -6px;
    margin-left: -12px;
    margin-right: 8px;
    margin-bottom: -2px;
    float: left;
  `}
  />
}

const toc = {
  counter: { id: 'counter', name: 'Counter'},
  temp: { id: 'temp', name: 'Temperature Converter'},
  flight: { id: 'flight', name: 'Flight Booker'},
  timer: { id: 'timer', name: 'Timer'},
  crud: { id: 'crud', name: 'CRUD'},
  circle: { id: 'circle', name: 'Circle Drawer'},
  cells: { id: 'cells', name: 'Cells'},
}

// noinspection JSUnusedGlobalSymbols
export default () => (<Layout toc={toc}>
  <h1 id='7tasks'>
    The 7 Tasks <sup><FontAwesome size='xs' icon={faTasks}/></sup>
  </h1>
  <p>
    The tasks were selected by the following criteria.
    The task set should be as small as possible yet reflect as many typical
    (or fundamental or representative) challenges in GUI programming as possible.
    Each task should be as simple and self-contained as possible yet not too
    artificial. Preferably, a task should be based on existing examples as that
    gives the task more justification to be useful and there already will be at
    least one reference implementation.
  </p>
  <p>
    Below, a description of each task highlighted with the challenges it
    reflects and a screenshot of the resulting GUI application in Java/Swing is
    given.
  </p>
  <p>
    (For a wonderful live version of the tasks where you can interact with them
    directly in your browser see <a target='_blank' href={foamHref}>FOAM's implementation</a>.)
  </p>

  <Heading {...toc.counter}/>
  <p>
    <em>Challenge:</em> Understanding the basic ideas of a language/toolkit.
  </p>
  <Img src={counterScreenshot}/>
  <p>
    The task is to build a frame containing a label or read-only textfield
    {' '}<em>T</em> and a button <em>B</em>. Initially, the value in <em>T</em> is
    “0” and each click of <em>B</em> increases the value in <em>T</em> by one.
  </p>
  <p>
    Counter serves as a gentle introduction to the basics of the language,
    paradigm and toolkit for one of the simplest GUI applications imaginable.
    Thus, Counter reveals the required scaffolding and how the very basic
    features work together to build a GUI application. A good solution will have
    almost no scaffolding.
  </p>
  <FloatClear/>

  <Heading {...toc.temp}/>
  <p>
    <em>Challenges:</em> bidirectional data flow, user-provided text input.
  </p>
  <Img src={tempConvScreenshot}/>
  <p>
    The task is to build a frame containing two textfields <em>T<sub>C</sub></em>{' '}
    and <em>T<sub>F</sub></em> representing the temperature in Celsius and Fahrenheit,
    respectively. Initially, both <em>T<sub>C</sub></em> and <em>T<sub>F</sub></em> are
    empty. When the user enters a numerical value into <em>T<sub>C</sub></em> the
    corresponding value in <em>T<sub>F</sub></em> is automatically updated and vice
    versa. When the user enters a non-numerical string into <em>T<sub>C</sub></em> the
    value in <em>T<sub>F</sub></em> is <em>not</em> updated and vice versa. The formula
    for converting a temperature <em>C</em> in Celsius into a temperature <em>F</em> in
    Fahrenheit is <em>C = (F - 32) * (5/9)</em> and the dual direction
    is <em>F = C * (9/5) + 32</em>.
  </p>
  <p>
    Temperature Converter increases the complexity of Counter by having
    bidirectional data flow between the Celsius and Fahrenheit inputs and the need
    to check the user input for validity. A good solution will make the
    bidirectional dependency very clear with minimal boilerplate code.
  </p>
  <p>
    Temperature Converter is inspired by the
    {' '}<a target='_blank' href={scalaTempConvHref}>
      Celsius/Fahrenheit converter
    </a>{' '}
    from the book <em>Programming in Scala</em>.
    It is such a widespread example—sometimes also in the form of a currency
    converter—that one could give a thousand references. The same is true for
    the Counter task.
  </p>
  <FloatClear/>

  <Heading {...toc.flight}/>
  <p>
    <em>Challenge:</em> Constraints.
  </p>
  <Img src={flightBookerScreenshot}/>
  <p>
    The task is to build a frame containing a combobox <em>C</em> with the two options
    “one-way flight” and “return flight”, two textfields <em>T<sub>1</sub></em> and
    {' '}<em>T<sub>2</sub></em> representing the start and return date, respectively, and a
    button <em>B</em> for submitting the selected flight. <em>T<sub>2</sub></em> is enabled
    iff <em>C</em>’s value is “return flight”. When <em>C</em> has the value “return flight”
    and <em>T<sub>2</sub></em>’s date is strictly before <em>T<sub>1</sub></em>’s
    then <em>B</em> is disabled. When a non-disabled textfield <em>T</em> has an
    ill-formatted date then <em>T</em> is colored red and <em>B</em> is disabled.
    When clicking <em>B</em> a message is displayed informing the user of his selection
    (e.g. “You have booked a one-way flight on 04.04.2014.”). Initially, <em>C</em> has the
    value “one-way flight” and <em>T<sub>1</sub></em> as well as <em>T<sub>2</sub></em> have
    the same (arbitrary) date (it is implied that <em>T<sub>2</sub></em> is disabled).
  </p>
  <p>
    The focus of Flight Booker lies on modelling constraints between widgets on
    the one hand and modelling constraints within a widget on the other hand.
    Such constraints are very common in everyday interactions with GUI
    applications. A good solution for Flight Booker will make the constraints
    clear, succinct and explicit in the source code and not hidden behind a lot
    of scaffolding.
  </p>
  <p>
    Flight Booker is directly inspired by the{' '}
    <a target='_blank' href={sodiumFlightHref}>
       Flight Booking Java example in Sodium
    </a>{' '}
    with the simplification of using textfields for date input instead of
    specialized date picking widgets as the focus of Flight Booker is not on
    specialized/custom widgets.
  </p>
  <FloatClear/>

  <Heading {...toc.timer}/>
  <p>
    <em>Challenges:</em> concurrency, competing user/signal interactions, responsiveness.
  </p>
  <Img src={timerScreenshot}/>
  <p>
    The task is to build a frame containing a gauge <em>G</em> for the elapsed
    time <em>e</em>, a label which shows the elapsed time as a numerical value,
    a slider <em>S</em> by which the duration <em>d</em> of the timer can be
    adjusted while the timer is running and a reset button <em>R</em>. Adjusting
    {' '}<em>S</em> must immediately reflect on <em>d</em> and not only when
    {' '}<em>S</em> is released. It follows that while moving <em>S</em> the filled
    amount of <em>G</em> will (usually) change immediately. When <em>e ≥ d</em> is
    true then the timer stops (and <em>G</em> will be full). If, thereafter, <em>d</em> is
    increased such that <em>d > e</em> will be true then the timer restarts to tick
    until <em>e ≥ d</em> is true again. Clicking <em>R</em> will reset <em>e</em> to zero.
  </p>
  <p>
    Timer deals with concurrency in the sense that a timer process that updates
    the elapsed time runs concurrently to the user’s interactions with the GUI
    application. This also means that the solution to competing user and signal
    interactions is tested. The fact that slider adjustments must be reflected
    immediately moreover tests the responsiveness of the solution. A good
    solution will make it clear that the signal is a timer tick and, as always,
    has not much scaffolding.
  </p>
  <p>
    Timer is directly inspired by the timer example in the paper{' '}
    <a target='_blank' href={crossingStateLinesHref}>
       Crossing State Lines: Adapting Object-Oriented Frameworks to Functional Reactive Languages
    </a>
    .
  </p>
  <FloatClear/>

  <Heading {...toc.crud}/>
  <p>
    <em>Challenges:</em> separating the domain and presentation logic, managing mutation, building a non-trivial layout.
  </p>
  <Img src={crudScreenshot}/>
  <p>
    The task is to build a frame containing the following elements: a textfield
    {' '}<em>T<sub>prefix</sub></em>, a pair of textfields <em>T<sub>name</sub></em> and
    {' '}<em>T<sub>surname</sub></em>, a listbox <em>L</em>, buttons <em>B<sub>C</sub></em>,
    {' '}<em>B<sub>U</sub></em> and <em>B<sub>D</sub></em> and the three labels as seen in the
    screenshot. <em>L</em> presents a view of the data in the database that consists of
    a list of names. At most one entry can be selected in <em>L</em> at a time. By
    entering a string into <em>T<sub>prefix</sub></em> the user can filter the names
    whose surname start with the entered prefix—this should happen immediately
    without having to submit the prefix with enter. Clicking <em>B<sub>C</sub></em>{' '}
    will append the resulting name from concatenating the strings in
    {' '}<em>T<sub>name</sub></em> and <em>T<sub>surname</sub></em> to <em>L</em>.
    {' '}<em>B<sub>U</sub></em> and <em>B<sub>D</sub></em> are enabled iff an entry
    in <em>L</em> is selected. In contrast to <em>B<sub>C</sub></em>, <em>B<sub>U</sub></em>{' '}
    will not append the resulting name but instead replace the selected entry with the
    new name. <em>B<sub>D</sub></em> will remove the selected entry. The layout is to be
    done like suggested in the screenshot. In particular, <em>L</em> must occupy all the
    remaining space.
  </p>
  <p>
    CRUD (Create, Read, Update and Delete) represents a typical graphical
    business application. The primary challenge is the separation of domain
    and presentation logic in the source code that is more or less forced on the
    implementer due to the ability to filter the view by a prefix.
    Traditionally, some form of MVC pattern is used to achieve the separation of
    domain and presentation logic. Also, the approach to managing the mutation
    of the list of names is tested. A good solution will have a good separation
    between the domain and presentation logic without much overhead (e.g. in the
    form of toolkit specific concepts or language/paradigm concepts), a mutation
    management that is fast but not error-prone and a natural representation of
    the layout (layout builders are allowed, of course, but would increase the
    overhead).
  </p>
  <p>
    CRUD is directly inspired by the crud example in the blog post{' '}
    <a target='_blank' href={frpHref}>
       FRP - Three principles for GUI elements with bidirectional data flow
    </a>
    .
  </p>
  <FloatClear/>

  <Heading {...toc.circle}/>
  <p>
    <em>Challenges:</em> undo/redo, custom drawing, dialog control*.
  </p>
  <Img src={circleDrawerScreenshot}/>
  <p>
    The task is to build a frame containing an undo and redo button as well as a
    canvas area underneath. Left-clicking inside an empty area inside the canvas
    will create an unfilled circle with a fixed diameter whose center is the
    left-clicked point. The circle nearest to the mouse pointer such that the
    distance from its center to the pointer is less than its radius, if it
    exists, is filled with the color gray. The gray circle is the selected
    circle <em>C</em>. Right-clicking <em>C</em> will make a popup menu appear
    with one entry “Adjust diameter..”. Clicking on this entry will open another
    frame with a slider inside that adjusts the diameter of <em>C</em>. Changes
    are applied immediately. Closing this frame will mark the last diameter as
    significant for the undo/redo history. Clicking undo will undo the last
    significant change (i.e. circle creation or diameter adjustment). Clicking
    redo will reapply the last undoed change unless new changes were made by the
    user in the meantime.
  </p>
  <p>
    Circle Drawer’s goal is, among other things, to test how good the common
    challenge of implementing an undo/redo functionality for a GUI application
    can be solved. In an ideal solution the undo/redo functionality comes for
    free resp. just comes out as a natural consequence of the language / toolkit / paradigm.
    Moreover, Circle Drawer tests how dialog control*, i.e. keeping the
    relevant context between several successive GUI interaction steps, is achieved in
    the source code. Last but not least, the ease of custom drawing is tested.
  </p>
  <p><small>
    * Dialog control is explained in more detail in the paper
    {' '}<a target='_blank' href={dialogControlHref}>
      Developing GUI Applications: Architectural Patterns Revisited
    </a>{' '}
    starting on page seven. The term describes the challenge of
    retaining context between successive GUI operations.
  </small></p>
  <FloatClear/>

  <Heading {...toc.cells}/>
  <p>
    <em>Challenges:</em> change propagation, widget customization, implementing a more authentic/involved GUI application.
  </p>
  <Img src={cellsScreenshot}/>
  <p>
    The task is to create a simple but usable spreadsheet application. The
    spreadsheet should be scrollable. The rows should be numbered from 0 to 99
    and the columns from A to Z. Double-clicking a cell <em>C</em> lets the user
    change <em>C</em>’s formula. After having finished editing the formula is
    parsed and evaluated and its updated value is shown in <em>C</em>. In addition,
    all cells which depend on <em>C</em> must be reevaluated. This process repeats
    until there are no more changes in the values of any cell (change propagation).
    Note that one should not just recompute the value of every cell but only of
    those cells that depend on another cell’s changed value. If there is an already
    provided spreadsheet widget it should not be used. Instead, another similar
    widget (like JTable in Swing) should be customized to become a reusable
    spreadsheet widget.
  </p>
  <p>
    Cells is a more authentic and involved task that tests if a particular
    approach also scales to a somewhat bigger application. The two primary
    GUI-related challenges are intelligent propagation of changes and widget
    customization. Admittedly, there is a substantial part that is not
    necessarily very GUI-related but that is just the nature of a more authentic
    challenge. A good solution’s change propagation will not involve much effort
    and the customization of a widget should not prove too difficult. The
    domain-specific code is clearly separated from the GUI-specific code. The
    resulting spreadsheet widget is reusable.
  </p>
  <p>
    Cells is directly inspired by the
    {' '}<a target='_blank' href={scellsHref}>
      SCells spreadsheet example
    </a>{' '}
    from the book <em>Programming in Scala</em>.
    Please refer to the book (or the implementations in this repository) for
    more details especially with respect to the not directly GUI-related
    concerns like parsing and evaluating formulas and the precise syntax and
    semantics of the spreadsheet language.
  </p>
  <FloatClear/>
</Layout>)
