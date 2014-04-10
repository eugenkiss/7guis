package sevenguis.crud;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.ListSelectionModel;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

public class CRUD extends JFrame {
    JTextField prefixField;
    JTextField nameField;
    JTextField surnameField;
    JButton createButton;
    JButton updateButton;
    JButton deleteButton;
    JList<String> entryList;
    
    public CRUD(String name, List<String> dataBase) {
        super(name);
        initGUI();
        entryList.setModel(new FilteredPrefixListModel(dataBase));
        initListeners();
    }
    
    private void initGUI() {
        prefixField = new JTextField(5);
        nameField = new JTextField(8);
        surnameField = new JTextField(8);
        createButton = new JButton("Create");
        updateButton = new JButton("Update");
        updateButton.setEnabled(false);
        deleteButton = new JButton("Delete");
        deleteButton.setEnabled(false);
        entryList = new JList<String>();
        entryList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        JPanel pane = new JPanel(new BorderLayout());
        pane.setPreferredSize(new Dimension(400, 400));
        pane.setBorder(BorderFactory.createEmptyBorder(0, 10, 5, 10));

        JPanel p = new JPanel(new FlowLayout(FlowLayout.LEFT));
        p.add(new JLabel("Filter prefix: "));
        p.add(prefixField);
        pane.add(p, BorderLayout.NORTH);

        p = new JPanel(new BorderLayout(10, 0));
        p.setBorder(BorderFactory.createEmptyBorder(0, 5, 5, 0));
        JScrollPane s = new JScrollPane();
        s.setViewportView(entryList);
        p.add(s, BorderLayout.CENTER);
        JPanel p0 = new JPanel(new GridBagLayout());
        GridBagConstraints c = new GridBagConstraints();
        c.anchor = GridBagConstraints.WEST;
        c.gridx = 0; c.gridy = 0;
        p0.add(new JLabel("Name: "), c);
        c.gridx = 1; c.gridy = 0;
        p0.add(nameField, c);
        c.gridx = 0; c.gridy = 1;
        p0.add(new JLabel("Surname: "), c);
        c.gridx = 1; c.gridy = 1;
        p0.add(surnameField, c);
        c.weighty = 1;
        c.gridx = 0; c.gridy = 2;
        p0.add(new JPanel(), c);
        p.add(p0, BorderLayout.EAST);
        pane.add(p, BorderLayout.CENTER);

        p = new JPanel();
        p.setLayout(new BoxLayout(p, BoxLayout.LINE_AXIS));
        p.add(createButton);
        p.add(updateButton);
        p.add(deleteButton);
        pane.add(p, BorderLayout.SOUTH);

        this.add(pane);
    }
    
    private void initListeners() {
        prefixField.getDocument().addDocumentListener(new DocumentListener() {
            public void insertUpdate(DocumentEvent e) { update(); }
            public void removeUpdate(DocumentEvent e) { update(); }
            public void changedUpdate(DocumentEvent e) { update(); }
            
            private void update() {
                String prefix = prefixField.getText();
                ((FilteredPrefixListModel) entryList.getModel()).filterByPrefix(prefix);
            }
        });
        entryList.addListSelectionListener(new ListSelectionListener() {
            public void valueChanged(ListSelectionEvent e) {
                String selectedEntry = entryList.getSelectedValue();
                if (selectedEntry != null) {
                    String[] nameParts = selectedEntry.split(",");
                    nameField.setText(nameParts[0].trim());
                    surnameField.setText(nameParts[1].trim());
                    updateButton.setEnabled(true);
                    deleteButton.setEnabled(true);
                } else {
                    updateButton.setEnabled(false);
                    deleteButton.setEnabled(false);
                }
            }
        });
        ActionListener cudListener = new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                int index = entryList.getSelectedIndex();
                String fullName = surnameField.getText() + ", " + nameField.getText();
                FilteredPrefixListModel model = ((FilteredPrefixListModel) entryList.getModel());
                if (e.getSource().equals(createButton)) model.create(fullName);
                if (e.getSource().equals(updateButton)) model.update(fullName, index);
                if (e.getSource().equals(deleteButton)) model.delete(index);
            }
        };
        createButton.addActionListener(cudListener);
        updateButton.addActionListener(cudListener);
        deleteButton.addActionListener(cudListener);
    }
    
    public static void main(String[] args) {
        final List<String> dataBase = new ArrayList<String>();
        dataBase.add("Emil, Hans");
        dataBase.add("Mustermann, Max");
        dataBase.add("Tisch, Roman");
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                CRUD frame = new CRUD("CRUD", dataBase);
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
            }
        });
    }
}
