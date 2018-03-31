using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;

namespace CRUD
{
    public class Person : INotifyPropertyChanged
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
        {
            InitializeComponent();
        }

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

        private void CollectionViewSource_Filter(object sender, FilterEventArgs e)
        {
            var person = (Person)e.Item;
            var filterNormalized = filter.Text.ToUpperInvariant().Trim();
            e.Accepted = string.IsNullOrWhiteSpace(filterNormalized)
                || person.Name.ToUpperInvariant().Contains(filterNormalized)
                || surname.Name.ToUpperInvariant().Contains(filterNormalized);
        }

        private void filter_TextChanged(object sender, TextChangedEventArgs e)
            => ((CollectionViewSource)this.Resources["filteredPersons"]).View.Refresh();
    }
}
