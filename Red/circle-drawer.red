Red [author: "Gregg Irwin"]

draw-blk: copy []
redos: copy []
cmd-history: copy []

DEF_RADIUS: 25
MIN_RADIUS: 10
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
		set-circle-color selected-circle DEF_FCOLOR
	]
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

update-viz: does [
	viz-draw/text: mold new-line/all draw-blk on
	viz-redo/text: mold new-line/all redos on
	viz-cmds/text: mold new-line/all cmd-history on
]
add-circle: func [c] [
	draw-pos: tail draw-pos
	append/only clear draw-pos c
	append/only clear cmd-history compose [add-circle (c)]
	select-circle c/:C_CENTER
	update-viz
]
change-circle: does [
	append/only clear cmd-history compose [
		change-circle change/only find draw-blk (selected-circle)
	]
	update-viz
]
last-cmd: does [last cmd-history]
last-cmd-was-add?: does ['add-circle = first last-cmd]
;last-cmd-was-change?: does ['change-circle = first last-cmd]

; Field offsets in a circle command
C_FCOLOR: 4		; Fill color
C_CENTER: 6		
C_RADIUS: 7
new-circle: func [center [pair!]] [
	compose [pen black fill-pen (DEF_FCOLOR) circle (center) (DEF_RADIUS)]
]

set-circle-color: func [c [block!] color][poke c C_FCOLOR color]
set-circle-size: func [c [block!] radius][poke c C_RADIUS to integer! radius]


;mouse-down: func [event][
;	mouse-state: 'down
;	;down-pos: event/offset
;]
mouse-up: func [event][
;	mouse-state: 'up
	add-circle new-circle event/offset
	;dump
	;down-pos: none
]
;mouse-down?: does [mouse-state = 'down]

;mouse-move: func [event][
;	append/only clear draw-pos add-circle
;]

;mouse-alt-down: func [event][
;]
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
	either last-cmd-was-add? [
		;move draw-pos: back tail cmd-history redos
		move draw-pos: back tail draw-blk redos
	][
	
	]
	;dump
	redraw
	update-viz
]

redo: does [
	move redos tail draw-blk
	draw-pos: tail draw-blk
	;dump
	redraw
	update-viz
]

adjust-diameter: func [sld-data][
	set-circle-size selected-circle max MIN_RADIUS 200 * sld-data
	redraw
]

show-dialog: function [][
	str: form reduce ["Adjust diameter of circle at" selected-circle/:C_CENTER]
	val: selected-circle/:C_RADIUS / 200.0
	view/flags [below  text str  s: slider data val [adjust-diameter face/data]][modal popup]
	change-circle
]

view [
	backdrop water
	across
	button "Undo" [undo]
	button "Redo" [redo]
	button "Quit" [unview]
	pad 450x0
	style text: text bold bottom 300 water white
	text "DRAW"
	text "REDO"
	text "CMD HIST"
	return
	canvas: base snow 640x480 all-over draw draw-blk
		;on-down [mouse-down event]
		on-up   [mouse-up event]
		;on-alt-down [mouse-alt-down event]
		on-alt-up   [mouse-alt-up event]
		;on-over [if mouse-down? [mouse-move event]]
	viz-draw: area 300x480
	viz-redo: area 300x480
	viz-cmds: area 300x480
	do [
;		tool: 'circle
;		mouse-state: 'up
		draw-pos: draw-blk
	]
]
