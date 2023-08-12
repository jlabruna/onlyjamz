import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './App.css';

function App() {
  const [getData, setGetData] = useState('');
  const [response, setResponse] = useState('');
  const [imageSrc, setImageSrc] = useState('/empty.png');
  const [buttonText, setButtonText] = useState('Generate Ideas!');
  //below is adding all form text to their own states to amalgamate
  const [formGenre, setFormGenre] = useState('');
  const [formView, setFormView] = useState('');
  const [formArt, setFormArt] = useState('');
  const [formPlayers, setFormPlayers] = useState('');
  const [formTheme, setFormTheme] = useState('');
  const [formJam, setFormJam] = useState(false);

//below handleSelectChange is controlling the change in form
const handleInputChange = (event) => {
  const { name, value } = event.target;
  if (name === 'genre') {
    setFormGenre(value);
  } else if (name === 'view') {
    setFormView(value);
  } else if (name === 'art') {
    setFormArt(value);
  } else if (name === 'players') {
    setFormPlayers(value);
  } else if (name === 'theme') {
    setFormTheme(value);
  } else if (name === 'jam') {
    setFormJam(!formJam);
    console.log(value)
  };
  console.log(`UPPER CONSOLE LOG the first option is ${ formGenre } and the second option is ${ formView }`)
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonText('Filling Jar...')
      setResponse('');
      setImageSrc('/empty.png');
      
      const aiPrompt = await `a ${ formGenre } game, with a ${ formView } viewpoint, ${ formPlayers } player, in a ${ formArt} art style, with a ${ formTheme } theme. ${formJam ? ` Also, it is very important that the prompt features lots of ${formJam}. Ensure Jam is mentioned several times.` : ''}`;
      await console.log(aiPrompt);
      const apiUrl = 'http://localhost:5000/api/chatgpt';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          aiPrompt
         }),
      });

      
      const data = await response.json();
      setResponse(data);
      setImageSrc('/full.png');
      console.log(data);
      // setFormJam is too late here. the value does not reset to null on the second run, try fixing.
      // pretty sure theres a checked status you can put on the checkbox and use that in the prompt on row 45
      // setFormJam('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

 
  return (
    <div className="App">
      <div>
        <button className='btn btn-success login-button'>yo</button>
      </div>
      <img src={imageSrc} height="100px"></img>
      <h1>Only<span className='jam'>Jamz</span></h1>
      <h3><em>The discerning nerd's GameJam prompt generator</em></h3>
      <form className="py-5" onSubmit={handleSubmit}>
        <label for="genre" className="px-1"> Select a Genre: </label>
        <select name="genre" id="genre" onChange={handleInputChange}>
          <option></option>
          <option value="rpg">RPG</option>
          <option value="rts">RTS</option>
          <option value="shooter">Shooter</option>
          <option value="platformer">Platformer</option>
        </select>
        <label for="view" className="px-1"> Select a Viewpoint: </label>
        <select name="view" id="view" onChange={handleInputChange}>
          <option></option>
          <option value="1st person">1st Person</option>
          <option value="3rd person">3rd Person</option>
          <option value="isometric">Isometric</option>
          <option value="topdown">Top Down</option>
        </select>
        <label for="art" className="px-1"> Select an Art Style: </label>
        <select name="art" id="art" onChange={handleInputChange}>
          <option></option>
          <option value="realistic">Realistic</option>
          <option value="pixel">Pixel Art</option>
          <option value="low poly">Low Poly</option>
          <option value="voxel">Voxel</option>
          <option value="anime">Anime</option>
          <option value="cartoon">Cartoon</option>
        </select>
        <label for="players" className="px-1"> Select no. of players: </label>
        <select name="players" id="players" onChange={handleInputChange}>
          <option></option>
          <option value="single">Single Player</option>
          <option value="multi">Multiplayer</option>
        </select>
        <label for="theme" className="px-1"> Theme? </label>
        <select name="theme" id="theme" onChange={handleInputChange}>
          <option></option>
          <option value="fantasy">Fantasy</option>
          <option value="scifi">SciFi</option>
          <option value="mythological">Mythological</option>
          <option value="Lovecraftian">Lovecraftian</option>
          <option value="modern">Modern</option>
        </select>
        <label for="jam" className='py-3 px-2'> Include Actual Jam??</label>
            <input
              type="checkbox"
              value="jam"
              name="jam"
              onChange={handleInputChange}
            />
        <div className='py-4'><button className='btn btn-success' type="submit">{!response ? buttonText : 'Generate Ideas!'}</button></div>
      </form>
        {/* {response && (
          <div className="response results" id="results">
            <div className='card eachCard'>
            <h3 className='card-title'>First Idea:</h3>
            <p className='card-text'>{response[0]}</p>
            </div>
            <div className='card eachCard'>
            <h3 className='card-title'>Second Idea:</h3>
            <p className='card-text'>{response[1]}</p>
            </div>
            <div className='card eachCard'>
            <h3 className='card-title'>Third Idea:</h3>
            <p className='card-text'>{response[2]}</p>
            </div>
            <div className='card eachCard'>
            <h3 className='card-title'>Fourth Idea:</h3>
            <p className='card-text'>{response[3]}</p>
            </div>
            <div className='card eachCard'>
            <h3 className='card-title'>Fifth Idea:</h3>
            <p className='card-text'>{response[4]}</p>
            </div>
          </div>
        )} */}
        {response && (
          <div className="response results" id="results">
            {response.map((idea, index) => (
              <div className='card eachCard'>
                <h3 className='card-title'>{`Idea ${index + 1}:`}</h3>
                <p className='card-text'>{idea}</p>
                <button className='btn btn-info card-button'>click</button>
          </div>
    ))}
  </div>
)}


    </div>
  );
}

export default App;