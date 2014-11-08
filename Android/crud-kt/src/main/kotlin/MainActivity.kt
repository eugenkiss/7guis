package sevenguis.crudkt

import android.app.Activity
import android.os.Bundle
import sevenguis.crudkt.R
import kotlin.properties.Delegates
import android.widget.ArrayAdapter
import android.widget.TextView
import android.widget.ListView
import android.widget.Button
import android.view.View
import android.view.ViewGroup
import android.graphics.Color
import android.app.DialogFragment
import android.app.Dialog
import android.widget.EditText
import android.app.AlertDialog

/*
Here I actually don't like Kotlin's strictness when it comes to enforcing null checks.
As in Android things aren't typically initialized with a constructor but with certain
lifecycle methods the compiler cannot easily be shown that something is certainly not
null. But then the !!s are inconvient and so you end up with Delegates.notNull() anyway
and that's just verbose. Why not reuse the platform types syntax for Kotlin types?
Sometimes you just want to avoid the over-strictness of a static typing regime because
you know more than the compiler and you value convenience for certain situations
higher than convincing a machine.
(In general, I'm more and more of the opinion that static null checking should be
opt-in instead of opt-out... For example MyType is like in Java no checks, MyType!
means that compiler should check that it is never null and MyType? means that compiler
analyzes nullability)

So using Kotlin without annotations one could (almost) achieve the convenience of
Butterknife for Java. Kotlin's general good features (e.g. extension functions)
help Android development of course. Callback-heavy Android code could greatly benefit
from Kotlin (e.g. RxJava). Nullability analysis is inconvenient for Android.
There are current problems with Kotlin and libraries like Dagger.
I have the strong feeling that metalinguistic (syntactic) abstraction could
considerably reduce Android boilerplate e.g. with respect to generically patching
many inconveniences when working with fragments (say providing arguments).
 */
public class MainActivity : Activity() {

    class State : StateFragment() {
        // Can't we just do FilterableList<String>! as a shortcut?
        var filterableList: FilterableList<String> by Delegates.notNull()
        var selectedIndex = -1
    }

    var state: State by Delegates.notNull()
    var adapter: ArrayAdapter<String> by Delegates.notNull()

    val prefix: TextView by bindView(R.id.prefix)
    val entries: ListView by bindView(R.id.entries)
    val create: Button by bindView(R.id.create)
    val update: Button by bindView(R.id.update)
    val delete: Button by bindView(R.id.delete)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val fm = getFragmentManager()
        val s = fm.findFragmentByTag("state") as State?
        if (s == null) {
            state = State()
            val externDb = arrayListOf("Emil, Hans", "Mustermann, Max", "Tisch, Roman")
            state.filterableList = FilterableList(externDb)
            state.selectedIndex = -1
            fm.beginTransaction().add(state, "state").commit()
        } else {
            state = s
        }

        updateButtonState()

        val predicate = PrefixPredicate(prefix.getText().toString())

        adapter = object : ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_list_item_1, state.filterableList.filtered) {
            override fun getView(position: Int, convertView: View?, parent: ViewGroup): View? {
                val itemView = super.getView(position, convertView, parent) as TextView
                itemView.setTextColor(Color.BLACK)
                if (state.selectedIndex == state.filterableList.orig(position))
                    itemView.setBackgroundColor(Color.CYAN)
                else
                    itemView.setBackgroundColor(Color.TRANSPARENT)
                return itemView
            }
        }
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        entries.setAdapter(adapter)

        prefix onTextChanged { s ->
            predicate.prefix = s.toString()
            // Why no SAM conversion in the other direction here?
            //state.filterableList.filter(predicate)
            // Or would this make sense
            //state.filterableList.filter(::predicate)
            // This begs for eta reduction :)
            state.filterableList.filter { s -> predicate(s) }
            adapter.notifyDataSetChanged()
            updateButtonState()
        }

        entries onItemClick { pos ->
            if (state.selectedIndex == state.filterableList.orig(pos)) {
                state.selectedIndex = -1
            } else {
                state.selectedIndex = state.filterableList.orig(pos)
            }
            adapter.notifyDataSetChanged()
            updateButtonState()
        }

        create onClick { showNameDialog(false) }
        update onClick { showNameDialog(true) }
        delete onClick {
            state.filterableList.delete(state.selectedIndex)
            adapter.notifyDataSetChanged()
            state.selectedIndex = -1
            updateButtonState()
        }
    }

    fun showNameDialog(update: Boolean) {
        val args = Bundle()
        args.putBoolean("update", update)
        val nd = NameDialog()
        nd.setArguments(args)
        nd.show(getFragmentManager(), if (update) "UpdateDialog" else "CreateDialog")
    }

    fun updateButtonState() {
        if (state.filterableList.filt(state.selectedIndex) == -1) {
            update.setEnabled(false)
            delete.setEnabled(false)
        } else {
            update.setEnabled(true)
            delete.setEnabled(true)
        }
    }

    class NameDialog : DialogFragment() {
        override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
            val update = getArguments().getBoolean("update")
            val activity = getActivity() as MainActivity
            val filterableList = activity.state.filterableList
            val selectedIndex = activity.state.selectedIndex
            val adapter = activity.adapter
            val inflater = activity.getLayoutInflater()
            val view = inflater.inflate(R.layout.name_dialog, null)
            val name = view.findViewById(R.id.name) as EditText
            val surname = view.findViewById(R.id.surname) as EditText
            if (update) {
                val fullname = filterableList[selectedIndex].split(",")
                name.setText(fullname[1].trim())
                surname.setText(fullname[0].trim())
            }

            val builder = AlertDialog.Builder(activity)
            builder.setTitle("Create Entry")
                .setView(view)
                .setPositiveButton("Ok") { dialog, id ->
                    val fullname = "${surname.getText()}, ${name.getText()}"
                    if (update)
                        filterableList.update(fullname, selectedIndex)
                    else
                        filterableList.create(fullname)
                    adapter.notifyDataSetChanged()
                }
            .setNegativeButton("Cancel") { dialog, id -> /* Nothing */ }
            return builder.create()
        }
    }

    class PrefixPredicate(prefix: String) {
        var prefix: String = prefix
            get() = $prefix
            set(s: String) { $prefix = s.toLowerCase() }
        fun invoke(s: String): Boolean = s.toLowerCase().startsWith(prefix)
    }

}