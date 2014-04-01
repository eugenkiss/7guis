// Adapted from https://www.artima.com/pins1ed/the-scells-spreadsheet.html
package javaguis.cells;

import java.awt.Color;
import java.awt.Component;

import javax.swing.JFrame;
import javax.swing.JList;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.TableCellEditor;

public class Cells extends JTable {
    private JList<Integer> rowHeader;
    private Model cellModel;

    public static JScrollPane CreateCells(int height, int width) {
        Cells table = new Cells(height, width);
        JScrollPane scrollPane = new JScrollPane();
        scrollPane.setViewportView(table);
        scrollPane.setRowHeaderView(table.rowHeader);
        scrollPane.setColumnHeaderView(table.createDefaultTableHeader());
        return scrollPane;
    }
    
    private Cells(int height, int width) {
        super(height, width);
        cellModel = new Model(height, width);
        setModel(cellModel);
        cellModel.removeTableModelListener(this);
        
        setRowHeight(25);
        setAutoResizeMode(JTable.AUTO_RESIZE_OFF);
        setGridColor(Color.lightGray);
        setCellSelectionEnabled(true);

        Integer[] numbers = new Integer[height];
        for (int i = 0; i < numbers.length; i++) numbers[i] = i;
        rowHeader = new JList<Integer>(numbers);
        rowHeader.setFixedCellWidth(30);
        rowHeader.setFixedCellHeight(getRowHeight());
    }
    
    public Component prepareEditor(TableCellEditor editor, int row, int column) {
        Formula f = cellModel.getCells()[row][column].getFormula();
        String prefix = "=";
        if (f instanceof Number || f instanceof Textual) prefix = "";
        Object value = prefix + f.toString();
        return editor.getTableCellEditorComponent(this, value, true, row, column);
    }
    
    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                JFrame frame = new JFrame("Cells");
                frame.add(CreateCells(100, 26));
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
            }
        });
    }
}