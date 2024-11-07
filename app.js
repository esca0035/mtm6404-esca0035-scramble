/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */

function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/
const words = ['Kangaroo', 'Penguin', 'Dolphin', 'Elephant', 'Giraffe', 'Octopus', 'Parrot', 'Squirrel', 'Dog', 'Cat'];

function App() {
  const [gameInfo, setGameInfo] = React.useState(() => {
    const savedGameInfo = localStorage.getItem('gameInfo');
    return savedGameInfo ? JSON.parse(savedGameInfo) : {
      points: 0,
      strikes: 0,
      index: 0,
      word: words[0],
      passes: 3
    };
  });

  const [gameStatus, setGameStatus] = React.useState(true);
  const [winLose, setWinLose] = React.useState(null); 
  const [userInput, setUserInput] = React.useState('');
  const [shuffledWord, setShuffledWord] = React.useState(() => shuffle(words[0]));

 
  React.useEffect(() => {
    localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
    setShuffledWord(shuffle(gameInfo.word))
  }, [gameInfo]);

  function handleGuess() {
    const currentWord = gameInfo.word.toLowerCase();
    const inputWord = userInput.toLowerCase();

    if (inputWord === currentWord) {
          setGameInfo(prev => ({
            ...prev,
            points: prev.points + 1,
            index: prev.index + 1,
            word: words[prev.index + 1] || ''
          }));
        } else {
          setGameInfo(prev => ({
            ...prev,
            strikes: prev.strikes + 1,
            index: prev.index + 1,
            word: words[prev.index + 1] || ''
          }));
        } 

    setUserInput(''); 

    checkGameStatus();
  }
function handlePass() {
  setGameInfo(prev => ({
    ...prev,
    passes: prev.passes - 1,
    index: prev.index + 1,
    word: words[prev.index + 1] || ''
  }));
}
  
function checkGameStatus() {
    if (gameInfo.points + 1 === 3) {
      setGameStatus(false);
      setWinLose(true); // Player wins
    } else if (gameInfo.strikes + 1 === 3 || gameInfo.index + 1 === words.length) {
      setGameStatus(false);
      setWinLose(false); // Player loses
    }
  }

  function restartGame() {
    setGameInfo({
      points: 0,
      strikes: 0,
      index: 0,
      word: words[0],
      passes: 3
    });
    setGameStatus(true);
    setWinLose(null);
  }

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  return (
    <div className='container'>
      <h1>Welcome to Scramble.</h1>
      <p className={gameStatus ? "d-none" : ""}>{winLose ? "You Win!!" : "You Lose~~"}</p>
      <div>
        <div>
          <p>{gameInfo.points}</p>
          <p>POINTS</p>
        </div>
        <div>
          <p>{gameInfo.strikes}</p>
          <p>STRIKES</p>
        </div>
      </div>
      <div>{shuffledWord}</div>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button className={gameStatus ? "" : "d-none"} onClick={handleGuess}>Check</button>
      <button className={gameStatus ? "" : "d-none"} onClick={handlePass}><span>{gameInfo.passes}</span> Passes Remaining</button>
      <button className={gameStatus ? "d-none" : ""} onClick={restartGame}>Restart</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);


// get user input data, compare it with current word. Remember to transfer them into all lowercase
  // If user is correct, increase the points number by 1, otherwise increase strikes number by one. Allways compare the value with 3. If it reached 3 you should determin the user wined or loose

  // use a index value to point to the current element in the Array
  // once the points === 3 or strkies === 3 or the index === 9 (words[index]), that's the end of the game