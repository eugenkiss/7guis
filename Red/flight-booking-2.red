Red []

; Really needs date! type, which isn't implemented in Red yet.

def-date: [2017 12 24]
dates: reduce ['depart def-date 'return def-date]

;return-before-depart?: does [attempt [dates/return < dates/depart]]
depart-before-return?: does [all [both-dates-OK?  dates/return > dates/depart]]
one-way?:              does [flight-type/selected = 1]
;return-flight?:        does [flight-type/selected = 2]
flight-desc:           does [pick flight-type/data flight-type/selected]
flight-date:           does [either one-way? [depart-date/text][return-date/text]]

book-ticket: function [] [
	str: form reduce ["You have booked a" flight-desc "on" flight-date]
	view/flags [below  text str  button "OK" [unview]] [modal popup]
]
parse-date: func [input /local dig sep yr mo dy][
	dig: charset [#"0" - #"9"]
	sep: charset "/-."
	if object? input [input: input/text]
	all [
		parse input [copy yr 4 dig sep copy mo 1 2 dig sep copy dy 1 2 dig]
		attempt [parse reduce [yr: load yr  mo: load mo  dy: load dy] [3 integer!]]
		yr >= 2017  ;yr < 2020
		mo >= 1     mo <= 12
		dy >= 1     dy <= 31							; No special checking by month. 
		reduce [yr mo dy]
	]
]
date-valid?: func [input][block? parse-date input]
both-dates-OK?: does [all [dates/depart dates/return]]	; OK as long as they're not none
ok-to-book?: does [
	to logic! either one-way? [dates/depart][
		all [both-dates-OK? depart-before-return?]
	]	
]
view [
	style field: field 150 "2017-12-24" on-change [
		face/color: either any [date-valid? face  empty? face/text] [none][red]
		dates/(face/extra): parse-date face
		book-it/enable?: ok-to-book? 
	]
	below
	flight-type: drop-list 150 data ["one-way flight" "return flight"] select 1 on-change [
		return-date/enable?: not one-way?
		book-it/enable?: ok-to-book?
	]
	text italic snow navy "Enter dates in yyyy-mm-dd format"
	depart-date: field extra 'depart hint "depart date"
	return-date: field extra 'return hint "return date" disabled
	book-it: button "Book" [book-ticket]
]
