using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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

namespace CRUD
{
    public class Person
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }

    public class Persons : System.Collections.ObjectModel.ObservableCollection<Person> { }

    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void CreateClick(object sender, RoutedEventArgs e)
            => ((Persons)this.Resources["persons"]).Add(new Person { Name = name.Text, Surname = surname.Text });

    }
}
