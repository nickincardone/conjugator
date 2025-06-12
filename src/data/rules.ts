import {Rule} from "../types/types";

const rules: Rule[] = [
  {
    id: 0,
    use: "por o para",
    rule: "Describe Time (as in when)",
    example: "Estudio |por| las tardes",
    translation: "I study in the afternoons"
  },
  {
    id: 1,
    use: "por o para",
    rule: "Introduce the Agent in the Past Voice",
    example: "La casa fue construido |por| Nick",
    translation: "The house was constructed by Nick"
  },
  {
    id: 2,
    use: "por o para",
    rule: "Express Time Duration",
    example: "Estudié |por| cuatro horas",
    translation: "I studied for four hours"
  },
  {
    id: 3,
    use: "por o para",
    rule: "Express an Exchange",
    example: "Hay un aguacate |por| 10 pesos",
    translation: "There is an avocado for 10 pesos"
  },
  {
    id: 4,
    use: "por o para",
    rule: "Indicate Reason or Cause",
    example: "Estoy aquí |por| mi amigo",
    translation: "I am here for my friend"
  },
  {
    id: 5,
    use: "por o para",
    rule: "Travel Medium",
    example: "Vini aqui |por| van",
    translation: "I came here by van"
  },
  {
    id: 6,
    use: "por o para",
    rule: "Communication Medium",
    example: "Le mandé un mensaje |por| correo",
    translation: "I sent him a message by mail"
  },
  {
    id: 7,
    use: "por o para",
    rule: "Through",
    example: "Pasé |por| el parque",
    translation: "I passed through the park"
  },
  {
    id: 8,
    use: "por o para",
    rule: "Express Preference",
    example: "No voté |por| ella",
    translation: "I didn't vote for her"
  },
  {
    id: 9,
    use: "por o para",
    rule: "Indicate a Favor (On behalf)",
    example: "Trabajo |por| ella, porque ella esta enfermada",
    translation: "I am working for her because she is sick"
  },
  {
    id: 10,
    use: "por o para",
    rule: "Use with Certain Verbs",
    example: "Lucho |por| libertad",
    translation: "I fight for liberty"
  },
  {
    id: 11,
    use: "por o para",
    rule: "Use with Estar (coliqual) to express an action about to be completed",
    example: "Estoy |por| comprar un carro",
    translation: "I am about to buy a car"
  },
  {
    id: 12,
    use: "por o para",
    rule: "Specific use of Object",
    example: "Quiero una taza |para| cafe",
    translation: "I want a cup for coffee (Not OF coffee)"
  },
  {
    id: 13,
    use: "por o para",
    rule: "Express purpose",
    example: "Estoy aquí |para| aprender español",
    translation: "I am here to learn Spanish"
  },
  {
    id: 14,
    use: "por o para",
    rule: "Indicate time/place in the future",
    example: "Hago mi cita |para| manaña",
    translation: "I made my appointment for tomorrow"
  },
  {
    id: 15,
    use: "por o para",
    rule: "Express Destination or Direction",
    example: "Viajo |para| (a) Antigua",
    translation: "I am traveling to Antigua"
  },
  {
    id: 16,
    use: "por o para",
    rule: "Express relation that things/people share",
    example: "|Para| ninos, padres nunca tienen razón",
    translation: "To kids, parents never make sense"
  },
  {
    id: 17,
    use: "por o para",
    rule: "Express Opinion",
    example: "|Para| mi, drogas son mal",
    translation: "To me, drugs are bad"
  },{
    id: 18,
    use: "por o para",
    rule: "Express personal capability ",
    example: "Español es dificil |para| mi",
    translation: "Spanish is difficult for me"
  },
  {
    id: 19,
    use: "por o para",
    rule: "Indicate imminent action (Estoy + Para)",
    example: "Estoy |para| salir",
    translation: "I am leaving"
  },
  {
    id: 20,
    use: "por o para",
    rule: "Express Destination (Person or Object)",
    example: "Esta carta es |para| ti.",
    translation: "This letter is for you"
  },
  {
    id: 21,
    use: "por o para",
    rule: "Colliqual",
    example: "",
    translation: ""
  },
  {
    id: 22,
    use: "por o para",
    rule: "Feelings for something",
    example: "Tengo tanto amor |por| ti",
    translation: "I have so much love for you"
  },
  {
    id: 23,
    use: "por o para",
    rule: "By/Along (physically)",
    example: "Corrí |por| el río",
    translation: "I ran by the river"
  },
  {
    id: 24,
    use: "por o para",
    rule: "To apologize or express gratitude",
    example: "Gracias |por| la información",
    translation: "Thanks for the information"
  },
  {
    id: 25,
    use: "por o para",
    rule: "To express multiplication",
    example: "Dos |por| dos son cuatro",
    translation: "Two times two is four"
  },
  {
    id: 26,
    use: "por o para",
    rule: "To express \"per\"",
    example: "Voy al restaurante cinco veces |por| semana",
    translation: "I go to the restaurant five times per week"
  },
  {
    id: 27,
    use: "por o para",
    rule: "Followed by an infinitive, to express that an action has not been carried out yet",
    example: "Todavía tengo dos libros |por| leer",
    translation: "I still have two books to read"
  },
  {
    id: 28,
    use: "por o para",
    rule: "To express percentage",
    example: "Cuarenta |por| ciento",
    translation: "Fourty percent"
  },
  {
    id: 29,
    use: "por o para",
    rule: "Colloquial: \"Por ejemplo\" is used to express \"For example\" ",
    example: "|Por| ejemplo, podría ayudar a premiar a una persona",
    translation: "For example, it might help to reward a person"
  },
  {
    id: 30,
    use: "por o para",
    rule: "Colloquial: \"Por supesto\" is used to express \"Of course\" ",
    example: "|Por| supesto que puedo verte",
    translation: "Of course I can see you"
  },
  {
    id: 31,
    use: "por o para",
    rule: "Colloquial: \"Por suerte\" is used to express \"Luckily\" ",
    example: "|Por| suerte para usted, existe una curae",
    translation: "Luckily for you, there is a cure"
  },
  {
    id: 32,
    use: "por o para",
    rule: "Colloquial: \"Por si acaso\" is used to express \"Just in case\" ",
    example: "Jason debe tener a su papá con él |por| si acaso",
    translation: "Jason should have his father with him just in case"
  },
  {
    id: 33,
    use: "por o para",
    rule: "Colloquial: \"Por las buenas o por las malas\" is used to express \"the easy way or the hard way\", \"one way or another\", or \"whether you like it or not\" ",
    example: "Podemos hacer esto |por| las buenas o |por| las malas",
    translation: "We can do this the easy way or the hard way"
  },
  {
    id: 34,
    use: "por o para",
    rule: "Colloquial: \"Por seperado\" is used to express \"Separately\"",
    example: "Este es otro tema que debe abordarse |por| separado",
    translation: "This is another issue that should be addressed separately"
  },
  {
    id: 35,
    use: "por o para",
    rule: "Colloquial: \"Por escrito\" is used to express \"In writing\"",
    example: "Ella examinó la petición y respondió |por| escrito",
    translation: "She examined the request and replied in writing"
  },
  {
    id: 36,
    use: "por o para",
    rule: "Colloquial: \"Por última/primera vez\" is used to express \"For the last/first time\"",
    example: "Te lo estoy preguntando |por| ultima vez",
    translation: "I am asking you this for the last time"
  },
  {
    id: 37,
    use: "por o para",
    rule: "Colloquial: \"Por fin/último\" is used to express \"Finally\"",
    example: "|Por| fin encontré las llaves del coche",
    translation: "I finally found my car keys"
  },
  {
    id: 38,
    use: "por o para",
    rule: "Colloquial: \"Por lo general\" is used to express \"Generally/In general\"",
    example: "|Por| lo general, voy a trabajar a pie",
    translation: "I generally walk to work"
  },
  {
    id: 39,
    use: "por o para",
    rule: "Colloquial: \"Por lo demás\" is used to express \"Apart from that\"",
    example: "|Por| lo demás, ya todo está listo",
    translation: "Apart from that, everything is ready"
  },
  {
    id: 40,
    use: "por o para",
    rule: "Colloquial: \"Por todas partes\" is used to express \"Everywhere\"",
    example: "Había un montón de gente |por| todas partes",
    translation: "There were lots of people everywhere"
  },
  {
    id: 41,
    use: "por o para",
    rule: "Colloquial: \"Para colmo\" is used to express \"To top it all off\"",
    example: "Se nos pinchó una llanta y |para| colmo empezó a nevar",
    translation: "We got a flat tire, and to top it all it started to snow"
  },
  {
    id: 42,
    use: "por o para",
    rule: "Colloquial: \"Para siempre\" is used to express \"Forever\"",
    example: "Nada es |para| siempre",
    translation: "Nothing lasts forever"
  },
  {
    id: 43,
    use: "por o para",
    rule: "Colloquial: \"Para variar\" is used to express \"For a change\"",
    example: "Hoy quiero helado de fresa |para| variar",
    translation: "Today, I want strawberry ice cream for a change"
  },
  {
    id: 44,
    use: "por o para",
    rule: "Colloquial: \"Para abajo/arriba/adelante/atras\" is used to express \"Downward/Upward/Forward/Backward\"",
    example: "Por favor, mueve la silla un poco |para| adelante",
    translation: "Move your chair a bit forward, please"
  },
  {
    id: 45,
    use: "por o para",
    rule: "Colloquial: \"Por loco\" is used to express \"Crazy/Madman\"",
    example: "Le tomaron |por| loco",
    translation: "They took him for a madman"
  },
  {
    id: 46,
    use: "por o para",
    rule: "Colloquial: \"Por aquí/ahí\" is used to express \"Around here\"",
    example: "El hombre ha estado |por| aquí",
    translation: "The man has been around here"
  },
  {
    id: 47,
    use: "por o para",
    rule: "To express division with \"dividido\"",
    example: "Sesenta dividido |por| dos son treinta",
    translation: "Sixty divided by two is thirty"
  },
  {
    id: 48,
    use: "por o para",
    rule: "Colloquial: \"Por desgracia\" is used to express \"Unfortunately\"",
    example: "Bueno, |por| desgracia, no tienes autorización",
    translation: "Well, unfortunately, you don't have clearance"
  },
  {
    id: 49,
    use: "por o para",
    rule: "Colloquial: \"Por eso\" is used to express \"That's why\"",
    example: "|Por| eso que eres perfecto para este lugar",
    translation: "That is why you are perfect for this place"
  },
  {
    id: 51,
    use: "por o para",
    rule: "Colloquial: \"Por un lado/Por otro lado\" is used to express \"On the one hand/On the other hand\"",
    example: "Por un lado, entiendo tu punto, pero no estoy de acuerdo contingo",
    translation: "On the one hand, I understand your point, but I don't agree with you"
  },
  {
    id: 52,
    use: "por o para",
    rule: "Colloquial: \"Por ningún lado\" is used to express \"Anywhere\" in the negative",
    example: "No lo encuentro |por| ningún lado",
    translation: "I can't find it anywhere"
  },
  {
    id: 53,
    use: "por o para",
    rule: "Colloquial: \"Por cierto\" is used to express \"By the way\"",
    example: "|Por| cierto, tienes un nuevo estudiante",
    translation: "By the way, you have a new student"
  },
  {
    id: 54,
    use: "por o para",
    rule: "Colloquial: \"Por completo\" is used to express \"Completely\"",
    example: "Eso cambia por completo la situación.",
    translation: "That completely changes the situation"
  },
  {
    id: 55,
    use: "por o para",
    rule: "Colloquial: \"Por casualidad\" is used to express \"By chance\"",
    example: "Lo encontré |por| casualidad",
    translation: "I found it by chance"
  },
  {
    id: 56,
    use: "por o para",
    rule: "Colloquial: \"Por lo visto\" is used to express \"Apparently\"",
    example: "Por lo visto, ella está embarazada",
    translation: "Apparently she is pregnant"
  },
  {
    id: 57,
    use: "por o para",
    rule: "Colloquial: \"Por lo tanto\" is used to express \"Therefore/Thus\"",
    example: "|Por| lo tanto la respuesta es no",
    translation: "Therefore the answer is no"
  },
  {
    id: 58,
    use: "por o para",
    rule: "Colloquial: \"Por adelantado\" is used to express \"In advance\"",
    example: "Compré el juego |por| adelantado",
    translation: "I bought the game in advance"
  },
  {
    id: 59,
    use: "por o para",
    rule: "Colloquial: \"Por lo mismo\" is used to express \"For the same reason/thing\"",
    example: "Yo he pagado mucho más |por| lo mismo",
    translation: "I've paid a lot more for the same thing"
  },
  {
    id: 60,
    use: "por o para",
    rule: "Colloquial: \"Por los pelos\" is used to express \"Barely/By the hair\"",
    example: "El ciclista ganó la carrera |por| los pelos",
    translation: "The cyclist won the race by a hair"
  },
  {
    id: 61,
    use: "por o para",
    rule: "Colloquial: \"Por lo menos\" is used to express \"At least\"",
    example: "Bueno, |por| lo menos esta vez no es tu problema",
    translation: "Well, at least this time it's not your problem"
  },
];

export default rules;