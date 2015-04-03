#include "renderarea.h"

QList<Circle *> RenderArea::circles;

RenderArea::RenderArea(QWidget *parent) : QWidget(parent)
{
    setFixedSize(400, 400);
    setMouseTracking(true);

    hovered = nullptr;

    popup = new QWidget(this);
    popup->setWindowFlags(Qt::Popup);

    auto *popupLayout = new QHBoxLayout;
    popup->setLayout(popupLayout);

    diameterEntry = new QPushButton("Diameter...");
    connect(diameterEntry, SIGNAL(clicked()), this, SLOT(showDialog()));

    popupLayout->addWidget(diameterEntry);
    popupLayout->setContentsMargins(0, 0, 0, 0);

    repaint();
}

void RenderArea::paintEvent(QPaintEvent *e)
{
    QPainter painter(this);

    painter.setPen(Qt::black);
    painter.setBrush(Qt::white);
    painter.drawRect(0, 0, width(), height());

    QPointF center;

    for (auto *circle : circles)
    {
        painter.setBrush(Qt::transparent);
        center.setX(circle->getX());
        center.setY(circle->getY());

        if(circle == hovered)
        {
            painter.setBrush(Qt::lightGray);
        }

        painter.drawEllipse(center, circle->getDiameter() / 2, circle->getDiameter() / 2);
    }
}

void RenderArea::mousePressEvent(QMouseEvent *e)
{
    if(e->button() == Qt::LeftButton && hovered == nullptr)
    {
        addCircle(new Circle(e->x(), e->y()));
    }

    if(e->button() == Qt::RightButton && hovered != nullptr)
    {
        popup->setGeometry(e->globalX(), e->globalY(), diameterEntry->minimumWidth(), diameterEntry->minimumHeight());
        popup->show();
    }

}

void RenderArea::mouseMoveEvent(QMouseEvent *e)
{
    hovered = getNearestCircleAt(e->x(), e->y());
    repaint();
}

Circle *RenderArea::getNearestCircleAt(int x, int y)
{
    Circle *nearestCircle = NULL;
    double minDist = std::numeric_limits<double>::max();

    for (auto *circle : circles)
    {
        double d = sqrt(pow(x - circle->getX(), 2) + pow(y - circle->getY(), 2));

            if (d <= circle->getDiameter()/2 && d < minDist)
            {
                nearestCircle = circle;
                minDist = d;
            }
    }

    return nearestCircle;
}

void RenderArea::addCircle(Circle *circle)
{
    circles.append(circle);
    undoManager.addEdit(new CreateCircleEdit(circle));
    repaint();
}

void RenderArea::undo()
{
    undoManager.undo();
    repaint();
}

void RenderArea::redo()
{
    undoManager.redo();
    repaint();
}     

void RenderArea::editCircle(Circle *selected, int newDiameter)
{
    selected->setDiameter(newDiameter);
    repaint();
}

void RenderArea::addDiameterEdit(Circle *selected, int oldDiameter)
{
    undoManager.addEdit(new ChangeDiameterEdit(selected, oldDiameter, selected->getDiameter()));
}

void RenderArea::showDialog()
{
    dialog = new Dialog(hovered);

    connect(dialog, SIGNAL(diameterChanged(Circle*,int)), this, SLOT(editCircle(Circle*,int)));
    connect(dialog, SIGNAL(closed(Circle*,int)), this, SLOT(addDiameterEdit(Circle*,int)));

    dialog->show();
}

RenderArea::~RenderArea()
{

}
