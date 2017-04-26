Red []

data: [max 0:0:30 dur 0:0:15 lap 0:0:0]
count-time: does [data/lap: data/lap + (1.0 / ticker/rate)]
tick: does [
	if data/lap < data/dur [count-time]
	t/text: form data/lap
	p/data: data/lap / data/dur
]
reset: does [data/lap: 0:0:0  clear t/text  p/data: 0%]
view [
	text "Elapsed Time:" p: progress t: text return
	text "Duration:" s: slider 50% on-change [
		d/text: form data/dur: data/max * face/data
	]
	d: text on-create [face/text: form data/dur] return
	button "Reset" [reset]
	ticker: base 0x0 rate 10 on-time [tick]
]