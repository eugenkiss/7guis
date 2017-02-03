#include <QtWidgets>

int main(int argc, char** argv)
{
	QApplication app{argc, argv};
	QWidget widget;
	QHBoxLayout layout{&widget};
	QLabel label{"0"};
	QPushButton pushbutton{"Count"};
	
	uint32_t count{};
	QObject::connect(&pushbutton, &QPushButton::clicked,
			[&label, &count] () {
				label.setText(QString::number(++count));
			});
	
	layout.addWidget(&label);
	layout.addWidget(&pushbutton);
	
	widget.show();
	return app.exec();
}
