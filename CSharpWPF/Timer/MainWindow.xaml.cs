using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;

namespace Timer
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

        private void Button_Click(object sender, RoutedEventArgs e)
            => Calculate(0.0);

        private void S_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
            => Calculate(double.Parse(elapsed.Text));

        private void Grid_Initialized(object sender, EventArgs e)
            => ((DispatcherTimer)this.Resources["timer"]).Start();

        private void DispatcherTimer_Tick(object sender, EventArgs e)
            => Calculate((DispatcherTimer)sender);

        private void Calculate(DispatcherTimer timer)
        {
            var elapsedValue = double.Parse(elapsed.Text);
            var newValue = elapsedValue + timer.Interval.TotalSeconds;
            Calculate(newValue);
        }

        private void Calculate(double newValue)
        {
            if (Double.IsNaN(S.Value) || S.Value <= 0)
            {
                var update = 0.0;
                G.Value = update;
                elapsed.Text = update.ToString("F1");
            }
            else
            {
                var update = newValue > S.Value ? 0 : newValue;
                G.Value = (update / S.Value) * G.Maximum;
                elapsed.Text = update.ToString("F1");
            }
        }
    }
}
