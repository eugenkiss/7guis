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

namespace CircleDrawer
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

        private void Canvas_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            var canvas = (Canvas)sender;
            var center = Mouse.GetPosition(canvas);
            var intercects = canvas.Children.Cast<Ellipse>()
                .Select(x => canvas.TranslatePoint(center, x))
                .Select(x => new Point(x.X - 10, x.Y - 10))
                .Select(x => Math.Sqrt(x.X * x.X + x.Y * x.Y))
                .ToArray();
            var inCircle = intercects.Where(x => x < 10).ToArray();
            Ellipse createCircle(Point ctr, double radius) =>
                new Ellipse { Height = 2 * radius, Width = 2 * radius, Margin = new Thickness(ctr.X - radius, ctr.Y - radius, 0, 0), Fill = Brushes.Aqua };
            var circle = createCircle(center, 10);
            canvas.Children.Add(createCircle(center, 10));
            e.Handled = false;
        }
    }
}
