#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QtWidgets>

#include "renderarea.h"

class MainWindow : public QMainWindow
{
    Q_OBJECT

private:
     QPushButton *undo;
     QPushButton *redo;
     RenderArea *renderArea;

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

signals:

public slots:
};

#endif // MAINWINDOW_H
