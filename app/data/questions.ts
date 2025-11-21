export type Difficulty = "easy" | "medium" | "hard";
export type Category = "general" | "science" | "history";
export type CategorySelection = Category | "mixed";
export type AnswerKey = "a" | "b" | "c" | "d";

export interface Question {
  question: string;
  answers: Record<AnswerKey, string>;
  correctAnswer: AnswerKey;
  hint: string;
  explanation: string;
  difficulty: Difficulty;
  category: Category;
  image: string | null;
}

export type QuestionBank = Record<Category, Question[]>;

export const questionBank: QuestionBank = {
  general: [
    {
      question: "What is the capital of France?",
      answers: {
        a: "London",
        b: "Berlin",
        c: "Paris",
        d: "Madrid",
      },
      correctAnswer: "c",
      hint: "This city is famous for the Eiffel Tower.",
      explanation:
        "Paris is the capital and largest city of France, known for its art, fashion, and culture.",
      difficulty: "easy",
      category: "general",
      image: null,
    },
    {
      question: "How many days are there in a week?",
      answers: {
        a: "5",
        b: "6",
        c: "7",
        d: "8",
      },
      correctAnswer: "c",
      hint: "Think about Monday through Sunday.",
      explanation:
        "A week consists of seven days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday.",
      difficulty: "easy",
      category: "general",
      image: null,
    },
    {
      question: "Which animal is known as the 'King of the Jungle'?",
      answers: {
        a: "Tiger",
        b: "Lion",
        c: "Elephant",
        d: "Leopard",
      },
      correctAnswer: "b",
      hint: "This animal has a magnificent mane and lives in Africa.",
      explanation:
        "Lions are often called the 'King of the Jungle' due to their majestic appearance and social dominance.",
      difficulty: "easy",
      category: "general",
      image: null,
    },
    {
      question: "What do we call frozen water?",
      answers: {
        a: "Steam",
        b: "Ice",
        c: "Snow",
        d: "Vapor",
      },
      correctAnswer: "b",
      hint: "You put this in your drinks to keep them cold.",
      explanation:
        "Ice is the solid form of water, created when water freezes at 0°C (32°F).",
      difficulty: "easy",
      category: "general",
      image: null,
    },
    {
      question: "Which is the largest planet in our solar system?",
      answers: {
        a: "Earth",
        b: "Jupiter",
        c: "Saturn",
        d: "Mars",
      },
      correctAnswer: "b",
      hint: "This planet is known for its Great Red Spot and has more than 70 moons.",
      explanation:
        "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined.",
      difficulty: "easy",
      category: "general",
      image: null,
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: {
        a: "Go",
        b: "Gd",
        c: "Au",
        d: "Ag",
      },
      correctAnswer: "c",
      hint: "This symbol comes from the Latin word 'aurum' meaning gold.",
      explanation:
        "The chemical symbol Au comes from the Latin word 'aurum', which means gold.",
      difficulty: "medium",
      category: "general",
      image: null,
    },
    {
      question: "In which year did the Berlin Wall fall?",
      answers: {
        a: "1987",
        b: "1989",
        c: "1991",
        d: "1993",
      },
      correctAnswer: "b",
      hint: "This event happened near the end of the 1980s and marked a major step toward German reunification.",
      explanation:
        "The Berlin Wall fell on November 9, 1989, marking the beginning of German reunification.",
      difficulty: "medium",
      category: "general",
      image: null,
    },
    {
      question: "What is the smallest country in the world?",
      answers: {
        a: "Monaco",
        b: "San Marino",
        c: "Vatican City",
        d: "Liechtenstein",
      },
      correctAnswer: "c",
      hint: "This country is entirely enclosed by Rome, Italy, and is the spiritual center of Catholicism.",
      explanation:
        "Vatican City is the smallest sovereign nation in the world, covering just 0.17 square miles.",
      difficulty: "medium",
      category: "general",
      image: null,
    },
    {
      question: "Which programming language was created by Guido van Rossum?",
      answers: {
        a: "Java",
        b: "Python",
        c: "C++",
        d: "JavaScript",
      },
      correctAnswer: "b",
      hint: "This language is named after a British comedy group and is popular for data science.",
      explanation:
        "Python was created by Guido van Rossum and first released in 1991. It's named after Monty Python.",
      difficulty: "medium",
      category: "general",
      image: null,
    },
    {
      question: "What is the currency of Japan?",
      answers: {
        a: "Won",
        b: "Yuan",
        c: "Yen",
        d: "Rupee",
      },
      correctAnswer: "c",
      hint: "This currency's symbol is ¥ and it's one of the major reserve currencies.",
      explanation:
        "The Japanese Yen (¥) is the official currency of Japan and the third most traded currency in the world.",
      difficulty: "medium",
      category: "general",
      image: null,
    },
    {
      question: "What is the Planck constant approximately equal to?",
      answers: {
        a: "6.626 × 10^-34 J⋅s",
        b: "1.602 × 10^-19 C",
        c: "9.109 × 10^-31 kg",
        d: "1.381 × 10^-23 J/K",
      },
      correctAnswer: "a",
      hint: "This fundamental constant relates energy and frequency in quantum mechanics.",
      explanation:
        "Planck's constant (h ≈ 6.626 × 10^-34 J⋅s) is fundamental to quantum mechanics and relates photon energy to frequency.",
      difficulty: "hard",
      category: "general",
      image: null,
    },
    {
      question: "Which philosopher wrote 'Critique of Pure Reason'?",
      answers: {
        a: "Friedrich Nietzsche",
        b: "Immanuel Kant",
        c: "Georg Hegel",
        d: "Arthur Schopenhauer",
      },
      correctAnswer: "b",
      hint: "This German philosopher from Königsberg developed transcendental idealism.",
      explanation:
        "Immanuel Kant wrote 'Critique of Pure Reason' (1781), a foundational work in modern philosophy.",
      difficulty: "hard",
      category: "general",
      image: null,
    },
    {
      question: "What is the rarest naturally occurring element on Earth?",
      answers: {
        a: "Francium",
        b: "Astatine",
        c: "Promethium",
        d: "Technetium",
      },
      correctAnswer: "b",
      hint: "This halogen element is extremely radioactive with a very short half-life.",
      explanation:
        "Astatine is the rarest naturally occurring element, with less than 30 grams existing on Earth at any time.",
      difficulty: "hard",
      category: "general",
      image: null,
    },
    {
      question: "Which mathematician proved Fermat's Last Theorem?",
      answers: {
        a: "Grigori Perelman",
        b: "Andrew Wiles",
        c: "Terence Tao",
        d: "Alexander Grothendieck",
      },
      correctAnswer: "b",
      hint: "This British mathematician completed the proof in 1995 after working on it for seven years.",
      explanation:
        "Andrew Wiles proved Fermat's Last Theorem in 1995, solving a problem that had remained unsolved for 358 years.",
      difficulty: "hard",
      category: "general",
      image: null,
    },
    {
      question: "What is the name of the theoretical boundary around a black hole?",
      answers: {
        a: "Photon Sphere",
        b: "Ergosphere",
        c: "Event Horizon",
        d: "Schwarzschild Radius",
      },
      correctAnswer: "c",
      hint: "Beyond this point, nothing can escape the black hole's gravitational pull, not even light.",
      explanation:
        "The event horizon is the boundary beyond which nothing, including light, can escape a black hole's gravitational pull.",
      difficulty: "hard",
      category: "general",
      image: null,
    },
  ],
  science: [
    {
      question: "What gas do plants absorb from the atmosphere?",
      answers: {
        a: "Oxygen",
        b: "Nitrogen",
        c: "Carbon Dioxide",
        d: "Hydrogen",
      },
      correctAnswer: "c",
      hint: "Plants use this gas along with sunlight and water to make food through photosynthesis.",
      explanation:
        "Plants absorb carbon dioxide (CO₂) from the atmosphere and convert it to oxygen through photosynthesis.",
      difficulty: "easy",
      category: "science",
      image: null,
    },
    {
      question: "How many bones are in an adult human body?",
      answers: {
        a: "186",
        b: "206",
        c: "226",
        d: "246",
      },
      correctAnswer: "b",
      hint: "This number is slightly more than 200.",
      explanation:
        "An adult human body has 206 bones, while babies are born with about 270 bones that fuse as they grow.",
      difficulty: "easy",
      category: "science",
      image: null,
    },
    {
      question: "What is the chemical formula for water?",
      answers: {
        a: "CO₂",
        b: "H₂O",
        c: "NaCl",
        d: "O₂",
      },
      correctAnswer: "b",
      hint: "This formula shows 2 hydrogen atoms and 1 oxygen atom.",
      explanation:
        "Water's chemical formula is H₂O, consisting of two hydrogen atoms bonded to one oxygen atom.",
      difficulty: "easy",
      category: "science",
      image: null,
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      answers: {
        a: "Venus",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
      },
      correctAnswer: "b",
      hint: "This planet appears red due to iron oxide on its surface.",
      explanation:
        "Mars is called the Red Planet because of the iron oxide (rust) on its surface.",
      difficulty: "easy",
      category: "science",
      image: null,
    },
    {
      question: "What is the center of an atom called?",
      answers: {
        a: "Electron",
        b: "Proton",
        c: "Nucleus",
        d: "Neutron",
      },
      correctAnswer: "c",
      hint: "This is where protons and neutrons are found in an atom.",
      explanation:
        "The nucleus is the dense center of an atom, containing protons and neutrons.",
      difficulty: "easy",
      category: "science",
      image: null,
    },
    {
      question: "Which element has the atomic number 1?",
      answers: {
        a: "Helium",
        b: "Hydrogen",
        c: "Lithium",
        d: "Carbon",
      },
      correctAnswer: "b",
      hint: "This is the lightest and most abundant element in the universe.",
      explanation:
        "Hydrogen has atomic number 1, making it the simplest and lightest element.",
      difficulty: "medium",
      category: "science",
      image: null,
    },
    {
      question: "What does DNA stand for?",
      answers: {
        a: "Deoxyribonucleic Acid",
        b: "Dinitrogen Acid",
        c: "Dynamic Nuclear Acid",
        d: "Deoxyribose Nucleic Acid",
      },
      correctAnswer: "a",
      hint: "This molecule carries genetic information in living organisms.",
      explanation:
        "DNA stands for Deoxyribonucleic Acid, the molecule that carries genetic instructions.",
      difficulty: "medium",
      category: "science",
      image: null,
    },
    {
      question: "What is Newton's second law of motion?",
      answers: {
        a: "F = ma",
        b: "E = mc²",
        c: "P = mv",
        d: "W = Fd",
      },
      correctAnswer: "a",
      hint: "This law relates force, mass, and acceleration.",
      explanation: "Newton's second law states that Force equals mass times acceleration (F = ma).",
      difficulty: "medium",
      category: "science",
      image: null,
    },
    {
      question: "Which type of blood cell fights infections?",
      answers: {
        a: "Red blood cells",
        b: "White blood cells",
        c: "Platelets",
        d: "Plasma cells",
      },
      correctAnswer: "b",
      hint: "These cells are part of the immune system and help defend against pathogens.",
      explanation:
        "White blood cells (leukocytes) are part of the immune system and help fight infections and diseases.",
      difficulty: "medium",
      category: "science",
      image: null,
    },
    {
      question: "What is the pH of pure water at 25°C?",
      answers: {
        a: "6",
        b: "7",
        c: "8",
        d: "9",
      },
      correctAnswer: "b",
      hint: "This value indicates a neutral solution, neither acidic nor basic.",
      explanation:
        "Pure water has a pH of 7 at 25°C, which is considered neutral on the pH scale.",
      difficulty: "medium",
      category: "science",
      image: null,
    },
    {
      question: "What is the speed of light in vacuum?",
      answers: {
        a: "299,792,458 m/s",
        b: "300,000,000 m/s",
        c: "299,792,458 km/s",
        d: "300,000,000 km/s",
      },
      correctAnswer: "a",
      hint: "This is one of the fundamental constants in physics, measured very precisely.",
      explanation:
        "The speed of light in vacuum is exactly 299,792,458 meters per second, a fundamental constant.",
      difficulty: "hard",
      category: "science",
      image: null,
    },
    {
      question:
        "Which particle was theorized by Peter Higgs and discovered at CERN in 2012?",
      answers: {
        a: "Graviton",
        b: "Higgs Boson",
        c: "Axion",
        d: "Muon",
      },
      correctAnswer: "b",
      hint: "This particle is associated with the mechanism that gives mass to other particles.",
      explanation:
        "The Higgs Boson, discovered in 2012, is crucial to understanding how particles acquire mass.",
      difficulty: "hard",
      category: "science",
      image: null,
    },
    {
      question:
        "What is the name of the process by which heavy atomic nuclei split into lighter nuclei?",
      answers: {
        a: "Nuclear fusion",
        b: "Nuclear fission",
        c: "Beta decay",
        d: "Alpha decay",
      },
      correctAnswer: "b",
      hint: "This process is used in nuclear power plants and atomic bombs.",
      explanation:
        "Nuclear fission is the process where heavy atomic nuclei split into lighter nuclei, releasing energy.",
      difficulty: "hard",
      category: "science",
      image: null,
    },
    {
      question: "Which enzyme is responsible for unwinding DNA during replication?",
      answers: {
        a: "DNA polymerase",
        b: "RNA polymerase",
        c: "Helicase",
        d: "Ligase",
      },
      correctAnswer: "c",
      hint: "This enzyme 'unzips' the double helix structure of DNA.",
      explanation:
        "Helicase is the enzyme that unwinds and separates the two strands of DNA during replication.",
      difficulty: "hard",
      category: "science",
      image: null,
    },
    {
      question: "What is the uncertainty principle in quantum mechanics?",
      answers: {
        a: "ΔE·Δt ≥ ℏ/2",
        b: "Δx·Δp ≥ ℏ/2",
        c: "Both A and B",
        d: "Neither A nor B",
      },
      correctAnswer: "c",
      hint: "This principle states that certain pairs of properties cannot be measured simultaneously with perfect precision.",
      explanation:
        "Heisenberg's uncertainty principle applies to energy-time and position-momentum, limiting simultaneous precision.",
      difficulty: "hard",
      category: "science",
      image: null,
    },
  ],
  history: [
    {
      question: "Who was the first President of the United States?",
      answers: {
        a: "Thomas Jefferson",
        b: "George Washington",
        c: "Abraham Lincoln",
        d: "John Adams",
      },
      correctAnswer: "b",
      hint: "This founding father is known as the 'Father of His Country'.",
      explanation:
        "George Washington was the first President of the United States, serving from 1789 to 1797.",
      difficulty: "easy",
      category: "history",
      image: null,
    },
    {
      question: "In which year did World War II end?",
      answers: {
        a: "1944",
        b: "1945",
        c: "1946",
        d: "1943",
      },
      correctAnswer: "b",
      hint: "This year saw the atomic bombings of Japan and Germany's surrender.",
      explanation:
        "World War II ended in 1945 with Japan's surrender in September.",
      difficulty: "easy",
      category: "history",
      image: null,
    },
    {
      question: "Who was the first person to walk on the moon?",
      answers: {
        a: "Buzz Aldrin",
        b: "Neil Armstrong",
        c: "John Glenn",
        d: "Alan Shepard",
      },
      correctAnswer: "b",
      hint: "This astronaut said 'That's one small step for man, one giant leap for mankind.'",
      explanation:
        "Neil Armstrong was the first human to walk on the moon during the Apollo 11 mission in 1969.",
      difficulty: "easy",
      category: "history",
      image: null,
    },
    {
      question: "Which ship sank in 1912 after hitting an iceberg?",
      answers: {
        a: "Lusitania",
        b: "Titanic",
        c: "Britannic",
        d: "Olympic",
      },
      correctAnswer: "b",
      hint: "This 'unsinkable' ship's maiden voyage ended in tragedy in the North Atlantic.",
      explanation:
        "The RMS Titanic sank on April 15, 1912, during its maiden voyage from Southampton to New York City.",
      difficulty: "easy",
      category: "history",
      image: null,
    },
    {
      question: "In which country did the Renaissance begin?",
      answers: {
        a: "France",
        b: "Germany",
        c: "Italy",
        d: "England",
      },
      correctAnswer: "c",
      hint: "This country is home to cities like Florence and Venice, centers of art and culture.",
      explanation:
        "The Renaissance began in Italy in the 14th century, starting in cities like Florence.",
      difficulty: "easy",
      category: "history",
      image: null,
    },
    {
      question: "Which ancient wonder of the world was located in Alexandria?",
      answers: {
        a: "Hanging Gardens",
        b: "Colossus of Rhodes",
        c: "Lighthouse of Alexandria",
        d: "Temple of Artemis",
      },
      correctAnswer: "c",
      hint: "This structure helped ships navigate safely into the harbor.",
      explanation:
        "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World.",
      difficulty: "medium",
      category: "history",
      image: null,
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: {
        a: "Vincent van Gogh",
        b: "Pablo Picasso",
        c: "Leonardo da Vinci",
        d: "Michelangelo",
      },
      correctAnswer: "c",
      hint: "This Renaissance artist was also an inventor and scientist.",
      explanation:
        "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519.",
      difficulty: "medium",
      category: "history",
      image: null,
    },
    {
      question: "Which empire was ruled by Julius Caesar?",
      answers: {
        a: "Greek Empire",
        b: "Roman Empire",
        c: "Byzantine Empire",
        d: "Persian Empire",
      },
      correctAnswer: "b",
      hint: "This empire's capital was Rome and it lasted for over 1000 years.",
      explanation:
        "Julius Caesar was a Roman general and statesman who played a critical role in the Roman Empire.",
      difficulty: "medium",
      category: "history",
      image: null,
    },
    {
      question: "The French Revolution began in which year?",
      answers: {
        a: "1789",
        b: "1799",
        c: "1769",
        d: "1779",
      },
      correctAnswer: "a",
      hint: "This revolution started the same year George Washington became the first U.S. President.",
      explanation:
        "The French Revolution began in 1789 with the storming of the Bastille on July 14.",
      difficulty: "medium",
      category: "history",
      image: null,
    },
    {
      question: "Who was the British Prime Minister during most of World War II?",
      answers: {
        a: "Neville Chamberlain",
        b: "Winston Churchill",
        c: "Clement Attlee",
        d: "Anthony Eden",
      },
      correctAnswer: "b",
      hint: "This leader was famous for his inspiring speeches and the phrase 'We shall never surrender.'",
      explanation:
        "Winston Churchill served as British Prime Minister from 1940-1945 and 1951-1955.",
      difficulty: "medium",
      category: "history",
      image: null,
    },
    {
      question: "Which civilization built Machu Picchu?",
      answers: {
        a: "Maya",
        b: "Aztec",
        c: "Inca",
        d: "Olmec",
      },
      correctAnswer: "c",
      hint: "This South American civilization was centered in what is now Peru.",
      explanation:
        "Machu Picchu was built by the Inca civilization around 1450 CE in what is now Peru.",
      difficulty: "medium",
      category: "history",
      image: null,
    },
    {
      question:
        "The Treaty of Westphalia, ending the Thirty Years' War, was signed in which year?",
      answers: {
        a: "1648",
        b: "1658",
        c: "1638",
        d: "1668",
      },
      correctAnswer: "a",
      hint: "This treaty established the principle of national sovereignty and ended religious wars in Europe.",
      explanation:
        "The Treaty of Westphalia was signed in 1648, establishing modern concepts of state sovereignty.",
      difficulty: "hard",
      category: "history",
      image: null,
    },
    {
      question:
        "Who wrote 'The Histories', considered the first work of history in Western literature?",
      answers: {
        a: "Thucydides",
        b: "Herodotus",
        c: "Xenophon",
        d: "Plutarch",
      },
      correctAnswer: "b",
      hint: "This ancient Greek historian is often called the 'Father of History.'",
      explanation:
        "Herodotus wrote 'The Histories', documenting the Greco-Persian Wars and earning the title 'Father of History.'",
      difficulty: "hard",
      category: "history",
      image: null,
    },
    {
      question:
        "The Defenestration of Prague in 1618 sparked which major conflict?",
      answers: {
        a: "War of Austrian Succession",
        b: "Thirty Years' War",
        c: "Seven Years' War",
        d: "War of Spanish Succession",
      },
      correctAnswer: "b",
      hint: "This religious and political conflict devastated Central Europe in the 17th century.",
      explanation:
        "The Defenestration of Prague in 1618 triggered the Thirty Years' War, one of Europe's most destructive conflicts.",
      difficulty: "hard",
      category: "history",
      image: null,
    },
    {
      question:
        "Which Byzantine Emperor attempted to reconquer the Western Roman Empire?",
      answers: {
        a: "Constantine I",
        b: "Justinian I",
        c: "Leo III",
        d: "Basil II",
      },
      correctAnswer: "b",
      hint: "This emperor is also known for commissioning a comprehensive legal code.",
      explanation:
        "Justinian I (527-565 CE) attempted to reconquer the Western Roman Empire and created the Corpus Juris Civilis.",
      difficulty: "hard",
      category: "history",
      image: null,
    },
    {
      question: "The Sykes-Picot Agreement of 1916 divided which region?",
      answers: {
        a: "Africa",
        b: "Southeast Asia",
        c: "Middle East",
        d: "Eastern Europe",
      },
      correctAnswer: "c",
      hint: "This secret agreement between Britain and France carved up Ottoman territories after WWI.",
      explanation:
        "The Sykes-Picot Agreement divided Ottoman Middle Eastern territories between British and French spheres of influence.",
      difficulty: "hard",
      category: "history",
      image: null,
    },
  ],
};

export const TOTAL_QUESTIONS = 10;

