//take input color
//change color of circle to above value
//take slider value and change size of circle accordingly(size of circle represents thickness of drawing)
//draw on canvas
//erase button to change from draw mode to erase mode and vice versa
//save button saves the Drawing
//reset button erases full drawing or goes back to last save
var colorval=document.getElementById('colorval');
var circle=document.getElementById('circle');

var paint=document.getElementById('paint');
var context=paint.getContext('2d');

var erase=document.getElementById('erase');
var reset=document.getElementById('reset');
var save=document.getElementById('save');

paint.width=0.75*window.innerWidth;
paint.height=0.6*window.innerHeight;
window.addEventListener('resize',function()
{
	paint.width=0.75*window.innerWidth;
	paint.height=0.6*window.innerHeight
});

colorval.addEventListener('input',function()
{
	circle.style.backgroundColor=colorval.value;
});

$('#slider').on('change',function(event,ui){
	circle.style.width=circle.style.height=$('#slider').val()+'px';
});

var ispaint='false';
var iserase='false'

var x,y;

erase.addEventListener('click',function()
{
	if(iserase=='false')
	{
		iserase='true';
		erase.style.backgroundColor='#f442df';
	}
	else {
		iserase='false';
		erase.style.backgroundColor='#f2e1e1';
	}
});

//For pc
paint.addEventListener('mousedown',function(event){
	ispaint='true';
	x=event.pageX-paint.offsetLeft;
	y=event.pageY-paint.offsetTop;
	context.lineWidth=parseInt(circle.style.width);
	if(iserase=='false')
	{
		context.strokeStyle=colorval.value;
	}
	else
	{
		context.strokeStyle='#ffffff';
	}
	context.beginPath();
	context.moveTo(x,y);
});
paint.addEventListener('mousemove',function(event)
{
	if(ispaint=='true')
	{
		x=event.pageX-paint.offsetLeft;
		y=event.pageY-paint.offsetTop;
		context.lineTo(x,y);
		context.stroke();
	}
});

paint.addEventListener('mouseup',function(){
	ispaint='false';
});
///////////////////////////////////////////

//for mobile
paint.addEventListener('touchstart',function(event){
	ispaint='true';
	x=event.pageX-paint.offsetLeft;
	y=event.pageY-paint.offsetTop;
	context.beginPath();
	context.moveTo(x,y);
	console.log(x+' '+y);
});
paint.addEventListener('touchmove',function(event)
{
	if(ispaint=='true')
	{
		x=event.pageX-paint.offsetLeft;
		y=event.pageY-paint.offsetTop;
		context.lineTo(x,y);
		console.log(x+' '+y);
		context.stroke();
	}
});

paint.addEventListener('touchend',function(){
	ispaint='false';
});
/////////////////////////////////////////////

save.addEventListener('click',function(){
	save.href=paint.toDataURL();
	save.download='mydrawing.png';
});

reset.addEventListener('click',function(){
	context.clearRect(0,0,paint.width,paint.height);
});
