#include "MainWin.h"
#include <QHeaderView>
MainWin::MainWin() {
    nameLabel = new QLabel("Name:");
       surnameLabel = new QLabel("Surname:");
       filterLabel = new QLabel("Filter prefix");
       createButton = new QPushButton("Create");
       updateButton = new QPushButton("Update");
       deleteButton = new QPushButton("Delete");
       hBox = new QHBoxLayout();
       vBox = new QVBoxLayout();
       grid = new QGridLayout();
       filterLine = new QLineEdit();
       nameLine = new QLineEdit();
       surnameLine = new QLineEdit();
       createTable();
       connect(deleteButton, SIGNAL(clicked()), this, SLOT(deletePerson()));
       connect(createButton, SIGNAL(clicked()), this, SLOT(createPerson()));
       connect(updateButton, SIGNAL(clicked()), this, SLOT(updatePerson()));
       connect(dataTable->selectionModel(), SIGNAL(selectionChanged(QItemSelection,QItemSelection)), SLOT(getInformation()));
       connect(filterLine, SIGNAL(textChanged(QString)), SLOT(searchPerson()));
       hBox->addWidget(createButton);
       hBox->addWidget(updateButton);
       hBox->addWidget(deleteButton);
       grid->addWidget(filterLabel, 0, 0, 1, 1);
       grid->addWidget(filterLine, 0, 1, 1, 1);
       grid->addWidget(dataTable, 1, 0, 3, 2);
       grid->addWidget(nameLabel, 1, 2, 1, 1);
       grid->addWidget(nameLine, 1, 3, 1, 1);
       grid->addWidget(surnameLabel, 2, 2, 1, 1);
       grid->addWidget(surnameLine, 2, 3, 1, 1);
       vBox->addLayout(grid);
       vBox->addLayout(hBox);
       this->setLayout(vBox);
}

void MainWin::createTable() {
    dataTable = new QTableWidget(1, 2);
    QStringList labels;
    labels << tr("Surname") << tr("Name");
    dataTable->setHorizontalHeaderLabels(labels);
    dataTable->horizontalHeader()->setStretchLastSection(true);
    dataTable->setSelectionMode(QAbstractItemView:: SingleSelection);
    dataTable->setEditTriggers(QAbstractItemView:: NoEditTriggers);
    dataTable->setSelectionBehavior(QAbstractItemView::SelectRows);
    dataTable->setItem(0, 0, new QTableWidgetItem("Kunitsa"));
    dataTable->setItem(0, 1, new QTableWidgetItem("Evgeniy"));
    dataTable->insertRow(dataTable->rowCount());
    dataTable->setItem(1, 0, new QTableWidgetItem("Makoed"));
    dataTable->setItem(1, 1, new QTableWidgetItem("Viktor"));
    dataTable->insertRow(dataTable->rowCount());
    dataTable->setItem(dataTable->rowCount()-1, 0, new QTableWidgetItem("Malyhin"));
    dataTable->setItem(dataTable->rowCount()-1, 1, new QTableWidgetItem("Kirill"));
}

void MainWin::deletePerson() {
    int index = dataTable->currentIndex().row();
    dataTable->removeRow(index);
    dataTable->model()->submit();
}

void MainWin::createPerson() {
    QString surname = surnameLine->text();
    QString name = nameLine->text();
    dataTable->insertRow(dataTable->rowCount());
    dataTable->setItem(dataTable->rowCount()-1, 0, new QTableWidgetItem(surname));
    dataTable->setItem(dataTable->rowCount()-1, 1, new QTableWidgetItem(name));
}

void MainWin::updatePerson() {
    QString surname = surnameLine->text();
    QString name = nameLine->text();
    int index = dataTable->currentIndex().row();
    dataTable->removeRow(index);
    dataTable->insertRow(index);
    dataTable->setItem(index, 0, new QTableWidgetItem(surname));
    dataTable->setItem(index, 1, new QTableWidgetItem(name));
}

void MainWin::getInformation() {
    int index = dataTable->currentIndex().row();
    QString surname = dataTable->item(index, 0)->text();
    QString name = dataTable->item(index, 1)->text();
    surnameLine->setText(surname);
    nameLine->setText(name);
}

void MainWin::searchPerson() {
    for(int i=0; i<dataTable->model()->rowCount(); i++)
    {
        if(dataTable->isRowHidden(i))
            dataTable->setRowHidden(i, false);
    }

    for(int i=0; i<dataTable->model()->rowCount(); i++)
    {

        QString searchString = dataTable->item(i, 0)->text()+" "+dataTable->item(i, 1)->text();
        if(!searchString.contains(filterLine->text()))
            dataTable->setRowHidden(i, true);
    }
}

