import { useState, useEffect } from 'react';
import './App.css';
// import axios from 'axios';

// axios.get('http://localhost:5000/api/getideas')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });



function App() {
  // const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  const apiUrl = 'http://localhost:5000/test';

  useEffect(()=> {
    fetchData();
  }, []);

  const fetchData = async ()=> {
    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      console.log(jsonData)
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };





  return (
    <>
      <h1>OnlyJamz</h1>
      <h3><em>The discerning Nerd's GameJam prompt generator</em></h3>
      <form className="py-5">
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
      <div className='button'>
        <button type='button' className='btn btn-success'>
          Get Ideas!
        </button>



      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <div className="py-5" id="results">
          <h3>First Idea:</h3>
          <p>{JSON.stringify(data[0])}</p>
          <h3>Second Idea:</h3>
          <p>{JSON.stringify(data[1])}</p>
          <h3>Third Idea:</h3>
          <p>{JSON.stringify(data[2])}</p>
          <h3>Fourth Idea:</h3>
          <p>{JSON.stringify(data[3])}</p>
          <h3>Fifth Idea:</h3>
          <p>{JSON.stringify(data[4])}</p>
        </div>
      </div>
    </>
  )
}

export default App
