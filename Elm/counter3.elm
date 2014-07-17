import Graphics.Input (..)
import Window
import Util (..)

-- Impure
--clicks = input 0

display phantom =
    let clicks = input 0
        c = count clicks.signal
        l = label 20 . show <~ c
        b = lift (\c -> button clicks.handle c "Count") c
    in hbox 5 <~ combine [l, b]

--main = frame2 "Counter" . display <~ count clicks.signal
main = frame2 "Counter" . hbox 5 <~ combine [display (), display ()]