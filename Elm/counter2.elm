import Graphics.Input (..)
import Window
import Util (..)

-- Impure
clicks = input ()

display count =
    let l = label 20 (show count)
        b = button clicks.handle () "Count"
    in hbox 5 [l, b]

--main = frame "Counter" <~ Window.dimensions
--                        ~ (display <~ (count clicks.signal))

--main = lift (frame2 "Counter" . display) (count clicks.signal)

main = frame2 "Counter" . display <~ count clicks.signal