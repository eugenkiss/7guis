#ifndef DIALOG_H
#define DIALOG_H

#include <QtWidgets>

#include "circle.h"

class Dialog : public QWidget
{
    Q_OBJECT

private:
    int oldDiameter;

    Circle *selected;
    QLabel *info;
    QSlider *slider;

public:
    explicit Dialog(Circle *circle, QWidget *parent = 0);
    ~Dialog();

    void closeEvent(QCloseEvent *e);

signals:
    void diameterChanged(Circle*, int);
    void closed(Circle *, int);

public slots:
    void sendDiameterChanged(int newDiameter);

};

#endif // DIALOG_H
