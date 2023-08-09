import { useState } from 'react';
import './App.css';
import axios from 'axios';

axios.get('http://localhost:5000/api/getideas')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>OnlyJamz</h1>
      <h3><em>The discerning Nerd's GameJam prompt generator</em></h3>
      <form>
        <label for="genre"> Select a Genre: </label>
        <select name="genre" id="genre">
          <option value="rpg">RPG</option>
          <option value="rts">RTS</option>
          <option value="shooter">Shooter</option>
          <option value="platformer">Platformer</option>
        </select>
        <label for="view"> Select a Viewpoint: </label>
        <select name="view" id="view">
          <option value="1st">1st Person</option>
          <option value="3rd">3rd Person</option>
          <option value="iso">Isometric</option>
          <option value="topdown">Top Down</option>
        </select>
        <label for="players"> Select no. of players: </label>
        <select name="players" id="players">
          <option value="sp">Single Player</option>
          <option value="mp">Multiplayer</option>
        </select>
        <label for="pvpe"> PvP or PvE? </label>
        <select name="pvpe" id="pvpe">
          <option value="pvp">PvP</option>
          <option value="pve">PvE</option>
          <option value="pvpve">PvPvE</option>
        </select>
      </form>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save - keepin this coz its cool
        </p>
      </div>
    </>
  )
}

export default App
