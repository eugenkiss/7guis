package sevenguis.crudkt

import android.view.View
import android.widget.TextView
import android.text.TextWatcher
import android.text.Editable
import android.widget.ListView

fun View.onClick(f: () -> Unit) {
    this.setOnClickListener { f() }
}

fun TextView.onTextChanged(f: (String) -> Unit) {
    this.addTextChangedListener(object : TextWatcher {
        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) { }
        override fun afterTextChanged(s: Editable?) { }
        override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
            f(s.toString())
        }
    })
}

fun ListView.onItemClick(f: (Int) -> Unit) {
    this.setOnItemClickListener { (adapterView, view, i, l) -> f(i) }
}
