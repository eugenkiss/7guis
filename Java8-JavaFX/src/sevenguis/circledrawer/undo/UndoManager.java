package sevenguis.circledrawer.undo;

import java.util.Stack;

public class UndoManager {

    Stack<UndoableEdit> history;
    int cursor;

    public UndoManager() {
        history = new Stack<>();
        cursor = -1;
    }

    public void addEdit(UndoableEdit edit) {
        int toPop = history.size()-1 - cursor;
        while (toPop != 0) {
            history.pop();
            toPop--;
        }
        history.push(edit);
        cursor++;
    }

    public void undo() {
        if (cursor >= 0) {
            history.get(cursor).undo();
            cursor--;
        }
    }

    public void redo() {
        if (cursor < history.size()-1) {
            cursor++;
            history.get(cursor).redo();
        }
    }

}
