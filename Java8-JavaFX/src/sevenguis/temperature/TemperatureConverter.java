package sevenguis.temperature;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;
import javafx.util.StringConverter;

import static sevenguis.temperature.Util.*;

public class TemperatureConverter extends Application {

    public void start(Stage stage) {
        TextField celsius = new TextField();
        TextField fahrenheit = new TextField();

        // One could also specify each direction separately, but that would be more involved
        // than this special bidirectional definition.
        celsius.textProperty().bindBidirectional(fahrenheit.textProperty(), new StringConverter<String>() {
            public String toString(String fahrenheit) {
                return isNumeric(fahrenheit) ? fToC(fahrenheit) : celsius.getText();
            }
            public String fromString(String celsius) {
                return isNumeric(celsius) ? cToF(celsius) : fahrenheit.getText();
            }
        });

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
