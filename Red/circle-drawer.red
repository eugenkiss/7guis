Red [author: "Gregg Irwin"]

; This version keeps history as complete a drawing state.
; How the FP folks would do it.

draw-blk: copy []	; Current state
history:  copy []	; History of all states

DEF_RADIUS: 25
MIN_RADIUS: 10
MAX_RADIUS: 200
DEF_FCOLOR: white	; Default fill color
SEL_FCOLOR: gray	; Selected circle fill color

selected-circle: none
circle-selected?: does [not none? selected-circle]

distance: func [a [pair!] b [pair!]][
	square-root add ((a/x - b/x) ** 2) ((a/y - b/y) ** 2)
]

in-circle?: func [c [block!] "Circle draw cmd block" pos [pair!]][
	c/:C_RADIUS >= distance pos c/:C_CENTER
]

; Because of undo/redo, clear any possible selection. If we wanted
; to remember selections, we could do that as well, but we don't.
clear-selection: does [
	foreach cmd draw-blk [set-circle-color cmd DEF_FCOLOR]
	selected-circle: none
]
select-circle: func [pos "mouse position"][
	cmds: reverse copy draw-blk						; Check in reverse, for z-order; don't deep copy
	clear-selection
	foreach cmd cmds [
		if in-circle? cmd pos [
			set-circle-color cmd SEL_FCOLOR			; Mods cmd in draw-blk
			return selected-circle: cmd				; Set new selection
		]
	]
]

update-history: func [state][
	; Move back to point of insertion, so we're at the 
	; current state we just added. That means when we
	; clear the future history (undone ops), we need to
	; use `next` so we don't clear the current state.
	history: back insert/only clear next history copy/deep state
]
add-circle: func [c] [
	append/only draw-blk c
	update-history draw-blk
	select-circle c/:C_CENTER
]
change-circle: does [
	update-history draw-blk
]

; Field offsets in a circle command
C_FCOLOR: 4		; Fill color
C_CENTER: 6		
C_RADIUS: 7
new-circle: func [center [pair!]] [
	compose [pen black fill-pen (DEF_FCOLOR) circle (center) (DEF_RADIUS)]
]

set-circle-color: func [c [block!] color][poke c C_FCOLOR color]
set-circle-size: func [c [block!] radius][poke c C_RADIUS to integer! radius]


mouse-up: func [event][
	add-circle new-circle event/offset
]
mouse-alt-up: func [event][
	select-circle event/offset
	redraw
	if circle-selected? [show-dialog]
]

redraw: does [canvas/draw: draw-blk]

undo: does [
	if head? history [exit]
	history: back history
	draw-blk: copy/deep first history
	clear-selection
	redraw
]

redo: does [
	if tail? history [exit]
	history: next history
	if not tail? history [draw-blk: copy/deep first history]
	clear-selection
	redraw
]

adjust-diameter: func [circ "(modified)" sld-data][
	set-circle-size circ max MIN_RADIUS 200 * sld-data
	redraw
]

show-dialog: function [][
	str: form reduce ["Adjust diameter of circle at" selected-circle/:C_CENTER]
	val: selected-circle/:C_RADIUS / 200.0
	view/flags [
		below  text str  s: slider data val [adjust-diameter selected-circle face/data]
	][modal popup]
	change-circle
]

;-------------------------------------------------------------------------------

update-history []		; [] is the initial empty drawing state

view [
	backdrop water
	across
	button "Undo" [undo]  button "Redo" [redo]  button "Quit" [unview]  return
	canvas: base snow 640x480 all-over draw draw-blk
		on-up     [mouse-up event]
		on-alt-up [mouse-alt-up event]
]
