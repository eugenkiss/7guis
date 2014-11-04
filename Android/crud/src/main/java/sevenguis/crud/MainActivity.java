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
- It was tried to make FilteredList an Adapter but it appeared too
  complicated for not much benefit
- In contrast to the Filter class filtering is not asynchronous

Helpful resources:
http://stackoverflow.com/questions/3111354/android-listview-stay-selected
*/
public class MainActivity extends Activity {

    @SuppressWarnings("UnusedDeclaration")
    private static final String TAG = "CRUD";

    private static class IntHolder {
        public int value;
        public IntHolder(int v) { value = v; }
    }

    public static class StateFragment extends Fragment {
        FilteredList<String> filteredView;
        // Refers to the original indices in the database and not necessarily to the visible
        // and possibly filtered list
        IntHolder selectedIndex;

        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setRetainInstance(true);
        }
    }

    // To reduce object creation
    private static class PrefixPredicate implements FilteredList.Predicate<String> {
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
            state.filteredView = new FilteredList<String>(externDb);
            state.selectedIndex = new IntHolder(-1);
        }

        updateButtonState();

        adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, state.filteredView.getFiltered()) {
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
                View itemView = super.getView(position, convertView, parent);
                if (state.selectedIndex.value == state.filteredView.orig(position))
                    itemView.setBackgroundColor(Color.CYAN);
                else
                    itemView.setBackgroundColor(Color.TRANSPARENT);
                return itemView;
            }
        };
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        entries.setAdapter(adapter);

        final PrefixPredicate predicate = new PrefixPredicate(prefix.getText().toString());
        prefix.addTextChangedListener(new TextWatcher() {
            public void afterTextChanged(Editable s) {  }
            public void beforeTextChanged(CharSequence s, int start, int count, int after) { }
            public void onTextChanged(final CharSequence s, int start, int before, int count) {
                predicate.prefix = s.toString();
                state.filteredView.filterByPredicate(predicate);
                adapter.notifyDataSetChanged();
                updateButtonState();
            }
        });

        entries.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                if (state.selectedIndex.value == state.filteredView.orig(i)) {
                    state.selectedIndex.value = -1;
                } else {
                    state.selectedIndex.value = state.filteredView.orig(i);
                }
                // I actually only want to refresh the highlighted index but to achieve it
                // it seems I need to express that the data changed (i.e. more than needed)
                adapter.notifyDataSetChanged();
                updateButtonState();
            }
        });

        delete.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                state.filteredView.delete(state.selectedIndex.value);
                adapter.notifyDataSetChanged();
                state.selectedIndex.value = -1;
                update.setEnabled(false);
                delete.setEnabled(false);
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
            final FilteredList<String> filteredView = activity.state.filteredView;
            final IntHolder selectedIndex = activity.state.selectedIndex;
            final ArrayAdapter<String> adapter = activity.adapter;
            final LayoutInflater inflater = activity.getLayoutInflater();
            final View nameDialog = inflater.inflate(R.layout.name_dialog, null);
            final EditText name = (EditText) nameDialog.findViewById(R.id.name);
            final EditText surname = (EditText) nameDialog.findViewById(R.id.surname);
            if (update) {
                String[] fullname = filteredView.get(selectedIndex.value).split(",");
                name.setText(fullname[1].trim());
                surname.setText(fullname[0].trim());
            }

            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            builder.setTitle("Create Entry")
                    .setView(nameDialog)
                    .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            String fullname = surname.getText().toString() + ", " +
                                    name.getText().toString();
                            if (update) {
                                filteredView.update(fullname, selectedIndex.value);
                            } else {
                                filteredView.create(fullname);
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
        if (state.filteredView.filt(state.selectedIndex.value) == -1) {
            update.setEnabled(false);
            delete.setEnabled(false);
        } else {
            update.setEnabled(true);
            delete.setEnabled(true);
        }
    }

}

