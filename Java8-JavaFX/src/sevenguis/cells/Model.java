package sevenguis.cells;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import java.util.Observable;
import java.util.Observer;

class Model {

    private Cell[][] cells;

    Model(int height, int width) {
        cells = new Cell[height][width];
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                cells[i][j] = new Cell();
            }
        }
    }

    public Cell[][] getCells() {
        return cells;
    }

    public ObservableList<ObservableList<Cell>> getCellsAsObservableList() {
        ObservableList<ObservableList<Cell>> cs = FXCollections.observableArrayList();
        for (int i = 0; i < cells.length; i++) {
            cs.add(FXCollections.observableArrayList());
            for (int j = 0; j < cells[i].length; j++) {
                cs.get(i).add(cells[i][j]);
            }
        }
        return cs;
    }

    class Cell extends Observable implements Observer {

        private String userData = "";
        private Formula formula = Formula.Empty;
        private double value = 0;

        public final StringProperty text = new SimpleStringProperty("");

        public String toString() {
            if (formula instanceof Textual) {
                Textual textual = (Textual) formula;
                return textual.value;
            }
            return String.valueOf(value);
        }

        public void setUserData(String s) {
            userData = s;
        }

        public void setShowUserData(Boolean b) {
            if (b)  text.setValue(userData);
            else text.setValue(this.toString());
        }

        public void setFormula(Formula formula) {
            for (Cell cell : this.formula.getReferences(Model.this)) {
                cell.deleteObserver(this);
            }
            this.formula = formula;
            for (Cell cell : this.formula.getReferences(Model.this)) {
                cell.addObserver(this);
            }
            setValue(this.formula.eval(Model.this));
            text.set(this.toString());
        }

        public double getValue() {
            return value;
        }

        private void setValue(double value) {
            if (!(this.value == value || Double.isNaN(this.value) && Double.isNaN(value))) {
                this.value = value;
                text.set(this.toString());
                setChanged();
                notifyObservers();
            }
        }

        public void update(Observable o, Object arg) {
            setValue(formula.eval(Model.this));
        }

    }
}
