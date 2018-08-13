# Soundodger-clone
Simple html game

list of dependencies:
- core: input

Level data structure definition:
Basic JSON-formated object:
{
    // META data first
    title: "level 1",
    author: "author's nick", 
    track: "display track title", 
    src: "https://url_of_song.mp3", 
    duration: 403, // integer amount of seconds
    enemies: 6,
    difficulty: 3, // 3 of 5 possible. Other will revert to 1-5

    // exactly level data at last
    bullets: [ ... ],
    spins: [ ... ],
    time: [ ... ]
}

Bullet format:
{
    type: 1, // 1 for bulletA, 2 - B, 3 - homming, 4 - bubble
    time: 15, // start shooting time (seconds)
    duration: 0, // seconds
    enemies: [0, 2, 3], // list of enemies indexes that should shoot

    speed: 300, // start shooting speed (when set to 300, it flies along diameter of main circle with 2 seconds) 
    offset: 0, // degrees ccw
    cone: 30,
    target: "player", // or center (default to player)
    
    // if duration is greater than zero
    speedTo: 200,
    offsetTo: -30,
    coneTo: 20,
} 