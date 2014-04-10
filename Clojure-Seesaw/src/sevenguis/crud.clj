(ns sevenguis.crud
  (:use [seesaw core border mig]
    [clojure.string :only [split trim]]
    sevenguis.core)
  (:require [seesaw.bind :as b]))

(def database
  ["Emil, Hans"
   "Musterman, Max"
   "Tisch, Roman"])

(defn create-entry [db entry]
  (conj db entry))

(defn update-entry [db index entry]
  (vec (concat (subvec db 0 index) [entry] (subvec db (inc index))))) 

(defn delete-entry [db index]
  (vec (concat (subvec db 0 index) (subvec db (inc index))))) 
  
(defrecord Filtered-db [filtered mapping])

(defn filter-db [db f]
  (let [db+is (filter (comp f first) (map vector db (range)))
        db'   (map first db+is)
        is    (map second db+is)]
    (Filtered-db. db' is)))

(defn prefix? [prefix string]
  (= (subs string 0 (count prefix)) prefix))

(defn crud-panel [db]
  (let [prefix  (text :columns 5)
        name    (text :columns 8)
        surname (text :columns 8)
        create  (button :text "Create")
        update  (button :text "Update" :enabled? false)
        delete  (button :text "Delete" :enabled? false)
        entries (listbox :model @db) 

        filterf       #(prefix? (value prefix) %)
        db-view       (atom (filter-db @db filterf))
        reset-db-view #(reset! db-view (filter-db % filterf))
        read-name     #(str (value name) ", " (value surname))]
    (add-watch db :key (fn [_ _ _ new-db]
      (reset-db-view new-db)))
    (add-watch db-view :key (fn [_ _ _ new-db-view]
      (config! entries :model (:filtered new-db-view))))
    (listen prefix :document (fn [e] 
      (reset-db-view @db)))
    (listen entries :selection (fn [e] 
      (when-let [sel (selection e)]
        (let [[n sn] (split sel #",")]
          (config! name :text n)
          (config! surname :text (trim sn))))))
    (listen create :action (fn [e] 
      (swap! db #(create-entry % (read-name)))))
    (listen update :action (fn [e]  
      (let [orig-i (nth (:mapping @db-view) (.getSelectedIndex entries))]
        (swap! db #(update-entry % orig-i (read-name))))))
    (listen delete :action (fn [e]  
      (let [orig-i (nth (:mapping @db-view) (.getSelectedIndex entries))]
        (swap! db #(delete-entry % orig-i)))))
    (b/bind
      (b/selection entries)
      (b/transform (complement nil?))
      (b/property update :enabled?)
      (b/property delete :enabled?))
    (border-panel 
      :preferred-size [400 :by 400]
      :border (empty-border :left 10 :right 10 :bottom 5)
      :north  (flow-panel :align :left :items ["Filter prefix: " prefix])
      :center (border-panel 
                :hgap   10
                :border (empty-border :left 5 :bottom 5)
                :center (scrollable entries)
                :east   (mig-panel 
                          :constraints ["wrap 2, insets 0"]
                          :items [["Name: "   ] [name]
                                  ["Surname: "] [surname]]))
      :south  (horizontal-panel :items [create update delete]))))

(defn -main [& args] 
  (invoke-later
    (-> (frame :title "CRUD" :content (crud-panel (atom database)) :on-close :exit) 
      pack!
      show!)))