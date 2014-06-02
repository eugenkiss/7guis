package sevenguis.counter;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

public class Counter extends Application {

    public void start(Stage stage) {
        TextField count = new TextField("0");
        count.setEditable(false);
        count.setPrefWidth(50);
        Button countUp = new Button("Count");

        countUp.setOnAction(e ->
                count.setText(1+Integer.parseInt(count.getText())+""));

        HBox root = new HBox(10, count, countUp);
        root.setPadding(new Insets(10));

        stage.setScene(new Scene(root));
        stage.setTitle("Counter");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
