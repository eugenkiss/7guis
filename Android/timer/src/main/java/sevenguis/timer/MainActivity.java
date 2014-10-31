package sevenguis.timer;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.SeekBar;
import android.widget.TextView;


public class MainActivity extends Activity {
    private static final String keyElapsed = "elapsed";
    private static final String keyDuration = "duration";
    int elapsed, duration;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (savedInstanceState == null) {
            elapsed = 0;
            duration = 200;
        } else {
            elapsed = savedInstanceState.getInt(keyElapsed);
            duration = savedInstanceState.getInt(keyDuration);
        }

        final ProgressBar progress = (ProgressBar) findViewById(R.id.progress);
        progress.setMax(duration);
        final TextView numericProgress = (TextView) findViewById(R.id.numericProgress);
        final SeekBar slider = (SeekBar) findViewById(R.id.slider);
        slider.setProgress(duration);
        final Button reset = (Button) findViewById(R.id.reset);

        final Handler handler = new Handler();
        Runnable callback = new Runnable() {
            public void run() {
                if (elapsed < duration)  elapsed++;
                progress.setProgress(elapsed);
                progress.setMax(duration);
                numericProgress.setText(formatElapsed(elapsed));
                handler.postDelayed(this, 100);
            }
        };
        handler.postDelayed(callback, 100);

        slider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            public void onStartTrackingTouch(SeekBar seekBar) {  }
            public void onStopTrackingTouch(SeekBar seekBar) {  }
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                duration = Math.max(elapsed, slider.getProgress());
            }
        });

        reset.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                elapsed = 0;
                duration = slider.getProgress();
            }
        });
    }

    @Override
    protected void onSaveInstanceState (Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putInt(keyElapsed, elapsed);
        outState.putInt(keyDuration, duration);
    }

    private static String formatElapsed(int elapsed) {
        int seconds = (int) Math.floor(elapsed / 10.0);
        int dezipart = elapsed % 10;
        return seconds + "." + dezipart + "s";
    }
}
