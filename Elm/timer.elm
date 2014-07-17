import String
import Window
import Text
import Graphics.Input (..)
import Graphics.Input.Field as Field
import Graphics.Input.Field (Content)
import Util(..)
import Date

isDateString = isJust . Date.read
-- How can I ignore the Nothing case?
strToDate s = case Date.read s of
                Just d  -> d
                Nothing -> Date.fromTime 1095379200.00 -- Do not care. I need something like undefined/fail.
before d1 d2 = Date.toTime d1 <= Date.toTime d2

data FlightType = OneWay | Return

flightType = input OneWay
-- I want to initialize startDate/returnDate with the current Date.
startDate = input Field.noContent
returnDate = input Field.noContent
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
    , dateField s sHandle  id "Start date"  sContent
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
    in frame "Flight Booker" <~  Window.dimensions ~ content