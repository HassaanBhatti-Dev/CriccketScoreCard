import { teamA, teamB } from './teams.js';

const teamAPlayers = document.querySelectorAll('.team-a-player-list .players');
const teamAPlayersArray = Array.from(teamAPlayers);
console.log("teamAPlayersArray==>", teamAPlayersArray);
// setBattersonCrease()
const teamBPlayers = document.querySelectorAll('.team-b-player-list .players');
const teamBPlayersArray = Array.from(teamBPlayers);
console.log("teamBPlayersArray==>", teamBPlayersArray);

teamAPlayersArray.forEach((element, index) => {
    element.textContent = teamA.players[index].player;
});

teamBPlayersArray.forEach((element, index) => {
    element.textContent = teamB.players[index].player;
});

function addBatterScores(batter, runs, balls = 0) {
    const rawBatterName = batter.split(" ");
    console.log("rawBatterName==>", rawBatterName);

    const batterName = rawBatterName[0] + " " + rawBatterName[1];
    console.log("player==>Before", batterName);

    const player = teamA.players.find(player => player.player === batterName);
    console.log("player==>After", player);

    if (player) {
        player.runs += runs;
        player.balls += balls;
    }
    console.log("team A==>", teamA);

}

function setBattersOnCrease() {
    const striker = document.querySelector(".striker");

    // Update only the name part (first child text node)
    striker.childNodes[0].textContent = teamA.players[0].player;

    const nonStriker = document.querySelector(".non-striker");

    nonStriker.childNodes[0].textContent = teamA.players[1].player;
    console.log("striker.textContent==>", striker.textContent);
    console.log("non-striker.textContent==>", nonStriker.textContent);
}

// export { addBatterScores, setBattersOnCrease }; // ! to use later