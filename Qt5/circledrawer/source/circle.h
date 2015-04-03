#ifndef CIRCLE_H
#define CIRCLE_H

class Circle
{
private:
    int x, y, diameter;

public:
    Circle(int x, int y);
    ~Circle();

    int getX();
    void setX(int x);
    int getY();
    void setY(int y);
    int getDiameter();
    void setDiameter(int diameter);
};

#endif // CIRCLE_H
