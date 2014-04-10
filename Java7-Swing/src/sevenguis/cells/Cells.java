package sevenguis.cells;

import java.awt.Color;
import java.awt.Component;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.event.ChangeEvent;
import javax.swing.table.TableCellRenderer;

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
    
    public TableCellRenderer getCellRenderer(int row, int column) {
        return new TableCellRenderer() {
            public Component getTableCellRendererComponent(JTable table, Object value,
                    boolean isSelected, boolean hasFocus, int row, int column) {
                return new JLabel(cellModel.getCells()[row][column].toString()) {
                    public int getHorizontalAlignment() {return JLabel.RIGHT;};
                };
            }
        };
    }
    
    public void editingStopped(ChangeEvent ev) {
        int row = getEditingRow();
        int col = getEditingColumn();
        super.editingStopped(ev);
        Object val = getValueAt(row, col);
        String userData = val == null ? "" : (String) val;
        Formula formula = null;
        try {
            formula = Parser.parse(userData);
        } catch (Exception e) {
            formula = new Textual(e.getMessage());
        }
        cellModel.getCells()[row][col].setFormula(formula);
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