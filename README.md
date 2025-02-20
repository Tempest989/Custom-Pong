# Custom-Pong
This is custom Javascript web-brower based version of the classic game Pong. This version of Pong has multiple modes, which combinations of Normal Pong, Pong with Custom Obstacles and/or Powerups, and a Chaos mode. Read further for more details and Hope you Have Fun!

## How-To-Play
Pull the repository and load the *index.html* file into your web-browser and it should be ready to play

## Controls
This version supports both keyboard and touch-screen, with touch-screen inputs prioritised if both a keyboard and touch-screen are usable.
### Touch-Screen
* Buttons can be interacted like normal and should be intuitive as to what they do.
* Touch the screen over your paddle and drag your finger for the paddle to follow your finger.
### Keyboard
* Right Paddle moves UP with "*w*" and moves DOWN with "*s*".
* Left Paddle moves UP with "*arrow_up*" and moves DOWN with "*arrow_down*".
* Can Pause the game with the Pause button or by pressing "*p*".
* Can Reset the current Ball back to the middle, cancelling all Effects and Powerups, via "*shift*" + "*r*". This is a built in measure in case an error occurs where the ball is off screen somehow to reset the ball without restarting the game.

## Game Modes
### Common Rules Between All Modes
* Letting a ball passed your paddle counts as +1 point to your opponent.

### Normal Pong
* First to 10 points wins.
### Obstacles Pong
* Adds Obstacles into the middle of the playing field to make it harder to predict where the ball will travel as it reflects off the Obstacles surfaces during travel.
### Powerups Pong
* Add moving Powerups that when the ball hits, activate the Powerup written on the Powerup.
#### NOTES
* If any control or player paddle changes occur, the letters / characters closests to your paddle will change from Red to Green to reflect that changes made.
* Due to there only being 3 letters used to show Powerups name, it can be hard to tell what each Powerup does, which adds a bit of fun?
#### Example Powerups
* *Changing Sizes and/or Speeds of Balls / Paddles*: Either Bigger or Smaller.
* *Ivert Paddle Controls*: So Up = Down and Down = Up.
* *Make Balls Bouncy*: So all current Balls increase their Speed slightly after every contact.
* *Spawn in MORE Balls?*: For a bit more fun and chaos!
* And More!!
### Chaos Pong
* First to 100 points wins.
* Always has Powerups active.
* Each time a Powerup is activated, the Multi-Ball Powerup will activate, Spawning in more Balls for each Powerup activated.

## Potential Future Features?
* Adding a Proper in-built Settings area to alter different parts of the game for further ease-of-customization access. Unlikely to Add.
* Add more Powerups and/or Obstacles to add more variety. Most Likely to Happen.
* Add more Game Modes for more fun! Maybe, mainly dependent on how fun / unique the game mode would be and how hard to implement it would be. 

## Current Known Issues
* The current collision system for checking and conducting the collisions between balls and obstacles is flawed under certain conditions with it not doing certain interactions correctly. An example is if a ball is travelling directly towards a certain obstacles wall, but it should hit one of the obstacles side walls first based on the circumference of the ball being the contact point, this will not occur, instead the ball will only make contact and reflect off the wall its directly travelling to. This is due to the contact system only checking the middle of the ball for any contacts with walls of obstacles in a single line, rather than accounting for any collisions the balls circumference might have with other walls on the ball trajectory. At small ball sizes, like the default ball size, this interaction will rarely occur and only on specific maps, making it a rare and hard to spot issue / error under normal play. But as the balls radius increase, so the balls size increases via powerups or editing settings, there is much higher chances of the circumference of the ball hitting other walls first which aren't checked, making the issue / error much more noticable. The only way this can be fixed is by re-working the entire collision system to work based off the circumference of the ball rather than the middle, which will be a big undertaking, so considering it only occurs under rare circumstances normally, I will solve this issue later since it has little impact on most normal gameplay, though it definitely needs to be properly addressed and solved.
* Currently have't identified other issues / errors, but they definitely exist so feel free to keep a look out for them and report issues you find if you wish to.

## Thanks For Reading And Hope You Have Fun Playing!
