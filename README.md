# TrebuchetFodder

Twitch extension who's purpose has not yet been solidified

Check [this link](https://dev.twitch.tv/docs/extensions/rig) to get started with Twitches Developer Rig

Obviously all of this will change. This is just an exercise to learn about twitch extension development. We will gut this code and repurpose it to suit our needs.

##Running the project:

#### Personally, I am not currently using the developer rig.

- I can add dev rig instruction if someone really want's to go that route

#### Running the front end Locally:

- Clone the project
- `cd` into `TrebuchetFodder/TrebuchetFodder` (I know it's a bit redundant. We can change this if you'd like)
- run `yarn` to install dependencies
- run `yarn start` to .... start
- The project should now be running on `https://localhost:8080`. You can navigate there in your browser to confirm. You should see some testing instruction there. I'm going to expand on those now:

#### Live Testing:

- For this, you're going to need to create a blank extension on the [Twitch Developer Console](https://dev.twitch.tv/console) - the type and name doesn't matter right now. I recommend just choosing all of the types and we can test out some different formats while we poke around
- Next head over to your Twitch Creator Dashboard, go to your extensions on the left, and choose the "Invite Only" tab at the top.
  - There, you will see all of the extensions that you've created. They're likely all listed in 'testing' mode. I'm pretty sure, but not 100%, that you can select any of these, and they'll all just be pulling from your `https://localhost:8080`. So install one to your page! I installed as a `panel` because I don't think we're going to need an overlay right now.
- Now just go check out your chanel page! You should see the panel. 
- In vscode (or whatever editor you're using) navigate to `App.js` and edit the displayed text. *Voila!* Hot reload! 


##### Additional Resources: 
* [Front End API reference doc](https://dev.twitch.tv/docs/extensions/reference)