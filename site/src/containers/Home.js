import React from 'react'
import {css} from 'emotion'
import FontAwesome from '@fortawesome/react-fontawesome'
import faTasks from '@fortawesome/fontawesome-free-solid/faTasks'
import faExpandArrowsAlt from '@fortawesome/fontawesome-free-solid/faExpandArrowsAlt'
import faCode from '@fortawesome/fontawesome-free-solid/faCode'
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle'
import faEllipsisH from '@fortawesome/fontawesome-free-solid/faEllipsisH'

import {Layout, Link} from './_shared'

const challengesHref = 'https://medium.com/@eugenkiss/challenges-in-gui-programming-65d360466e3f'

const Button = (p) => (
  <Link
    to={p.to}
    className={css`
    width: 24%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 1rem;
    background: #f7f7f7;
    &:hover {
      text-decoration: none;
      background: #eee;
    }
    @media (max-width: 40rem) {
      width: 49%;
    }
    `}>
    <FontAwesome size='3x' icon={p.icon}/>
    <span
      className={css`
      margin-top: 1rem;
      font-size: 1rem;
      text-align: center;
    `}>
      {p.text}
    </span>
  </Link>
)

// noinspection JSUnusedGlobalSymbols
export default () => (<Layout>
  <h1>7GUIs: A GUI Programming Benchmark</h1>
  <p>
    There are countless GUI toolkits in different languages and with diverse
    approaches to GUI development. Yet, diligent comparisons between them are
    rare. Whereas in a traditional benchmark competing implementations are
    compared in terms of their resource consumption, here implementations are
    compared in terms of their notation. To that end, 7GUIs defines
    {' '}<Link to='/tasks'>seven tasks</Link>{' '}
    that represent typical challenges in GUI programming. In addition, 7GUIs
    provides a recommended
    {' '}<Link to='/dimensions'>set of evaluation dimensions</Link>.
  </p>
  <p>
    One might wonder why such a project is useful. First, GUI programming is in
    fact <a target='_blank' href={challengesHref}>not an easy task</a>. 7GUIs
    may help in identifying and propagating
    {' '}<Link to='/implementations'>better approaches</Link>{' '}
    to GUI programming, ultimately pushing programming forward. Second,
    alternative approaches to GUI programming and programming in general gained
    in popularity. Understanding the advantages and disadvantages of these
    alternatives versus the traditional OOP & MVC GUI development approach is
    interesting. Finally, there was no widely used set of tasks which represent
    typical GUI programming challenges when 7GUIs was conceived (2014).
  </p>

  <div
    className={css`
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-between;
  `}>
    <Button to='/tasks' icon={faTasks} text='The 7 Tasks'/>
    <Button to='/dimensions' icon={faExpandArrowsAlt} text='Dimensions'/>
    <Button to='/implementations' icon={faCode} text='Implementations'/>
    <Button to='/contributing' icon={faPlusCircle} text='Contributing'/>
    <Button to='/more' icon={faEllipsisH} text='More'/>
  </div>


</Layout>)
