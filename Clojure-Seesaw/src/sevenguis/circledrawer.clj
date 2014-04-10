(ns sevenguis.circledrawer
  (:use [seesaw core border graphics color]
    sevenguis.core)
  (:require [seesaw.bind :as b] [seesaw.mouse :as mouse]))


(defn distance [c1 c2]
  (Math/sqrt (->> (map - c1 c2) (map #(* % %)) (reduce +))))

(defrecord Circle [x y d])


(def circles (atom [])) ; app state

(def history (atom {:states [[]] :cursor 0}))

(defn add-edit []
  (swap! history assoc-in [:states]  
    (conj (vec (take (inc (:cursor @history)) (:states @history)))  @circles))
  (swap! history update-in [:cursor] inc))

(defn undo []
  (when (> (:cursor @history) 0)
    (swap! history update-in [:cursor] dec)
    (reset! circles (nth (:states @history) (:cursor @history)))))

(defn redo []
  (when (< (:cursor @history) (dec (count (:states @history))))
    (swap! history update-in [:cursor] inc)
    (reset! circles (nth (:states @history) (:cursor @history)))))


(defn diameter-dialog [parent hovered]
  (let [index (.indexOf @circles @hovered)
        c     (nth @circles index)
        msg   (str "Adjust diameter of circle at (" (:x c) ", " (:y c) ").")
        sli   (slider :min 10 :max 50 :value (:d c))]
    (listen sli :state-changed (fn [_] 
      (let [new-c (assoc-in (nth @circles index) [:d] (value sli))]
        (reset! hovered new-c)
        (reset! circles (assoc @circles index new-c)))
      (.repaint parent))) 
    (show! (custom-dialog  
             :parent parent  
             :width 300  
             :height 100  
             :content (flow-panel :items [msg sli])))))

(defn circledraw-canvas []
  (let [hovered      (atom nil)
        draw-canvas  (canvas)
        diameter     (menu-item :text "Diameter..")
        context      (popup :items [diameter])

        show-popup   (fn [e]
          (.show context (.getComponent e) (.getX e) (.getY e)))
        nearest-at   (fn [x y]
          (when (seq @circles)
            (let [nearest (apply min-key #(distance [x y] [(:x %) (:y %)]) @circles)
                  dist    (distance [x y] [(:x nearest) (:y nearest)])]
               (if (<= dist (/ (:d nearest) 2)) nearest))))
        hover-action (fn [e] 
          (reset! hovered (nearest-at (.getX e) (.getY e)))
          (-> e .getSource .repaint))]

    (add-watch circles :key
      (fn [_ _ _ n] (.repaint draw-canvas)))
    (listen diameter :action (fn [e]
      (diameter-dialog draw-canvas hovered)
      (add-edit)))
    (listen draw-canvas
      :mouse-pressed (fn [e]
        (when (and (.isPopupTrigger e) @hovered) (show-popup e))
        (when (and (= :left (mouse/button e)) (nil? @hovered))
          (swap! circles #(conj % (Circle. (.getX e) (.getY e) 30)))
          (add-edit)
          (hover-action e)))
      :mouse-released (fn [e]
        (when (.isPopupTrigger e) (show-popup e)))
      :mouse-moved hover-action)

    (config! draw-canvas 
          :border (line-border)
          :background :white
          :paint (fn [c g] 
            (anti-alias g)
            (doseq [c @circles]
               (let [offset (/ (:d c) 2)
                     normal-style (style :foreground :black)
                     hovered-style (update-style normal-style :background :lightgray)]
                 (draw g (circle (:x c) (:y c) (/ (:d c) 2)) 
                   (if (= c @hovered) hovered-style normal-style))))))))
      
(defn circledraw-panel []
  (let [undo (button :text "Undo" :listen [:action (fn [_] (undo))])
        redo (button :text "Redo" :listen [:action (fn [_] (redo))])]
    (border-panel 
      :preferred-size [400 :by 400]
      :border (empty-border :left 10 :right 10 :bottom 10)
      :north  (flow-panel :items [undo redo])
      :center (circledraw-canvas))))

(defn -main [& args] 
  (invoke-later
    (-> (frame :title "Circle Drawer" :content (circledraw-panel) :on-close :exit) 
      pack!
      show!)))