package sevenguis.flightbooker;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final Spinner flightType = (Spinner) findViewById(R.id.flightType);
        List<String> list = new ArrayList<String>();
        list.add("one-way flight");
        list.add("return flight");
        ArrayAdapter<String> listAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, list);
        listAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        flightType.setAdapter(listAdapter);
        final TextView startDate = (TextView) findViewById(R.id.startDate);
        startDate.setText(dateToString(new Date()));
        final TextView returnDate = (TextView) findViewById(R.id.returnDate);
        returnDate.setText(dateToString(new Date()));
        final Button book = (Button) findViewById(R.id.book);

        final Runnable bookEnableCallback = new Runnable() {
            public void run() {
                if (flightType.getSelectedItem().equals("one-way flight")) {
                    book.setEnabled(isDateString(startDate.getText().toString()));
                } else {
                    book.setEnabled(
                            isDateString(startDate.getText().toString()) &&
                            isDateString(returnDate.getText().toString()) &&
                            stringToDate(startDate.getText().toString()).compareTo(stringToDate(returnDate.getText().toString())) <= 0
                    );
                }
            }
        };

        flightType.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            public void onNothingSelected(AdapterView<?> adapterView) { }
            public void onItemSelected(AdapterView<?> adapterView, View view, int pos, long id) {
                returnDate.setEnabled(flightType.getItemAtPosition(pos).equals("return flight"));
                bookEnableCallback.run();
            }
        });

        startDate.addTextChangedListener(new TextWatcher() {
            public void beforeTextChanged(CharSequence charSequence, int i, int i2, int i3) { }
            public void onTextChanged(CharSequence charSequence, int i, int i2, int i3) { }
            public void afterTextChanged(Editable editable) {
                if (!isDateString(editable.toString()))
                    startDate.setBackgroundColor(Color.RED);
                else
                    startDate.setBackgroundColor(Color.TRANSPARENT);
                bookEnableCallback.run();
            }
        });

        returnDate.addTextChangedListener(new TextWatcher() {
            public void beforeTextChanged(CharSequence charSequence, int i, int i2, int i3) { }
            public void onTextChanged(CharSequence charSequence, int i, int i2, int i3) { }
            public void afterTextChanged(Editable editable) {
                if (!isDateString(editable.toString()))
                    returnDate.setBackgroundColor(Color.RED);
                else
                    returnDate.setBackgroundColor(Color.TRANSPARENT);
                bookEnableCallback.run();
            }
        });
    }

    private static final DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

    private static String dateToString(Date date) {
        return dateFormat.format(date);
    }

    private static Date stringToDate(String string) {
        Date date = null;
        try { date = dateFormat.parse(string); }
        catch (ParseException e) { /* Will not happen */ }
        return date;
    }

    private static boolean isDateString(String string) {
        try {
            Date date = dateFormat.parse(string);
            if (!string.equals(dateFormat.format(date))) throw new ParseException("Incorrect Date", 0);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
