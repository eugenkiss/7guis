using System;
using System.Drawing;
using System.Windows.Forms;

namespace Temperature
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            var textBoxCelsius = new TextBox
            {
                Location = new Point(12, 12)
            };

            var labelCelsius = new Label
            {
                Location = new Point(118, 15),
                Text = "Celsius = ",
                AutoSize = true
            };

            var textBoxFarenheit = new TextBox
            {
                Location = new Point(176, 12)
            };

            var labelFarenheit = new Label
            {
                Location = new Point(282, 15),
                Text = "Farenheit",
                AutoSize = true
            };

            textBoxCelsius.TextChanged += delegate
            {
                if (int.TryParse(textBoxCelsius.Text, out var celsius))
                    textBoxFarenheit.Text = CelsiusToFarenheit(celsius).ToString();
            };

            textBoxFarenheit.TextChanged += delegate
            {
                if (int.TryParse(textBoxFarenheit.Text, out var farenheit))
                    textBoxCelsius.Text = FarenheitToCelsius(farenheit).ToString();
            };

            var form = new Form
            {
                ClientSize = new Size(344, 41),
                Text = "TempConv",
                Controls =
                {
                    textBoxCelsius,
                    labelCelsius,
                    textBoxFarenheit,
                    labelFarenheit
                }
            };

            Application.Run(form);

            int CelsiusToFarenheit(int celsius) => (int)Math.Round(celsius*(9/5.0) + 32);

            int FarenheitToCelsius(int farenheit) => (int)Math.Round((farenheit - 32)*(5.0/9));
        }
    }
}
