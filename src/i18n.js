import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        settings: "Settings",
        player: "Player",
        player_name_placeholder: "Enter name",
        language: "Language",
        close: "Close",
        active_player: "Active player",
        one_minute: "One minute",
        two_minutes: "Two minutes",
        three_minutes: "Three minutes",
        cancel: "Cancel",
        against_the_clock: "Play against the clock",
        square: "Square!",
        check: "Check",
        skip: "Skip",
        wrong: "Wrong",
        correct: "Correct!",
        prime: "Prime",
        prime_correct: "PRIME!!",
        nope: "Nope",
        your_score: "Your score",
        empty_score: "<empty>",
        hall_of_fame: "Hall of Fame",
        no_scores_yet: "No entries yet",
        rectangle_rules: "Game rules",
        one_minute_header: "One minute",
        two_minutes_header: "Two minutes",
        three_minutes_header: "Three minutes",
        playing: "playing",
        local_scores: "Local",
        online_scores: "Online",
        save_online: "Public highscore",
        scores_unavailable: "Scores not available",
        help_1:
          "In Rect4ngle, your goal is to build rectangles with a given number of " +
          "cells. The target number of cells is written on the blackboard. A rectangle is built from " +
          "<strong>at least two pieces</strong> and all pieces must have the same length. <br /><br />" +
          "On the bottom left you find two icons to start playing. One is for the " +
          "<strong>training mode</strong>, where there is no time limit and you " +
          "can just practice your rectangle skills. The other one is for a " +
          "<strong>game against the clock</strong>. Try to gain as many diamonds " +
          "as possible within the time limit. Maybe you'll achieve a new high score!",
        help_2:
          "<h5>Gaining diamonds</h5>" +
          "If you think that you've built a matching rectangle, you can click on " +
          "the <strong>checkmark</strong> button to check your result. If you got it " +
          "right, you receive as many diamonds as your rectangle is high. If your " +
          "rectangle does not match the number, you lose 5 diamonds. <br/><br/> " +
          "A special case is the <strong>SQUARE</strong>: If your rectangle is as " +
          "high as it is wide, you receive 10 diamonds and a <strong>power-up</strong>" +
          " for the respective number: Your points will count twice (or even 3x, 4x, ...)" +
          " for every rectangle you build afterwards. But look out: <strong>Any mistake will " +
          "downgrade all of your power-ups again!</strong>",
        help_3:
          "<h5>Prime numbers</h5>" +
          "Sometimes there's a number that cannot be built as a rectangle. These " +
          "are called <strong>PRIME NUMBERS</strong>. You have to click the " +
          "<strong>PRIME</strong> button to classify them as primes. This " +
          "is very tricky, so finding a prime will give you 20 diamonds. But " +
          "watch out: Calling a number a prime that is actually not a prime will " +
          "lose 10 diamonds. <br/><br/> If you're not sure what to do with a number, " +
          "you can always <strong>SKIP</strong> it. This will cost you 2 diamonds, but " +
          "all of your power-ups will remain active.",
        was_prime: "{{n}} was PRIME",
        factorization: "Next time, try {{i}} x {{i2}}",
        month_0: "January",
        month_1: "February",
        month_2: "March",
        month_3: "April",
        month_4: "May",
        month_5: "June",
        month_6: "July",
        month_7: "August",
        month_8: "September",
        month_9: "October",
        month_10: "November",
        month_11: "December",
        hint_no_pieces:
          "Try to build a rectangle covering exactly {{num}} boxes. Use the blue buttons below to add pieces with length 2, 3, 4, ...",
        hint_no_pieces_prime:
          "Try to build a rectangle covering exactly {{num}} boxes. If that is not possible, click the PRIME button.",
        hint_one_piece_not_allowed:
          "A rectangle must always contain more than one piece. After picking your first piece, it is not possible to add pieces of a different size.",
        hint_sum_too_high:
          "An orange rectangle means you've gone too high ... remove one piece with the x-arrow button or remove all pieces with the trash button.",
        hint_correct_rect:
          "That looks like a pretty good match. Now validate your rectangle with the green checkmark button.",
        hint_last_time: " This is the last time this hint is shown.",
        tutorial:
          "<h5>Welcome to Rect4ngle!</h5>This is the first time you start Rect4ngle.<br><br> Maybe you want to start with the tutorial? Click on the footsteps icon at the bottom of the screen!",
        tutorial_not_yet_correct: "Sorry, that's not the solution. Try again!",
        tutorial_not_a_prime: "This one can be built as a rectangle!",
        tutorial_num_20:
          "Your first task is to build a rectangle with 20 cases. <br><br>Use the <b>+5</b> button for that.",
        tutorial_num_32:
          "Good. Since you used the <b>+5</b> button you receive 5 points. <br><br>Next, try to build a rectangle with 32 cases. Do you have an idea how to achieve this?",
        tutorial_num_25:
          "You're doing great!<br><br>Next comes the <b>25</b>. I'll let you find the solution, I bet it won't take you long.",
        tutorial_num_9:
          "Awesome. You earned special points for this because you constucted a <b>square</b>! This added a powerup to the 5, so that it counts twice from now on.<br><br>Now comes the <b>9</b>. <br><br>At first you might think you could just use the <b>+9</b> button here, but think twice: A rectangle must always contain at least two pieces.",
        tutorial_num_17:
          "Wow, yet another square, well done!<br><br>The next number <b>17</b> is a tough one ... how is that supposed to work?<br><br>The answer is: It doesn't! Some numbers are <b>primes</b> and cannot be built as a rectangle. <br><br>These unwieldy folks need to be identified with the <b>PRIME</b> button.",
        tutorial_num_36:
          "Next up is the <b>36</b>. <br><br>I'll let you find the solution on your own. There are several possibilities ... can you find the best one?",
        tutorial_num_11:
          "Nice. I think you've understood this game quite well. <br><br>Here's yet another challenge: The number <b>11</b>. <br><br>I'm curious if you can solve this one ...",
        tutorial_num_30:
          "EXACTLY, that was a prime number again - well done!<br><br>I think that's enough for now. How about you finish the last number and do some real training afterwards by clicking the game controller at the bottom? <br><br>As soon as you feel up to it, you can also start a game against the clock using the stopwatch icon. Have fun!",
      },
    },
    de: {
      translation: {
        settings: "Einstellungen",
        player: "Spieler",
        player_name_placeholder: "Namen eingeben",
        language: "Sprache",
        close: "Schließen",
        active_player: "Aktiver Spieler",
        one_minute: "Eine Minute",
        two_minutes: "Zwei Minuten",
        three_minutes: "Drei Minuten",
        cancel: "Abbrechen",
        against_the_clock: "Spiel gegen die Uhr",
        square: "Quadrat!",
        check: "Prüfen",
        skip: "Weiter",
        wrong: "Schade",
        correct: "Korrekt!",
        prime: "Prim",
        prime_correct: "PRIMZAHL!!",
        nope: "Autsch!",
        your_score: "Deine Punkte",
        empty_score: "<leer>",
        hall_of_fame: "Bestenliste",
        no_scores_yet: "Noch keine Einträge",
        rectangle_rules: "Spielregeln",
        one_minute_header: "Eine Minute",
        two_minutes_header: "Zwei Minuten",
        three_minutes_header: "Drei Minuten",
        playing: "spielt",
        local_scores: "Lokal",
        online_scores: "Online",
        save_online: "Hishcore online",
        scores_unavailable: "Highscores nicht verfügbar",
        help_1:
          "Bei Rect4ngle musst Du Rechtecke bauen, die eine vorgegebene Anzahl von Kästchen enthalten. Die Anzahl Kästchen " +
          "die Du brauchst steht links auf der schwarzen Tafel. Ein Rechteck besteht immer aus " +
          "<strong>mindestens zwei Teilen</strong>, und alle Teile müssen gleich lang sein.<br /><br />" +
          "In der Ecke unten links findest Du zwei Möglichkeiten, ein Spiel zu starten: " +
          "Im <strong>Trainingsmodus</strong> kannst Du ohne Zeitbegrenzung üben. " +
          "Der andere Modus ist das <strong>Spiel gegen die Uhr</strong>. Hier musst Du in begrenzter Zeit " +
          "so viele Rechtecke bauen wie möglich. Vielleicht schaffst Du sogar einen Highscore!",
        help_2:
          "<h5>Diamanten sammeln</h5>" +
          "Immer wenn Du glaubst dass Du ein passendes Rechteck für die angezeigte Zahl " +
          "gebaut hast, klicke den <strong>grünen Knopf mit dem Haken</strong>. Wenn Du alles richtig gemacht " +
          "hast, erhältst Du so viele Diamanten wie Dein Rechteck Kästchen hoch ist. Wenn Du daneben liegst, " +
          " verlierst Du leider 5 Diamanten. <br/><br/> " +
          "Ein Spezialfall ist das <strong>QUADRAT</strong>: Wenn Dein Rechteck genau so " +
          "hoch wie breit ist, erhältst Du 10 Diamanten und die verwendete Zahl erhält ein <strong>Power-Up</strong>: " +
          "Alle weiteren Rechtecke, die Du mit dieser Zahl baust, zählen doppelt (mit weiteren Power-Ups sogar " +
          "dreifach, vierfach, ...). Aber sieh Dich vor: Bei jedem Fehler verringern sich alle Deine Power-Ups wieder.",
        help_3:
          "<h5>Primzahlen</h5>" +
          "Manchmal erscheint eine Zahl auf der Tafel, die man gar nicht als Rechteck bauen kann. " +
          "Diese Zahlen nennt man <strong>PRIMZAHLEN</strong>. Wenn so eine Zahl erscheint " +
          "musst Du den <strong>PRIMZAHL</strong>-Knopf drücken, um sie zu entlarven. <br/><br/>Das  " +
          "ist recht schwierig, gibt dafür aber auch einen großen Gewinn: <strong>20 Diamanten!</strong> Aber sei " +
          "vorsichtig: Wenn Du den Primzahl-Knopf drückst und es wäre doch ein Rechteck möglich gewesen " +
          "verlierst Du 10 Diamanten. <br/><br/> Wenn Du bei einer Zahl mal nicht weiter weißt, " +
          "kannst Du auch den gelben <strong>WEITER</strong>-Knopf drücken, um die aktuelle Aufgabe zu überspringen. " +
          "Das kostet Dich zwar 2 Diamanten, aber Deine Power-Ups bleiben bestehen.",
        was_prime: "{{n}} war eine PRIMZAHL",
        factorization: "Das wäre {{i}} x {{i2}} gewesen",
        month_0: "Januar",
        month_1: "Februar",
        month_2: "März",
        month_3: "April",
        month_4: "Mai",
        month_5: "Juni",
        month_6: "Juli",
        month_7: "August",
        month_8: "September",
        month_9: "Oktober",
        month_10: "November",
        month_11: "Dezember",
        hint_no_pieces:
          "Versuche eine Rechteck zu bauen, das exakt {{num}} Kästchen hat. Verwende die blauen Knöpfe unten, um Teile der Länge 2, 3, 4 ... hinzuzufügen.",
        hint_no_pieces_prime:
          "Versuche eine Rechteck zu bauen, das exakt {{num}} Kästchen hat. Falls das nicht möglich ist, klicke den grünen PRIM-Knopf.",
        hint_one_piece_not_allowed:
          "Ein Rechteck muss immer aus mehr als einem Teil bestehen. Sobald Du ein Teil hinzugefügt hast, kannst Du keine Teile von anderer Länge mehr hinzufügen.",
        hint_sum_too_high:
          "Wenn das Rechteck orange wird bedeutet das, dass Deine Summe zu hoch ist. Entferne dann entweder ein einzelnes Teil mit dem x-Pfeil-Knopf, oder lösche alle Teile mit dem Mülleimer-Icon.",
        hint_correct_rect: "Das sieht gut aus. Prüfe Dein Rechteck jetzt mit dem grünen Häkchen-Knopf.",
        hint_last_time: " Dieser Hinweis wird nun nicht mehr angezeigt.",
        tutorial:
          "<h5>Willkommen bei Rect4ngle!</h5>Dies ist das erste mal, dass du Rect4ngle startest.<br><br> Am besten fängst Du mit der Einführung an. Klicke dazu auf den Fußspuren unten in der schwarzen Leiste.",
        tutorial_not_yet_correct: "Das ist noch nicht richtig. Versuche es weiter!",
        tutorial_not_a_prime: "Die Zahl kann als Rechteck gebaut werden!",
        tutorial_num_20:
          "Als Erstes baust Du ein Rechteck mit 20 Kästchen. <br><br>Verwende dazu den blauen Knopf <b>+5</b>.",
        tutorial_num_32:
          "Sehr gut. Weil Du die <b>+5</b> verwendet hast erhältst Du für die Lösung 5 Punkte. <br><br>Als Nächstes baust Du ein Rechteck mit 32 Kästchen. Hast Du eine Idee, welches Teil Du dafür verwenden könntest?",
        tutorial_num_25:
          "Toll, das klappt ja super. <br><br>Als nächstes kommt die 25. Das findest Du jetzt bestimmt auch ganz schnell, oder?",
        tutorial_num_9:
          "Klasse! Du hast jetzt sogar besonders viele Punkte bekommen, weil Du ein <b>Quadrat</b> gebaut hast. Außerdem zählt die 5 ab sofort <b>doppelt</b>. <br><br> Jetzt kommt die 9.<br><br> Hier denkst Du vielleicht, dass Du einfach den <b>+9</b>-Knopf verwenden kannst, aber Vorsicht: Ein Rechteck muss immer aus mindestens zwei Teilen bestehen!",
        tutorial_num_17:
          "Wow, nochmal ein Quadrat, sehr gut! <br><br> Die nächste Zahl <b>17</b> bereitet Dir vielleicht etwas Kopfzerbrechen ... wie soll das denn gehen? <br><br>Die Antwort: Gar nicht! Manche Zahlen sind <b>Primzahlen</b> und lassen sich nicht als Rechteck bauen.<br><br> Diese schrägen Gesellen kannst Du mit dem <b>PRIM</b>-Knopf entlarven.",
        tutorial_num_36:
          "Die nächste Zahl ist die <b>36</b>. <br><br>Ich lasse Dich mal selbst die Lösung finden. Es gibt mehrere Möglichkeiten ... aber eine davon gibt besonders viele Punkte!",
        tutorial_num_11:
          "Super, ich glaube Du hast das Prinzip nun gut verstanden. <br><br>Hier ist nochmal eine kleine Herausforderung: Die Zahl <b>11</b>. <br><br>Ich bin gespannt ob Du hier die Lösung findest ...",
        tutorial_num_30:
          "GENAU, das war nämlich wieder so ein krummes Ding - eine <b>Primzahl</b>.<br><br>Ich glaube, das genügt nun zur Einführung. Wie wäre es, wenn Du als nächstes den Gamecontroller unten links verwendest, um im Trainingsmodus ein wenig zu üben? <br><br>Wenn Du Dich fit fühlst, kannst Du mit der Stoppuhr auch ein Spiel auf Zeit machen. Viel Spaß!",
      },
    },
  },
});

export default i18n;
