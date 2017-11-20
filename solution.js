/** Initialize Io*/
(function initIo(){
    _io = new space_object("#io");
    _io.angle = Math.PI;
    _io.step = Math.PI/100;

    /** Calculate gravity center.
    * A little bit of magic: somehow _io.gravityCenter.x is obtained from
    * height value of container. Tried use width - gravity center moved in
    * top left corner of container :(
    */
    let container = $(".space-conatiner")[0];
    let containerPos = container.getBoundingClientRect();
    _io.gravityCenter = {
        x: (containerPos.height/2)/10,
        y: (containerPos.height/2 - _io.el.offsetHeight/2)/10
    }

    /** Calculate orbit radius.
     * containerCenter - center in local container coords.
     * ioCenter - io center in container coords.
    */
    let containerCenter = {
        x: containerPos.width/2,
        y: containerPos.height/2
    }
    let ioPos = _io.el.getBoundingClientRect();
    let ioCenter = {
        x: containerCenter.x - (_io.el.offsetLeft + ioPos.width/2),
        y: containerCenter.y - (_io.el.offsetTop + ioPos.height/2)
    }
    _io.orbitRadius = Math.sqrt(ioCenter.x*ioCenter.x + ioCenter.y*ioCenter.y)/10;
})();

INTERVAL_ID = setInterval(function(){
    function calculateNewPos(angle){
        let x = _io.orbitRadius * Math.cos(angle);
        let y = _io.orbitRadius * Math.sin(angle);
        let newAngle = angle + _io.step;
        return {x, y, angle: newAngle};
    }

    let newPos = calculateNewPos(_io.angle);
    /** Native move method (see origin) moves Io inconveniently im my opinion.
    * So here first step - move Io, second change it's gravity center.
    */
    _io.move(newPos.x - _io.x, newPos.y - _io.y);
    _io.move(_io.gravityCenter.x, _io.gravityCenter.y);
    _io.angle = newPos.angle;
}, 10);
