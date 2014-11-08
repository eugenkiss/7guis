package sevenguis.crud;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.app.Fragment;
import android.app.FragmentManager;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

/*
Additional implemented requirement: The selection is kept even when filtering.

Notes:
- Keeping the state during configuration changes is somewhat involved
  and intricate because one has to be careful not to retain references to
  old activities
- In general, fragments and not accidently keeping references to stale
  activities is very intricate
- Creating a non-trivial modal dialog is quite intricate
- Persistently highlighting the selected entry is quite hard due to some
  of Android's design decisions (e.g. touch mode)
- Intricate to express the functional dependency that the update and
  delete buttons are activated iff there is a selected entry
  (especially in combination with possible restarts of the activity)
- Lack of anonymous functions that can close over their environment
  forced to make the scope of some variables bigger than otherwise
  necessary
- Creating a modal dialog is really involved code-wise
- It was tried to make FilterableList an Adapter but it appeared too
  complicated for not much benefit
- In contrast to the Filter class filtering is not asynchronous

Helpful resources:
http://stackoverflow.com/questions/3111354/android-listview-stay-selected
*/
public class MainActivity extends Activity {

    @SuppressWarnings("UnusedDeclaration")
    private static final String TAG = "CRUD";

    // http://developer.android.com/guide/topics/resources/runtime-changes.html#RetainingAnObject
    public static class StateFragment extends Fragment {
        FilterableList<String> filterableList;
        // Refers to the original indices in the database and not necessarily to the visible
        // and possibly filtered list
        int selectedIndex = -1;

        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setRetainInstance(true);
        }
    }

    // To reduce object creation
    //
    // Why is this a static class instead of an anonymous class defined where 'predicate'
    // is initialized in the onCreate method? Because an anonymous class retains an implicit
    // reference to its enclosing class. That's a problem.
    // If an anonymous class were used then 'predicate' would have a reference to the
    // enclosing activity. As 'predicate' is cached inside 'state.filterableList' and it
    // itself is retained in 'state' during configuration changes, the old activity
    // would not be garbage collected as there still would be a reference to it.
    // Although in this case it would not be a real problem because as soon as the user
    // filtered the list once again after a configuration change the cached predicate
    // would be replaced with a new one that does not have a reference to the old
    // activity, it is still a problem in general for Android and one should be very
    // careful with anonymous classes.
    // For more information:
    //   http://www.androiddesignpatterns.com/2013/01/inner-class-handler-memory-leak.html
    //   http://stackoverflow.com/questions/5054360/do-anonymous-classes-always-maintain-a-reference-to-their-enclosing-instance
    private static class PrefixPredicate implements FilterableList.Predicate<String> {
        String prefix;
        PrefixPredicate(String prefix) { this.prefix = prefix; }
        @Override
        public boolean f(String element) {
            return element.toLowerCase().startsWith(prefix);
        }
    }

    private StateFragment state;
    private ArrayAdapter<String> adapter;
    Button update, delete;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TextView prefix = (TextView) findViewById(R.id.prefix);
        final ListView entries = (ListView) findViewById(R.id.entries);
        final Button create = (Button) findViewById(R.id.create);
        update = (Button) findViewById(R.id.update);
        delete = (Button) findViewById(R.id.delete);

        FragmentManager fm = getFragmentManager();
        state = (StateFragment) fm.findFragmentByTag("state");

        if (state == null) {
            state = new StateFragment();
            fm.beginTransaction().add(state, "state").commit();
            List<String> externDb;
            externDb = new ArrayList<String>();
            externDb.add("Emil, Hans");
            externDb.add("Mustermann, Max");
            externDb.add("Tisch, Roman");
            state.filterableList = new FilterableList<String>(externDb);
            state.selectedIndex = -1;
        }

        updateButtonState();

        adapter = new ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_list_item_1, state.filterableList.getFiltered()) {
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
                TextView itemView = (TextView) super.getView(position, convertView, parent);
                itemView.setTextColor(Color.BLACK);
                if (state.selectedIndex == state.filterableList.orig(position))
                    itemView.setBackgroundColor(Color.CYAN);
                else
                    itemView.setBackgroundColor(Color.TRANSPARENT);
                return itemView;
            }
        };
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        entries.setAdapter(adapter);

        // To reduce object creation
        final PrefixPredicate predicate = new PrefixPredicate(prefix.getText().toString());
        prefix.addTextChangedListener(new TextWatcher() {
            public void afterTextChanged(Editable s) {  }
            public void beforeTextChanged(CharSequence s, int start, int count, int after) { }
            public void onTextChanged(final CharSequence s, int start, int before, int count) {
                predicate.prefix = s.toString();
                state.filterableList.filter(predicate);
                adapter.notifyDataSetChanged();
                updateButtonState();
            }
        });

        entries.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                if (state.selectedIndex == state.filterableList.orig(i)) {
                    state.selectedIndex = -1;
                } else {
                    state.selectedIndex = state.filterableList.orig(i);
                }
                // I actually only want to refresh the highlighted index but to achieve it
                // it seems I need to express that the data changed (i.e. more than needed)
                adapter.notifyDataSetChanged();
                updateButtonState();
            }
        });

        delete.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                state.filterableList.delete(state.selectedIndex);
                adapter.notifyDataSetChanged();
                state.selectedIndex = -1;
                updateButtonState();
            }
        });

        create.setOnClickListener(nameDialogListener(false));
        update.setOnClickListener(nameDialogListener(true));
    }

    // To prevent code duplication
    private View.OnClickListener nameDialogListener(final boolean update) {
        return new View.OnClickListener() {
            public void onClick(View view) {
                Bundle args = new Bundle();
                args.putBoolean("update", update);
                NameDialog nd = new NameDialog();
                nd.setArguments(args);
                nd.show(getFragmentManager(), update ? "UpdateDialog" : "CreateDialog");
            }
        };
    }

    // It is very important that you do not create an anonymous DialogFragment!
    // As I understand: An anonymous inner class (just like a non-static inner class) retains
    // a reference to the enclosing activity (and does not have an empty constructor?).
    // When a configuration change occurs the old activity is destroyed but the dialog fragment
    // still has a reference to it and that leads to a crash when the dialog fragment is open.
    // See: http://corner.squareup.com/2014/10/advocating-against-android-fragments.html
    public static class NameDialog extends DialogFragment {
        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {
            final boolean update = getArguments().getBoolean("update");
            final MainActivity activity = (MainActivity) getActivity();
            final FilterableList<String> filterableList = activity.state.filterableList;
            final int selectedIndex = activity.state.selectedIndex;
            final ArrayAdapter<String> adapter = activity.adapter;
            final LayoutInflater inflater = activity.getLayoutInflater();
            final View nameDialog = inflater.inflate(R.layout.name_dialog, null);
            final EditText name = (EditText) nameDialog.findViewById(R.id.name);
            final EditText surname = (EditText) nameDialog.findViewById(R.id.surname);
            if (update) {
                String[] fullname = filterableList.get(selectedIndex).split(",");
                name.setText(fullname[1].trim());
                surname.setText(fullname[0].trim());
            }

            AlertDialog.Builder builder = new AlertDialog.Builder(activity);
            builder.setTitle("Create Entry")
                    .setView(nameDialog)
                    .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            String fullname = surname.getText().toString() + ", " +
                                    name.getText().toString();
                            if (update) {
                                filterableList.update(fullname, selectedIndex);
                            } else {
                                filterableList.create(fullname);
                            }
                            adapter.notifyDataSetChanged();
                        }
                    })
                    .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            // Do nothing
                        }
                    });
            return builder.create();
        }
    }

    // To prevent code duplication
    private void updateButtonState() {
        if (state.filterableList.filt(state.selectedIndex) == -1) {
            update.setEnabled(false);
            delete.setEnabled(false);
        } else {
            update.setEnabled(true);
            delete.setEnabled(true);
        }
    }

}

