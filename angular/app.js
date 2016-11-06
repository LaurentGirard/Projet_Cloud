var app = angular.module('celebrityQuizz', ['angular-google-gapi']);

app.run(['GApi', 'GAuth',
  function(GApi, GAuth) {
      var BASE = 'https://projetcloud-148109.appspot.com/_ah/api';
      GApi.load('scoreentityendpoint','v1',BASE).then(function(resp) {
          console.log('api: ' + resp.api + ', version: ' + resp.version + ' loaded');
      }, function(resp) {
          console.log('an error occured during loading api: ' + resp.api + ', resp.version: ' + version);
      });
  }
]);

var questions = [
  {
    q: "Quel type d'attaque est super efficace contre les pokemons de type insecte ?",
    answers: ['Feu','Eau', 'Glace'],
  },
  {
    q: "Combien de badges y a-t-il dans la première génération de pokémon ?",
    answers: ['8','12','3'],
  },
  {
    q: "Quel est le pokémon numéro 144 ?",
    answers: ['Artikodin','Minidraco','Pikachu'],
  },
];

var validation = {
  ok: "WOUAHOU té cro for!",
  pas_ok: "Té nulachié...",
};

app.controller('AnswerController', ['$scope', 'GApi', function($scope, GApi){
  
  $scope.iterator = 0;
  $scope.poolQuestions = questions;
  $scope.poolValidate = validation;
  $scope.valide = "";
  $scope.notfinished = true;
  $scope.page = null; 
  $scope.current_score = 0; 
  $scope.name = null;
  
  $scope.selection = function(numanswer) {
    
    if($scope.notfinished){
      if(numanswer == 1)
      {
        $scope.valide = $scope.poolValidate.ok;
        $scope.current_score++;
      }
      else
        $scope.valide = $scope.poolValidate.pas_ok;
      
      if($scope.iterator < $scope.poolQuestions.length -1)
        $scope.iterator++;
      else
      {
        $scope.notfinished = false;
        $scope.iterator = 0;
        $scope.addScore();
        $scope.openPage('endGame');
        $scope.name = null;
        $scope.valide = "";
      }
    }
  };
  
  $scope.reset = function(){
    $scope.current_score = 0;
    $scope.notfinished = true;
    $scope.page = 'play';
  };
  
  $scope.addScore = function() {
    GApi.execute('scoreentityendpoint','insertScoreEntity',{id: Math.floor(Math.random()*1000000)+1, name: $scope.name, score: $scope.current_score}).then(function(resp) {
        console.log('Good!');
      },function(e) {
        console.log('Error!');
        console.log(e);
      });
    }

  $scope.openPage = function(page) {
    $scope.page = page;

    if (page == 'play') {
      $scope.reset();
    } else if (page == 'highscores') {
      $scope.highscores = null;
      $scope.listScores(function(data) {
        $scope.highscores = data;
      });
    }
  }
  
  $scope.listScores = function(callback) {
    GApi.execute('scoreentityendpoint','listScoreEntity').then(function(resp) {
      callback(resp.items);
    }, function() {
      console.log('Error!');
    });
  }


// $scope.listScores = function() {
//   GApi.execute('scoreentityendpoint','listScoreEntity').then(function(resp) {
//     console.log('Affichage !');
//   }, function() {
//     console.log('Error!');
//   });
// }

$scope.openPage('play');

}]) ;






