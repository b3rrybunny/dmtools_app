
# DMTools

DMTools is a React app I've created to help streamline some of the tasks a Dungeon Master has to undertake when preparing and running a campaign. This was designed for the standard 5th edition of Dungeons and Dragons.


## Features
### Combat Manager
Conviently and efficiently creates combat scenarios and tracks combatants' turns, health, and initiative.
 - Displays combatants and their relevant combat stats and information (Actions, Immunities, HP, AC, etc.)
 - Allows for quick adding of any freely available 5e monsters and their relevant data from a database
- Ability to add any characters and homebrew monsters you've created on the 'Add Character' and 'Add Monster' pages
 - Automatically rolls initiative for nonplayer characters and monsters, and sorts them accordingly
 - Tracks current turn in an easy to understand way
 - Tracks combatant HP
### Travel Manager
This page allows the user to track travel and possible encounters during travel easily.
- Add any standard or custom monster or character to possible encounters
- Automatically calculates what happens based on input event chance and every possible result of a d20 roll
- Allows for additional notes input for planned encounters or anything else you might want to have handy while tracking party travel
- Calculates distance traveled and remaining distance to be traveled based on party pace
- Easily create a combat scenario with the input monsters for any given encounter via a button press
- Ability to import and export trip data via JSON
### Custom Characters and Monsters
The user can create player characters, NPCs, or custom monsters for use in the other features, or simply as a way to keep track of and view character/monster information. The information you can add to each character/monster is fairly in-depth and allows for all combat-relevant data to be input, and then some. Everything found on a typical 5e statblock can be entered, along with a Notes section, which allows the user to input any info that isn't covered in the other available sections.
### Simple Data Manipulation
Should the user find some of the data they input is incorrect or needs to be changed, there is an option to view and edit the JSON data stored on your device in a nicely formatted view.




## Documentation
Character and monster data is stored via local browser storage. All data is stored via JSON, and each feature allows the user to both import and export data via JSON for later use, should your local storage be cleared at any time (browsers will sometimes erase local storage without properly notifying the user first). Currently, travel and combat data storage on device is not supported, as I find those are typically single-use scenarios and do not require saving.


## Acknowledgements
This app uses:
 - [The D&D 5e SRD API by bagelbits](https://www.dnd5eapi.co/)
 - [5e Monster data JSON by tkfu](https://gist.github.com/tkfu/9819e4ac6d529e225e9fc58b358c3479)
 - [React and React-Router](https://react.dev/)
 - [Bootstrap](https://getbootstrap.com/)
 - [READMEs created with readme.so](https://readme.so/)
Code was written primarily by myself, with minimal help from [DeepSeek](https://chat.deepseek.com/) when I got stuck.



## Design Philosophy
I created this app with player engagement in mind, and as such, all actions a player/DM would take normally, rolling for damage for example, were not included in this app. I wanted a tool I could use to cut down on tedium so I could focus on actual gameplay; not an app that would automate DM-ing for me. In this sense, the app is somewhat limited in scope, but I believe it serves my purposes well.
## Feedback
Should anyone actually look at this or even use it and encounter bugs or want to give any feedback at all, go ahead and shoot me an email @ bostman@uiowa.edu.
## Usage/Examples
Clone this repo and launch normally using `npm start`.

