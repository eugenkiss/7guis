module Util(label,field,redField,frame,frame2,hbox,vbox) where

import Text
import Graphics.Input.Field as Field
import Color

label p s =
    let t = toText s |> Text.height 12 |> Text.color charcoal |> centered
        w = widthOf  t + p
        h = heightOf t + p
    in container w h middle t

field h f d i = Field.field Field.defaultStyle h f d i

--redStyle = { Field.defaultStyle |
--             style <- { Text.defaultStyle |
--                        color <- Color.red }
redStyle0 = Field.defaultStyle
redStyle1 = Text.defaultStyle
redStyle2 = { redStyle1 | color <- Color.red, bold <- True }
redStyle  = { redStyle0 | style <- redStyle2 }
redField h f d i = Field.field redStyle h f d i

hbox spacing elems =
    flow right <| intersperse (spacer spacing spacing) elems

vbox spacing elems =
    flow down <| intersperse (spacer spacing spacing) elems

border col el =
    container (widthOf el + 2)
              (heightOf el + 2)
              (topLeftAt (absolute 1) (absolute 1)) -- middle creates problems...
              el
              |> color col

frame title (w,h) elem =
    let
        pad = 10
        (w_e, h_e) = (widthOf elem, heightOf elem)
        (w_w, h_w) = (w_e + pad, h_e + pad)
        s_t = 14
        h_t = 20
        titleElem = title |> toText |> Text.height s_t |> Text.color (rgb 60 60 60) |> centered
        titleBar = titleElem |> container w_w h_t middle |> color (grayscale 0.15)
        wrapper e = container w_w h_w middle e |> color (rgb 242 242 242)
        wrapped = wrapper elem
    in
        titleBar `above` wrapped |> border darkGray |> container w h middle |> color (rgb 250 250 250)

frame2 title elem =
    let
        pad = 10
        (w_e, h_e) = (widthOf elem, heightOf elem)
        (w_w, h_w) = (w_e + pad, h_e + pad)
        s_t = 14
        h_t = 20
        titleElem = title |> toText |> Text.height s_t |> Text.color (rgb 60 60 60) |> centered
        titleBar = titleElem |> container w_w h_t middle |> color (grayscale 0.15)
        wrapper e = container w_w h_w middle e |> color (rgb 242 242 242)
        wrapped = wrapper elem
    in
        titleBar `above` wrapped |> border darkGray

