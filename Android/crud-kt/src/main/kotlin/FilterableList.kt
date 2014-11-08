package sevenguis.crudkt

public class FilterableList<T>(private val db: MutableList<T>) {
    private val _filtered: MutableList<T>
    val filteredToOriginal: MutableList<Int>
    var cachedPredicate: (T) -> Boolean = {true}

    {
        _filtered = arrayListOf()
        _filtered.addAll(db)
        filteredToOriginal = db.indices.toArrayList()
    }

    public fun filter(predicate: (T) -> Boolean) {
        cachedPredicate = predicate
        _filtered.clear()
        filteredToOriginal.clear()
        for (i in db.indices) {
            val e = db.get(i)
            if (predicate(e)) {
                _filtered.add(e)
                filteredToOriginal.add(i)
            }
        }
    }

    public fun create(element: T) {
        db.add(element)
        if (cachedPredicate(element)) {
            _filtered.add(element)
            filteredToOriginal.add(db.size() - 1)
        }
    }

    public fun update(element: T, origIndex: Int) {
        db.set(origIndex, element)

        val index = filt(origIndex)
        // Assumption: index is always found because update is only called on visible elements
        if (cachedPredicate(element)) {
            _filtered.set(index, element)
        } else {
            _filtered.remove(index)
            filteredToOriginal.remove(index)
        }
    }

    public fun delete(origIndex: Int) {
        db.remove(origIndex)
        val index = filt(origIndex)
        // Assumption: index is always found because delete is only called on visible elements
        _filtered.remove(index)
        filteredToOriginal.remove(index)
    }

    public val filtered: List<T>
        get() = _filtered

    public fun get(origIndex: Int): T {
        return db.get(origIndex)
    }

    public fun orig(index: Int): Int {
        return filteredToOriginal.get(index)
    }

    public fun filt(origIndex: Int): Int {
        var index = -1
        for (i in _filtered.indices) {
            if (filteredToOriginal.get(i) == origIndex) {
                index = i
                break
            }
        }
        return index
    }
}
