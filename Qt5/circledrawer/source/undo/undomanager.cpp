#include "undomanager.h"

UndoManager::UndoManager()
{
    history = new QStack<UndoableEdit *>();
    cursor = -1;
}

void UndoManager::addEdit(UndoableEdit *edit) {
    int toPop = history->size() - 1 - cursor;

    while (toPop != 0)
    {
        history->pop();
        toPop--;
    }

    history->push(edit);
    cursor++;
}

void UndoManager::undo()
{
    if (cursor >= 0)
    {
        history->at(cursor)->undo();
        cursor--;
    }
}

void UndoManager::redo() {
    if (cursor < history->size()-1)
    {
        cursor++;
        history->at(cursor)->redo();
    }
}

UndoManager::~UndoManager()
{

}
