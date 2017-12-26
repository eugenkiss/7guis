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
        {

        }

        private void S_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            
        }

        private void Grid_Initialized(object sender, EventArgs e)
            => ((DispatcherTimer)this.Resources["timer"]).Start();         

        private void DispatcherTimer_Tick(object sender, EventArgs e)
        {
            var timer = (DispatcherTimer)sender;
            if (G.Value >= S.Value)
            {
                var update = 0.0;
                G.Value = 0.0;
                elapsed.Text = update.ToString("F1");
            }
            else
            {
                var newValue = G.Value + timer.Interval.TotalSeconds;
                var update = newValue > G.Maximum ? G.Maximum : newValue;
                G.Value = update;
                elapsed.Text = update.ToString("F1");
            }

        }
    }
}
