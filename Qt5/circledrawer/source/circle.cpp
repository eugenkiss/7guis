#include "circle.h"

Circle::Circle(int x, int y)
{
    this->x = x;
    this->y = y;

    diameter = 30;
}

int Circle::getX()
{
    return x;
}

void Circle::setX(int x)
{
    this->x = x;
}

int Circle::getY()
{
    return y;
}

void Circle::setY(int y)
{
    this->y = y;
}

int Circle::getDiameter()
{
    return diameter;
}

void Circle::setDiameter(int diameter)
{
    this->diameter = diameter;
}

Circle::~Circle()
{

}
