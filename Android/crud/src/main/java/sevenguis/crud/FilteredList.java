package sevenguis.crud;

import java.util.ArrayList;
import java.util.List;

public class FilteredList<T> {
    public static interface Predicate<T> {
        boolean f(T element);
    }
    private List<T> db;
    private List<T> filteredDb;
    private List<Integer> filteredToOriginal;
    private Predicate<T> cachedPredicate;

    public FilteredList(List<T> dataBase) {
        cachedPredicate = new Predicate<T>() {
            public boolean f(T element) { return true; }
        };
        db = dataBase;
        filteredDb = new ArrayList<T>();
        filteredDb.addAll(db);
        filteredToOriginal = new ArrayList<Integer>();
        for (int i = 0; i < dataBase.size(); i++) {
            filteredToOriginal.add(i);
        }
    }

    public void filterByPredicate(Predicate<T> predicate) {
        cachedPredicate = predicate;
        filteredDb.clear();
        filteredToOriginal.clear();
        for (int i = 0; i < db.size(); i++) {
            T e = db.get(i);
            if (predicate.f(e)) {
                filteredDb.add(e);
                filteredToOriginal.add(i);
            }
        }
    }

    public void create(T element) {
        db.add(element);
        if (cachedPredicate.f(element)) {
            filteredDb.add(element);
            filteredToOriginal.add(db.size() - 1);
        }
    }

    public void update(T element, int origIndex) {
        db.set(origIndex, element);

        int index = filt(origIndex);
        // Assumption: index is always found because update is only called on visible elements
        if (cachedPredicate.f(element)) {
            filteredDb.set(index, element);
        } else {
            filteredDb.remove(index);
            filteredToOriginal.remove(index);
        }
    }

    public void delete(int origIndex) {
        db.remove(origIndex);
        int index = filt(origIndex);
        // Assumption: index is always found because delete is only called on visible elements
        filteredDb.remove(index);
        filteredToOriginal.remove(index);
    }

    public List<T> getFiltered() {
        return filteredDb;
    }

    public T get(int origIndex) {
        return db.get(origIndex);
    }

    public int orig(int index) {
        return filteredToOriginal.get(index);
    }

    public int filt(int origIndex) {
        int index = -1;
        for (int i = 0; i < filteredDb.size(); i++) {
            if (filteredToOriginal.get(i).equals(origIndex)) {
                index = i;
                break;
            }
        }
        return index;
    }
}
