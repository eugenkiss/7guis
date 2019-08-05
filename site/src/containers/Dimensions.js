import React, {Fragment} from 'react'
import {css} from 'emotion'
import FontAwesome from '@fortawesome/react-fontawesome'
import faExpandArrowsAlt from '@fortawesome/fontawesome-free-solid/faExpandArrowsAlt'

import {Layout, Heading} from './_shared'

const cdsHref = 'http://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/'
const paper1Href = 'http://www.ppig.org/papers/15th-clarke.pdf'
const paper2Href = 'http://homepage.ntlworld.com/greenery/workStuff/Papers/AVI2000.PDF'
const paper3Href = 'http://www.ppig.org/papers/12th-kutar.pdf'
const paper4Href = 'http://ecs.victoria.ac.nz/foswiki/pub/Events/PLATEAU/Program/plateau2011-sadowski.pdf'
const thesisHref = 'https://github.com/eugenkiss/7guis/raw/master/thesis.pdf'
const fragileHref = 'https://en.wikipedia.org/wiki/Fragile_base_class'

const toc = {
  abstraction: { id: 'abstraction', name: 'Abstraction Level'},
  closeness: { id: 'closeness', name: 'Closeness of Mapping'},
  hidden: { id: 'hidden', name: 'Hidden Dependencies'},
  error: { id: 'error', name: 'Error Proneness'},
  diffuseness: { id: 'diffuseness', name: 'Diffuseness'},
  viscosity: { id: 'viscosity', name: 'Viscosity'},
  commentary: { id: 'commentary', name: 'Commentary'},
}

