import String
import Window
import Text
import Graphics.Input (..)
import Graphics.Input.Field as Field
import Graphics.Input.Field (Content, noContent)
import Util(..)
import Date

-- Helpers
getOrFail (Just v) = v
isDateString = isJust . Date.read
strToDate s = getOrFail (Date.read s)
before d1 d2 = Date.toTime d1 <= Date.toTime d2
monthToInt m = case m of
    Date.Jan -> 1
    Date.Feb -> 2
    Date.Mar -> 3
    Date.Apr -> 4
    Date.May -> 5
    Date.Jun -> 6
    Date.Jul -> 7
    Date.Aug -> 8
    Date.Sep -> 9
    Date.Oct -> 10
    Date.Nov -> 11
    Date.Dec -> 12
dateToStr date =
    let y = show (Date.year date)
        m = Date.month date |> monthToInt |> show |> \x -> if String.length x == 1 then "0"++x else x
        d = show (Date.day date)
    in  y ++ "-" ++ m ++ "-" ++ d

data FlightType = OneWay | Return

flightType = input OneWay
-- I want to initialize startDate/returnDate with the current Date and not with an arbitrary
-- but as I see it I would have to add two new arguments to display which would constitute
-- the initial values for startDate and returnDate and would need to use foldp to figure out
-- if startDate/returnDate have not yet been changed by the user. Is there an easier way?
startDate  = input { noContent | string <- dateToStr (Date.fromTime 0) }
returnDate = input { noContent | string <- dateToStr (Date.fromTime 0) }
book = input ()

display fHandle sHandle rHandle bHandle f sContent rContent =
  let s = sContent.string
      r = rContent.string
      dateField str = if isDateString str then field else redField
  in
      vbox 5
      [ dropDown fHandle
          [ ("one-way flight", OneWay)
          , ("return flight", Return)
          ]
      , dateField s sHandle id "Start date" sContent
      , if f == Return
            then dateField r rHandle  id "Return date" rContent
            else label 10 "disabled"
      , if f == OneWay && isDateString s ||
               isDateString s && isDateString r && strToDate s `before` strToDate r
            then button bHandle () "Book"
            else label 22 "No Book!"
      ]

main =
  let content = display flightType.handle startDate.handle returnDate.handle book.handle
                        <~ flightType.signal ~ startDate.signal ~ returnDate.signal
  in  frame "Flight Booker" <~  Window.dimensions ~ content