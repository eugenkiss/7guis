package sevenguis.temperature;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;
import org.reactfx.EventStream;
import org.reactfx.EventStreams;


public class TemperatureConverterReactFX extends Application {

    public void start(Stage stage) {
        TextField celsius = new TextField();
        TextField fahrenheit = new TextField();

        EventStream<String> celsiusStream =
                EventStreams.valuesOf(celsius.textProperty()).filter(Util::isNumeric);
        celsiusStream.map(Util::cToF).subscribe(fahrenheit::setText);
        EventStream<String> fahrenheitStream =
                EventStreams.valuesOf(fahrenheit.textProperty()).filter(Util::isNumeric);
        fahrenheitStream.map(Util::fToC).subscribe(celsius::setText);

        HBox root = new HBox(10, celsius, new Label("Celsius ="), fahrenheit, new Label("Fahrenheit"));
        root.setPadding(new Insets(10));

        stage.setScene(new Scene(root));
        stage.setTitle("Temperature Converter");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
