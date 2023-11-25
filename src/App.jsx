import { useState, useEffect } from 'react';
import { dobble, bobcat, cow, elephant, iguana, myna, octopus, pangolin, penguin, spider, stingray, tortoise, quokka, orca, moose, narwhal, axolotl, mole, pelican, crab, racoon, anteater, platypus, orangutan, viper, chinchilla, electriceel, snowleopard, dragonfly, beardeddragon, peacock, falcon } from './assets';

function App() {
  const [numberInput, setNumberInput] = useState(4);
  const [timerInput, setTimerInput] = useState(30);
  const [cards, setCards] = useState([]);
  const [list1Index, setList1Index] = useState(0);
  const [list2Index, setList2Index] = useState(1);
  const [showLists, setShowLists] = useState(false);
  const cardCount = numberInput * (numberInput - 1) + 1;
  const [countdown, setCountdown] = useState(null);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const calculatePosition = (index) => {
    const radius = 25; // Adjust this value to control the circle's radius
    const angle = (index / numberInput) * 2 * Math.PI;
    const x = radius * Math.cos(angle) - 20;
    const y = radius * Math.sin(angle) -15;

    return { x, y };
  }

  const imgWidth = 400/numberInput + "px";

  const stickers = [0, bobcat, cow, elephant, iguana, myna, octopus, pangolin, penguin, spider, stingray, tortoise, quokka, orca, moose, narwhal, axolotl, mole, pelican, crab, racoon, anteater, platypus, orangutan, viper, chinchilla, electriceel, snowleopard, dragonfly, beardeddragon, peacock, falcon];

  const generateCards = () => {

    let n = numberInput - 1;
    let generatedCards = [];
    let card = [];

    for (let i = 1; i <= n + 1; i++) {
      card.push(i)
    }
    generatedCards.push(card)
    for (let j = 1; j <= n; j++) {
      card = []
      card.push(1)

      for (let k = 1; k <= n; k++) {
        card.push(n * j + (k + 1))
      }
      generatedCards.push(card);
    }
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        card = []
        card.push(i + 1)

        for (let k = 1; k <= n; k++) {
          card.push(n + 2 + n * (k - 1) + (((i - 1) * (k - 1) + j - 1) % n))
        }
        generatedCards.push(card);
      }
    }

    setCards(generatedCards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (showModal) {
      setShowModal(false);
    }

    // Generate cards with a flexible number of lists of random numbers between 1 and 10
    generateCards(); // You can adjust the argument to change the number of lists

    // Select two different random indices from the generated cards
    let newList1Index = Math.floor(Math.random() * cardCount);
    let newList2Index;
    do {
      newList2Index = Math.floor(Math.random() * cardCount);
    } while (newList1Index === newList2Index);

    setList1Index(newList1Index);
    setList2Index(newList2Index);

    setShowLists(true);

    // Start the countdown
    setCountdown(timerInput);

    // Reset the score for a new game
    setScore(0);
  };

  useEffect(() => {
    let countdownTimer;

    if (countdown !== null && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(countdownTimer);
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setShowModal(true);
    }
  }, [countdown]);

  const handleItemClick = (value) => {

    if (countdown !== null && countdown > 0) {
      if (cards[list1Index].includes(value)) {
        // Select two different new random indices if the clicked item is in the first list
        let newList1Index = Math.floor(Math.random() * cardCount);
        let newList2Index;
        do {
          newList2Index = Math.floor(Math.random() * cardCount);
        } while (newList1Index === newList2Index);

        // Increment the score when values match
        setScore((prevScore) => prevScore + 1);

        // Update the highest score if the current score is higher
        setHighestScore((prevHighestScore) => Math.max(prevHighestScore, score+1));

        setList1Index(newList1Index);
        setList2Index(newList2Index);
      } else {
        // Console log the value if the clicked item is not in the first list
        console.log(value);
      }
    }
  };

  const handleGoBack = () => {
    setShowLists(false);
    setNumberInput(4);
    setCards([]);
    setList1Index(0);
    setList2Index(1);
    setCountdown(null);
    // Update the highest score if the current score is higher
    // setHighestScore((prevHighestScore) => Math.max(prevHighestScore, score));
    // setHighestScore(0);
  };

  const handlePlayAgain = () => {
    // Reset the score and start a new game with the same highest score
    setScore(0);
    setCountdown(timerInput);

    // Generate new cards and indices for a new game
    generateCards(5);

    let newList1Index = Math.floor(Math.random() * cardCount);
    let newList2Index;
    do {
      newList2Index = Math.floor(Math.random() * cardCount);
    } while (newList1Index === newList2Index);

    setList1Index(newList1Index);
    setList2Index(newList2Index);
  };

  return (
    <>
      <div className="">
        {/* style={{ margin: "0" }} */}
        {!showLists ? (
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-10 text-center mt-12'>
              <div className='col-span-2 flex justify-center'>
                <img src={dobble} style={{width:"300px"}}/>
              </div>
              <div className='col-span-2 sm:col-span-1'>
                <label>
                  Mode
                  <div className="tooltip">
                    <input
                      type="range"
                      min="3"
                      max="8"
                      step="1"
                      value={numberInput}
                      className='slider ml-2 cursor-pointer'
                      onChange={(e) => setNumberInput(parseInt(e.target.value, 10))}
                    />
                    <span className="tooltiptext">{numberInput}</span>
                  </div>
                </label>
              </div>

              {/* <br /> */}
              <div className='col-span-2 sm:col-span-1'>
                <label>
                  Duration
                  <select value={timerInput} onChange={(e) => setTimerInput(parseInt(e.target.value, 10))}
                    className='ml-2 rounded p-1  cursor-pointer'>
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={120}>2 minutes</option>
                  </select>
                </label>
              </div>

              <div className='col-span-2 flex justify-center'>
                <button type="submit" className="bg-white p-4 rounded  cursor-pointer">Start Game</button>
              </div>
            </div>
          </form>
        ) : (
            <div className='mt-2 grid grid-cols-3 gap-1 mx-4' style={{ gridTemplateColumns: 'max-content 1fr max-content' }}>
              <button onClick={handleGoBack} className='flex flex-row items-center col-span-1'>
                <svg width="40px" height="40px" viewBox="0 0 1024 1024" className="icon" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M224 480h640a32 32 0 110 64H224a32 32 0 010-64z" /><path fill="#ffffff" d="M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z" /></svg>
                {/* <p className='text-white mx-2'>Back</p> */}
              </button>

              <div className='flex flex-row items-center col-span-1 justify-center'>
                <p className='text-sm'>Score:<span className='text-white mx-1'>{score}</span>Best:<span className='text-white mx-1'>{highestScore}</span></p>
              </div>

              {countdown !== null && countdown > 0 && (
                <div>
                  <p className='flex flex-row-reverse items-center col-span-1'>
                      <p className='p-2 bg-white rounded'>{countdown % 60} s</p>
                      {countdown >= 60 && (<p className='mx-2 p-2 bg-white rounded'>{parseInt(countdown / 60)} m </p>)}
                      </p>
                </div>
              )}

              {countdown <=0 && (
                <button className='flex flex-row-reverse items-center' onClick={handlePlayAgain}>
                  <svg fill="#fff" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"><path d="M21,11c-0.6,0-1,0.4-1,1c0,2.9-1.5,5.5-4,6.9c-3.8,2.2-8.7,0.9-10.9-2.9C2.9,12.2,4.2,7.3,8,5.1c3.3-1.9,7.3-1.2,9.8,1.4h-2.4c-0.6,0-1,0.4-1,1s0.4,1,1,1h4.5c0.6,0,1-0.4,1-1V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v1.8C17,3,14.6,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10C22,11.4,21.6,11,21,11z" /></svg>
                  {/* <p className='text-white mx-2'>Play again</p> */}
                  
                </button>
              )}

              {showModal && (
                <div className="countdown-zero-overlay backdrop-blur-md bg-black/60">
                    <div style={{ height: "75%", width: "75%" }} className='bg-[#fde047]/90'>
                      <div className='grid grid-cols-2'>
                        <p className='my-5 mb-7  mx-5'>Game Over!</p>
                        <button className="my-5 mb-7 mx-5 flex flex-row-reverse items-center" onClick={() => setShowModal(false)}>
                          <svg fill="#000000" width="35px" height="35px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z" /></svg>
                        </button>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                      <p className='flex justify-center col-span-2 sm:col-span-1'>Your score: {score}</p>
                      <p className='flex justify-center col-span-2 sm:col-span-1'>Best Score: {highestScore}</p>

                      <form onSubmit={handleSubmit} className='col-span-2'>
                        {/* <div className='grid grid-cols-2 gap- text-center mt-1'> */}
                          {/* <div className='col-span-2 flex justify-center'>
                          </div> */}
                        <div className='flex justify-center col-span-2 my-4'>
                            <label>
                              Mode
                              <div className="tooltip">
                                <input
                                  type="range"
                                  min="3"
                                  max="8"
                                  step="1"
                                  value={numberInput}
                                className='slider ml-2 cursor-pointer col-span-2' style={{ '--thumb-background': '#a78bfa' }}
                                  onChange={(e) => setNumberInput(parseInt(e.target.value, 10))}
                                />
                                <span className="tooltiptext">{numberInput}</span>
                              </div>
                            </label>
                          </div>

                          {/* <br /> */}
                        <div className='col-span-2 flex justify-center '>
                            <label>
                              Duration
                              <select value={timerInput} onChange={(e) => setTimerInput(parseInt(e.target.value, 10))}
                              className='ml-2 rounded p-1 my-4 cursor-pointer col-span-2'>
                                <option value={30}>30 seconds</option>
                                <option value={60}>1 minute</option>
                                <option value={120}>2 minutes</option>
                              </select>
                            </label>
                          </div>

                          <div className='col-span-2 mt-2 flex justify-center'>
                            <button type="submit" className="bg-white p-2 rounded cursor-pointer">Play Again</button>
                          </div>
                        {/* </div> */}
                      </form>
                  </div>
                </div>
              </div>
              )}

              <div className='col-span-3 flex justify-center'>
                <div className=''>
                  <div className='bg-white rounded-full border-[#fde047] mb-5' style={{ position: 'relative', borderRadius: '50%', borderWidth: "15px", height: '300px', width: '300px' }}>
                    <ul style={{ listStyle: 'none' }}>
                      {cards[list1Index].map((item, index) => {
                        const { x, y } = calculatePosition(index);
                        const style = {
                          position: 'absolute',
                          top: `${y + 50}%`, // Adjust to center the images
                          left: `${x + 50}%`, // Adjust to center the images
                          borderRadius: '5%',
                        };

                        return (
                          <li key={index} style={style}>
                            <img src={stickers[item]} alt={`text-${index}`} style={{ width: imgWidth }} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className='bg-white rounded-full border-[#fde047]' style={{ position: 'relative', borderRadius: '50%', borderWidth: "15px", height: '300px', width: '300px' }}>
                    <ul style={{ listStyle: 'none' }}>
                      {cards[list2Index].map((item, index) => {
                        const { x, y } = calculatePosition(index);
                        const style = {
                          position: 'absolute',
                          top: `${y + 50}%`, // Adjust to center the images
                          left: `${x + 50}%`, // Adjust to center the images
                          borderRadius: '5%',
                        };

                        return (
                          <li key={index} style={style} className = 'cursor-pointer' onClick={() => handleItemClick(item)}>
                            <img src={stickers[item]} alt={`text-${index}`} style={{ width: imgWidth }} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              
          </div>
        )}
      </div> 
    </>
  )
}

export default App
