import React, { useState, useEffect, useRef } from 'react';

// Predefined data for periodic elements.
// This includes atomic number, symbol, and name for all 118 elements, now in English.
const PERIODIC_TABLE_DATA = [
    { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', group: 1, period: 1, type: 'nonmetal' },
    { atomicNumber: 2, symbol: 'He', name: 'Helium', group: 18, period: 1, type: 'noble-gas' },
    { atomicNumber: 3, symbol: 'Li', name: 'Lithium', group: 1, period: 2, type: 'alkali-metal' },
    { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', group: 2, period: 2, type: 'alkaline-earth-metal' },
    { atomicNumber: 5, symbol: 'B', name: 'Boron', group: 13, period: 2, type: 'metalloid' },
    { atomicNumber: 6, symbol: 'C', name: 'Carbon', group: 14, period: 2, type: 'nonmetal' },
    { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', group: 15, period: 2, type: 'nonmetal' },
    { atomicNumber: 8, symbol: 'O', name: 'Oxygen', group: 16, period: 2, type: 'nonmetal' },
    { atomicNumber: 9, symbol: 'F', name: 'Fluorine', group: 17, period: 2, type: 'halogen' },
    { atomicNumber: 10, symbol: 'Ne', name: 'Neon', group: 18, period: 2, type: 'noble-gas' },
    { atomicNumber: 11, symbol: 'Na', name: 'Sodium', group: 1, period: 3, type: 'alkali-metal' },
    { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', group: 2, period: 3, type: 'alkaline-earth-metal' },
    { atomicNumber: 13, symbol: 'Al', name: 'Aluminum', group: 13, period: 3, type: 'post-transition-metal' },
    { atomicNumber: 14, symbol: 'Si', name: 'Silicon', group: 14, period: 3, type: 'metalloid' },
    { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', group: 15, period: 3, type: 'nonmetal' },
    { atomicNumber: 16, symbol: 'S', name: 'Sulfur', group: 16, period: 3, type: 'nonmetal' },
    { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', group: 17, period: 3, type: 'halogen' },
    { atomicNumber: 18, symbol: 'Ar', name: 'Argon', group: 18, period: 3, type: 'noble-gas' },
    { atomicNumber: 19, symbol: 'K', name: 'Potassium', group: 1, period: 4, type: 'alkali-metal' },
    { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', group: 2, period: 4, type: 'alkaline-earth-metal' },
    { atomicNumber: 21, symbol: 'Sc', name: 'Scandium', group: 3, period: 4, type: 'transition-metal' },
    { atomicNumber: 22, symbol: 'Ti', name: 'Titanium', group: 4, period: 4, type: 'transition-metal' },
    { atomicNumber: 23, symbol: 'V', name: 'Vanadium', group: 5, period: 4, type: 'transition-metal' },
    { atomicNumber: 24, symbol: 'Cr', name: 'Chromium', group: 6, period: 4, type: 'transition-metal' },
    { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', group: 7, period: 4, type: 'transition-metal' },
    { atomicNumber: 26, symbol: 'Fe', name: 'Iron', group: 8, period: 4, type: 'transition-metal' },
    { atomicNumber: 27, symbol: 'Co', name: 'Cobalt', group: 9, period: 4, type: 'transition-metal' },
    { atomicNumber: 28, symbol: 'Ni', name: 'Nickel', group: 10, period: 4, type: 'transition-metal' },
    { atomicNumber: 29, symbol: 'Cu', name: 'Copper', group: 11, period: 4, type: 'transition-metal' },
    { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', group: 12, period: 4, type: 'transition-metal' },
    { atomicNumber: 31, symbol: 'Ga', name: 'Gallium', group: 13, period: 4, type: 'post-transition-metal' },
    { atomicNumber: 32, symbol: 'Ge', name: 'Germanium', group: 14, period: 4, type: 'metalloid' },
    { atomicNumber: 33, symbol: 'As', name: 'Arsenic', group: 15, period: 4, type: 'metalloid' },
    { atomicNumber: 34, symbol: 'Se', name: 'Selenium', group: 16, period: 4, type: 'nonmetal' },
    { atomicNumber: 35, symbol: 'Br', name: 'Bromine', group: 17, period: 4, type: 'halogen' },
    { atomicNumber: 36, symbol: 'Kr', name: 'Krypton', group: 18, period: 4, type: 'noble-gas' },
    { atomicNumber: 37, symbol: 'Rb', name: 'Rubidium', group: 1, period: 5, type: 'alkali-metal' },
    { atomicNumber: 38, symbol: 'Sr', name: 'Strontium', group: 2, period: 5, type: 'alkaline-earth-metal' },
    { atomicNumber: 39, symbol: 'Y', name: 'Yttrium', group: 3, period: 5, type: 'transition-metal' },
    { atomicNumber: 40, symbol: 'Zr', name: 'Zirconium', group: 4, period: 5, type: 'transition-metal' },
    { atomicNumber: 41, symbol: 'Nb', name: 'Niobium', group: 5, period: 5, type: 'transition-metal' },
    { atomicNumber: 42, symbol: 'Mo', name: 'Molybdenum', group: 6, period: 5, type: 'transition-metal' },
    { atomicNumber: 43, symbol: 'Tc', name: 'Technetium', group: 7, period: 5, type: 'transition-metal' },
    { atomicNumber: 44, symbol: 'Ru', name: 'Ruthenium', group: 8, period: 5, type: 'transition-metal' },
    { atomicNumber: 45, symbol: 'Rh', name: 'Rhodium', group: 9, period: 5, type: 'transition-metal' },
    { atomicNumber: 46, symbol: 'Pd', name: 'Palladium', group: 10, period: 5, type: 'transition-metal' },
    { atomicNumber: 47, symbol: 'Ag', name: 'Silver', group: 11, period: 5, type: 'transition-metal' },
    { atomicNumber: 48, symbol: 'Cd', name: 'Cadmium', group: 12, period: 5, type: 'transition-metal' },
    { atomicNumber: 49, symbol: 'In', name: 'Indium', group: 13, period: 5, type: 'post-transition-metal' },
    { atomicNumber: 50, symbol: 'Sn', name: 'Tin', group: 14, period: 5, type: 'post-transition-metal' },
    { atomicNumber: 51, symbol: 'Sb', name: 'Antimony', group: 15, period: 5, type: 'metalloid' },
    { atomicNumber: 52, symbol: 'Te', name: 'Tellurium', group: 16, period: 5, type: 'metalloid' },
    { atomicNumber: 53, symbol: 'I', name: 'Iodine', group: 17, period: 5, type: 'halogen' },
    { atomicNumber: 54, symbol: 'Xe', name: 'Xenon', group: 18, period: 5, type: 'noble-gas' },
    { atomicNumber: 55, symbol: 'Cs', name: 'Cesium', group: 1, period: 6, type: 'alkali-metal' },
    { atomicNumber: 56, symbol: 'Ba', name: 'Barium', group: 2, period: 6, type: 'alkaline-earth-metal' },
    { atomicNumber: 57, symbol: 'La', name: 'Lanthanum', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 58, symbol: 'Ce', name: 'Cerium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 59, symbol: 'Pr', name: 'Praseodymium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 60, symbol: 'Nd', name: 'Neodymium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 61, symbol: 'Pm', name: 'Promethium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 62, symbol: 'Sm', name: 'Samarium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 63, symbol: 'Eu', name: 'Europium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 64, symbol: 'Gd', name: 'Gadolinium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 65, symbol: 'Tb', name: 'Terbium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 66, symbol: 'Dy', name: 'Dysprosium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 67, symbol: 'Ho', name: 'Holmium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 68, symbol: 'Er', name: 'Erbium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 69, symbol: 'Tm', name: 'Thulium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 70, symbol: 'Yb', name: 'Ytterbium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 71, symbol: 'Lu', name: 'Lutetium', group: 3, period: 6, type: 'lanthanide' },
    { atomicNumber: 72, symbol: 'Hf', name: 'Hafnium', group: 4, period: 6, type: 'transition-metal' },
    { atomicNumber: 73, symbol: 'Ta', name: 'Tantalum', group: 5, period: 6, type: 'transition-metal' },
    { atomicNumber: 74, symbol: 'W', name: 'Tungsten', group: 6, period: 6, type: 'transition-metal' },
    { atomicNumber: 75, symbol: 'Re', name: 'Rhenium', group: 7, period: 6, type: 'transition-metal' },
    { atomicNumber: 76, symbol: 'Os', name: 'Osmium', group: 8, period: 6, type: 'transition-metal' },
    { atomicNumber: 77, symbol: 'Ir', name: 'Iridium', group: 9, period: 6, type: 'transition-metal' },
    { atomicNumber: 78, symbol: 'Pt', name: 'Platinum', group: 10, period: 6, type: 'transition-metal' },
    { atomicNumber: 79, symbol: 'Au', name: 'Gold', group: 11, period: 6, type: 'transition-metal' },
    { atomicNumber: 80, symbol: 'Hg', name: 'Mercury', group: 12, period: 6, type: 'transition-metal' },
    { atomicNumber: 81, symbol: 'Tl', name: 'Thallium', group: 13, period: 6, type: 'post-transition-metal' },
    { atomicNumber: 82, symbol: 'Pb', name: 'Lead', group: 14, period: 6, type: 'post-transition-metal' },
    { atomicNumber: 83, symbol: 'Bi', name: 'Bismuth', group: 15, period: 6, type: 'post-transition-metal' },
    { atomicNumber: 84, symbol: 'Po', name: 'Polonium', group: 16, period: 6, type: 'metalloid' },
    { atomicNumber: 85, symbol: 'At', name: 'Astatine', group: 17, period: 6, type: 'halogen' },
    { atomicNumber: 86, symbol: 'Rn', name: 'Radon', group: 18, period: 6, type: 'noble-gas' },
    { atomicNumber: 87, symbol: 'Fr', name: 'Francium', group: 1, period: 7, type: 'alkali-metal' },
    { atomicNumber: 88, symbol: 'Ra', name: 'Radium', group: 2, period: 7, type: 'alkaline-earth-metal' },
    { atomicNumber: 89, symbol: 'Ac', name: 'Actinium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 90, symbol: 'Th', name: 'Thorium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 91, symbol: 'Pa', name: 'Protactinium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 92, symbol: 'U', name: 'Uranium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 93, symbol: 'Np', name: 'Neptunium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 94, symbol: 'Pu', name: 'Plutonium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 95, symbol: 'Am', name: 'Americium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 96, symbol: 'Cm', name: 'Curium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 97, symbol: 'Bk', name: 'Berkelium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 98, symbol: 'Cf', name: 'Californium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 99, symbol: 'Es', name: 'Einsteinium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 100, symbol: 'Fm', name: 'Fermium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 101, symbol: 'Md', name: 'Mendelevium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 102, symbol: 'No', name: 'Nobelium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 103, symbol: 'Lr', name: 'Lawrencium', group: 3, period: 7, type: 'actinide' },
    { atomicNumber: 104, symbol: 'Rf', name: 'Rutherfordium', group: 4, period: 7, type: 'transition-metal' },
    { atomicNumber: 105, symbol: 'Db', name: 'Dubnium', group: 5, period: 7, type: 'transition-metal' },
    { atomicNumber: 106, symbol: 'Sg', name: 'Seaborgium', group: 6, period: 7, type: 'transition-metal' },
    { atomicNumber: 107, symbol: 'Bh', name: 'Bohrium', group: 7, period: 7, type: 'transition-metal' },
    { atomicNumber: 108, symbol: 'Hs', name: 'Hassium', group: 8, period: 7, type: 'transition-metal' },
    { atomicNumber: 109, symbol: 'Mt', name: 'Meitnerium', group: 9, period: 7, type: 'unknown-properties' },
    { atomicNumber: 110, symbol: 'Ds', name: 'Darmstadtium', group: 10, period: 7, type: 'unknown-properties' },
    { atomicNumber: 111, symbol: 'Rg', name: 'Roentgenium', group: 11, period: 7, type: 'unknown-properties' },
    { atomicNumber: 112, symbol: 'Cn', name: 'Copernicium', group: 12, period: 7, type: 'transition-metal' },
    { atomicNumber: 113, symbol: 'Nh', name: 'Nihonium', group: 13, period: 7, type: 'unknown-properties' },
    { atomicNumber: 114, symbol: 'Fl', name: 'Flerovium', group: 14, period: 7, type: 'post-transition-metal' },
    { atomicNumber: 115, symbol: 'Mc', name: 'Moscovium', group: 15, period: 7, type: 'unknown-properties' },
    { atomicNumber: 116, symbol: 'Lv', name: 'Livermorium', group: 16, period: 7, type: 'unknown-properties' },
    { atomicNumber: 117, symbol: 'Ts', name: 'Tennessine', group: 17, period: 7, type: 'unknown-properties' },
    { atomicNumber: 118, symbol: 'Og', name: 'Oganesson', group: 18, period: 7, type: 'unknown-properties' },
];

// Main App component for the Periodic Table Quiz
const App = () => {
    // State to store the list of periodic elements
    const [elements, setElements] = useState([]);
    // State for the current element being guessed
    const [currentElement, setCurrentElement] = useState(null);
    // State for the user's input name
    const [guessName, setGuessName] = useState('');
    // State for the message displayed to the user (e.g., "Correct!", "Incorrect!")
    const [message, setMessage] = useState('');
    // State for the type of message (success, error, info)
    const [messageType, setMessageType] = useState('');
    // State to highlight the guessed element's cell on the table
    const [highlightedAtomicNumber, setHighlightedAtomicNumber] = useState(null);
    // State to indicate if the guess was correct, used for styling the guessed cell
    const [isGuessCorrect, setIsGuessCorrect] = useState(null);
    // Ref for the name input field to focus it automatically
    const nameInputRef = useRef(null);
    // State for the number of correct guesses
    const [correctCount, setCorrectCount] = useState(0);
    // State for the number of incorrect guesses
    const [incorrectCount, setIncorrectCount] = useState(0);


    // Function to start a new round of the quiz
    const startNewRound = (availableElements) => {
        // Clear previous state
        setGuessName('');
        setMessage('');
        setMessageType('');
        setHighlightedAtomicNumber(null); // No element highlighted by default
        setIsGuessCorrect(null); // Reset highlight color
        nameInputRef.current?.focus(); // Focus the input field
        // Select a random element from the filtered list
        const randomIndex = Math.floor(Math.random() * availableElements.length);
        setCurrentElement(availableElements[randomIndex]);
    };


    // Filter elements based on the exclusion list and initialize the quiz
    // This useEffect will now run only once on component mount
    useEffect(() => {
        const excludedRanges = [
            [39, 45],
            [57, 77],
            [89, 118]
        ];

        const filteredElements = PERIODIC_TABLE_DATA.filter(element => {
            return !excludedRanges.some(range =>
                element.atomicNumber >= range[0] && element.atomicNumber <= range[1]
            );
        });
        setElements(filteredElements);
        if (filteredElements.length > 0) {
            // Call startNewRound only after elements are set and it's the initial load
            startNewRound(filteredElements);
        }
    }, []); // Empty dependency array: runs only once on component mount


    // Handler for name input change
    const handleNameInputChange = (event) => {
        setGuessName(event.target.value);
    };

    // Handler for submitting the name guess
    const handleNameSubmit = (event) => {
        event.preventDefault();
        if (!currentElement) return;

        // Normalize names for comparison (lowercase, trim, remove accents)
        const normalizeString = (str) => {
            return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        const correctName = normalizeString(currentElement.name);
        const userGuess = normalizeString(guessName);

        if (userGuess === correctName) {
            // Correct name guess, user still needs to click the cell
            setMessage('Correct Name! Now click on the correct cell in the periodic table.');
            setMessageType('info');
        } else {
            // Incorrect name guess
            setMessage(`Incorrect Name! The correct name was: ${currentElement.name}`);
            setMessageType('error');
            setIncorrectCount(prev => prev + 1);
            setHighlightedAtomicNumber(currentElement.atomicNumber); // Highlight the correct cell
            setIsGuessCorrect(false); // Indicate incorrect guess (for name)
            setTimeout(() => {
                startNewRound(elements); // Move to next round after a delay
            }, 2000);
        }
    };

    // Handler for clicking an element cell on the periodic table
    const handleElementClick = (atomicNumberClicked) => {
        if (!currentElement) return;

        const correctAtomicNumber = currentElement.atomicNumber;
        const clickedElement = elements.find(e => e.atomicNumber === atomicNumberClicked);

        if (atomicNumberClicked === correctAtomicNumber) {
            // Correct cell clicked
            if (normalizeString(guessName) === normalizeString(currentElement.name)) {
                setMessage('Both Correct! Well done!');
                setMessageType('success');
                setCorrectCount(prev => prev + 1);
            } else {
                setMessage('Correct Cell! But the name was incorrect. The correct name was: ' + currentElement.name);
                setMessageType('error');
                setIncorrectCount(prev => prev + 1);
            }
            setHighlightedAtomicNumber(correctAtomicNumber);
            setIsGuessCorrect(true);
            setTimeout(() => {
                startNewRound(elements); // Move to next round after a delay
            }, 2000);
        } else {
            // Incorrect cell clicked
            setMessage(`Incorrect Cell! That is ${clickedElement?.name}. The current element was ${currentElement.name}.`);
            setMessageType('error');
            setIncorrectCount(prev => prev + 1);
            setHighlightedAtomicNumber(atomicNumberClicked); // Highlight the incorrectly clicked cell first
            setIsGuessCorrect(false); // Mark it as incorrect

            setTimeout(() => {
                setHighlightedAtomicNumber(correctAtomicNumber); // Then highlight the correct cell
                setIsGuessCorrect(true); // Mark it as correct
                setTimeout(() => {
                    startNewRound(elements); // Move to next round after another delay
                }, 1500); // Show correct one for 1.5 seconds
            }, 1500); // Show incorrect one for 1.5 seconds
        }
    };

    // CSS classes for different element types for styling
    const getTypeClass = (type) => {
        switch (type) {
            case 'alkali-metal': return 'element-type-alkali-metal';
            case 'alkaline-earth-metal': return 'element-type-alkaline-earth-metal';
            case 'transition-metal': return 'element-type-transition-metal';
            case 'post-transition-metal': return 'element-type-post-transition-metal';
            case 'metalloid': return 'element-type-metalloid';
            case 'nonmetal': return 'element-type-nonmetal';
            case 'halogen': return 'element-type-halogen';
            case 'noble-gas': return 'element-type-noble-gas';
            case 'lanthanide': return 'element-type-lanthanide';
            case 'actinide': return 'element-type-actinide';
            case 'unknown-properties': return 'element-type-unknown-properties';
            default: return 'element-type-default';
        }
    };

    // Helper to normalize strings for comparison (lowercase, trim, remove accents)
    const normalizeString = (str) => {
        return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    return (
        <div className="container">
            {/* CSS Styles */}
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

                body {
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                    background: linear-gradient(to bottom right, #e0f2fe, #e9d5ff); /* bg-gradient-to-br from-blue-100 to-purple-200 */
                    min-height: 100vh;
                    padding: 1rem; /* p-4 */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 1rem; /* p-4 */
                    min-height: 100vh;
                    width: 100%;
                }

                .title {
                    font-size: 2.5rem; /* text-4xl */
                    font-weight: bold; /* font-bold */
                    color: #2d3748; /* text-gray-800 */
                    margin-bottom: 1.5rem; /* mb-6 */
                    text-align: center; /* text-center */
                    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* drop-shadow-lg */
                }

                @media (min-width: 768px) { /* md:text-5xl */
                    .title {
                        font-size: 3rem;
                    }
                }

                .scoreboard-card {
                    background-color: #ffffff; /* bg-white */
                    border-radius: 0.75rem; /* rounded-xl */
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
                    padding: 1.5rem; /* p-6 */
                    margin-bottom: 2rem; /* mb-8 */
                    width: 100%;
                    max-width: 28rem; /* max-w-md */
                    text-align: center;
                }

                .score-display {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 1rem; /* mb-4 */
                }

                .score-correct {
                    color: #22c55e; /* text-green-600 */
                    font-weight: bold;
                    font-size: 1.25rem; /* text-xl */
                }

                .score-incorrect {
                    color: #ef4444; /* text-red-600 */
                    font-weight: bold;
                    font-size: 1.25rem; /* text-xl */
                }

                .score-count {
                    font-size: 1.5rem; /* text-2xl */
                }

                .question-section {
                    margin-bottom: 1.5rem; /* mb-6 */
                }

                .question-text {
                    font-size: 1.125rem; /* text-lg */
                    color: #4b5563; /* text-gray-700 */
                    margin-bottom: 0.5rem; /* mb-2 */
                }

                .element-symbol-display {
                    font-size: 3.75rem; /* text-6xl */
                    font-weight: 800; /* font-extrabold */
                    color: #2563eb; /* text-blue-700 */
                    margin-bottom: 1rem; /* mb-4 */
                    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.25); /* drop-shadow-md */
                }

                .name-input-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .name-input {
                    width: 100%;
                    padding: 0.75rem; /* p-3 */
                    border: 2px solid #d1d5db; /* border-2 border-gray-300 */
                    border-radius: 0.5rem; /* rounded-lg */
                    font-size: 1.125rem; /* text-lg */
                    text-align: center;
                    outline: none;
                    transition: all 0.2s ease-in-out; /* transition duration-200 */
                }

                .name-input:focus {
                    border-color: #3b82f6; /* focus:ring-2 focus:ring-blue-500 */
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-2 (manual shadow equivalent) */
                }

                .submit-button {
                    margin-top: 1rem; /* mt-4 */
                    background-color: #2563eb; /* bg-blue-600 */
                    color: #ffffff; /* text-white */
                    font-weight: bold;
                    padding: 0.75rem 1.5rem; /* py-3 px-6 */
                    border-radius: 0.5rem; /* rounded-lg */
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
                    transition: all 0.3s ease-in-out; /* transition duration-300 ease-in-out */
                    cursor: pointer;
                    border: none;
                }

                .submit-button:hover {
                    background-color: #1d4ed8; /* hover:bg-blue-700 */
                    transform: scale(1.05); /* hover:scale-105 */
                }
                .submit-button:active {
                    transform: scale(0.95); /* active:scale-95 */
                }

                .message-box {
                    padding: 1rem; /* p-4 */
                    border-radius: 0.5rem; /* rounded-lg */
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
                    margin-top: 1rem; /* mt-4 */
                    text-align: center;
                    font-weight: 600; /* font-semibold */
                    border: 2px solid; /* border-2 */
                }

                .message-success {
                    background-color: #d1fae5; /* bg-green-100 */
                    color: #065f46; /* text-green-800 */
                    border-color: #34d399; /* border-green-400 */
                }

                .message-error {
                    background-color: #fee2e2; /* bg-red-100 */
                    color: #991b1b; /* text-red-800 */
                    border-color: #f87171; /* border-red-400 */
                }

                .message-info {
                    background-color: #e0f2fe; /* bg-blue-100 */
                    color: #1e40af; /* text-blue-800 */
                    border-color: #60a5fa; /* border-blue-400 */
                }

                .periodic-table-grid {
                    display: grid;
                    grid-template-columns: repeat(18, minmax(30px, 1fr));
                    grid-template-rows: repeat(9, minmax(30px, 1fr));
                    gap: 2px;
                    width: 100%;
                    max-width: 1200px;
                    margin-top: 2rem;
                    background-color: #ffffff; /* bg-white */
                    border-radius: 0.75rem; /* rounded-xl */
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
                    padding: 1rem; /* p-4 */
                }

                .element-cell {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    padding: 4px;
                    font-size: 0.75rem;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    color: transparent; /* Text transparent by default */
                    position: relative; /* For proper positioning of children */
                }
                .element-cell:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                /* Styles for when the cell is highlighted/revealed */
                .element-cell.highlighted {
                    color: black; /* Make text visible when highlighted */
                }
                .element-symbol {
                    font-weight: bold;
                    font-size: 1rem;
                    margin-bottom: 2px;
                }
                .element-atomic-number {
                    font-size: 0.6rem;
                    align-self: flex-start;
                    padding-left: 2px;
                    opacity: 0.8;
                }

                /* Specific grid positions for elements (as defined in previous Tailwind version) */
                .element-cell[data-atomic-number="1"] { grid-column: 1; grid-row: 1; }
                .element-cell[data-atomic-number="2"] { grid-column: 18; grid-row: 1; }
                .element-cell[data-atomic-number="3"] { grid-column: 1; grid-row: 2; }
                .element-cell[data-atomic-number="4"] { grid-column: 2; grid-row: 2; }
                .element-cell[data-atomic-number="5"] { grid-column: 13; grid-row: 2; }
                .element-cell[data-atomic-number="6"] { grid-column: 14; grid-row: 2; }
                .element-cell[data-atomic-number="7"] { grid-column: 15; grid-row: 2; }
                .element-cell[data-atomic-number="8"] { grid-column: 16; grid-row: 2; }
                .element-cell[data-atomic-number="9"] { grid-column: 17; grid-row: 2; }
                .element-cell[data-atomic-number="10"] { grid-column: 18; grid-row: 2; }
                .element-cell[data-atomic-number="11"] { grid-column: 1; grid-row: 3; }
                .element-cell[data-atomic-number="12"] { grid-column: 2; grid-row: 3; }
                .element-cell[data-atomic-number="13"] { grid-column: 13; grid-row: 3; }
                .element-cell[data-atomic-number="14"] { grid-column: 14; grid-row: 3; }
                .element-cell[data-atomic-number="15"] { grid-column: 15; grid-row: 3; }
                .element-cell[data-atomic-number="16"] { grid-column: 16; grid-row: 3; }
                .element-cell[data-atomic-number="17"] { grid-column: 17; grid-row: 3; }
                .element-cell[data-atomic-number="18"] { grid-column: 18; grid-row: 3; }
                .element-cell[data-atomic-number="19"] { grid-column: 1; grid-row: 4; }
                .element-cell[data-atomic-number="20"] { grid-column: 2; grid-row: 4; }
                .element-cell[data-atomic-number="21"] { grid-column: 3; grid-row: 4; }
                .element-cell[data-atomic-number="22"] { grid-column: 4; grid-row: 4; }
                .element-cell[data-atomic-number="23"] { grid-column: 5; grid-row: 4; }
                .element-cell[data-atomic-number="24"] { grid-column: 6; grid-row: 4; }
                .element-cell[data-atomic-number="25"] { grid-column: 7; grid-row: 4; }
                .element-cell[data-atomic-number="26"] { grid-column: 8; grid-row: 4; }
                .element-cell[data-atomic-number="27"] { grid-column: 9; grid-row: 4; }
                .element-cell[data-atomic-number="28"] { grid-column: 10; grid-row: 4; }
                .element-cell[data-atomic-number="29"] { grid-column: 11; grid-row: 4; }
                .element-cell[data-atomic-number="30"] { grid-column: 12; grid-row: 4; }
                .element-cell[data-atomic-number="31"] { grid-column: 13; grid-row: 4; }
                .element-cell[data-atomic-number="32"] { grid-column: 14; grid-row: 4; }
                .element-cell[data-atomic-number="33"] { grid-column: 15; grid-row: 4; }
                .element-cell[data-atomic-number="34"] { grid-column: 16; grid-row: 4; }
                .element-cell[data-atomic-number="35"] { grid-column: 17; grid-row: 4; }
                .element-cell[data-atomic-number="36"] { grid-column: 18; grid-row: 4; }

                .element-cell[data-atomic-number="37"] { grid-column: 1; grid-row: 5; }
                .element-cell[data-atomic-number="38"] { grid-column: 2; grid-row: 5; }
                .element-cell[data-atomic-number="39"] { grid-column: 3; grid-row: 5; } /* Yttrium, excluded */
                .element-cell[data-atomic-number="40"] { grid-column: 4; grid-row: 5; }
                .element-cell[data-atomic-number="41"] { grid-column: 5; grid-row: 5; }
                .element-cell[data-atomic-number="42"] { grid-column: 6; grid-row: 5; }
                .element-cell[data-atomic-number="43"] { grid-column: 7; grid-row: 5; }
                .element-cell[data-atomic-number="44"] { grid-column: 8; grid-row: 5; }
                .element-cell[data-atomic-number="45"] { grid-column: 9; grid-row: 5; }
                .element-cell[data-atomic-number="46"] { grid-column: 10; grid-row: 5; }
                .element-cell[data-atomic-number="47"] { grid-column: 11; grid-row: 5; }
                .element-cell[data-atomic-number="48"] { grid-column: 12; grid-row: 5; }
                .element-cell[data-atomic-number="49"] { grid-column: 13; grid-row: 5; }
                .element-cell[data-atomic-number="50"] { grid-column: 14; grid-row: 5; }
                .element-cell[data-atomic-number="51"] { grid-column: 15; grid-row: 5; }
                .element-cell[data-atomic-number="52"] { grid-column: 16; grid-row: 5; }
                .element-cell[data-atomic-number="53"] { grid-column: 17; grid-row: 5; }
                .element-cell[data-atomic-number="54"] { grid-column: 18; grid-row: 5; }

                .element-cell[data-atomic-number="55"] { grid-column: 1; grid-row: 6; }
                .element-cell[data-atomic-number="56"] { grid-column: 2; grid-row: 6; }
                .element-cell[data-atomic-number="57"] { grid-column: 3; grid-row: 6; } /* La, special handling below */
                .element-cell[data-atomic-number="72"] { grid-column: 4; grid-row: 6; }
                .element-cell[data-atomic-number="73"] { grid-column: 5; grid-row: 6; }
                .element-cell[data-atomic-number="74"] { grid-column: 6; grid-row: 6; }
                .element-cell[data-atomic-number="75"] { grid-column: 7; grid-row: 6; }
                .element-cell[data-atomic-number="76"] { grid-column: 8; grid-row: 6; }
                .element-cell[data-atomic-number="77"] { grid-column: 9; grid-row: 6; }
                .element-cell[data-atomic-number="78"] { grid-column: 10; grid-row: 6; }
                .element-cell[data-atomic-number="79"] { grid-column: 11; grid-row: 6; }
                .element-cell[data-atomic-number="80"] { grid-column: 12; grid-row: 6; }
                .element-cell[data-atomic-number="81"] { grid-column: 13; grid-row: 6; }
                .element-cell[data-atomic-number="82"] { grid-column: 14; grid-row: 6; }
                .element-cell[data-atomic-number="83"] { grid-column: 15; grid-row: 6; }
                .element-cell[data-atomic-number="84"] { grid-column: 16; grid-row: 6; }
                .element-cell[data-atomic-number="85"] { grid-column: 17; grid-row: 6; }
                .element-cell[data-atomic-number="86"] { grid-column: 18; grid-row: 6; }

                .element-cell[data-atomic-number="87"] { grid-column: 1; grid-row: 7; }
                .element-cell[data-atomic-number="88"] { grid-column: 2; grid-row: 7; }
                .element-cell[data-atomic-number="89"] { grid-column: 3; grid-row: 7; } /* Ac, special handling below */
                .element-cell[data-atomic-number="104"] { grid-column: 4; grid-row: 7; }
                .element-cell[data-atomic-number="105"] { grid-column: 5; grid-row: 7; }
                .element-cell[data-atomic-number="106"] { grid-column: 6; grid-row: 7; }
                .element-cell[data-atomic-number="107"] { grid-column: 7; grid-row: 7; }
                .element-cell[data-atomic-number="108"] { grid-column: 8; grid-row: 7; }
                .element-cell[data-atomic-number="109"] { grid-column: 9; grid-row: 7; }
                .element-cell[data-atomic-number="110"] { grid-column: 10; grid-row: 7; }
                .element-cell[data-atomic-number="111"] { grid-column: 11; grid-row: 7; }
                .element-cell[data-atomic-number="112"] { grid-column: 12; grid-row: 7; }
                .element-cell[data-atomic-number="113"] { grid-column: 13; grid-row: 7; }
                .element-cell[data-atomic-number="114"] { grid-column: 14; grid-row: 7; }
                .element-cell[data-atomic-number="115"] { grid-column: 15; grid-row: 7; }
                .element-cell[data-atomic-number="116"] { grid-column: 16; grid-row: 7; }
                .element-cell[data-atomic-number="117"] { grid-column: 17; grid-row: 7; }
                .element-cell[data-atomic-number="118"] { grid-column: 18; grid-row: 7; }

                /* Lanthanides and Actinides block */
                .lanthanide-block {
                    grid-column: 4 / span 14;
                    grid-row: 8;
                    display: grid;
                    grid-template-columns: repeat(14, minmax(30px, 1fr));
                    gap: 2px;
                    margin-top: 10px;
                }
                .actinide-block {
                    grid-column: 4 / span 14;
                    grid-row: 9;
                    display: grid;
                    grid-template-columns: repeat(14, minmax(30px, 1fr));
                    gap: 2px;
                }
                .lanthanide-placeholder, .actinide-placeholder {
                    grid-column: 3;
                    grid-row: 6; /* Adjust for actinide placeholder */
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    border: 1px dashed #ccc;
                    border-radius: 8px;
                    padding: 4px;
                    font-size: 0.75rem;
                    color: #666;
                    background-color: #eee;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                .actinide-placeholder {
                    grid-row: 7;
                }
                .group-label {
                    text-align: center;
                    font-weight: bold;
                    font-size: 0.8rem;
                    color: #555;
                    margin-bottom: 5px;
                }
                .period-label {
                    text-align: right;
                    font-weight: bold;
                    font-size: 0.8rem;
                    color: #555;
                    padding-right: 5px;
                }

                /* Highlight classes */
                .highlight-green {
                    border: 4px solid #22c55e; /* ring-4 ring-green-500 */
                }
                .highlight-red {
                    border: 4px solid #ef4444; /* ring-4 ring-red-500 */
                }
                .highlight-blue {
                    border: 4px solid #3b82f6; /* ring-4 ring-blue-500 */
                }

                /* Element type colors (manual mapping) */
                .element-type-alkali-metal { background-color: #fbbf24; } /* orange-400 */
                .element-type-alkaline-earth-metal { background-color: #facc15; } /* yellow-400 */
                .element-type-transition-metal { background-color: #f87171; } /* red-400 */
                .element-type-post-transition-metal { background-color: #4ade80; } /* green-400 */
                .element-type-metalloid { background-color: #a78bfa; } /* purple-400 */
                .element-type-nonmetal { background-color: #60a5fa; } /* blue-400 */
                .element-type-halogen { background-color: #2dd4bf; } /* teal-400 */
                .element-type-noble-gas { background-color: #818cf8; } /* indigo-400 */
                .element-type-lanthanide { background-color: #f472b6; } /* pink-400 */
                .element-type-actinide { background-color: #9ca3af; } /* gray-400 */
                .element-type-unknown-properties { background-color: #64748b; } /* slate-400 */
                .element-type-default { background-color: #ffffff; } /* white */


                @media (max-width: 768px) {
                    .periodic-table-grid {
                        grid-template-columns: repeat(18, minmax(20px, 1fr));
                        gap: 1px;
                    }
                    .element-cell {
                        font-size: 0.6rem;
                        padding: 2px;
                    }
                    .element-symbol {
                        font-size: 0.8rem;
                    }
                    .element-atomic-number {
                        font-size: 0.5rem;
                    }
                }
                `}
            </style>

            <h1 className="title">
                Periodic Table Quiz!
            </h1>

            {/* Scoreboard and current question display */}
            <div className="scoreboard-card">
                <div className="score-display">
                    <div className="score-correct">
                        Correct: <span className="score-count">{correctCount}</span>
                    </div>
                    <div className="score-incorrect">
                        Incorrect: <span className="score-count">{incorrectCount}</span>
                    </div>
                </div>

                {currentElement && (
                    <div className="question-section">
                        <p className="question-text">What is the name of this element?</p>
                        <h2 className="element-symbol-display">
                            {currentElement.symbol}
                        </h2>
                        <form onSubmit={handleNameSubmit} className="name-input-form">
                            <input
                                type="text"
                                value={guessName}
                                onChange={handleNameInputChange}
                                ref={nameInputRef}
                                placeholder="Type the name here"
                                className="name-input"
                            />
                            <button
                                type="submit"
                                className="submit-button"
                            >
                                Check Name
                            </button>
                        </form>
                    </div>
                )}

                {message && (
                    <div className={`message-box
                        ${messageType === 'success' ? 'message-success' : ''}
                        ${messageType === 'error' ? 'message-error' : ''}
                        ${messageType === 'info' ? 'message-info' : ''}
                    `}>
                        {message}
                    </div>
                )}
            </div>

            {/* Periodic Table Grid */}
            <div className="periodic-table-grid">
                {/* Group Labels */}
                {[...Array(18)].map((_, i) => (
                    <div key={`group-${i + 1}`} className="group-label" style={{ gridColumn: i + 1, gridRow: 1 }}>
                        {i + 1}
                    </div>
                ))}
                {/* Period Labels - manual placement for clarity */}
                <div className="period-label" style={{ gridColumn: 0, gridRow: 2 }}>1</div>
                <div className="period-label" style={{ gridColumn: 0, gridRow: 3 }}>2</div>
                <div className="period-label" style={{ gridColumn: 0, gridRow: 4 }}>3</div>
                <div className="period-label" style={{ gridColumn: 0, gridRow: 5 }}>4</div>
                <div className="period-label" style={{ gridColumn: 0, gridRow: 6 }}>5</div>
                <div className="period-label" style={{ gridColumn: 0, gridRow: 7 }}>6</div>
                <div className="period-label" style={{ gridColumn: 0, gridRow: 8 }}>7</div>
                <div className="period-label" style={{ gridColumn: 0, gridRow: 9 }}></div> {/* Placeholder for f-block period */}

                {PERIODIC_TABLE_DATA.map(element => {
                    const isExcluded = ([39, 45].some(range => element.atomicNumber >= range[0] && element.atomicNumber <= range[1]) ||
                                        [57, 77].some(range => element.atomicNumber >= range[0] && element.atomicNumber <= range[1]) ||
                                        [89, 118].some(range => element.atomicNumber >= range[0] && element.atomicNumber <= range[1]));

                    // If it's a lanthanide or actinide in the main block, don't render it here.
                    // They will be rendered in their respective f-block containers.
                    if ((element.atomicNumber >= 57 && element.atomicNumber <= 71) ||
                        (element.atomicNumber >= 89 && element.atomicNumber <= 103)) {
                        return null;
                    }

                    const isCurrentlyHighlighted = highlightedAtomicNumber === element.atomicNumber;

                    let highlightClass = '';
                    if (isCurrentlyHighlighted) {
                        highlightClass = isGuessCorrect ? 'highlight-green' : 'highlight-red';
                    }
                    // For info message, we want to highlight the correct one
                    else if (currentElement && element.atomicNumber === currentElement.atomicNumber && messageType === 'info') {
                        highlightClass = 'highlight-blue';
                    }


                    return (
                        <div
                            key={element.atomicNumber}
                            data-atomic-number={element.atomicNumber}
                            className={`element-cell ${getTypeClass(element.type)} ${isExcluded ? 'opacity-50 pointer-events-none' : ''} ${highlightClass} ${isCurrentlyHighlighted ? 'highlighted' : ''}`}
                            onClick={() => !isExcluded && handleElementClick(element.atomicNumber)}
                        >
                            {/* Conditionally render symbol and atomic number only when highlighted */}
                            {isCurrentlyHighlighted && (
                                <>
                                    <span className="element-atomic-number">{element.atomicNumber}</span>
                                    <span className="element-symbol">{element.symbol}</span>
                                </>
                            )}
                        </div>
                    );
                })}

                {/* Lanthanide and Actinide Placeholders */}
                <div className="lanthanide-placeholder">
                    <span>57-71</span>
                    <span>(La-Lu)</span>
                </div>
                <div className="actinide-placeholder">
                    <span>89-103</span>
                    <span>(Ac-Lr)</span>
                </div>

                {/* Lanthanide Block */}
                <div className="lanthanide-block">
                    {PERIODIC_TABLE_DATA.filter(e => e.atomicNumber >= 57 && e.atomicNumber <= 71).map(element => {
                        const isExcluded = (element.atomicNumber >= 57 && element.atomicNumber <= 77);
                        const isCurrentlyHighlighted = highlightedAtomicNumber === element.atomicNumber;

                        let highlightClass = '';
                        if (isCurrentlyHighlighted) {
                            highlightClass = isGuessCorrect ? 'highlight-green' : 'highlight-red';
                        }
                        // For info message, we want to highlight the correct one
                        else if (currentElement && element.atomicNumber === currentElement.atomicNumber && messageType === 'info') {
                            highlightClass = 'highlight-blue';
                        }
                        return (
                            <div
                                key={element.atomicNumber}
                                className={`element-cell ${getTypeClass(element.type)} ${isExcluded ? 'opacity-50 pointer-events-none' : ''} ${highlightClass} ${isCurrentlyHighlighted ? 'highlighted' : ''}`}
                                onClick={() => !isExcluded && handleElementClick(element.atomicNumber)}
                            >
                                {/* Conditionally render symbol and atomic number only when highlighted */}
                                {isCurrentlyHighlighted && (
                                    <>
                                        <span className="element-atomic-number">{element.atomicNumber}</span>
                                        <span className="element-symbol">{element.symbol}</span>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Actinide Block */}
                <div className="actinide-block">
                    {PERIODIC_TABLE_DATA.filter(e => e.atomicNumber >= 89 && e.atomicNumber <= 103).map(element => {
                        const isExcluded = (element.atomicNumber >= 89 && element.atomicNumber <= 118);
                        const isCurrentlyHighlighted = highlightedAtomicNumber === element.atomicNumber;

                        let highlightClass = '';
                        if (isCurrentlyHighlighted) {
                            highlightClass = isGuessCorrect ? 'highlight-green' : 'highlight-red';
                        }
                        // For info message, we want to highlight the correct one
                        else if (currentElement && element.atomicNumber === currentElement.atomicNumber && messageType === 'info') {
                            highlightClass = 'highlight-blue';
                        }
                        return (
                            <div
                                key={element.atomicNumber}
                                className={`element-cell ${getTypeClass(element.type)} ${isExcluded ? 'opacity-50 pointer-events-none' : ''} ${highlightClass} ${isCurrentlyHighlighted ? 'highlighted' : ''}`}
                                onClick={() => !isExcluded && handleElementClick(element.atomicNumber)}
                            >
                                {/* Conditionally render symbol and atomic number only when highlighted */}
                                {isCurrentlyHighlighted && (
                                    <>
                                        <span className="element-atomic-number">{element.atomicNumber}</span>
                                        <span className="element-symbol">{element.symbol}</span>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default App;