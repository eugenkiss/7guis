package javaguis.searchbox;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import javax.swing.BorderFactory;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;

class RegexPanel extends JPanel {
    private JTextField searchField;
    private JLabel readyLabel;
    
    public RegexPanel() {
        super();

        searchField = new JTextField("", 25);
        readyLabel = new JLabel("Ready");

        BorderLayout borderLayout = new BorderLayout();
        borderLayout.setVgap(5);
        this.setLayout(new BorderLayout());
        this.add(new JLabel("Enter a search string:"), BorderLayout.NORTH);
        this.add(searchField, BorderLayout.CENTER);
        this.add(readyLabel, BorderLayout.SOUTH);
        this.setBorder(BorderFactory.createEmptyBorder(5, 5, 5, 5));
        
        searchField.getDocument().addDocumentListener(new DocumentListener() {
            public void insertUpdate(DocumentEvent e) { update(); }
            public void removeUpdate(DocumentEvent e) { update(); }
            public void changedUpdate(DocumentEvent e) { update(); }
            
            private void update() {
                if (isValidRegex(searchField.getText())) {
                    readyLabel.setText("Ready");
                    searchField.setBackground(Color.white);
                } else {
                    readyLabel.setText("Invalid Regex");
                    searchField.setBackground(Color.red);
                }
            }
        });
    }
    
    private static boolean isValidRegex(String input) {
	    try {
		    Pattern.compile(input);
	    } catch (PatternSyntaxException exception) {
		    return false;
	    }
	    return true;
    }
    
    public JTextField getSearchField() {
        return searchField;
    }

    public JLabel getReadyLabel() {
        return readyLabel;
    }
}


public class SearchBox extends JFrame {
    JCheckBox enableBox;
    RegexPanel regexPanel;
    
    public SearchBox(String name) {
        super(name);

        enableBox = new JCheckBox("Enable search", true);
        regexPanel = new RegexPanel();

        this.setLayout(new BorderLayout());
        this.add(enableBox, BorderLayout.NORTH);
        this.add(regexPanel, BorderLayout.CENTER);
        
        enableBox.addItemListener(new ItemListener() {
            public void itemStateChanged(ItemEvent e) {
                regexPanel.getSearchField()
                    .setEnabled(e.getStateChange() == ItemEvent.SELECTED);
            }
        });
    }
    
    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                SearchBox frame = new SearchBox("Search Box");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
            }
        });
    }
}