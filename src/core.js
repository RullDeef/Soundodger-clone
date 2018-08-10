/*
This file contains basic game functions and classes
*/

const { Vector2 } = THREE;

var Input = {
    touchPos: new Vector2,
    delta: new Vector2,
    
    init: function() {
        window.addEventListener('touchstart', e => this.start(e));
        window.addEventListener('touchmove', e => this.update(e));
    }, 
    
    start: function(event) {
        let x = event.touches[0].pageX;
        let y = event.touches[0].pageY;
        x = x/window.innerWidth*2 - 1;
        y = 1 - y/window.innerHeight*2;
        
        this.touchPos.set(x, y);
        this.delta.set(0, 0);
    }, 
    
    update: function(event) {
        let x = event.touches[0].pageX;
        let y = event.touches[0].pageY;
        x = x/window.innerWidth*2 - 1;
        y = 1 - y/window.innerHeight*2;
        
        this.delta.x = x - this.touchPos.x
        this.delta.y = y - this.touchPos.y;
        this.touchPos.set(x, y);
    }
}
