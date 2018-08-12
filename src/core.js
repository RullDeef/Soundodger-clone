/*
    This file contains all game elements.
*/

const { Vector2, Vector3 } = THREE;

var Player = {
    material: null, geometry: null, mesh: null,

    init: function(radius = 0.2) {
        Player.material = new THREE.MeshBasicMaterial({ color: 0x446600 });
        Player.geometry = new THREE.CircleGeometry(radius, 30);
        Player.mesh = new THREE.Mesh(Player.geometry, Player.material);
    }, 
}