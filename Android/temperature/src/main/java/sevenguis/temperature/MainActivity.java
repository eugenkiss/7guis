package sevenguis.temperature;

import android.app.Activity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.TextView;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TextView celsius = (TextView) findViewById(R.id.celsius);
        final TextView fahrenheit = (TextView) findViewById(R.id.fahrenheit);

        celsius.addTextChangedListener(new TextWatcher() {
            public void beforeTextChanged(CharSequence charSequence, int i, int i2, int i3) {}
            public void onTextChanged(CharSequence charSequence, int i, int i2, int i3) {}
            public void afterTextChanged(Editable editable) {
                if (celsius.hasFocus() && isNumeric(celsius.getText().toString()))
                    fahrenheit.setText(cToF(celsius.getText().toString()));
            }
        });

        fahrenheit.addTextChangedListener(new TextWatcher() {
            public void beforeTextChanged(CharSequence charSequence, int i, int i2, int i3) {}
            public void onTextChanged(CharSequence charSequence, int i, int i2, int i3) {}
            public void afterTextChanged(Editable editable) {
                if (fahrenheit.hasFocus() && isNumeric(fahrenheit.getText().toString()))
                    celsius.setText(fToC(fahrenheit.getText().toString()));
            }
        });
    }

    static double cToF(double celsius) {
        return (9/5d * celsius) + 32;
    }

    static double fToC(double fahrenheit) {
        return 5/9d * (fahrenheit - 32);
    }

    static String cToF(String celsius) {
        return String.valueOf(Math.round(cToF(Double.parseDouble(celsius))));
    }

    static String fToC(String fahrenheit) {
        return String.valueOf(Math.round(fToC(Double.parseDouble(fahrenheit))));
    }

    static boolean isNumeric(String string) {
        try {
            Double.parseDouble(string);
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }

}
