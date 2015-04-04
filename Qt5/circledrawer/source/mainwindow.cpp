#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    setWindowTitle("Circle Drawer");

    auto centralWidget = new QWidget;
    setCentralWidget(centralWidget);

    auto rootLayout = new QVBoxLayout;
    centralWidget->setLayout(rootLayout);

    undo = new QPushButton("undo");
    redo = new QPushButton("redo");
    renderArea = new RenderArea;

    connect(undo, SIGNAL(clicked()), renderArea, SLOT(undo()));
    connect(redo, SIGNAL(clicked()), renderArea, SLOT(redo()));

    auto buttonsLayout = new QHBoxLayout;
    buttonsLayout->addWidget(undo);
    buttonsLayout->addWidget(redo);
    buttonsLayout->setContentsMargins(0, 0, 10, 0);
    buttonsLayout->setAlignment(Qt::AlignLeft);

    rootLayout->addLayout(buttonsLayout);
    rootLayout->addWidget(renderArea);
    rootLayout->setContentsMargins(10, 10, 10, 10);
}

MainWindow::~MainWindow()
{

}
