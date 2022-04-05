function init(){
    let mouse = {
        click: false,
        move:false,
        pos:{x:0, y:0},
        pos_prev:false,
    }
    //canvas
    const canvas = document.getElementById('drawing');
    const context = canvas.getContext('2d');
    const width = window.innerWidth;
    const heigth = window.innerHeight;

    canvas.width = width;
    canvas.heigth = heigth;

    const socket = io()
    

    canvas.addEventListener('mousedown', (e) =>{
        mouse.click = true
    })
    canvas.addEventListener('mouseup', (e)=>{
        mouse.click = false
    })
    canvas.addEventListener('mousemove', (e)=>{
        mouse.pos.x = e.clientX/width;
        mouse.pos.y = e.clientY/heigth;
        mouse.move = true;
    })

    socket.on('draw_line', data =>{
        const line = data.line
        context.beginPath()
        context.lineWidth = 2
        context.moveTo(line[0].x * width, line[0].y * heigth)
        context.lineTo(line[1].x * width, line[1].y * heigth)
        context.stroke()
    })

    function mainLoop(){
        if(mouse.click && mouse.move && mouse.pos_prev){
            socket.emit('draw-line', {line: [mouse.pos, mouse.pos_prev]})
            mouse.move = false
        }
        mouse.pos_prev = {x:mouse.pos.x , y:mouse.pos.y}
        setTimeout(mainLoop, 25)
    }
    mainLoop()
}
document.addEventListener('DOMContentLoaded',init)