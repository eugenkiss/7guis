#ifndef UNDOMANAGER_H
#define UNDOMANAGER_H

#include <QStack>

#include "undoableedit.h"

class UndoManager
{
private:
    QStack<UndoableEdit *> *history;
    int cursor;

public:
    UndoManager();
    ~UndoManager();

    void addEdit(UndoableEdit *edit);
    void undo();
    void redo();
};

#endif // UNDOMANAGER_H
