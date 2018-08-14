/*
    This file contains all game elements.
*/

const { min, max } = Math;
const { Vector2, Vector3 } = THREE;

/*
    Level data wrapper. Let peacefully change meta properties. Created with portability purposes. 
*/
function LevelData() {
    this.title = 'untitled';
    this.author = 'unknown';
    this.track = 'unknown track';
    this.src = '#';
    this.difficulty = 0;
    this.bullets = [];
    this.spins = [];
    this.time = [];
} 

LevelData.prototype.setDifficulty = function(d) {
    this.difficulty = max(1, min(+d, 5));
} 

LevelData.prototype.addBullet = function(b) {
    this.bullets.push(b);
} 

LevelData.prototype.addSpin = function(s) {
    this.spins.push(s);
} 

LevelData.prototype.addTime = function(t) {
    this.time.push(t);
} 

LevelData.prototype.activeEnemies = function() {
    return [];
} 

/*
    Spin function
*/
LevelData.Spin = function(time, speed = 0) {
    this.time = time;
    this.speed = speed;
}

/*
    Time scaler
*/
LevelData.Time = function(time, scale = 1) {
    this.time = time;
    this.scale = max(-2, min(scale, 2));
} 

/*
    Bullet function
*/
LevelData.Bullet = function(type) {
    this.type = type;
    this.time = 0; this.duration = 0;
    this.enemies = [];
    this.amount = 1;
    this.speed = 300;
    this.offset = 0; this.cone = 0;
    this.wave = false; this.waves = 1;
    this.amountTo = 1; this.speedTo = 0;
    this.offsetTo = 0; this.coneTo = 0;
    this.lifespan = 3;
} 

/*
    Player object
*/
var Player = {
    material: null, geometry: null, mesh: null,

    init: function(radius = 0.2) {
        Player.material = new THREE.MeshBasicMaterial({ color: 0x446600 });
        Player.geometry = new THREE.CircleGeometry(radius, 30);
        Player.mesh = new THREE.Mesh(Player.geometry, Player.material);
    }, 
}

/*
    Prototype for enemy
    RadiusE = enemy radius 
    RadiusF = field radius
    offset = [0 -> -90°] cw
*/
function Enemy(radiusE, radiusF, offset = 0) {
    this.material = new THREE.MeshNormalMaterial;
    this.geometry = new THREE.CircleGeometry(radiusE, 30);
    
    this.offset = PI*(1/2 - offset/180);
    this.r = radiusF + radiusE;
    this.updatePosition();
    
    this.mesh = new THREE.Mesh(this.geometry, this.material);
}

Enemy.prototype.updatePosition = function() {
    let offset = this.offset, r = this.r;
    let x = r*cos(offset), y = r*sin(offset);
    this.geometry.position.set(x, y, -1);
} 

/*
    Bullet prototype
    type = [1-4]
    parent - enemy
    target - mesh (player or field)
    offset here in radians! 
*/
function Bullet(type, parent, target, speed, offset) {
    this.geometry = new THREE.SphereGeometry(1, 20, 10);
    this.material = new THEEE.MeshNormalMaterial;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    
    this.geometry.position.copy
        (parent.geometry.position);
    this.geometry.position.z = 0;

    let tpos = target.geometry.position.clone();
    tpos.z = 0;
    this.geometry.lookAt(tpos);
    this.rotation.z += offset;

    this.speed = speed;
} 

/*
    Level management class
*/
function Level(data) {
    this.data = data || new LevelData;
    this.enemies = []; // list of active enemies
    this.bullets = []; // list of active bullets
} 

Level.prototype.init = function() {
    let eList = this.data.activeEnemies();
    for(let e of eList) 
        this.enemies.push(new Enemy(0.6, 3, 0));
} 