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

            var textBoxCelsius = new TextBox();
            textBoxCelsius.Location = new Point(12, 12);

            var labelCelsius = new Label();
            labelCelsius.Location = new Point(118, 15);
            labelCelsius.Text = "Celsius = ";
            labelCelsius.AutoSize = true;

            var textBoxFarenheit = new TextBox();
            textBoxFarenheit.Location = new Point(176, 12);

            var labelFarenheit = new Label();
            labelFarenheit.Location = new Point(282, 15);
            labelFarenheit.Text = "Farenheit";
            labelFarenheit.AutoSize = true;

            textBoxCelsius.KeyUp += delegate
            {
                int celsius;
                if (int.TryParse(textBoxCelsius.Text, out celsius))
                {
                    textBoxFarenheit.Text = Math.Round(celsius*(9/5.0) + 32).ToString();
                }
            };

            textBoxFarenheit.KeyUp += delegate
            {
                int farenheit;
                if (int.TryParse(textBoxFarenheit.Text, out farenheit))
                {
                    textBoxCelsius.Text = Math.Round((farenheit - 32)*(5.0/9)).ToString();
                }
            };

            var form = new Form();
            form.ClientSize = new Size(344, 41);
            form.Text = "TempConv";
            form.Controls.Add(textBoxCelsius);
            form.Controls.Add(labelCelsius);
            form.Controls.Add(textBoxFarenheit);
            form.Controls.Add(labelFarenheit);

            Application.Run(form);
        }
    }
}