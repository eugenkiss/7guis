(ns sevenguis.counter
  (:use [seesaw core]
        sevenguis.core))

(defn counter-panel []
  (let [counter (text :text "0" :columns 5 :editable? false) 
        count   (button :text "Count")]
    (listen count :action (fn [_] 
      (text! counter (inc (read-string (value counter))))))
    (flow-panel :items [counter count])))

(defn -main [& args] 
  (invoke-later
    (-> (frame :title "Counter" :content (counter-panel) :on-close :exit) 
     pack!
     show!)))