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

            var textBox = new TextBox
            {
                Location = new Point(12, 14),
                Text = "0",
                ReadOnly = true,
                TextAlign = HorizontalAlignment.Right,
                Anchor = AnchorStyles.Left | AnchorStyles.Right
            };

            var button = new Button
            {
                Location = new Point(121, 12),
                Text = "Count",
                Anchor = AnchorStyles.Right
            };

            button.Click += delegate { textBox.Text = (int.Parse(textBox.Text) + 1).ToString(); };

            var form = new Form
            {
                ClientSize = new Size(208, 46),
                Text = "Counter",
                Controls = { textBox, button }
            };

            Application.Run(form);
        }
    }
}
