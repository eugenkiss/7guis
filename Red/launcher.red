Red [author: ["Gregg Irwin" "Maxim Velesyuk"]]

repo: https://raw.githubusercontent.com/greggirwin/7guis/master/Red/

; You don't want to `do` untrusted code, but this shows how you can
; easily access remote code. In this case, trust depends on the repo.
run-demo: func [file][do either exists? file [file][read repo/(file)]]

view [
	below
	space 2x2
	style button: button 125
	button "Counter"        [run-demo %counter.red]
	button "Temperature"    [run-demo %temperature.red]
	button "Timer"          [run-demo %timer.red]
	button "CRUD"           [run-demo %crud.red]
	button "Flight Booking" [run-demo %flight-booking.red]
	button "Circle Drawer"  [run-demo %circle-drawer.red]
	button "Cells"          ;[do %cells.red]
	pad 0x15
	button "Quit"           [quit]
]
