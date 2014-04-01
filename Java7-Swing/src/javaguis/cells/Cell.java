package javaguis.cells;

import java.util.Observable;
import java.util.Observer;

class Cell extends Observable implements Observer {
    private int row, column;
    private Formula formula = Formula.Empty;
    private double value = 0;
    private Model modelReference;

    Cell(int row, int column, Model reference) {
        this.row = row;
        this.column = column;
        this.modelReference = reference;
    }

    public String toString() {
        return "Cell(" + row + "," + column + ")";
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