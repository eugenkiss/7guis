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

-- Similar to https://github.com/evancz/TodoFRP

-- Todo change list to Array

-- Model: Representation of the application

type Entry = String

type CrudState = [Entry]

initialState = ["Emil, Hans", "Mustermann, Max", "Tisch, Roman"]

data Action = Create String | Update Int String | Delete Int | None


-- Update: Description how to update the state based on user's actions

updateEntry i e s = take i s ++ [e] ++ drop (i+1) s

deleteEntry i s = take i s ++ drop (i+1) s

update : Action -> CrudState -> CrudState
update action state =
  case action of
    None       -> state
    Create e   -> state ++ [e]
    Update i e -> updateEntry i e state
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
  [ vbox 5
    [ label 5 "Name"
    , label 5 "Surname"
    ],
    vbox 5
    [ field nameInput.handle id "" name
    , field surnameInput.handle id "" surname
    ]
  ]

displayEntry entry index selected =
  let box x = container 200 22 midLeft x
      blueBox x = color (Color.rgb 230 230 255) (box x)
      txt = plainText entry
  in
    if Just index == selected
      then (blueBox txt) |> clickable selectedInput.handle Nothing
      else (box txt)     |> clickable selectedInput.handle (Just index)

displayEntries filtered selected =
  let w = 200
      h = 300
  in
    layers [ collage w h [filled Color.white (rect w h)]
           , container w h topLeft <| flow down
               <| zipWith (\i x -> displayEntry x i selected) [0..(length filtered)] filtered
           ]

display prefix name surname selected state =
  let fullname = surname.string ++ ", " ++ name.string
      (filtIndices, filtEntries) = unzip <|
        filter (\(i,e) -> startsWith prefix.string e) (zip [0..length state] state)
      filtIndicesArray = Array.fromList filtIndices
      filt2orig x = Array.get x filtIndicesArray
      index = case selected of
                Nothing -> Nothing
                Just i  -> filt2orig i
  in
    vbox 5
    [ hbox 5 [ label 5 "Filter prefix: ", field prefixInput.handle id "" prefix ]
    , hbox 5 [ displayEntries filtEntries selected, displayNameInputs name surname ]
    , hbox 5 [ button actionInput.handle (Create fullname) "Create"
             , case index of
                  Nothing -> label 22 "No Update"
                  Just i  -> button actionInput.handle (Update i fullname) "Update"
             , case index of
                  Nothing -> label 22 "No Delete"
                  Just i  -> button actionInput.handle (Delete i) "Delete"
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