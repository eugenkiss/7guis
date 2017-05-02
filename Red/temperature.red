Red [author: "Gregg Irwin"]

c-to-f: func [t][t * (9.0 / 5.0) + 32.0]
f-to-c: func [t][t - 32.0 * (5.0 / 9.0)]
t-change: function [in-face out-face fn][
	out-face/text: either number? t: load in-face/text [form round/to fn t .01][""]
]
view [
	; Use key-up because on-change doesn't detect event cycles
	tc: field on-key-up [t-change tc tf :c-to-f] text "Celsius ="   
	tf: field on-key-up [t-change tf tc :f-to-c] text "Farenheight"
]
