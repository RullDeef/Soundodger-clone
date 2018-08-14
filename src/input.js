/*
    This file contains Input structure for handling touch input. 
*/

var Input = {
    touchPos: new THREE.Vector2,
    delta: new THREE.Vector2,
    _clickArr: [], 
    
    init: function() {
        window.addEventListener('touchstart', e => this.start(e));
        window.addEventListener('touchmove', e => this.update(e));
        
        window.addEventListener('click', e => {
            this.click(e);
            this._clickArr.forEach(ob => ob.f(...(ob.args)));
        });
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
    }, 
    
    click: function(event) {
        let x = event.pageX;
        let y = event.pageY;
        
        x = x/window.innerWidth*2 - 1;
        y = 1 - y/window.innerHeight*2;
        
        this.touchPos.set(x, y);
        this.delta.set(0, 0);
    }, 
    
    onclick: function(f, ...args) {
        this._clickArr.push({f, args});
    }
}