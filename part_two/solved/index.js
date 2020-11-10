var you = {
  name: "Terry",
  guess: undefined,
  winningPercentage: undefined,
  wins: 0
}

var game = {
  randomWord: undefined,
  randomWordUnderscore: [],
  randomWordUnderscoreString: "",
  numberOfGuessesLeft: 5,
  playerGuesses: [],
  roundResults: [],
  roundNumber: 1,
  result: undefined,
  finalWord: undefined,
  wrongSound: "wrong.m4a",
  correctSound: "correct.m4a",
  winnerSound: "winner.m4a",
  loserSound: "loser.m4a"
}

game.randomWords = [
  {
    word: "panda bear",
    img: "https://beaniepedia.com/beanies/files/2019/01/peking.jpg"
  },{
    word: "polar bear",
    img: "http://lovemybeanies.com/wp-content/uploads/2017/05/s-l500-2.jpg"
  },{
    word: "octopus",
    img: "https://images-na.ssl-images-amazon.com/images/I/711W1YPZDQL._AC_SX425_.gif"
  },{
    word: "crab",
    img: "https://i.pinimg.com/originals/be/11/11/be11115df2bec42407eda28740258e5d.jpg"
  },{
    word: "bee",
    img: "https://beaniepedia.com/beanies/files/2012/11/bumblebeanie-1.jpg"
  },{
    word: "camel",
    img: "https://moneyinc.com/wp-content/uploads/2019/05/Humphrey-the-Camel.jpg"
  },{
    word: "bull",
    img: "https://vignette.wikia.nocookie.net/ty-inc-beanie-babies/images/0/01/S-l1000.jpg/revision/latest/top-crop/width/360/height/450?cb=20190406152929"
  },{
    word: "turtle",
    img: "https://www.bbtoystore.com/mm5/beanies/speedy.jpg"
  },{
    word: "manatee",
    img: "https://images-na.ssl-images-amazon.com/images/I/719XXZF8MML._AC_SX425_.gif"
  },{
    word: "toucan",
    img: "https://i.pinimg.com/originals/8c/62/e2/8c62e251da41d929e2d3ba0af055f881.jpg"
  },{
    word: "crow",
    img: "https://beaniepedia.com/beanies/files/2019/01/caw.jpg"
  },{
    word: "great white shark",
    img: "https://i.etsystatic.com/5718154/r/il/9ab917/1267177516/il_794xN.1267177516_bj46.jpg"
  },{
    word: "brown bear",
    img: "https://www.bbtoystore.com/mm5/beanies/cubbie_540x540.jpg"
  },{
    word: "black bear",
    img: "https://i.etsystatic.com/17375217/r/il/3b22ae/2536818062/il_794xN.2536818062_rlde.jpg"
  }
];

startOrResetGame();

$("#start-game-button").click(function(){
  $(".game").show();
  $("#start-game-button").hide();
});

$("#guess-text-button").click(function(){
  you.guess = $("#guess-text-input").val().toLowerCase();
  if(you.guess.length == 1){
    if(game.playerGuesses.indexOf(you.guess) == -1){
      $("#your-guess").text(you.guess);

      appendPlayersGuesses(you, game)

      checkGuessedLetter(you, game);

    } else {
      alert("You have guessed this letter already")
    }
    $("#guess-text-input").val("");
  } else {
    alert("Guess should be 1 letter");
  }

});

function startOrResetGame(){
  console.log(game)
  if(game.randomWords.length > 0){
    game.randomWord = game.randomWords[Math.floor(Math.random() * game.randomWords.length)];
    game.randomWordUnderscore = game.randomWord.word.split("");
    for(var i = 0; i < game.randomWordUnderscore.length; i++){
      if(game.randomWordUnderscore[i] != " "){
        game.randomWordUnderscore[i] = "_";
      } else {
        //https://www.w3schools.com/html/html_entities.asp
        game.randomWordUnderscore[i] = "&nbsp;"
      }
    }
    var randomWordUnderscoreString = "";
    for(var i = 0; i < game.randomWordUnderscore.length; i++){
      randomWordUnderscoreString += "<span> "+game.randomWordUnderscore[i]+" </span>";
    }
    $("#random-word-underscore").html(randomWordUnderscoreString);
    game.randomWordUnderscoreString = "";

    game.numberOfGuessesLeft = 5;
    $("#guesses-left").text(game.numberOfGuessesLeft);

    $("#your-guess").text("");
    you.guess = undefined;

    game.playerGuesses = [];
    $("#player-guesses").text(game.playerGuesses.join(", "));
  } else {
    showGameOverToast("Game Over. All Words Used.")
    setTimeout(function(){
      $('body').empty();
      $('body').html("<h1>Refresh the browser if you would like to play again");
    }, 5000);
  }
}

