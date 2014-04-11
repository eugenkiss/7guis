package sevenguis.counter;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

public class Counter extends Application {

    public void start(Stage stage) throws Exception{
        TextField count = new TextField("0");
        count.setEditable(false);
        count.setPrefWidth(50);
        Button countUp = new Button("Count");

        HBox root = new HBox(10, count, countUp);
        root.setPadding(new Insets(10));

        countUp.setOnAction((ActionEvent e) ->
                count.setText(1+Integer.parseInt(count.getText())+""));

        stage.setScene(new Scene(root));
        stage.setTitle("Counter");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
