#ifndef RENDERAREA_H
#define RENDERAREA_H

#include <QtWidgets>

#include "circle.h"
#include "dialog.h"
#include "undo/undomanager.h"

class RenderArea : public QWidget
{
    Q_OBJECT

private:
    static QList<Circle *> circles;
    Circle *hovered;
    UndoManager undoManager;

    QWidget *popup;
    QPushButton *diameterEntry;

    Dialog *dialog;

    class CreateCircleEdit : public UndoableEdit
    {
    private:
        Circle *circle;

    public:
        CreateCircleEdit(Circle *circle) { this->circle = circle; }
        ~CreateCircleEdit();

        void undo() override { circles.removeOne(circle); }
        void redo() override { circles.append(circle); }
    };

    class ChangeDiameterEdit : public UndoableEdit
    {
    private:
        Circle *circle;
        int oldDiameter, newDiameter;

    public:
        ChangeDiameterEdit(Circle *circle, int oldDiameter, int newDiameter)
        {
               this->circle = circle;
               this->oldDiameter = oldDiameter;
               this->newDiameter = newDiameter;
        }

        void undo() override { circle->setDiameter(oldDiameter); }
        void redo() override { circle->setDiameter(newDiameter); }
      };

public:
    explicit RenderArea(QWidget *parent = 0);

    void paintEvent(QPaintEvent *e);
    void mousePressEvent(QMouseEvent *e);
    void mouseMoveEvent(QMouseEvent *e);

    Circle* getNearestCircleAt(int x, int y);
    ~RenderArea();

    void addCircle(Circle *circle);


public slots:
    void undo();
    void redo();
    void showDialog();

    void editCircle(Circle *selected, int newDiameter);
    void addDiameterEdit(Circle *selected, int oldDiameter);
};

#endif // RENDERAREA_H
