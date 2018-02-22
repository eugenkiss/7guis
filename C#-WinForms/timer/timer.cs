using System;
using System.Drawing;
using System.Windows.Forms;

namespace Timer
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            int duration = 25;
            decimal elapsedTime = 0;

            var labelElapsedText = new Label
            {
                Location = new Point(12, 22),
                Text = "Elapsed Time:",
                AutoSize = true
            };

            var progressBar = new ProgressBar
            {
                Bounds = new Rectangle(92, 12, 180, 23)
            };

            var labelElapsedValue = new Label
            {
                Location = new Point(12, 51),
                Text = "00.0s",
                AutoSize = true
            };

            var labelDuration = new Label
            {
                Location = new Point(12, 80),
                Text = "Duration:",
                AutoSize = true
            };

            var trackBar = new TrackBar
            {
                Bounds = new Rectangle(92, 70, 180, 45),
                TickStyle = TickStyle.None,
                Maximum = 50,
                Value = duration
            };

            var button = new Button
            {
                Bounds = new Rectangle(15, 121, 257, 23),
                Text = "Reset"
            };

            var timer = new System.Windows.Forms.Timer();

            button.Click += delegate { elapsedTime = 0; };
            trackBar.Scroll += delegate { duration = trackBar.Value; };

            timer.Tick += delegate
            {
                if (elapsedTime == duration)
                    return;

                if (elapsedTime > duration)
                    elapsedTime = duration;
                else
                    elapsedTime += 0.1M;

                labelElapsedValue.Text = elapsedTime.ToString("00.0") + "s";

                progressBar.Value = duration == 0
                    ? 100
                    : (int)(elapsedTime*100/duration);
            };

            timer.Start();

            var form = new Form
            {
                ClientSize = new Size(287, 155),
                Text = "Timer",
                Controls =
                {
                    labelElapsedText,
                    progressBar,
                    labelElapsedValue,
                    labelDuration,
                    trackBar,
                    button
                }
            };

            Application.Run(form);
        }
    }
}
