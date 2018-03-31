using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace FlightBooker
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        
        private void c_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (!IsInitialized) return;
            var option = ((ComboBox)sender).SelectedIndex;
            t2.IsEnabled = option == 1;
            ChangeButtonState(ParseDateFromTextBox(t1), ParseDateFromTextBox(t2), option);
        }

        private void t1_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (!IsInitialized) return;
            var t = (TextBox)sender;
            var dt = ParseDateFromTextBox(t);
            ChangeTextBoxState(t, dt);
            ChangeButtonState(dt, ParseDateFromTextBox(t2), c.SelectedIndex);
        }

        private void t2_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (!IsInitialized) return;
            var t = (TextBox)sender;
            var dt = ParseDateFromTextBox(t);
            ChangeTextBoxState(t, dt);
            ChangeButtonState(ParseDateFromTextBox(t1), dt, c.SelectedIndex);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var msg = c.SelectedIndex == 0 ?
                        $"You have booked a one-way flight on {t1.Text}"
                        : $"You have booked a return flight on {t1.Text} and {t2.Text}";
            MessageBox.Show(msg);
        }

        private void Grid_Initialized(object sender, EventArgs e)
        {
            var dt1 = ParseDateFromTextBox(t1);
            var dt2 = ParseDateFromTextBox(t2);
            ChangeTextBoxState(t1, dt1);
            ChangeTextBoxState(t2, dt2);
            t2.IsEnabled = c.SelectedIndex == 1;
            ChangeButtonState(dt1, dt2, c.SelectedIndex);
        }

        private static void ChangeTextBoxState(TextBox t, DateTime? dt)
             => t.Background = dt.HasValue ? Brushes.White : t.Background = Brushes.Red;

        private DateTime? ParseDateFromTextBox(TextBox t)
        {
            var valid = DateTime.TryParseExact(t.Text, "dd.mm.yyyy", null, System.Globalization.DateTimeStyles.None, out DateTime value);
            return valid ? value : (DateTime?)null;
        }

        private void ChangeButtonState(DateTime? t1, DateTime? t2, int option)
        {
            var change = t1.HasValue &&
                ((option == 0) ||
                 (option == 1 && t2.HasValue && t1.Value <= t2.Value));
            book.IsEnabled = change;
        }
    }
}
