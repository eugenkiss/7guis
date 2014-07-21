import String
import String (startsWith)
import Window
import Text
import Graphics.Input (..)
import Graphics.Input.Field as Field
import Graphics.Input.Field (Content)
import Util(..)
import Date
import Graphics.Collage (..)
import Color
import List(..)
import Array
import Maybe

-- Similar to https://github.com/evancz/TodoFRP


-- Model: Representation of the application domain

type Entry = String

type CrudState = Array.Array Entry

initialState = Array.fromList ["Emil, Hans", "Mustermann, Max", "Tisch, Roman"]

data Action = Create Entry | Update Int Entry | Delete Int | None


-- Update: Description how to update the state based on user's actions

deleteEntry i s =
  let firstHalf = Array.slice 0 i s
      secondHalf = Array.slice (i+1) (Array.length s) s
  in Array.append firstHalf secondHalf

update : Action -> CrudState -> CrudState
update action state =
  case action of
    None       -> state
    Create e   -> Array.push e state
    Update i e -> Array.set i e state
    Delete i   -> deleteEntry i state


-- Inputs: Description of the UI input elements

prefixInput  = input Field.noContent
nameInput    = input Field.noContent
surnameInput = input Field.noContent
actionInput  = input None
selectedInput : Input (Maybe Int)
selectedInput = input Nothing


-- View: How to display the model and inputs on screen

displayNameInputs name surname =
  hbox 5
  [ vbox 5 [ label 5 "Name", label 5 "Surname"]
  , vbox 5
    [ field nameInput.handle id "" name
    , field surnameInput.handle id "" surname
    ]
  ]

displayEntry entry index selected =
  let box x     = container 200 22 midLeft x
      blueBox x = color (Color.rgb 230 230 255) (box x)
      txt       = plainText entry
  in
    if Just index == selected
      then blueBox txt |> clickable selectedInput.handle Nothing
      else box txt     |> clickable selectedInput.handle (Just index)

displayEntries filtered selected =
  let w = 200
      h = 300
  in
    layers [ collage w h [filled Color.white (rect w h)]
           , container w h topLeft <| flow down
               <| map (\(i, x) -> displayEntry x i selected) filtered
           ]

display prefix name surname selected state =
  let fullname    = surname.string ++ ", " ++ name.string
      filtered    = filter (\(i,e) -> startsWith prefix.string e) (Array.toIndexedList state)
      filtIndices = Array.fromList <| fst (unzip filtered)
      filt2orig x = Array.get x filtIndices
      index       = Maybe.maybe Nothing filt2orig selected
      disButton handle operation title =
        case index of
          Nothing -> label 22 ("No " ++ title)
          Just i  -> button handle (operation i) title
  in
    vbox 5
    [ hbox 5 [ label 5 "Filter prefix: ", field prefixInput.handle id "" prefix ]
    , hbox 5 [ displayEntries filtered selected, displayNameInputs name surname ]
    , hbox 5 [ button    actionInput.handle (Create fullname)         "Create"
             , disButton actionInput.handle (\i -> Update i fullname) "Update"
             , disButton actionInput.handle (\i -> Delete i)          "Delete"
             ]
    ]


-- Main: Bring everything together

currentState : Signal CrudState
currentState = foldp update initialState actionInput.signal

main =
    let content = display <~ prefixInput.signal
                           ~ nameInput.signal
                           ~ surnameInput.signal
                           ~ selectedInput.signal
                           ~ currentState
    in frame "CRUD" <~  Window.dimensions ~ content