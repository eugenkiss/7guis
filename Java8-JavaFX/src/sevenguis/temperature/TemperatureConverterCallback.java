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

public class TemperatureConverterCallback extends Application {

    public void start(Stage stage) {
        TextField celsius = new TextField();
        TextField fahrenheit = new TextField();

        // Compared to bindBiderctional we have inversion of control
        // and need to explicitly guard for feedback loops.
        celsius.textProperty().addListener((v, o, n) -> {
            if (celsius.isFocused() && isNumeric(celsius.getText()))
                fahrenheit.setText(cToF(celsius.getText()));
        });
        fahrenheit.textProperty().addListener((v, o, n) -> {
            if (fahrenheit.isFocused() && isNumeric(fahrenheit.getText()))
                celsius.setText(fToC(fahrenheit.getText()));
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
