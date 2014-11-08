package sevenguis.crudkt

import android.app.Fragment
import android.os.Bundle

public open class StateFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setRetainInstance(true)
    }
}
