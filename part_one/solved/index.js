var you = {
  name: "Terry",
  guess: undefined
}

var game = {
  randomWord: undefined,
  randomWordUnderscore: [],
  numberOfGuessesLeft: 5,
  playerGuesses: []
}

var randomWords = ["panda", "octopus", "crab", "bee", "camel", "bull", "turtle", "manatee", "toucan", "crow"];

startOrResetGame();

$("#guess-text-button").click(function(){
  console.log(you)
  you.guess = $("#guess-text-input").val().toLowerCase();
  if(you.guess.length == 1){
    console.log(you)

    if(game.playerGuesses.indexOf(you.guess) == -1){
      $("#your-guess").text(you.guess);
      console.log(game)
      game.playerGuesses.push(you.guess);
      $("#player-guesses").text(game.playerGuesses.join(", "))

      if(game.randomWord.indexOf(you.guess) > -1){
        for(var i = 0; i < game.randomWord.length; i++){
          if(you.guess == game.randomWord[i]){
            game.randomWordUnderscore[i] = you.guess;
          }
        }
        var randomWordUnderscoreString = game.randomWordUnderscore.join(" ");
        console.log(randomWordUnderscoreString)
        if(randomWordUnderscoreString.indexOf("_") == -1){
          alert("You have won the game. The word was " + game.randomWord + ". Congrats!");
          startOrResetGame();
        } else {
          $("#random-word-underscore").text(randomWordUnderscoreString);
        }
      } else {
        game.numberOfGuessesLeft--;
        console.log(game)
        if(game.numberOfGuessesLeft < 1){
          alert("You Lose. The word is " + game.randomWord + ". Try again.");

          startOrResetGame();
        } else {
          $("#guesses-left").text(game.numberOfGuessesLeft);
        }
      }
    } else {
      alert("You have guessed this letter already")
    }
    $("#guess-text-input").val("");
  } else {
    alert("Guess should be 1 letter");
  }

});

function startOrResetGame(){
  game.randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
  game.randomWordUnderscore = game.randomWord.split("");

  for(var i = 0; i < game.randomWordUnderscore.length; i++){
    game.randomWordUnderscore[i] = "_";
  }
  var randomWordUnderscoreString = game.randomWordUnderscore.join(" ");
  $("#random-word-underscore").text(randomWordUnderscoreString);

  game.numberOfGuessesLeft = 5;
  $("#guesses-left").text(game.numberOfGuessesLeft);

  $("#your-guess").text("");
  you.guess = undefined;

  game.playerGuesses = [];
  $("#player-guesses").text("")
}
