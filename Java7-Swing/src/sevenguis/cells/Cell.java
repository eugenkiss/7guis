package sevenguis.cells;

import java.util.Observable;
import java.util.Observer;

class Cell extends Observable implements Observer {
    private Formula formula = Formula.Empty;
    private double value = 0;
    private Model modelReference;

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
    }

    public double getValue() {
        return value;
    }
    
    private void setValue(double value) {
        if (!(this.value == value || Double.isNaN(this.value) && Double.isNaN(value))) {
            this.value = value;
            setChanged();
            notifyObservers();
        }
    }

    public void update(Observable o, Object arg) {
        setValue(formula.eval(modelReference));
    }
}