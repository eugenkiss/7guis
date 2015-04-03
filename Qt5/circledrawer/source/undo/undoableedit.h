#ifndef UNDOABLEEDIT_H
#define UNDOABLEEDIT_H

class UndoableEdit
{
public:
    virtual void undo() = 0;
    virtual void redo() = 0;
};

#endif // UNDOABLEEDIT_H
