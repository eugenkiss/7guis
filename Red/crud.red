Red []

db: sort copy [
	"Rakocevic, Nenad"
	"Xie, Qingtian"
	"Wooster, Bertie"
	"Irwin, Gregg"
	"Wood, Peter"
]

cmd-filter: does [
	lst/data: copy db
	if not empty? f-filter/text [
		remove-each val lst/data [not find/match val f-filter/text]
	]
]

cmd-create: does [append db make-rec  refresh]
cmd-update: does [change find db selected-name make-rec  refresh]
cmd-delete: does [remove find db selected-name  refresh]
make-rec:   does [rejoin [f-surname/text ", " f-name/text]]
refresh:    does [cmd-filter]
selected-name: does [pick lst/data lst/selected]

view [
	style text:  text  60
	style field: field 120
	text "Filter prefix:" f-filter: field on-change [cmd-filter] return
	lst: text-list 200x150 data db
	panel [
		text "Name:"    f-name:    field return
		text "Surname:" f-surname: field
	] return
	button "Create" [cmd-create]
	button "Update" [cmd-update]
	button "Delete" [cmd-delete]
]
