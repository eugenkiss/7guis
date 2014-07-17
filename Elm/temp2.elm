-- This is a solution by Evan Czaplicki,
-- see https://groups.google.com/forum/?fromgroups#!topic/elm-discuss/B8Y91uvoZcs
-- Comments are provided by me.

import String
import Window
import Text
import Graphics.Input (..)
import Graphics.Input.Field as Field
import Graphics.Input.Field (Content)
import Util(..)


{-- Model --------------------------------------------------------------------------}

-- Conversion formulas from Celsius to Fahrenheit and vice versa.
cToF c = (9/5.0 * c) + 32
fToC f = 5/9.0 * (f - 32)

-- If field (or “the content of field”) is numeric
-- then f(field) rounded is returned (or “is the result”).
-- Otherwise, current is returned.
convert : (Float -> Float) -> Content -> Content -> Content
convert f field current =
    let round' x = toFloat (round (x * 10)) / 10 in
    case String.toFloat field.string of
      Just n -> { field | string <- show (round' (f n)) }
      Nothing -> current

-- Represent the “abstract input fields” behind the displayed fields.
celsius : Input Content
celsius = input Field.noContent
fahrenheit : Input Content
fahrenheit = input Field.noContent

{--
The core of the application. Either “the abstract input field” `normal` is the
initiator or “the abstract input field” `other` is the initiator.

Let us consider the case where the user enters a character into the displayed
Celsius field from the point of view of the abstract celsius input. This case
corresponds to the first application of `temperature` in the `main` function,
i.e. `normal`=`celsius`, `f`=`fToC` and `other`=`fahrenheit`. As `celsius` is
the initiator `conversions` will simply reflect the content of `celsius` since
`merge` will prefer the initiator signal, i.e. `other` is ignored completely.
In this case the `foldp` operation is actually irrelevant as, again, simply
`celsius`'s content is returned as is by `temperature`. The perceived result
is that the entered input string into the displayed Celsius field is exactly
the same as what the user sees.

Now let us consider the point of view of the displayed Fahrenheit field. This
case corresponds to the second application of `temperature` in the `main`
function, i.e. `normal`=`fahrenheit`, `f`=`cToF` and `other`=`celsius`. As
`celsius` is the initiator `conversions` will be a function that either
ignores its argument and returns the Celsius value converted to Fahrenheit or,
if the entered character lead to a non-numerical input string, it just returns
its provided argument as is. Here, `foldp` is important as it provides
`conversions` with its argument which is the previous string in the
`fahrenheit` input. The perceived result is that the entered input string into
the displayed Celsius field will be shown converted in the displayed
Fahrenheit field if it was numerical. Otherwise, the displayed Fahrenheit
field just keeps its old value until the string in the  Celsius field is
numerical again.

This was an explanation for the direction from Celsius to Fahrenheit. The other
direction is analogous.
--}
temperature : Input Content -> (Float -> Float) -> Input Content -> Signal Content
temperature normal f other =
    let f' = (lift f)
        conversions : Signal (Content -> Content)
        conversions = merge (always <~ normal.signal) (convert <~ f' ~ other.signal)
    in
        foldp (<|) Field.noContent conversions -- (<|) corresponds to “apply”


{-- View --------------------------------------------------------------------------}

display c f =
  hbox 5
  [ field celsius.handle id "Celsius" c
  , label 10 "Celsius ="
  , field fahrenheit.handle id "Fahrenheit" f
  , label 10 "Fahrenheit"
  ]

main =
  let fields = display <~ temperature celsius fToC fahrenheit
                        ~ temperature fahrenheit cToF celsius
  in
      frame "Temperature Converter" <~ Window.dimensions ~ fields