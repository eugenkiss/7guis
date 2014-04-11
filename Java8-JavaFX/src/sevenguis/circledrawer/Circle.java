package sevenguis.circledrawer;

public class Circle {

    private int x, y, d;

    public Circle(int x, int y) {
        this.x = x;
        this.y = y;
        d = 30;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getDiameter() {
        return d;
    }

    public void setDiameter(int d) {
        this.d = d;
    }

}
