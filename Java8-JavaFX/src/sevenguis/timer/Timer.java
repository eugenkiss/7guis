package sevenguis.timer;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Application;
import javafx.beans.binding.Bindings;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.Slider;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.util.Duration;

public class Timer extends Application {

    public void start(Stage stage) {
        ProgressBar progress = new ProgressBar();
        Label numericProgress = new Label();
        Slider slider = new Slider(1, 400, 200);
        Button reset = new Button("Reset");

        SimpleDoubleProperty elapsed = new SimpleDoubleProperty(0);
        progress.progressProperty().bind(elapsed.divide(slider.valueProperty()));
        numericProgress.textProperty().bind(Bindings.createStringBinding(() ->
            formatElapsed(elapsed.intValue()), elapsed));
        // Callback based approach is shorter, ideally the opposite would be the case.
//        elapsed.addListener((v, o, n) -> numericProgress.setText(formatElapsed(n.intValue())));
        reset.setOnAction(event -> elapsed.set(0));

        Timeline timeline = new Timeline(new KeyFrame(Duration.millis(100), event -> {
            if (elapsed.get() < slider.valueProperty().get()) elapsed.set(elapsed.get() + 1);
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

    private static String formatElapsed(int elapsed) {
        int seconds = (int) Math.floor(elapsed / 10.0);
        int dezipart = elapsed % 10;
        return seconds + "." + dezipart + "s";
    }

    public static void main(String[] args) {
        launch(args);
    }
}
