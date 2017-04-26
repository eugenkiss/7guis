Red []

draw-blk: copy []
redos: copy []
cmd-history: copy []

DEF_RADIUS: 25
;MIN_RADIUS: 10
MAX_RADIUS: 200
DEF_FCOLOR: white	; Default fill color
SEL_FCOLOR: gray	; Selected circle fill color

selected-circle: none
circle-selected?: does [not none? selected-circle]

distance: func [a [pair!] b [pair!]][
	square-root add ((a/1 - b/1) ** 2) ((a/2 - b/2) ** 2)
]

in-circle?: func [c [block!] "Circle draw cmd block" pos [pair!]][
	c/:C_RADIUS >= distance pos c/:C_CENTER
]

clear-selection: does [
	if circle-selected? [
		set-circle-color selected-circle DEF_FCOLOR	; Clear old selection
	]
	selected-circle: none
;	foreach cmd cmds [poke cmd C_FCOLOR DEF_COLOR]
]
select-circle: func [pos "mouse position"][
	cmds: reverse copy draw-blk						; Check in reverse, for z-order, don't deep copy
	clear-selection
	foreach cmd cmds [
		if in-circle? cmd pos [
			set-circle-color cmd SEL_FCOLOR			; Set new selection, mod cmd in draw-blk
			return selected-circle: cmd
		]
	]
]

add-circle: func [c] [
	draw-pos: tail draw-pos
	append/only clear draw-pos c
	append/only clear cmd-history reduce ['add-circle c]
	select-circle c/:C_CENTER
]

; Field offsets in a circle command
C_FCOLOR: 4		; Fill color
C_CENTER: 6		
C_RADIUS: 7

new-circle: does [
	compose [pen black fill-pen (DEF_FCOLOR) circle (down-pos) (DEF_RADIUS)]
]

set-circle-color: func [c [block!] color][poke c C_FCOLOR color]
set-circle-size: func [c [block!] radius][poke c C_RADIUS to integer! radius]

change-circle-size: func [radius][
]


mouse-down: func [event][
	mouse-state: 'down
	down-pos: event/offset
]
mouse-up: func [event][
	mouse-state: 'up
	add-circle new-circle
	;dump
	down-pos: none
]
mouse-down?: does [mouse-state = 'down]

mouse-move: func [event][
	append/only clear draw-pos add-circle
]

mouse-alt-down: func [event][
]
mouse-alt-up: func [event][
	select-circle event/offset
	redraw
	if circle-selected? [show-dialog]
]

redraw: does [canvas/draw: canvas/draw]			; `show canvas` doesn't do it

;dump: does [
;	print [
;		'blk  mold draw-blk newline
;		'pos  mold draw-pos newline
;		'redo mold redos newline
;		'canvas mold canvas/draw newline
;		newline
;	]
;]
undo: does [
	clear-selection
	move draw-pos: back tail draw-blk redos
	;dump
	redraw
]

redo: does [
	move redos tail draw-blk
	draw-pos: tail draw-blk
	;dump
	redraw
]

adjust-diameter: func [sld-data][
	set-circle-size selected-circle 200 * sld-data
	redraw
]

show-dialog: function [][
	str: form reduce ["Adjust diameter of circle at" selected-circle/:C_CENTER]
	val: selected-circle/:C_RADIUS / 200.0
	view/flags [below  text str  s: slider data val [adjust-diameter face/data]][modal popup]
	change-circle-size s/data
]

view [
	backdrop water
	across
	button "Undo" [undo]
	button "Redo" [redo]
	button "Quit" [unview] return
	canvas: base snow 640x480 all-over draw draw-blk
		on-down [mouse-down event]
		on-up   [mouse-up event]
		on-alt-down [mouse-alt-down event]
		on-alt-up   [mouse-alt-up event]
		;on-over [if mouse-down? [mouse-move event]]
	do [
		tool: 'circle
		mouse-state: 'up
		draw-pos: draw-blk
	]
]
