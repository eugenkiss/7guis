#include <QtWidgets>

int main(int argc, char** argv)
{
	QApplication app{argc, argv};
	auto window = new QMainWindow;
	auto widget = new QWidget;
	window->setCentralWidget(widget);
	auto layout = new QHBoxLayout{widget};
	auto label = new QLabel{"0"};
	auto pushbutton = new QPushButton{"Count"};
	
	uint32_t count{};
	QObject::connect(pushbutton, &QPushButton::clicked,
			[&label, &count] () {
				label->setText(QString::number(++count));
			});
	
	layout->addWidget(label);
	layout->addWidget(pushbutton);
	
	window->show();
	return app.exec();
}
