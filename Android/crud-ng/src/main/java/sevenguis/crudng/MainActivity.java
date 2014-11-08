package sevenguis.crudng;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.app.FragmentManager;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import butterknife.ButterKnife;
import butterknife.InjectView;
import butterknife.OnClick;
import butterknife.OnItemClick;
import butterknife.OnTextChanged;

import static butterknife.ButterKnife.findById;

/*
Refer to the crud subproject for various comments.
 */
public class MainActivity extends Activity {

    public static class State extends StateFragment {
        FilterableList<String> filterableList;
        IntHolder selectedIndex;
    }

    private State state;
    private ArrayAdapter<String> adapter;
    private PrefixPredicate predicate;

    @InjectView(R.id.prefix) TextView prefix;
    @InjectView(R.id.entries) ListView entries;
    @InjectView(R.id.create) Button create;
    @InjectView(R.id.update) Button update;
    @InjectView(R.id.delete) Button delete;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.inject(this);

        FragmentManager fm = getFragmentManager();
        state = (State) fm.findFragmentByTag("state");
        if (state == null) {
            state = new State();
            fm.beginTransaction().add(state, "state").commit();
            List<String> externDb;
            externDb = new ArrayList<String>();
            externDb.add("Emil, Hans");
            externDb.add("Mustermann, Max");
            externDb.add("Tisch, Roman");
            state.filterableList = new FilterableList<String>(externDb);
            state.selectedIndex = new IntHolder(-1);
        }

        updateButtonState();

        predicate = new PrefixPredicate(prefix.getText().toString());

        adapter = new ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_list_item_1, state.filterableList.getFiltered()) {
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
                TextView itemView = (TextView) super.getView(position, convertView, parent);
                itemView.setTextColor(Color.BLACK); // Interestingly, this is not needed without ButterKnife...
                if (state.selectedIndex.value == state.filterableList.orig(position))
                    itemView.setBackgroundColor(Color.CYAN);
                else
                    itemView.setBackgroundColor(Color.TRANSPARENT);
                return itemView;
            }
        };
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        entries.setAdapter(adapter);
    }

    @OnTextChanged(R.id.prefix) void filter(CharSequence s) {
        predicate.prefix = s.toString();
        state.filterableList.filter(predicate);
        adapter.notifyDataSetChanged();
        updateButtonState();
    }

    @OnItemClick(R.id.entries) void select(int pos) {
        if (state.selectedIndex.value == state.filterableList.orig(pos)) {
            state.selectedIndex.value = -1;
        } else {
            state.selectedIndex.value = state.filterableList.orig(pos);
        }
        adapter.notifyDataSetChanged();
        updateButtonState();
    }

    @OnClick(R.id.create) void create() { showNameDialog(false); }
    @OnClick(R.id.update) void update() { showNameDialog(true); }
    @OnClick(R.id.delete) void delete() {
        state.filterableList.delete(state.selectedIndex.value);
        adapter.notifyDataSetChanged();
        state.selectedIndex.value = -1;
        updateButtonState();
    }

    private void showNameDialog(final boolean update) {
        Bundle args = new Bundle();
        args.putBoolean("update", update);
        NameDialog nd = new NameDialog();
        nd.setArguments(args);
        nd.show(getFragmentManager(), update ? "UpdateDialog" : "CreateDialog");
    }

    private void updateButtonState() {
        if (state.filterableList.filt(state.selectedIndex.value) == -1) {
            update.setEnabled(false);
            delete.setEnabled(false);
        } else {
            update.setEnabled(true);
            delete.setEnabled(true);
        }
    }

    public static class NameDialog extends DialogFragment {
        @Override
        public Dialog onCreateDialog(Bundle savedInstanceState) {
            final boolean update = getArguments().getBoolean("update");
            final MainActivity activity = (MainActivity) getActivity();
            final FilterableList<String> filterableList = activity.state.filterableList;
            final IntHolder selectedIndex = activity.state.selectedIndex;
            final ArrayAdapter<String> adapter = activity.adapter;
            final LayoutInflater inflater = activity.getLayoutInflater();
            final View nameDialog = inflater.inflate(R.layout.name_dialog, null);
            final EditText name = findById(nameDialog, R.id.name);
            final EditText surname = findById(nameDialog, R.id.surname);
            if (update) {
                String[] fullname = filterableList.get(selectedIndex.value).split(",");
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
                                filterableList.update(fullname, selectedIndex.value);
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

    private static class IntHolder {
        public int value;
        public IntHolder(int v) { value = v; }
    }

    private static class PrefixPredicate implements FilterableList.Predicate<String> {
        String prefix;
        PrefixPredicate(String prefix) { this.prefix = prefix; }
        @Override
        public boolean f(String element) {
            return element.toLowerCase().startsWith(prefix);
        }
    }

}

