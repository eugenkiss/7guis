package sevenguis.crud;

import java.util.ArrayList;
import java.util.List;

import javax.swing.AbstractListModel;

public class FilteredPrefixListModel extends AbstractListModel<String> {
    private List<String> dataBase;
    private List<String> filteredDataBase;
    private List<Integer> filteredOriginalMap;
    private String cachedPrefix;

    public FilteredPrefixListModel(List<String> dataBase) {
        cachedPrefix = "";
        this.dataBase = dataBase;
        filteredDataBase = new ArrayList<String>();
        filteredDataBase.addAll(dataBase);
        filteredOriginalMap = new ArrayList<Integer>();
        for (int i = 0; i < dataBase.size(); i++) {
            filteredOriginalMap.add(i);
        }
    }
    
    public void filterByPrefix(String prefix) {
        cachedPrefix = prefix;
        if (filteredDataBase.size() > 0) {
            fireIntervalRemoved(this, 0, filteredDataBase.size() - 1);
        }
        filteredDataBase.clear();
        filteredOriginalMap.clear();
        for (int i = 0; i < dataBase.size(); i++) {
            String entry = dataBase.get(i);
            if (entry.startsWith(prefix)) {
                filteredDataBase.add(entry);
                filteredOriginalMap.add(i);
            }
        }
        if (filteredDataBase.size() > 0) {
            fireIntervalAdded(this, 0, filteredDataBase.size() - 1);
        }
    }
    
    public void create(String newEntry) {
        dataBase.add(newEntry);
        if (newEntry.startsWith(cachedPrefix)) {
            filteredDataBase.add(newEntry);
            int newLastIndex = dataBase.size() - 1;
            filteredOriginalMap.add(newLastIndex);
            fireIntervalAdded(this, newLastIndex, newLastIndex);
        }
    }
    
    public void update(String newEntry, int index) {
        int originalIndex = filteredOriginalMap.get(index);
        dataBase.set(originalIndex, newEntry);

        if (newEntry.startsWith(cachedPrefix)) {
            filteredDataBase.set(index, newEntry);
            fireContentsChanged(this, index, index);
        } else {
            filteredDataBase.remove(index);
            filteredOriginalMap.remove(index);
            fireIntervalRemoved(this, index, index);
        }
    }
    
    public void delete(int index) {
        int originalIndex = filteredOriginalMap.get(index);
        dataBase.remove(originalIndex);
        filteredDataBase.remove(index);
        filteredOriginalMap.remove(index);
        fireIntervalRemoved(this, index, index);
    }

    @Override
    public int getSize() {
        return filteredDataBase.size();
    }

    @Override
    public String getElementAt(int index) {
        return filteredDataBase.get(index);
    }
}