import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "de",
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
        hall_of_fame: "Hall of Fame",
        no_scores_yet: "No entries yet",
        rectangle_rules: "Game rules",
        one_minute_header: "One minute",
        two_minutes_header: "Two minutes",
        three_minutes_header: "Three minutes",
        playing: "playing",
        help_1:
          "In Rect4ngle, your goal is to build rectangles with a given number of " +
          "balls. The target number is written on the blackboard. A rectangle is built from " +
          "<strong>at least two pieces</strong> and all pieces must have the same length. <br /><br />" +
          "On the bottom left you find two icons to start playing. One is for the " +
          "<strong>training mode</strong>, where there is no time limit and you " +
          "can just practice your rectangle skills. The other one is for a " +
          "<strong>game against the clock</strong>. Try to gain as many diamonds " +
          "as possible within the time limit. Maybe you'll achieve a new high score!",
        help_2:
          "<h5>Gaining diamonds</h5>" +
          "If you think that you've built a matching rectangle, you can click on " +
          "the <strong>CHECK</strong> button to check your result. If you got it " +
          "right, you receive as many diamonds as your rectangle is high. If your " +
          "rectangle does not match the number, you lose 5 diamonds. <br/><br/> " +
          "A special case is the <strong>SQUARE</strong>: If your rectangle is as " +
          "high as it is wide, you receive 10 diamonds.",
        help_3:
          "<h5>Prime numbers</h5>" +
          "Sometimes there's a number that cannot be built as a rectangle. These " +
          "are called <strong>PRIME NUMBERS</strong>. You have to click the " +
          "yellow <strong>PRIME</strong> button to classify them as primes. This " +
          "is very tricky, so finding a prime will give you 20 diamonds. But " +
          "watch out: Calling a number a prime that is actually not a prime will " +
          "lose 10 diamonds. <br/><br/> If you're not sure what to do with a number, " +
          "you can always <strong>SKIP</strong> it. This will cost you 2 diamonds.",
      },
    },
    de: {
      translation: {
        settings: "Einstellungen",
        player: "Spieler",
        player_name_placeholder: "Namen eingeben",
        language: "Sprache",
        close: "Schlie??en",
        active_player: "Aktiver Spieler",
        one_minute: "Eine Minute",
        two_minutes: "Zwei Minuten",
        three_minutes: "Drei Minuten",
        cancel: "Abbrechen",
        against_the_clock: "Spiel gegen die Uhr",
        square: "Quadrat!",
        check: "Pr??fen",
        skip: "Weiter",
        wrong: "Schade",
        correct: "Korrekt!",
        prime: "Primzahl",
        prime_correct: "PRIMZAHL!!",
        nope: "Autsch!",
        your_score: "Dein Score",
        hall_of_fame: "Bestenliste",
        no_scores_yet: "Noch keine Eintr??ge",
        rectangle_rules: "Spielregeln",
        one_minute_header: "Eine Minute",
        two_minutes_header: "Zwei Minuten",
        three_minutes_header: "Drei Minuten",
        playing: "spielt",
        help_1:
          "Bei Rect4ngle musst Du Rechtecke bauen, mit der richtigen Anzahl von B??llen. Die Anzahl B??lle " +
          "die Du brauchst steht auf der schwarzen Tafel. Ein Rechteck besteht immer aus " +
          "<strong>mindestens zwei Teilen</strong>, und alle Teile m??ssen gleich lang sein.<br /><br />" +
          "In der Ecke unten links findest Du zwei M??glichkeiten, ein Spiel zu starten: " +
          "Im <strong>Trainingsmodus</strong> kannst Du ohne Zeitbegrenzung ??ben. " +
          "Der andere Modus ist das <strong>Spiel gegen die Uhr</strong>. Hier musst Du in begrenzter Zeit " +
          "so viele Rechtecke bauen wie m??glich. Vielleicht schaffst Du sogar einen Highscore!",
        help_2:
          "<h5>Diamanten sammeln</h5>" +
          "Immer wenn Du glaubst dass Du ein passendes Rechteck f??r die angezeigte Zahl " +
          "gebaut hast, klicke den <strong>PR??FEN</strong>-Knopf. Wenn Du alles richtig gemacht " +
          "hast, erh??ltst Du so viele Diamanten wie Dein Rechteck Punkte hoch ist. Wenn Du daneben liegst, " +
          " verlierst Du leider 5 Diamanten. <br/><br/> " +
          "Ein Spezialfall ist das <strong>QUADRAT</strong>: Wenn Dein Rechteck genau so " +
          "hoch wie breit ist, erh??ltst Du 10 Diamanten.",
        help_3:
          "<h5>Primzahlen</h5>" +
          "Manchmal erscheint eine Zahl auf der Tafel, die man gar nicht als Rechteck bauen kann. " +
          "Diese Zahlen nennt man <strong>PRIMZAHLEN</strong>. Wenn so eine Zahl erscheint " +
          "musst Du den gelben <strong>PRIMZAHL</strong>-Knopf dr??cken, um sie zu entlarven. <br/><br/>Das  " +
          "ist recht schwierig, gibt daf??r aber auch einen gro??en Gewinn: <strong>20 Diamanten!</strong> Aber sei " +
          "vorsichtig: Wenn Du den Primzahl-Knopf dr??ckst und es w??re doch ein Rechteck m??glich gewesen " +
          "verlierst Du 10 Diamanten. <br/><br/> Wenn Du bei einer Zahl mal nicht weiter wei??t, " +
          "kannst Du auch den <strong>WEITER</strong>-Knopf dr??cken, um die n??chste Zahl anzuzeigen. " +
          "Das kostet Dich allerdings 2 Diamanten.",
      },
    },
  },
});

export default i18n;
