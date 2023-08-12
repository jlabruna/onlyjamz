import React, { useState, useEffect } from 'react';
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
  const [formPvpe, setFormPvpe] = useState('');

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
  } else if (name === 'pvpe') {
    setFormPvpe(value);
  };
  console.log(`UPPER CONSOLE LOG the first option is ${ formGenre } and the second option is ${ formView }`)
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonText('Generating...')
      setResponse('');
      setImageSrc('/empty.png');
      const aiPrompt = await `the first option is ${ formGenre } and the second option is ${ formView }`;
      await console.log(aiPrompt);
      const apiUrl = 'http://localhost:5000/api/chatgpt';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          getData,
          aiPrompt
         }),
      });

      
      const data = await response.json();
      setResponse(data);
      setImageSrc('/full.png');
      console.log(data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

 
  return (
    <div className="App">
      <img src={imageSrc} height="100px"></img>
      <h1>OnlyJamz</h1>
      <h3><em>The discerning Nerd's GameJam prompt generator</em></h3>
      <form className="py-5" onSubmit={handleSubmit}>
        <label for="genre" className="px-1"> Select a Genre: </label>
        <select name="genre" id="genre" onChange={handleInputChange}>
          <option value="rpg">RPG</option>
          <option value="rts">RTS</option>
          <option value="shooter">Shooter</option>
          <option value="platformer">Platformer</option>
        </select>
        <label for="view" className="px-1"> Select a Viewpoint: </label>
        <select name="view" id="view" onChange={handleInputChange}>
          <option value="1st">1st Person</option>
          <option value="3rd">3rd Person</option>
          <option value="iso">Isometric</option>
          <option value="topdown">Top Down</option>
        </select>
        <label for="art" className="px-1"> Select an Art Style: </label>
        <select name="art" id="art" onChange={handleInputChange}>
          <option value="real">Realistic</option>
          <option value="pixel">Pixel Art</option>
          <option value="low poly">Low Poly</option>
          <option value="voxel">Voxel</option>
          <option value="anime">Anime</option>
          <option value="silhouette">Silhouette</option>
          <option value="cartoon">Cartoon</option>
        </select>
        <label for="players" className="px-1"> Select no. of players: </label>
        <select name="players" id="players" onChange={handleInputChange}>
          <option value="sp">Single Player</option>
          <option value="mp">Multiplayer</option>
        </select>
        <label for="pvpe" className="px-1"> PvP or PvE? </label>
        <select name="pvpe" id="pvpe" onChange={handleInputChange}>
          <option value="pvp">PvP</option>
          <option value="pve">PvE</option>
          <option value="pvpve">PvPvE</option>
        </select> 
          <input
            className='mx-3'
            type="text"
            value={getData}
            onChange={(e) => setGetData(e.target.value)}
          />
        <button className='btn btn-success' type="submit">{!response ? buttonText : 'Generate Ideas!'}</button>
      </form>
        {response && (
          <div className="response">
            <h2>API Response:</h2>
            <p>{response}</p>
          </div>
        )}
    </div>
  );
}

export default App;
