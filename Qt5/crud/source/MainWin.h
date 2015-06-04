#ifndef MAINWIN_H
#define MAINWIN_H
#include <QWidget>
#include <QLabel>
#include <QTableWidget>
#include <QStandardItemModel>
#include <QPushButton>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QGridLayout>
#include <QLineEdit>
class MainWin : public QWidget {
    Q_OBJECT
public:
    QLabel* filterLabel;
    QLabel* nameLabel;
    QLabel* surnameLabel;
    QTableWidget* dataTable;
    QPushButton* createButton;
    QPushButton* updateButton;
    QPushButton* deleteButton;
    QLineEdit* filterLine;
    QLineEdit* nameLine;
    QLineEdit* surnameLine;
    QHBoxLayout* hBox;
    QVBoxLayout* vBox;
    QGridLayout* grid;
    MainWin();
    void createTable();
private slots:
    void createPerson();
    void updatePerson();
    void deletePerson();
    void getInformation();
    void searchPerson();
};


#endif // MAINWIN_H