export default () => (<Layout toc={toc}>
  <h1 id='dimensions'>
    Dimensions of Evaluation <sup><FontAwesome size='xs' icon={faExpandArrowsAlt}/></sup>
  </h1>
  <p>
    The following dimensions of evaluation are a subset of the dimensions from the
    {' '}<a target='_blank' href={cdsHref}>Cognitive Dimensions of Notations (CDs)</a>{' '}
    framework which is “an approach to analysing the usability of information artefacts”.
    CDs has been used in
    {' '}<a target='_blank' href={paper1Href}>a</a>{' '}
    {' '}<a target='_blank' href={paper2Href}>variety</a>{' '}
    {' '}<a target='_blank' href={paper3Href}>of</a>{' '}
    {' '}<a target='_blank' href={paper4Href}>papers</a>{' '}
    to analytically investigate the usability of programming
    language features or an API. Often, CDs is only applied insofar as it makes
    sense for a particular information artifact. That is, some of the 14
    dimensions are left out and some new are added possibly. In this way, CDs
    can be taken as a basis for the evaluation of different solutions to the
    7GUIs benchmark. The following dimensions are thus a recommended subset of
    CDs which turned out to work well for the analysis of
    {' '}<a target='_blank' href={thesisHref}>two different approaches</a>{' '}
    to 7GUIs.
  </p>
  <p>
    The list of dimensions is a recommendation to make it easier to
    get started with an analysis between different approaches to 7GUIs. Of
    course, you are free to use your own criteria as you see fit.
  </p>

  <Heading {...toc.abstraction}/>
  <em>Types and availability of abstraction mechanisms</em>
  <p>
    Does the system provide any way of defining new terms within the notation so
    that it can be extended to describe ideas more clearly? Can details be
    encapsulated? Does the system insist on defining new terms? What number of
    new high-level concepts have to be learned to make use of a system? Are they
    easy to use and easy to learn?
  </p>
  <p>
    Each new idea is a barrier to learning and acceptance but can also make
    complex code more understandable. For example, Java Swing, the predecessor
    to JavaFX, employs a variation of the MVC design pattern in its general
    architecture and in particular for each of its widgets. Such being the case,
    there is a significant learning requirement to using the widgets reasonably
    well and often much boilerplate involved (“the system insists on defining
    new terms”) which does not pay off for simple applications. On the other
    hand, for very complex applications the MVC-architecture may make the code
    more understandable and manageable as details can be encapsulated in the new
    terms “Model, View and Controller”.
  </p>
  <p>
    Another example is a function. A function has a name and, optionally,
    parameters as well as a body that returns a value following certain
    computational steps. A client can simply refer to a function by its name
    without knowing its implementation details. Accordingly, a function
    abstracts the computational process involved in the computation of a value.
    The learning barrier to the principle of a function is not great but it can
    still make a lot of code much more understandable by hiding unimportant
    details.
  </p>

  <Heading {...toc.closeness}/>
  <em>Closeness of representations to domain</em>
  <p>
    How closely related is the notation to the result it is describing resp. the
    problem domain? Which parts seem to be a particularly strange way of doing
    or describing something?
  </p>
  <p>
    An example is the layout definition of a GUI. Languages that do not provide
    a way to describe the layout in a nested resp. hierarchical manner, and as
    such force the programmer to “linearize” the code with the introduction of
    meaningless temporary variables, make it hard to see how the structure of
    the layout definition relates to the resulting layout of the application.
    Not for nothing are XML-based view specifications widespread for
    GUI-toolkits in languages without native support for hierarchical layout
    expressions.
  </p>

  <Heading {...toc.hidden}/>
  <em>Important links between entities invisible</em>
  <p>
    Are dependencies between entities in the notation visible or hidden? Is
    every dependency indicated in both directions? Could local changes have
    confusing global effects?
  </p>
  <p>
    If one entity cites another entity, which in turn cites a third, changing
    the value of the third entity may have unexpected repercussions. The key
    aspect is not the fact that A depends on B, but that the dependency is not
    made visible. A well-known illustration of a bad case of Hidden Dependencies
    is the
    {' '}<a target='_blank' href={fragileHref}>fragile base class problem</a>
    . In (complex) class hierarchies a
    seemingly safe modification to a base class may cause derived classes to
    malfunction. The IDE in general cannot help discovering such problems and
    only certain programming language features can help preventing them. Another
    example are non-local side-effects in procedures, i.e. the dependencies of a
    procedure with non-local side-effects are not visible in its signature.
  </p>

  <Heading {...toc.error}/>
  <em>Notation invites mistakes</em>
  <p>
    To what extent does the notation influence the likelihood of the user making
    a mistake? Do some things seem especially complex or difficult (e.g. when
    combining several things)?
  </p>
  <p>
    In many dynamic languages with implicit definitions of variables a typing
    error in a variable name can suddenly lead to hard to find errors as the IDE
    cannot always point out such an error due to the language’s dynamicity.
    Java’s different calling semantics for primitive and reference types may
    lead to mistakes if the programmer mixes them up. Implicit
    null-initialization of variables can lead to null-pointer exceptions if the
    programmer forgets to correctly initialize a variable before its use.
  </p>

  <Heading {...toc.diffuseness}/>
  <em>Verbosity of language</em>
  <p>
    How many symbols or how much space does the notation require to produce a
    certain result or express a meaning? What sorts of things take more space to
    describe?
  </p>
  <p>
    Some notations can be annoyingly long-winded, or occupy too much valuable
    “real-estate” within a display area. In Java before version 8 in order to
    express what are lambdas today anonymous classes were employed. Compared to
    Java 8’s lambdas these anonymous classes used to be a very verbose way of
    encoding anonymous functions especially when used in a callback-heavy
    setting like traditional GUI programming.
  </p>

  <Heading {...toc.viscosity}/>
  <em>Resistance to change</em>
  <p>
    Are there any inherent barriers to change in the notation? How much effort
    is required to make a change to a program expressed in the notation?
  </p>
  <p>
    A viscous system needs many user actions to accomplish one goal. Changing
    the return type of a function might lead to many code breakages in the call
    sites of said function. In such a case an IDE can be of great help. Creating
    a conceptual two-way data-binding by means of two callbacks involves more
    repetition than a more direct way to define such a dependency.
  </p>

  <Heading {...toc.commentary}/>
  <p>
    This part is not so much a dimension but a place to mention everything else
    which is noteworthy and to give a conclusion. For instance, general
    observations that do not fit into the above dimensions, impressions during
    the development process, efficiency concerns of the resulting code and
    potential improvements can be addressed. In addition, the responsibilities
    of the other dimensions’ results are assigned to the paradigm, language,
    toolkit and the IDE.
  </p>

</Layout>)
