#include "dialog.h"

Dialog::Dialog(Circle *circle, QWidget *parent) : QWidget(parent)
{
    setWindowFlags(Qt::WindowCloseButtonHint);
    setWindowTitle("Diameter...");

    this->selected = circle;
    oldDiameter = selected->getDiameter();

    info = new QLabel(QString("Adjust diameter of circle at (%1, %2)").
                      arg(selected->getX()).
                      arg(selected->getY()));

    slider = new QSlider();
    slider->setOrientation(Qt::Horizontal);
    slider->setMinimum(10);
    slider->setMaximum(50);
    slider->setValue(selected->getDiameter());

    connect(slider, SIGNAL(valueChanged(int)), this, SLOT(sendDiameterChanged(int)));

    auto *rootLayout = new QVBoxLayout();
    rootLayout->addWidget(info);
    rootLayout->addWidget(slider);
    rootLayout->setContentsMargins(10, 10, 10, 10);

    setLayout(rootLayout);
}

void Dialog::closeEvent(QCloseEvent *e)
{
    emit closed(selected, oldDiameter);
    hide();
}

void Dialog::sendDiameterChanged(int newDiameter)
{
    emit diameterChanged(selected, newDiameter);
}

Dialog::~Dialog()
{

}
