#lang frtime
(require frtime/gui/simple)

(current-widget-parent (new ft-frame% (width 200) (stretchable-width #t)))

(define-values-rec
  [elapsed (min duration (- seconds 
                          (hold 
                           (map-e (lambda (_) (value-now seconds))
                                  reset)
                           (value-now seconds))))]
  [gauge (mode widget ft-gauge% 
               (label "Timer") 
               (value elapsed) 
               (range duration)
               (stretchable-width #t))]
  [msg (mode widget ft-message%
             (label (format "~as" (number->string elapsed)))
             (stretchable-width #t))]
  [slider (mode widget ft-slider%
                (label "Duration")
                (min-value 5)
                (max-value 60))]
  [duration (send slider get-value-b)]
  [reset (mode value-e ft-button% (label "Reset"))])


(send (current-widget-parent) show #t)
