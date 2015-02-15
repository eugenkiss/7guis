using System;
using System.Drawing;
using System.Windows.Forms;

namespace Counter
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            var textBox = new TextBox();
            textBox.Location = new Point(12, 14);
            textBox.Text = "0";
            textBox.ReadOnly = true;

            var button = new Button();
            button.Location = new Point(121, 12);
            button.Text = "Count";
            button.Click += (sender, args) => { textBox.Text = (int.Parse(textBox.Text) + 1).ToString(); };

            var form = new Form();
            form.ClientSize = new Size(208, 46);
            form.Text = "Counter";
            form.Controls.Add(textBox);
            form.Controls.Add(button);

            Application.Run(form);
        }
    }
}