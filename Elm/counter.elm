import Graphics.Input (..)
import Window
import Util (..)

clicks = input 0

display count =
    let l = label 20 (show count)
        b = button clicks.handle (count + 1) "Count"
    in hbox 5 [l, b]

--main = frame "Counter" <~ Window.dimensions
--                        ~ (display <~ clicks.signal)

main = lift (frame2 "Counter" . display) clicks.signal