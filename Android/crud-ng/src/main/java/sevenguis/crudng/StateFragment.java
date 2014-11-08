package sevenguis.crudng;

import android.app.Fragment;
import android.os.Bundle;

public class StateFragment extends Fragment {
    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRetainInstance(true);
    }
}
