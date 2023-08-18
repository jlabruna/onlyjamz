# OnlyJamz

**OnlyJamz** is the discerning nerd's GameJam prompt generator! Powered by AI (let's face it, basically everything is nowadays), OnlyJamz will generate a series of GameJam prompts for your next GameJam, sourced by *Open AI*'s ChatGPT.

Simply select the criteria for the game prompts you would like to generate, including genre, art style, and theme, and click the **Generate Ideas** button. Once your ideas are generated, you can opt to get new ideas by re-clicking the *Generate Ideas* button, or you can save an idea you like by clicking **Save Idea**.

To see a list of saved ideas, click the **Show Projects** button. From here, you can delete any saved ideas you no longer require.

To access OnlyJamz, [Click Here](https://www-onlyjamz.onrender.com/)

![OnlyJamz Home Screen](/onlyjamz.png)

*PS - try the **Include Actual Jam** tickbox for a sweet surprise! :P*

## What is a Game Jam? ##

A game jam is an event where participants try to make a video game from scratch. Depending on the format, participants might work independently, or in teams. The event duration usually ranges from 24 to 72 hours. Participants are generally programmers, game designers, artists, writers, and others in game development-related fields. While many game jams are run purely as a game-making exercise, some game jams are contests that offer prizes.

Game Jams are typically centered around a Theme, which all games developed within the jam must adhere to. The theme is typically announced shortly before the event begins, to discourage participants planning for the event beforehand and using pre developed material. This is also to encourage creativity by placing restrictions on development.

OnlyJamz will develop a random theme within the constraints placed, hence ensuring the theme is truly unknown to participants before the jam.

## Technologies Used

The front end of OnlyJamz is built in **React**. The back end is in **Python**, and the database in **PostgreSQL**.
All components hosted on *Render.com*.

The front end was decided by the project requirements. I chose Python and PostgreSQL as we had used them previously, and I liked the challenge of using a different language for the back end and the database. I also enjoyed coding with Python and SQL more than React or Javascript.

I chose Render because we had used it previously, and I was running out of time to research suitable hosts for my app.

See the [User Stories](/UserStories.md) markdown file for some written user stories.


## Unsolved Problems

Unfortunately, there are a few unsolved problems with the current build of OnlyJamz.

1. **Latency and Idea generation / deletion**

For some unknown reason, as soon as this project's back end was hosted on Render, occasionally the generation of ideas would time out and you would need to reclick the button. Also, when an idea is deleted, sometimes you will need to refresh to show the deletion in the front end (it is deleted from the database the first time). I suspect this is due to using a slow, free verison of Render. However, I do not have the time to troubleshoot this.

2. **HTML tags in the idea generation**

I have tried several ways to format the ideas in the cards, but unfortunately I was not successful. I would remove the tags themselves from coming in from the prompt, but I ran out of time to rebuild the parts of my python script that rely on the tags (such as the h3 tags being stripped to identify the title for saving the idea)

3. **Front end Render hosting**

For some reason, my front end deployment in Render is unsuccessful on the last day, so I am relying on running this over localhost (backend is fine, if slow). I will try to rectify this but I am running out of time

4. **Auth**

I originally planned to have a users database, with ideas saved to specific users when logged in. However, after a whole day of tinkering, I could not get this to work. The auth was fine, but I was unable to work out how to get React to identify a set cookie. I ended up scrapping the feature in subsequent commits, as it was not part of the requirements and I was running out of time.

5. **styling / bootstrap**

I was unaware that React had its own bootstrap, and that it was imported via components. It also effectively replaces standard HTML with its own code (eg rather than specifying a class for your card, you effectively change the div to <card>). I ended up encountering issues using bootstrap with react, so opted to use a combination of CDN bootstrap and my own CSS.

All in all, I feel like I would have been able to easily achieve my vision if I was not using React in the front end, but rather python or even plain JS.


## Unimplemented Features

The original vision for OnlyJamz was significantly larger than what was delivered within the timeframe. However, wrestling with an unfamiliar front end has cost me too much time to implement them.

Features that would have been added include - 

1. **Auth and individual profiles.** In the original vision, users would be required to sign up and log in with a username and password to save ideas. Once signed in, users would be able to see their own saved projects.

2. **TODO list.** The original concept of OnlyJamz was not to just generate the idea, but to assist with developing it as well. Saved Ideas would have a user configurable To Do list, with the option to edit, delete, add, and mark as complete options.

3. **Notes.** Free form user notes saved against each idea.

4. **Properly formatted idea cards.** 

5. **Two layers of prompt generation.** The original idea generation was meant to be a summary. When the idea was saved, there would be another prompt sent to ChatGPT to give a more detailed idea, which would also be saved in the database, along with an image (see below)

6. **Image Generation.** The original idea was to have a prompt submitted to ChatGPT AND to an image generation tool, such as Midjourney or SD. The Image generation would only occur on the second submission, once the idea is saved. However, since Auth was abandoned, I did not want to implement this feature until I had an MVP working.