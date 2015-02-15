(ns ^:figwheel-always counter
    (:require[om.core :as om :include-macros true]
              [om.dom :as dom :include-macros true]))

(defonce app-state (atom 0))

(defn increment-counter []
	(swap! app-state inc))

(defn counter-view [counter owner]
	(reify
		om/IRender
			(render [this]
				(dom/div nil
					(dom/input #js {:value counter})
					(dom/button #js {:onClick #(increment-counter)} "Count")))))

(om/root counter-view app-state
  {:target (. js/document (getElementById "app"))})


