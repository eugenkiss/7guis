package sevenguis.counter;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TextView count = (TextView) findViewById(R.id.count);
        Button countUp = (Button) findViewById(R.id.countUp);

        countUp.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                count.setText(1+Integer.parseInt(count.getText().toString())+"");
            }
        });
    }

}
