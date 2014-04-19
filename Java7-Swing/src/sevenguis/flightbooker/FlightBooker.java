package sevenguis.flightbooker;

import java.awt.Color;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JTextField;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.text.JTextComponent;

public class FlightBooker extends JFrame {
    JComboBox<String> flightTypeBox;
    JTextField startDateField;
    JTextField returnDateField;
    JButton bookButton;

    public FlightBooker(String name) {
        super(name);
        initGUI();
        initListeners();
    }

    private void initGUI() {
        String[] flightTypes = {"one-way flight", "return flight"};
        flightTypeBox = new JComboBox<String>(flightTypes);
        startDateField = new JTextField(dateToString(new Date()));
        returnDateField = new JTextField(dateToString(new Date()));
        bookButton = new JButton("Book");

        this.setLayout(new GridLayout(4, 0));
        this.add(flightTypeBox);
        this.add(startDateField);
        this.add(returnDateField);
        this.add(bookButton);
    }

    private void initListeners() {
        // Regarding the color of the text fields.
        checkDateString(startDateField);
        checkDateString(returnDateField);
        // Regarding the status of the return date text field.
        flightTypeBox.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String flightType = (String) flightTypeBox.getSelectedItem();
                returnDateField.setEnabled(flightType.equals("return flight"));
            }
        });
        // Regarding the status of the book button.
        final Runnable bookEnabledAction = new Runnable() {
            public void run() {
                String startDate = startDateField.getText();
                String returnDate = returnDateField.getText();
                switch(flightTypeBox.getSelectedItem().toString()) {
                case "one-way flight":
                    bookButton.setEnabled(isDateString(startDate));
                case "return flight":
                    bookButton.setEnabled(
                            isDateString(startDate) &&
                            isDateString(returnDate) &&
                            stringToDate(startDate).compareTo(stringToDate(returnDate)) <= 0
                    );
                }
            }
        };
        flightTypeBox.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                bookEnabledAction.run();
            }
        });
        addSimpleDocumentListener(startDateField, bookEnabledAction);
        addSimpleDocumentListener(returnDateField, bookEnabledAction);
        bookButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String flightType = (String) flightTypeBox.getSelectedItem();
                String startDate = startDateField.getText();
                String returnDate = returnDateField.getText();
                if (flightType.equals("one-way flight")) {
                    JOptionPane.showMessageDialog(FlightBooker.this,
                            "You have booked a one-way flight on " + startDate);
                } else {
                    JOptionPane.showMessageDialog(FlightBooker.this,
                            "You have booked a return flight on "
                            + startDate + " and " + returnDate);
                }
            }
        });
        // "Initialize" the listeners.
        flightTypeBox.setSelectedIndex(0);
    }

    private static void checkDateString(final JTextField field) {
        addSimpleDocumentListener(field, new Runnable() {
            public void run() {
                if (isDateString(field.getText())) {
                    field.setBackground(Color.white);
                } else {
                    field.setBackground(Color.red);
                }
            }
        });
    }

    private static void addSimpleDocumentListener(JTextComponent field, final Runnable action) {
        field.getDocument().addDocumentListener(new DocumentListener() {
            public void insertUpdate(DocumentEvent e) { update(); }
            public void removeUpdate(DocumentEvent e) { update(); }
            public void changedUpdate(DocumentEvent e) { update(); }

            private void update() {
                action.run();
            }
        });
    }

    private static final DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

    private static String dateToString(Date date) {
        return dateFormat.format(date);
    }

    private static Date stringToDate(String string) {
        Date date = null;
        try { date = dateFormat.parse(string); }
        catch (ParseException e) { /* Will not happen */ }
        return date;
    }

    private static boolean isDateString(String string) {
        try {
            Date date = dateFormat.parse(string);
            if (!string.equals(dateFormat.format(date))) throw new ParseException("Incorrect Date", 0);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                FlightBooker frame = new FlightBooker("Flight Booker");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
            }
        });
    }
}