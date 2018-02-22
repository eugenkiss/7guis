Red [author: "Gregg Irwin"]

; Really needs date! type, which isn't implemented in Red yet.

return-before-depart?: does [return-date/text < depart-date/text]
depart-before-return?: does [return-date/text > depart-date/text]
one-way?: does [flight-type/selected = 1]
return-flight?: does [flight-type/selected = 2]
flight-desc: does [pick flight-type/data flight-type/selected]
flight-date: does [either one-way? [depart-date/text][return-date/text]]
book-ticket: function [] [
	str: form reduce ["You have booked a" flight-desc "on" flight-date]
	view/flags [below  text str  button "OK" [unview]] [modal popup]
]
date-valid?: function [input /local yr mo dy][
	dig: charset [#"0" - #"9"]
	sep: charset "/-."
	if object? input [input: input/text]
	all [
		parse input [copy yr 4 dig sep copy mo 1 2 dig sep copy dy 1 2 dig]
		attempt [parse reduce [yr: load yr  mo: load mo  dy: load dy] [3 integer!]]
		yr >= 2017  yr < 2020
		mo >= 1     mo <= 12
		dy >= 1     dy <= 31	; No special checking yet. 
	]
]
both-dates-OK?: does [all [date-valid? depart-date  date-valid? return-date]]
ok-to-book?: does [
	either one-way? [date-valid? depart-date][
		all [both-dates-OK? depart-before-return?]
	]	
]
view [
	style field: field 150 on-change [
		face/color: either date-valid? face [none][red]
		book-it/enabled?: ok-to-book? 
	]
	below
	flight-type: drop-list 150 data ["one-way flight" "return flight"] select 1 on-change [
		return-date/enabled?: not one-way?
	]
	text italic snow navy "Enter dates in yyyy-mm-dd format"
	depart-date: field "2017-12-24" hint "depart date"
	return-date: field "2017-12-24" hint "return date" disabled
	book-it: button "Book" [book-ticket]
]
