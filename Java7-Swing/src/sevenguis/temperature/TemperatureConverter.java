package sevenguis.temperature;

import java.awt.Container;
import java.awt.FlowLayout;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;

public class TemperatureConverter extends JFrame {
    JTextField celsiusField;
    JTextField fahrenheitField;
    
    public TemperatureConverter(String name) {
        super(name);
        initGUI();
        initListeners();
    }
    
    private void initGUI() {
	    celsiusField = new JTextField(5);
	    fahrenheitField = new JTextField(5);

	    Container pane = this.getContentPane();
	    pane.setLayout(new FlowLayout());
	    pane.add(celsiusField);
	    pane.add(new JLabel("Celsius"));
	    pane.add(new JLabel("="));
	    pane.add(fahrenheitField);
	    pane.add(new JLabel("Fahrenheit"));
    }
    
    private void initListeners() {
        celsiusField.getDocument().addDocumentListener(new DocumentListener() {
            public void insertUpdate(DocumentEvent e) { update(); }
            public void removeUpdate(DocumentEvent e) { update(); }
            public void changedUpdate(DocumentEvent e) { update(); }
            
            private void update() {
                if (!celsiusField.isFocusOwner() ||
                        !isNumeric(celsiusField.getText())) return;
                double celsius = Double.parseDouble(celsiusField.getText().trim());
                double fahrenheit = celsiusToFahrenheit(celsius);
                fahrenheitField.setText(String.valueOf(Math.round(fahrenheit)));
            }
        });
        fahrenheitField.getDocument().addDocumentListener(new DocumentListener() {
            public void insertUpdate(DocumentEvent e) { update(); }
            public void removeUpdate(DocumentEvent e) { update(); }
            public void changedUpdate(DocumentEvent e) { update(); }
            
            private void update() {
                if (!fahrenheitField.isFocusOwner() ||
                        !isNumeric(fahrenheitField.getText())) return;
                double fahrenheit = Double.parseDouble(fahrenheitField.getText().trim());
                double celsius = fahrenheitToCelsius(fahrenheit);
                celsiusField.setText(String.valueOf(Math.round(celsius)));
            }
        });
    }
    
    private static double celsiusToFahrenheit(double celsius) {
        return (9/5d * celsius) + 32;
    }

    private static double fahrenheitToCelsius(double fahrenheit) {
        return 5/9d * (fahrenheit - 32);
    }
    
    private static boolean isNumeric(String string) {
        try {
            Double.parseDouble(string);
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }

    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                TemperatureConverter frame = new TemperatureConverter("Temperature Converter");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
            }
        });
    }
}
