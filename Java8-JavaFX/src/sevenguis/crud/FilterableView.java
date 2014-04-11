package sevenguis.crud;

import javafx.beans.property.SimpleListProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import java.util.ArrayList;
import java.util.List;

public class FilterableView extends SimpleListProperty<String> {

    private List<String> database;
    private ObservableList<String> filteredDatabase;
    private List<Integer> filteredOriginalMap;
    private String cachedPrefix = "";

    public FilterableView(List<String> database) {
        this.database = database;
        filteredDatabase = FXCollections.observableArrayList();
        filteredDatabase.addAll(database);
        filteredOriginalMap = new ArrayList<>();
        for (int i = 0; i < database.size(); i++) {
            filteredOriginalMap.add(i);
        }
        this.set(filteredDatabase);
    }

    public void filterByPrefix(String prefix) {
        cachedPrefix = prefix;
        filteredDatabase.clear();
        filteredOriginalMap.clear();
        for (int i = 0; i < database.size(); i++) {
            String entry = database.get(i);
            if (entry.startsWith(prefix)) {
                filteredDatabase.add(entry);
                filteredOriginalMap.add(i);
            }
        }
    }

    public void create(String newEntry) {
        database.add(newEntry);
        if (newEntry.startsWith(cachedPrefix)) {
            filteredDatabase.add(newEntry);
            filteredOriginalMap.add(database.size() - 1);
        }
    }

    public void update(String newEntry, int index) {
        database.set(filteredOriginalMap.get(index), newEntry);
        if (newEntry.startsWith(cachedPrefix)) {
            filteredDatabase.set(index, newEntry);
        } else {
            filteredDatabase.remove(index);
            filteredOriginalMap.remove(index);
        }
    }

    public void delete(int index) {
        database.remove(filteredOriginalMap.get(index));
        filteredDatabase.remove(index);
        filteredOriginalMap.remove(index);
    }

}
