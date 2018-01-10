using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;

namespace CRUD
{
    public class Person :INotifyPropertyChanged
    {
        string name;
        string surname;

        public string Name
        {
            get => name;            
            set
            {
                name = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Name)));
            }
        }

        public string Surname
        {
            get => surname;
            set
            {
                surname = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Surname)));                
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }

    public class Persons : System.Collections.ObjectModel.ObservableCollection<Person> { }

    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
            => InitializeComponent();        

        void Create(object sender, RoutedEventArgs e)
            => ((Persons)this.Resources["persons"]).Add(new Person { Name = name.Text, Surname = surname.Text });

        void Update(object sender, RoutedEventArgs e)
        {
            var person = (Person)personsView.SelectedItem;
            person.Name = name.Text;
            person.Surname = surname.Text;
        }

        void Delete(object sender, RoutedEventArgs e)
        {
            var person = (Person)personsView.SelectedItem;
            ((Persons)this.Resources["persons"]).Remove(person);
        }
    }
}
