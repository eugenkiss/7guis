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

            var labelElapsedText = new Label();
            labelElapsedText.Location = new Point(12, 22);
            labelElapsedText.Text = "Elapsed Time:";
            labelElapsedText.AutoSize = true;

            var progressBar = new ProgressBar();
            progressBar.Bounds = new Rectangle(92, 12, 180, 23);

            var labelElapsedValue = new Label();
            labelElapsedValue.Location = new Point(12, 51);
            labelElapsedValue.Text = "00.0s";
            labelElapsedValue.AutoSize = true;

            var labelDuration = new Label();
            labelDuration.Location = new Point(12, 80);
            labelDuration.Text = "Duration:";
            labelDuration.AutoSize = true;

            var trackBar = new TrackBar();
            trackBar.Bounds = new Rectangle(92, 70, 180, 45);
            trackBar.TickStyle = TickStyle.None;
            trackBar.Maximum = 50;
            trackBar.Value = duration;

            var button = new Button();
            button.Bounds = new Rectangle(15, 121, 257, 23);
            button.Text = "Reset";

            var timer = new System.Windows.Forms.Timer();
            
            button.Click += delegate { elapsedTime = 0; };
            trackBar.Scroll += delegate { duration = trackBar.Value; };

            timer.Tick += delegate
            {
                if (elapsedTime == duration)
                {
                    return;
                }

                if (elapsedTime > duration)
                {
                    elapsedTime = duration;
                }
                else
                {
                    elapsedTime += 0.1M;
                }

                labelElapsedValue.Text = elapsedTime.ToString("00.0") + "s";

                if (duration == 0)
                {
                    progressBar.Value = 100;
                }
                else
                {
                    progressBar.Value = (int)(elapsedTime * 100 / duration);
                }
            };

            timer.Start();

            var form = new Form();
            form.ClientSize = new Size(287, 155);
            form.Text = "Timer";
            form.Controls.Add(labelElapsedText);
            form.Controls.Add(progressBar);
            form.Controls.Add(labelElapsedValue);
            form.Controls.Add(labelDuration);
            form.Controls.Add(trackBar);
            form.Controls.Add(button);

            Application.Run(form);
        }
    }
}