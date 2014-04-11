package sevenguis.cells;

import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

import java.util.Observable;
import java.util.Observer;

class Cell extends Observable implements Observer {

    private Formula formula = Formula.Empty;
    private double value = 0;
    private Model modelReference;

    private final StringProperty text = new SimpleStringProperty("");
    public StringProperty textProperty() {return text;}

    Cell(Model reference) {
        this.modelReference = reference;
    }

    public String toString() {
        if (formula instanceof Textual) {
            Textual textual = (Textual) formula;
            return textual.value;
        }
        return String.valueOf(value);
    }

    public Formula getFormula() {
        return formula;
    }

    public void setFormula(Formula formula) {
        for (Cell cell : this.formula.getReferences(modelReference)) {
            cell.deleteObserver(this);
        }
        this.formula = formula;
        for (Cell cell : this.formula.getReferences(modelReference)) {
            cell.addObserver(this);
        }
        setValue(this.formula.eval(modelReference));
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
        setValue(formula.eval(modelReference));
    }

}
