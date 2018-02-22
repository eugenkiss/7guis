using System;
using System.Drawing;
using System.Windows.Forms;

namespace FlightBooker
{
    static class Program
    {
        private const string OneWayFlight = "one-way flight";
        private const string ReturnFlight = "return flight";

        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            string flightType = null;

            var comboBoxFlightType = new ComboBox
            {
                Bounds = new Rectangle(12, 12, 121, 21),
                DropDownStyle = ComboBoxStyle.DropDownList,
                Items = { OneWayFlight, ReturnFlight }
            };

            var textBoxStart = new TextBox
            {
                Bounds = new Rectangle(12, 39, 121, 20),
                Text = DateTime.Now.ToShortDateString()
            };

            var textBoxReturn = new TextBox
            {
                Bounds = new Rectangle(12, 65, 121, 20),
                Text = DateTime.Now.AddDays(2).ToShortDateString()
            };

            var buttonBook = new Button
            {
                Bounds = new Rectangle(12, 91, 121, 23),
                Text = "Book"
            };

            comboBoxFlightType.SelectedIndexChanged += delegate
            {
                flightType = (string)comboBoxFlightType.SelectedItem;
                textBoxReturn.Enabled = flightType == ReturnFlight;
                ValidateButton();
            };

            comboBoxFlightType.SelectedIndex = 0;

            textBoxStart.KeyUp += delegate { ValidateButton(); };
            textBoxReturn.KeyUp += delegate { ValidateButton(); };

            buttonBook.Click += delegate
            {
                var text = flightType == OneWayFlight
                    ? $"You have booked a one-way flight on {textBoxStart.Text}"
                    : $"You have booked a return flight on {textBoxStart.Text} and {textBoxReturn.Text}";
                MessageBox.Show(text);
            };

            var form = new Form
            {
                ClientSize = new Size(145, 125),
                Text = "Book Flight",
                Controls =
                {
                    comboBoxFlightType,
                    textBoxStart,
                    textBoxReturn,
                    buttonBook
                }
            };

            Application.Run(form);

            void ValidateButton()
            {
                if (flightType == OneWayFlight && IsDateValid(textBoxStart))
                {
                    buttonBook.Enabled = true;
                }
                else if (flightType == ReturnFlight &&
                         IsDateValid(textBoxStart) &&
                         IsDateValid(textBoxReturn) &&
                         !IsReturnDateBelowStartDate())
                {
                    buttonBook.Enabled = true;
                }
                else
                {
                    buttonBook.Enabled = false;
                }

                bool IsDateValid(TextBox textBox)
                {
                    var isValid = DateTime.TryParse(textBox.Text, out _);
                    textBox.BackColor = isValid ? SystemColors.Window : Color.Red;
                    return isValid;
                }

                bool IsReturnDateBelowStartDate()
                {
                    return DateTime.Parse(textBoxReturn.Text) <
                           DateTime.Parse(textBoxStart.Text);
                }
            }
        }
    }
}
