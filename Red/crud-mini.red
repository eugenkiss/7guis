Red [Author: "Gregg Irwin"]

db: sort copy ["Rakocevic, Nenad" "Xie, Qingtian" "Wooster, Bertie" "Wood, Peter"]

cmd-filter: refresh: does [	; 2 names for clearer meaning in use
	lst/data: copy db
	if not empty? f-filter/text [
		remove-each val lst/data [not find/match val f-filter/text]
	]
]
make-rec: does [rejoin [f-surname/text ", " f-name/text]]
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
	button "Create" [append db make-rec  refresh]
	button "Update" [change find db selected-name make-rec  refresh]
	button "Delete" [remove find db selected-name  refresh]
]
