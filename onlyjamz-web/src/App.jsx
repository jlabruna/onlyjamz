import { useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
  const [fetching, setFetching] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [imageSrc, setImageSrc] = useState('/empty.png');
  const apiUrl = 'http://localhost:5000/test';

  // useEffect(()=> {
  //   fetchData();
  // }, []);

  async function fetchData() {
    try {
      setFetching(true);
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      console.log(jsonData)
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // do the return of all the html here.
      // in a react function, populate a div with data.
      // learn how to take the results in this function, and stick them in the card divs at the end.
      setFetching(false);
    }
  };

  // function handleButtonClick() {
  //   setShowCards(false);
  //   fetchData().then(() => {
  //     setShowCards(true);
  //   });
  // }

  // The below is only here so i can see the clearing and reappearing of the showCards div. otherwise its too fast. setTimeout does that.
  // will replace with commented out handleButtonClick() after i get the real API working :P
  function handleButtonClick() {
    setShowCards(false);
    setImageSrc('/empty.png');
    fetchData();
    setTimeout(() => {
      setShowCards(true);
      setImageSrc('/full.png');
    }, 400);
  }


  return (
    <>
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
      <div className='button'>
        <button type='button' className='btn btn-success' onClick={handleButtonClick} disabled={fetching}>
        {fetching ? 'Fetching...' : 'Fetch Data'}
        </button>
               
      {showCards && ( 
        <Card className="py-5" id="results">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>First Idea:</Card.Title>
              <Card.Text>
              {JSON.stringify(data[0])}
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Second Idea:</Card.Title>
              <Card.Text>
              {JSON.stringify(data[1])}
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Third Idea:</Card.Title>
              <Card.Text>
              {JSON.stringify(data[2])}
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Forth Idea:</Card.Title>
              <Card.Text>
              {JSON.stringify(data[3])}
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Fifth Idea:</Card.Title>
              <Card.Text>
              {JSON.stringify(data[4])}
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Card>
      )}
      </div>
    </>
  )
}

export default App