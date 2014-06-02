package sevenguis.timer;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Application;
import javafx.beans.binding.Binding;
import javafx.beans.binding.Bindings;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.Slider;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.util.Duration;
import org.reactfx.EventSource;
import org.reactfx.EventStream;
import org.reactfx.EventStreams;

import java.util.stream.Stream;

public class TimerReactFX extends Application {

    public void start(Stage stage) {
        ProgressBar progress = new ProgressBar();
        Label numericProgress = new Label();
        Slider slider = new Slider(1, 400, 200);
        Button reset = new Button("Reset");

        EventSource<Double> elapsedStream = new EventSource<>();
        Binding<Double> elapsedBinding = elapsedStream.toBinding(0.0);
        EventStream<Double> sliderStream = EventStreams.valuesOf(slider.valueProperty().asObject());
        Binding<Double> sliderBinding = sliderStream.toBinding(200.0);
        EventStreams.combine(elapsedStream, sliderStream).by((e, s) -> e/s)
                .subscribe(progress::setProgress);
        elapsedStream.subscribe(v -> numericProgress.setText(formatElapsed(v)));
        EventStreams.eventsOf(reset, MouseEvent.MOUSE_CLICKED).subscribe(click -> elapsedStream.push(0.0));

        Timeline timeline = new Timeline(new KeyFrame(Duration.millis(100), event -> {
            double e = elapsedBinding.getValue();
            if (e < sliderBinding.getValue())
                elapsedStream.push(e + 1);
        }));
        timeline.setCycleCount(Timeline.INDEFINITE);
        timeline.play();

        VBox root = new VBox(10, new HBox(10, new Label("Elapsed Time: "), progress),
                                 numericProgress,
                                 new HBox(10, new Label("Duration: "), slider),
                                 reset);
        root.setPadding(new Insets(10));

        stage.setScene(new Scene(root));
        stage.setTitle("Timer");
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