function appendRoundResults(roundResultsArray){
  var htmlString = "";
  var roundString = "";
  for(var i = 0; i < roundResultsArray.length; i++){
    if(roundResultsArray[i].result == "win"){
      roundString = "<li>Result: " + roundResultsArray[i].result + ", Random Word: " + roundResultsArray[i].finalWord.join("") + "</li>";
    } else {
      roundString = "<li>Result: " + roundResultsArray[i].result + ", End Result: " + roundResultsArray[i].finalWord.join(" ") + ", Random Word: " + roundResultsArray[i].randomWord + "</li>";
    }
    htmlString += roundString;
  }
  $(".rounds-list").html(htmlString);
}

function checkGuessedLetter(you, game){
  if(game.randomWord.word.indexOf(you.guess) > -1){
    for(var i = 0; i < game.randomWord.word.length; i++){
      if(you.guess == game.randomWord.word[i]){
        game.randomWordUnderscore[i] = you.guess;
      }
    }
    game.randomWordUnderscoreString = game.randomWordUnderscore.join(" ");

    if(game.randomWordUnderscoreString.indexOf("_") == -1){
      gameWinner(you, game);
    } else {
      var htmlString = "";
      for(var i = 0; i < game.randomWordUnderscore.length; i++){
        if(game.randomWordUnderscore[i] != "_"){
          htmlString += "<span class='colored-letter'>"+ game.randomWordUnderscore[i] +"</span> "
        } else {
          htmlString += "<span>"+ game.randomWordUnderscore[i] +"</span> "
        }
      }
      playSound("correct")
      $("#random-word-underscore").html(htmlString);
    }

  } else {
    game.numberOfGuessesLeft--;

    if(game.numberOfGuessesLeft < 1){
      gameLoser(game);
    } else {
      playSound("wrong")
      $("#guesses-left").text(game.numberOfGuessesLeft);
    }
  }
}

function appendPlayersGuesses(you, game){
  game.playerGuesses.push(you.guess);
  $("#player-guesses").text(game.playerGuesses.join(", "));
}

function gameWinner(you, game){
  showImageOnWin(game);
  playSound("winner")

  showWinnerLoserToast("You have won the round. The word was " + game.randomWord.word + ". Congrats!");

  you.wins++;
  game.result = "win";
  var result = {
    result: game.result,
    finalWord: game.randomWordUnderscore,
    roundNumber: game.roundNumber,
    randomWord: game.randomWord.word
  }
  game.roundResults.push(result);
  appendRoundResults(game.roundResults);

  game.roundNumber++;
  removeWordAfterUsage(game);

  startOrResetGame();
}

function gameLoser(game){
  playSound("loser")
  showWinnerLoserToast("You Lose the round. The word is " + game.randomWord.word + ". Try again.");
  game.result = "loss"

  var result = {
    result: game.result,
    finalWord: game.randomWordUnderscore,
    roundNumber: game.roundNumber,
    randomWord: game.randomWord.word
  }
  game.roundResults.push(result);
  appendRoundResults(game.roundResults);

  game.roundNumber++;
  removeWordAfterUsage(game);

  startOrResetGame();
}

function showImageOnWin(game){
  var img = $("<img>");
  img.attr("src", game.randomWord.img);
  img.attr("height", 200).attr("width", 200);
  img.fadeOut(5000);
  $(".word-and-image").append(img);
}

function showWinnerLoserToast(text){
  $("#winner-loser-toast-body").text(text)
  $('#winner-loser-toast').toast('show')
}

function showGameOverToast(text){
  $("#game-over-toast-body").text(text)
  $('#game-over-toast').toast('show')
}

function playSound(soundType){
  var sound = undefined;
  if(soundType == "wrong"){
    sound = game.wrongSound
  } else if (soundType == "correct"){
    sound = game.correctSound
  } else if (soundType == "winner"){
    sound = game.winnerSound
  } else {
    sound = game.loserSound
  }

  var audioString = '<audio autoplay style="display: none;"><source src="audio/'+sound+'" type="audio/mpeg"></audio><p>Currently playing the '+soundType+' sound<p>'
  $(".sound-div").html(audioString);
}

function removeWordAfterUsage(game){
  var randomWordIndex = game.randomWords.indexOf(game.randomWord);
  game.randomWords.splice(randomWordIndex, 1);
}
