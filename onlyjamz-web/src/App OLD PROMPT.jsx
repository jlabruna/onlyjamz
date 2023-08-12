import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [getData, setGetData] = useState('');
  const [response, setResponse] = useState('');
  const [imageSrc, setImageSrc] = useState('/empty.png');
  const [buttonText, setButtonText] = useState('Generate Ideas!');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonText('Generating...')
      setResponse('');
      setImageSrc('/empty.png');
      const apiUrl = 'http://localhost:5000/api/chatgpt';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ getData }),
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
      <form className="py-5">
        <label for="genre" className="px-1"> Select a Genre: </label>
        <select name="genre" id="genre">
          <option value="rpg">RPG</option>
          <option value="rts">RTS</option>
          <option value="shooter">Shooter</option>
          <option value="platformer">Platformer</option>
        </select>
        <label for="view" className="px-1"> Select a Viewpoint: </label>
        <select name="view" id="view">
          <option value="1st">1st Person</option>
          <option value="3rd">3rd Person</option>
          <option value="iso">Isometric</option>
          <option value="topdown">Top Down</option>
        </select>
        <label for="art" className="px-1"> Select an Art Style: </label>
        <select name="art" id="art">
          <option value="real">Realistic</option>
          <option value="pixel">Pixel Art</option>
          <option value="low poly">Low Poly</option>
          <option value="voxel">Voxel</option>
          <option value="anime">Anime</option>
          <option value="silhouette">Silhouette</option>
          <option value="cartoon">Cartoon</option>
        </select>
        <label for="players" className="px-1"> Select no. of players: </label>
        <select name="players" id="players">
          <option value="sp">Single Player</option>
          <option value="mp">Multiplayer</option>
        </select>
        <label for="pvpe" className="px-1"> PvP or PvE? </label>
        <select name="pvpe" id="pvpe">
          <option value="pvp">PvP</option>
          <option value="pve">PvE</option>
          <option value="pvpve">PvPvE</option>
        </select>
      </form>
      <form className='py-3' onSubmit={handleSubmit}>
        <label>
          Enter Ye Prompt Here:  
          <input
            className='mx-3'
            type="text"
            value={getData}
            onChange={(e) => setGetData(e.target.value)}
          />
        </label>
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
