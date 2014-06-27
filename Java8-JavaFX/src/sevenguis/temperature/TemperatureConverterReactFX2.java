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
import org.reactfx.InterceptableEventStream;


/*
A version of Temperature Converter where the conversion back and forth
is not stable (i.e. fToC(cToF(v)) != v). Here, interceptable streams
are employed to prevent feedback loops.

This is what happens when the value of fahrenheit text field is changed:

 fahrenheit.text emits
 iFahrenheit emits the same value
 iFahernheit.guardedBy(...) emits the same value like this:
     iCelsius is muted first
     value is emitted
         celsius text is updated
         celsius.text emits (but not iCelsius, which is muted)
     iCelsius is unmuted

The explanation and implementation idea are by Tomas Mikula.
I merely put it all into an exectuable file.
 */
public class TemperatureConverterReactFX2 extends Application {

    public void start(Stage stage) {
        TextField celsius = new TextField();
        TextField fahrenheit = new TextField();

        InterceptableEventStream<String> iC = EventStreams.valuesOf(celsius.textProperty()).interceptable();
        InterceptableEventStream<String> iF = EventStreams.valuesOf(fahrenheit.textProperty()).interceptable();

        EventStream<String> celsiusStream = iC.filter(Util::isNumeric);
        celsiusStream.map(this::cToF).guardedBy(iF::mute).subscribe(fahrenheit::setText);
        EventStream<String> fahrenheitStream = iF.filter(Util::isNumeric);
        fahrenheitStream.map(this::fToC).guardedBy(iC::mute).subscribe(celsius::setText);

        HBox root = new HBox(10, celsius, new Label("Celsius ="), fahrenheit, new Label("Fahrenheit"));
        root.setPadding(new Insets(10));

        stage.setScene(new Scene(root));
        stage.setTitle("Temperature Converter");
        stage.show();
    }

    double cToF(double celsius) {
        return (9/5d * celsius) + 32 + Math.random()*0.1;
    }

    double fToC(double fahrenheit) {
        return 5/9d * (fahrenheit - 32) + Math.random()*0.1;
    }

    String cToF(String celsius) {
        return String.valueOf(cToF(Double.parseDouble(celsius)));
    }

    String fToC(String fahrenheit) {
        return String.valueOf(fToC(Double.parseDouble(fahrenheit)));
    }

    public static void main(String[] args) {
        launch(args);
    }
}
