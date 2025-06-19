"use strict";

const homeScore = document.getElementById("scoreHome")
const home = document.getElementById("home")
let scoreHome = 0;
const guestScore = document.getElementById("scoreGuest")
const guest = document.getElementById("guest")
let scoreGuest = 0;

function add(team, amount){    
    if(team === "home"){
        scoreHome += amount;
        homeScore.textContent = scoreHome
    }
    else{
        scoreGuest += amount;
        guestScore.textContent = scoreGuest
    }
    
    if(scoreGuest > scoreHome) {
        guest.classList.add("winning")
        home.classList.remove("winning")
    }
    else if(scoreHome > scoreGuest){
        home.classList.add("winning")
        guest.classList.remove("winning")
    }
    else{
        guest.classList.remove("winning")
        home.classList.remove("winning")
    }
}

function reset() {
    scoreGuest = scoreHome = 0;
    homeScore.textContent = guestScore.textContent = scoreGuest
    home.classList.remove("winning")
    guest.classList.remove("winning")
}