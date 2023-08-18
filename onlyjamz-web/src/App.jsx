import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './App.css';




function App() {
  // projects and response control the saved projects and ideas cards 
  const [projects, setProjects] = useState('');
  const [response, setResponse] = useState('');
  //imgsrc controls the jar filling up
  const [imageSrc, setImageSrc] = useState('/empty.png');
  //buttontext adds text to the button when generating
  const [buttonText, setButtonText] = useState('Generate Ideas!');
  const [projectsButtonText, setProjectsButtonText] = useState('Show Projects');
  //below is adding all form text to their own states to amalgamate
  const [formGenre, setFormGenre] = useState('');
  const [formView, setFormView] = useState('');
  const [formArt, setFormArt] = useState('');
  const [formPlayers, setFormPlayers] = useState('');
  const [formTheme, setFormTheme] = useState('');
  const [formJam, setFormJam] = useState(false);
  // hides and shows the div for projects and ideas
  const [showIdeas, setShowIdeas] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  
 
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

// below is submitting the form to chatgpt
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setButtonText('Filling Jar...')
      setResponse('');
      setImageSrc('/empty.png');
      setShowIdeas(true);
      setShowProjects(false);
      const aiPrompt = await `a ${ formGenre } game, with a ${ formView } viewpoint, ${ formPlayers } player, in a ${ formArt} art style, with a ${ formTheme } theme. ${formJam ? ` Very important that the ideas feature lots of Jam. Ensure sweet, sticky Jam is mentioned several times.` : ''}`;
      await console.log(aiPrompt);
      const apiUrl = 'https://onlyjamz.onrender.com/api/chatgpt';
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Below is when you save an idea
  const handleSave = async (e, idea, index) => {
    e.preventDefault();
    setShowIdeas(false);
    try {
      console.log(idea)
      console.log(index)

      const apiUrl = 'https://onlyjamz.onrender.com/api/saveIdea';
      const response = fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idea
         }),
      });


    } catch (error) {
      console.error('Error:', error);
    }
  };

// press show projects runs this
const getProjects = async (e) => {
  e.preventDefault();
  try {
    setShowProjects(true);
    setShowIdeas(false);
   doGetProjects()
  } catch (error) {
    console.error('Error:', error);
  }
};

  // i am sure i could have combined this with the one above, but when i tried it broke, so leaving it for now
  async function doGetProjects() {
  setProjects('');
        setProjectsButtonText('Filling Jar...')      
        const res = await fetch("https://onlyjamz.onrender.com/api/projects");
        const projectsData = await res.json();
        setProjects(projectsData);
        console.log(projects)
 }



 // Below is when you delete a saved project
 const deleteProject = async (e, projectId) => {
  e.preventDefault();
 
  try {
    console.log("DELETING PROJECT" + projectId)
    const apiUrl = 'https://onlyjamz.onrender.com/api/deleteProject';
    const delProj = fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        projectId
       }),
    }).then (doGetProjects()) ;
    console.log("console log to test delproj")
    console.log(delProj)

  } catch (error) {
    console.error('Error:', error);
  }
};



  return (
    <div className="App">
      <img src={imageSrc} height="100px"></img>
      <h1>Only<span className={!showIdeas ? "blueberry" : "jam"}>Jamz</span></h1>
      <h3><em>The discerning nerd's GameJam prompt generator</em></h3>
      <form className="py-5" onSubmit={handleSubmit}>
        <label for="genre" className="px-1"> Select a Genre: </label>
        <select name="genre" id="genre" onChange={handleInputChange}>
          <option></option>
          <option value="rpg">RPG</option>
          <option value="rts">RTS</option>
          <option value="shooter">Shooter</option>
          <option value="platformer">Platformer</option>
          <option value="puzzle">Puzzle</option>
          <option value="survival">Survival</option>
          <option value="stealth">Stealth</option>
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
          <option value="pirate">Pirate</option>
          <option value="superhero">Superhero</option>
        </select>
        <label for="jam" className='py-3 px-2'> Include Actual Jam??</label>
            <input
              type="checkbox"
              value="jam"
              name="jam"
              onChange={handleInputChange}
            />
        <div className='py-4'>
          <button className='btn btn-success mx-2' type="submit">{!response ? buttonText : 'Generate Ideas!'}</button>
          <button className='btn btn-info mx-2' type="submit" onClick={getProjects}>{!projects ? projectsButtonText : 'Show Projects'}</button>
        </div>
      </form>

        {response && (
          <div className={showIdeas ? "response results" : "hidden"}>
            {response.map((idea, index) => (
              <div className= "card ideasCard">
                <p className="card-text" >{idea}</p>
                <button className='btn btn-success card-button' onClick={(e) => handleSave(e, idea, index)}>Save Idea</button>
              </div>
            ))}
          </div>
        )}
      {projects && (
      <div className={showProjects ? "response results" : "hidden"}>
        {projects.map((oneProject) => (
          <div className= "card projectsCard">
            <p className="card-title" >{oneProject[2]}</p>
            <p className="card-text" >{oneProject[3]}</p>
            <button className='btn btn-info card-button' onClick={(e) => deleteProject(e, oneProject[0])}>Delete</button>
          </div>
        ))}
      </div>
      )}

    </div>
  );
}

export default App;