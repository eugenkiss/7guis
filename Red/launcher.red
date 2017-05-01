Red [author: "Gregg Irwin"]

github-repo: https://raw.githubusercontent.com/eugenkiss/7guis/master/Red/
do-or-load: func [file] [ either exists? file [ do file ] [ do load read github-repo/(file) ] ]

view [
	below
	space 2x2
	style button: button 125
	button "Counter"        [do-or-load %counter.red]
	button "Temperature"    [do-or-load %temperature.red]
	button "Timer"          [do-or-load %timer.red]
	button "CRUD"           [do-or-load %crud.red]
	button "Flight Booking" [do-or-load %flight-booking.red]
	button "Circle Drawer"  [do-or-load %circle-drawer.red]
	button "Cells"          ;[do %cells.red]
	pad 0x15
	button "Quit"           [quit]
]
