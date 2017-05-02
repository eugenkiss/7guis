Red [author: "Gregg Irwin"]

max-time: 0:0:30
duration: 0:0:15
elapsed:  0:0:0
count-time: does [elapsed: elapsed + (1.0 / ticker/rate)]
tick: does [
	if elapsed < duration [count-time]
	t/text: form elapsed
	p/data: elapsed / duration
]
reset: does [elapsed: 0:0:0  clear t/text  p/data: 0%]
view [
	text "Elapsed Time:" p: progress t: text return
	text "Duration:" s: slider 50% on-change [
		d/text: form duration: max-time * face/data
	]
	d: text on-create [face/text: form duration] return
	button "Reset" [reset]
	ticker: base 0x0 rate 10 on-time [tick]
]
