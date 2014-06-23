package sevenguis.timer;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.Slider;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import org.reactfx.EventStream;
import org.reactfx.EventStreams;
import org.reactfx.StateMachine;
import org.reactfx.util.Tuples;

import java.time.Duration;

import static org.reactfx.EventStreams.*;

// https://gist.github.com/TomasMikula/1013e56be2f282416274
public class TimerReactFX extends Application {

    public void start(Stage stage) {
        ProgressBar progress = new ProgressBar();
        Label numericProgress = new Label();
        Slider slider = new Slider(1, 400, 200);
        Button reset = new Button("Reset");

        EventStream<ActionEvent> resets = EventStreams.eventsOf(reset, ActionEvent.ACTION);
        EventStream<?> ticks = EventStreams.ticks(Duration.ofMillis(100));
        EventStream<Double> elapsed = StateMachine.init(Tuples.t(0.0, slider.getValue()))
                .on(resets).transition((tup_es, r) -> Tuples.t(0.0, tup_es._2))
                .on(ticks).transition((tup_es, t) -> Tuples.t(tup_es._1 + (tup_es._1 < tup_es._2 ? 1 : 0), tup_es._2))
                .on(EventStreams.valuesOf(slider.valueProperty())).transition((tup_es, s1) -> Tuples.t(tup_es._1, s1.doubleValue()))
                .toStateStream().map(tup_es -> tup_es._1);

        combine(elapsed, valuesOf(slider.valueProperty())).map((e, s) -> e / s.doubleValue()).subscribe(progress::setProgress);
        elapsed.map(TimerReactFX::formatElapsed).subscribe(numericProgress::setText);

        VBox root = new VBox(10, new HBox(10, new Label("Elapsed Time: "), progress),
                                 numericProgress,
                                 new HBox(10, new Label("Duration: "), slider),
                                 reset);
        root.setPadding(new Insets(10));

        stage.setScene(new Scene(root));
        stage.setTitle("Timer ReactFX");
        stage.show();
    }

    private static String formatElapsed(double elapsed) {
        int seconds = (int) Math.floor(elapsed / 10.0);
        int dezipart = (int) elapsed % 10;
        return seconds + "." + dezipart + "s";
    }

    public static void main(String[] args) {
        launch(args);
    }
}
