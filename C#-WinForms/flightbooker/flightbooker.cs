using System;
using System.Drawing;
using System.Windows.Forms;

namespace FlightBooker
{
    static class Program
    {
        private const string OneWayFlight = "one-way flight";
        private const string ReturnFlight = "return flight";
        private static string _flightType;
        private static TextBox _textBoxStart;
        private static TextBox _textBoxReturn;
        private static Button _buttonBook;

        private static void ValidateButton()
        {
            if (_flightType == OneWayFlight && IsDateValid(_textBoxStart))
            {
                _buttonBook.Enabled = true;
            }
            else if (_flightType == ReturnFlight && IsDateValid(_textBoxStart)
                && IsDateValid(_textBoxReturn) && !IsReturnDateBelowStartDate())
            {
                _buttonBook.Enabled = true;
            }
            else
            {
                _buttonBook.Enabled = false;
            }
        }

        private static bool IsDateValid(TextBox textBox)
        {
            DateTime date;
            bool isValid = DateTime.TryParse(textBox.Text, out date);
            textBox.BackColor = isValid ? SystemColors.Window : Color.Red;
            return isValid;
        }

        private static bool IsReturnDateBelowStartDate()
        {
            return DateTime.Parse(_textBoxReturn.Text) <
                DateTime.Parse(_textBoxStart.Text);
        }

        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            var comboBoxFlightType = new ComboBox();
            comboBoxFlightType.Bounds = new Rectangle(12, 12, 121, 21);
            comboBoxFlightType.DropDownStyle = ComboBoxStyle.DropDownList;
            comboBoxFlightType.Items.AddRange(new[] { OneWayFlight, ReturnFlight });

            _textBoxStart = new TextBox();
            _textBoxStart.Bounds = new Rectangle(12, 39, 121, 20);
            _textBoxStart.Text = DateTime.Now.ToShortDateString();

            _textBoxReturn = new TextBox();
            _textBoxReturn.Bounds = new Rectangle(12, 65, 121, 20);
            _textBoxReturn.Text = DateTime.Now.ToShortDateString();

            _buttonBook = new Button();
            _buttonBook.Bounds = new Rectangle(12, 91, 121, 23);
            _buttonBook.Text = "Book";

            comboBoxFlightType.SelectedIndexChanged += delegate
            {
                _flightType = comboBoxFlightType.SelectedItem.ToString();
                _textBoxReturn.Enabled = _flightType == ReturnFlight;
                ValidateButton();
            };

            comboBoxFlightType.SelectedIndex = 0;

            _textBoxStart.KeyUp += delegate { ValidateButton(); };
            _textBoxReturn.KeyUp += delegate { ValidateButton(); };

            _buttonBook.Click += delegate
            {
                if (_flightType == OneWayFlight)
                {
                    MessageBox.Show("You have booked a one-way flight on " +
                        _textBoxStart.Text);
                }
                else
                {
                    MessageBox.Show("You have booked a return flight on " +
                        _textBoxStart.Text + " and " + _textBoxReturn.Text);
                }
            };

            var form = new Form();
            form.ClientSize = new Size(145, 125);
            form.Text = "Book Flight";
            form.Controls.Add(comboBoxFlightType);
            form.Controls.Add(_textBoxStart);
            form.Controls.Add(_textBoxReturn);
            form.Controls.Add(_buttonBook);

            Application.Run(form);
        }
    }
}