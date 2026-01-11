// ==UserScript==
// @name       Snack Xylophone
// @namespace    http://tampermonkey.net/
// @version    1.0
// @description  Play xylophone sounds when typing "snack"
// @author   Poornesh
// @match      *://*/*
// @grant      none
// ==/UserScript== 
(function() {
    'use strict';
    let buffer="";
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    function playNote(freq,delay) {
        const osc = audioCtx.createOscillator();
        const gain =audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + 0.3);
        gain.gain.setValueAtTime(0.5,audioCtx.currentTime + delay); 
        gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime + delay + 0.3);
    }
    function playMelody() {
        const notes = [523,659,784,659,523]; // C E G E C
        notes.forEach((note,i) => playNote(note,i*0.15));   
    }
    document.addEventListener('keydown', (e) => {
        if (e.key.length === 1) {
            buffer += e.key.toLowerCase();
            buffer = buffer.slice(-5);
            if (buffer === "snack") {
                playMelody();
                buffer = "";
            }
        }
    });
})();