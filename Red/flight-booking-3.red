Red [
	author: "Gregg Irwin"
	notes:  "Uses date! datatype, which includes time support."
]

def-date: 24-Dec-2017
dates: reduce ['depart def-date 'return def-date]

;return-before-depart?: does [attempt [dates/return < dates/depart]]
depart-before-return?: does [all [both-dates-OK?  dates/return > dates/depart]]
one-way?:              does [flight-type/selected = 1]
;return-flight?:        does [flight-type/selected = 2]
flight-desc:           does [pick flight-type/data flight-type/selected]
flight-date:           does [either one-way? [dates/depart][dates/return]]

book-ticket: has [str][
	str: form reduce ["You have booked a" flight-desc "on" flight-date]
	view/flags [below  text str  button "OK" [unview]] [modal popup]
]

load-date: func [input [string! object!]][
	if object? input [input: input/text]
	attempt [load input]
]

; Only allow current or future dates
date-valid?: func [input /local d][
	all [date? d: load-date input  d >= now]
]

; OK as long as they're not none
both-dates-OK?: does [all [dates/depart dates/return]]

ok-to-book?: does [
	to logic! either one-way? [dates/depart][
		all [both-dates-OK? depart-before-return?]
	]	
]

view [
	style field: field 150 "24-Dec-2017" on-change [
		face/color: either any [date-valid? face  empty? face/text] [none][red]
		dates/(face/extra): load-date face
		book-it/enabled?: ok-to-book? 
	]
	below
	flight-type: drop-list 150 data ["one-way flight" "return flight"] select 1 on-change [
		return-date/enabled?: not one-way?
		book-it/enabled?: ok-to-book?
	]
	text italic snow navy "Enter dates in dd-mmm-yyyy format"
	text italic snow navy "Time is optional: dd-mmm-yyyy/hh:mm:ss"
	depart-date: field extra 'depart hint "depart date"
	return-date: field extra 'return hint "return date" disabled
	book-it: button "Book" [book-ticket]
]
