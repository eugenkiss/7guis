package sevenguis.circledrawer;

import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.stage.Popup;
import javafx.stage.Stage;
import sevenguis.circledrawer.undo.UndoManager;
import sevenguis.circledrawer.undo.UndoableEdit;

import java.util.ArrayList;
import java.util.List;

class CircleDrawerCanvas extends Canvas {

    private List<Circle> circles;
    private Circle hovered;
    private UndoManager undoManager;

    public CircleDrawerCanvas() {
        super(400, 400);
        circles = new ArrayList<>();
        hovered = null;
        undoManager = new UndoManager();

        Button diameterEntry = new Button("Diameter...");
        Popup popup = new Popup();
        popup.getContent().add(diameterEntry);

        diameterEntry.setOnAction(e -> {
            popup.hide();
            showDialog(hovered);
        });
        setOnMousePressed((MouseEvent e) -> {
            if (e.isPrimaryButtonDown() && hovered == null) {
                addCircle(new Circle((int) e.getX(), (int) e.getY()));
                getOnMouseMoved().handle(e);
            }
            if (popup.isShowing()) popup.hide();
            if (e.isPopupTrigger() && hovered != null)
                popup.show(this, e.getScreenX(), e.getScreenY());
        });
        setOnMouseMoved((MouseEvent e) -> {
            hovered = getNearestCircleAt((int) e.getX(), (int) e.getY());
            draw();
        });
        draw();
    }

    void draw() {
        GraphicsContext g = getGraphicsContext2D();
        g.setFill(Color.WHITE);
        g.setStroke(Color.BLACK);
        g.fillRect(0, 0, getWidth(), getHeight());
        g.strokeRect(0, 0, getWidth(), getHeight());

        for (Circle c : circles) {
            int offset = c.getDiameter() / 2;
            if (c.equals(hovered)) {
                g.setFill(Color.LIGHTGRAY);
                g.fillOval(c.getX() - offset, c.getY() - offset, c.getDiameter(), c.getDiameter());
            }
            g.strokeOval(c.getX() - offset, c.getY() - offset, c.getDiameter(), c.getDiameter());
        }
    }

    void addCircle(Circle circle) {
        undoManager.addEdit(new CreateCircleEdit(circle));
        circles.add(circle);
    }

    public Circle getNearestCircleAt(int x, int y) {
        Circle circle = null;
        double minDist = Double.MAX_VALUE;
        for (Circle c : circles) {
            double d = Math.sqrt(Math.pow(x - c.getX(), 2) + Math.pow(y - c.getY(), 2));
            if (d <= c.getDiameter()/2 && d < minDist) {
                circle = c;
                minDist = d;
            }
        }
        return circle;
    }

    void showDialog(Circle selected) {
        Stage dialog = new Stage();
        Label info = new Label(String.format("Adjust diameter of circle at (%s, %s)",
                selected.getX(), selected.getY()));
        Slider slider = new Slider(10, 50, selected.getDiameter());
        VBox content = new VBox(10, info, slider);
        content.setPadding(new Insets(10));
        dialog.setScene(new Scene(content));
        dialog.show();

        slider.valueProperty().addListener((v, o, n) -> {
            selected.setDiameter(n.intValue());
            draw();
        });
        int oldDiameter = selected.getDiameter();
        dialog.setOnCloseRequest(e -> undoManager.addEdit(
                new ChangeDiameterEdit(selected, oldDiameter, selected.getDiameter())));
    }

    public void undo() {
        undoManager.undo();
        draw();
    }

    public void redo() {
        undoManager.redo();
        draw();
    }

    private class CreateCircleEdit extends UndoableEdit {

        private Circle circle;

        CreateCircleEdit(Circle circle) {
            this.circle = circle;
        }

        public void undo() {
            circles.remove(circle);
        }

        public void redo() {
            circles.add(circle);
        }

    }

    private class ChangeDiameterEdit extends UndoableEdit {

        private Circle circle;
        private int oldDiameter, newDiameter;

        ChangeDiameterEdit(Circle circle, int oldDiameter, int newDiameter) {
            this.circle = circle;
            this.oldDiameter = oldDiameter;
            this.newDiameter = newDiameter;
        }

        public void undo() {
            circle.setDiameter(oldDiameter);
        }

        public void redo() {
            circle.setDiameter(newDiameter);
        }

    }

}
