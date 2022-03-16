var socket;
var isConnected;
var osc_str='test';

var space = 90;
var y_ground=200;
var y_keyboard=500;
var rSide = [];
var mid = [];
var lSide = [];
var black = [];
var osc = [];
var envo = [];
var sound_switch=11;
var notebase_switch=0;
var sclae_switch=1;
var notename_switch=1;

var rKee = ['A',null,null,null,'G',null,null,'K',null,null,null,'4',null,null,'+'];
var midKee = [null,'S','D',null,null,'H',null,null,'L',';',null,null,'5',null,null];
var lKee = [null,null,null,'F',null,null,'J',null,null,null,"'",null,null,'6',null];
var blKee = ['W','E','R',null,'Y','U',null,'O','P','[',null,'8','9',null,null];
var w_Kee = ['F','G','A','B','C','D','E','F','G','A','B','C','D','E','F'];
var b_Kee = ['A',null,null,null,'G',null,null,'K',null,null,null,'4',null,null,'+'];



var notes=[53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77];
var w_notes = [53,55,57,59,60,62,64,65,67,69,71,72,74,76,77];
var b_notes = [54,56,58,null,61,63,null,66,68,70,null,73,75,null,null];

var kw_number = [65,83,68,70,71,72,74,75,76,186,222,100,101,102,107];
var kb_number = [87,69,82,null,89,85,null,79,80,219,null,104,105,null,null];

var wnote_name=['F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5'];
var bnote_name=['F3#','G3#','A3#',null,'C4#','D4#',null,'F4#','G4#','A4#',null,'C5#','D5#',null,null];

var w_num=0;
var b_num=0;

var w_note_name='';
var b_note_name='';

let sound_radio;
let notebase_radio;
let scale_select;

var w_scale=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_scale_normal=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_scale_major=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_scale_minor=[1,1,0,0,1,1,0,1,1,0,0,1,1,0,1];
var w_scale_pentatonic=[0,1,1,0,1,1,1,0,1,1,0,1,1,1,0];
var w_scale_blue=[1,1,0,0,1,0,0,1,1,0,0,1,0,0,1];

var b_scale=[1,1,1,0,1,1,0,1,1,1,0,1,1,0,0];
var b_scale_normal=[1,1,1,0,1,1,0,1,1,1,0,1,1,0,0];
var b_scale_major=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var b_scale_minor=[0,1,1,0,0,1,0,0,1,1,0,0,1,0,0];
var b_scale_pentatonic=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var b_scale_blue=[1,0,1,0,0,1,0,1,0,1,0,0,1,0,0];

var w_chord=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_chord_maj=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_chord_min=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_chord_aug=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_chord_dim=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_chord_d7=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_chord_maj7=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_chord_min7=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var w_chord_dim7=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

var b_chord=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var b_chord_maj=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var b_chord_min=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var b_chord_aug=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var b_chord_dim=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var b_chord_d7=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var b_chord_maj7=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var b_chord_min7=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var b_chord_dim7=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];


function setup() {
  setupOsc(8000, 4560);
  
  createCanvas(space * 15, y_ground+y_keyboard);

  sound_radio = createRadio();
  sound_radio.position(10, 10);
  sound_radio.option('11','l_Sin');
  sound_radio.option('12','l_Tri');
  sound_radio.option('13','l_Sqr');
  sound_radio.option('14','l_Saw');
  sound_radio.option('21','r_piano');
  sound_radio.option('22','r_pluck');
  sound_radio.option('23','r_tb303');
  sound_radio.option('24','r_saw');
  sound_radio.option('25','r_sine');
  sound_radio.option('26','r_fm');
  sound_radio.style('width', '1000px');
  sound_radio.size(1000,100);
  sound_radio.selected('11');
  textAlign(CENTER);
  sound_radio.changed(sound_sw);

  notename_select = createSelect();
  notename_select.position(10, 50);
  notename_select.option('C',1);
  notename_select.option('C#',2);
  notename_select.option('D',3);
  notename_select.option('D#',4);
  notename_select.option('E', 5);
  notename_select.option('F',6);
  notename_select.option('F#',7);
  notename_select.option('G',8);
  notename_select.option('G#',9);
  notename_select.option('A', 10);
  notename_select.option('A#', 11);
  notename_select.option('B', 12);
  notename_select.style('width', '100px');
  notename_select.size(50,20);
  notename_select.selected('C');
  textAlign(CENTER);
  notename_select.changed(notename_sw);
  
  scale_select = createSelect();
  scale_select.position(80, 50);
  scale_select.option('normal',1);
  scale_select.option('major',2);
  scale_select.option('minor',3);
  scale_select.option('pentatonic',4);
  scale_select.option('blue', 5);
  scale_select.style('width', '100px');
  scale_select.size(100,20);
  scale_select.selected('normal');
  textAlign(CENTER);
  scale_select.changed(scale_sw);  
  
  chordname_select = createSelect();
  chordname_select.position(200, 50);
  chordname_select.option('maj',1);
  chordname_select.option('min',2);
  chordname_select.option('aug',3);
  chordname_select.option('dim',4);
  chordname_select.option('7', 5);
  chordname_select.option('maj7',6);
  chordname_select.option('min7',7);
  chordname_select.option('dim7',8);
  chordname_select.style('width', '100px');
  chordname_select.size(100,20);
  chordname_select.selected('maj');
  textAlign(CENTER);
  chordname_select.changed(chordname_sw);  
    
  notebase_select = createSelect();
  notebase_select.position(350, 50);
  notebase_select.option('-2',-24);
  notebase_select.option('-1',-12);
  notebase_select.option('0',0);
  notebase_select.option('+1',12);
  notebase_select.option('+2',24);
  notebase_select.style('width', '100px');
  notebase_select.size(100,20);
  notebase_select.selected('0');
  textAlign(CENTER);
  notebase_select.changed(notebase_sw); 
   
  for (let j = 0; j < 25; j++) {
      envo[j]=new p5.Env();
      envo[j].setADSR(0.1, 0.3, 0.5, 0.1);
      envo[j].setRange(0.3, 0);
      osc[j]=new p5.Oscillator();
      osc[j].amp(envo[j]);
    }
    
  for (var i = 0; i < 15; i++) {
    rSide.push(new rSideKey(i, space, rKee[i]));
    mid.push(new MidKey(i, space, midKee[i]));
    lSide.push(new lSideKey(i, space, lKee[i]));
    black.push(new BlackKey(i + 0.667, space, blKee[i]));
  }
}


function draw() {
  background(255);
   
  text(w_note_name, 15+(90*w_num),150);
  text(b_note_name, 60+(90*b_num),150);
  text(note, 100,100);
  text(notename_switch, 200,100);
 
/*

 if(on == 144) {
   for (let i = 0; i < 15; i++) {
       if(w_notes[i]==note){
         sendOsc('/1/multitoggle_k02/1/1', 1);   
         osc_str='/1/push2'+str(note);
         sendOsc(osc_str, 1);
         rSide[i].red();
         lSide[i].red();
         mid[i].red();
       }
   } 

   for (let i = 0; i < 15; i++) {
       if(b_notes[i]==note){
         sendOsc('/1/multitoggle_k02/1/1', 1);   
         osc_str='/1/push2'+str(note);
         sendOsc(osc_str, 1);
         black[i].red();
        }
     }
  }

*/
      
  for (var i = 0; i < rSide.length; i++) {
    if (i ===0  || i === 4 || i === 7|| i === 11|| i === 14) {
      rSide[i].display();
    }
    if (i === 1 || i === 2 || i === 5 || i === 8 || i === 9|| i === 12) {
      mid[i].display();
    }
    if (i === 3 || i === 6 || i === 10|| i === 13) {
      lSide[i].display();
    }
    if ((i !== 3) && (i !== 6) && (i !== 10) && (i !== 13)&& (i !== 14)) {
      black[i].display();
    }
   }
   
    fill(0, 0, 0);
    rect(width-(space/3), y_ground, (space/3), (height-y_ground) * 0.6);
    
     for (let i = 0; i < 15; i++) {
      if(w_scale[i]==1){
        //  rSide[i].green();
        //  black[i].green();
        //  mid[i].green();
          //text('ere',(space/3)+(i*space), height - (space/3));
        fill(0,255,0);
        rect((space/3)+(i*space), height - (space),space/3,space/3,space/3);
       }
         if(b_scale[i]==1){
          fill(0,255,0);
          rect((space*4/5)+(i*space),((height-y_ground) * 0.6+y_ground-space*2/3),space/5,space/5,space/5);
          //text(this.kee, this.x + (this.keyWidth *0.2), ((height-y_ground) * 0.6+y_ground)  - this.size);
        }
    }
    
    fill(0,0,0);
}


function sound_sw(){
  sound_switch = sound_radio.value();  
  switch (sound_switch) {
     case '11':
       for (let j = 0; j < 25; j++) {
        osc[j].setType('sine');
       }
       break; 
     case '12':
       for (let j = 0; j < 25; j++) {
        osc[j].setType('triangle');
       }
       break; 
     case '13':
       for (let j = 0; j < 25; j++) {
        osc[j].setType('sawtooth');
       }
       break; 
     case '14':
      for (let j = 0; j < 25; j++) {
         osc[j].setType('square');
       }
       break; 
    case '21':
       sendOsc('/1/multitoggle_k02/1/1', 1);   
       break;
    case '22':
       sendOsc('/1/multitoggle_k02/1/2', 1);   
       break;
    case '23':
       sendOsc('/1/multitoggle_k02/1/3', 1);   
       break;
    case '24':
       sendOsc('/1/multitoggle_k02/1/4', 1);   
       break;
    case '25':
       sendOsc('/1/multitoggle_k02/1/5', 1);   
       break;
    case '26':
       sendOsc('/1/multitoggle_k02/1/6', 1);   
       break;   
    }
}

function notename_sw(){
  notename_switch=notename_select.value();
  
  
  
}

function scale_sw(){
   sclae_switch=scale_select.value();
   switch (sclae_switch) {
     case '1':
       for (let j = 0; j < 15; j++) {
        w_scale[j]=w_scale_normal[j];
        b_scale[j]=b_scale_normal[j];
       } 
       break;
    case '2':
      for (let j = 0; j < 15; j++) {
        w_scale[j]=w_scale_major[j];
        b_scale[j]=b_scale_major[j];
       } 
       break;
    case '3':
      for (let j = 0; j < 15; j++) {
        w_scale[j]=w_scale_minor[j];
        b_scale[j]=b_scale_minor[j];
       } 
       break;
    case '4':
      for (let j = 0; j < 15; j++) {
        w_scale[j]=w_scale_pentatonic[j];
        b_scale[j]=b_scale_pentatonic[j];
       }  
       break;
    case '5':
      for (let j = 0; j < 15; j++) {
        w_scale[j]=w_scale_blue[j];
        b_scale[j]=b_scale_blue[j];
       }   
       break;
    }
}



function chordname_sw(){
}

function notebase_sw(){
   notebase_switch=notebase_select.value();
   switch (notebase_switch) {
     case '-24':
       notebase_switch=-24;
       sendOsc('/1/multitoggle_octave_k02/1/1', 1);   
       break;
    case '-12':
       notebase_switch=-12;
       sendOsc('/1/multitoggle_octave_k02/1/2', 1);   
       break;
    case '0':
       notebase_switch=0;
       sendOsc('/1/multitoggle_octave_k02/1/3', 1);  
       break;
    case '12':
       notebase_switch=12;
       sendOsc('/1/multitoggle_octave_k02/1/4', 1);   
       break;
    case '24':
       notebase_switch=24;
       sendOsc('/1/multitoggle_octave_k02/1/5', 1);   
       break;
    }
}

function clear_color(){
  for (let i = 0; i < 15; i++) {
    rSide[i].white();
    black[i].white();
    mid[i].white();
    lSide[i].white();
  }
}

function keyPressed(){ 
  for (let i = 0; i < 15; i++) {
    if(keyCode==kw_number[i] && w_scale[i]==1){
      b_note_name='';
      rSide[i].red();
      lSide[i].red();
      mid[i].red();
      w_note_name=wnote_name[i];
      w_num=i;
     
     if(sound_switch<20){
        osc[i].start();
        osc[i].freq(midiToFreq(w_notes[i]+int(notebase_switch)));
        envo[i].play();      
      }else{
        osc_str='/1/push2'+str(w_notes[i]);
        sendOsc(osc_str, 1);
      }  
    }
  }
  
  for (let i = 0; i < 15; i++){
    if(keyCode==kb_number[i] && b_scale[i]==1){
      w_note_name='';
      black[i].red();
      b_note_name=bnote_name[b_num];
      b_num=i;
       
    if(sound_switch<20){
      osc[i].start();
      osc[i].freq(midiToFreq(w_notes[i])+int(notebase_switch));
      envo[i].play();      
     }else{
      osc_str='/1/push2'+str(b_notes[i]);
      sendOsc(osc_str, 1);
     } 
    }
 }
}


function keyReleased() {
  clear_color();   
}

// When we click
function mousePressed(){
  // Map mouse to the key index
  var key_w =floor(mouseX/space);
  var key_b =floor((mouseX-space*0.333)/space);
       
  if(mouseY>((height-y_ground) * 0.6+y_ground) && mouseY<y_keyboard+y_ground  && w_scale[key_w]==1){
    rSide[key_w].red();
    lSide[key_w].red();
    mid[key_w].red();
    b_note_name='';
    w_note_name=wnote_name[key_w];
    w_num=key_w;
    
          
    if(sound_switch<20){
      osc[key_w].start();
      osc[key_w].freq(midiToFreq(w_notes[key_w]+int(notebase_switch)));
      envo[key_w].play();      
    }else{
      osc_str='/1/push2'+str(w_notes[key_w]);
      sendOsc(osc_str, 1);
    }  
}
       
  else if(mouseY<((height-y_ground) * 0.6+y_ground) && mouseY>y_ground && b_scale[key_b]==1){
    black[key_b].red();
    w_note_name='';
    b_note_name=bnote_name[key_b];
    b_num=key_b;
   
   if(sound_switch<20){
      osc[key_b].start();
      osc[key_b].freq(midiToFreq(b_notes[key_b]+int(notebase_switch)));
      envo[key_b].play();      
    }else{
      osc_str='/1/push2'+str(b_notes[key_b]);
      sendOsc(osc_str, 1);
    } 
  }
}
  
  

// Fade it out when we release
function mouseReleased(){
   clear_color(); 
}


function rSideKey(start, space, kee){
  this.x = start * space;
  this.keyWidth = space;
  this.col = color(255);
  this.kee = kee;
  this.size = space/5;

  this.display = function(){
    fill(this.col);
    beginShape();
    vertex(this.x, y_ground);
    vertex(this.x, height);
    vertex(this.x + this.keyWidth, height);
    vertex(this.x + this.keyWidth, (height-y_ground) * 0.6+y_ground);
    vertex(this.x + (this.keyWidth * 0.667), (height-y_ground) * 0.6+y_ground);
    vertex(this.x + (this.keyWidth * 0.667), y_ground);
    vertex(this.x, y_ground);
    endShape();
    
    fill(0, 0, 230);
    textSize(this.size);
    text(this.kee, this.x + (this.keyWidth *0.4), (height) - this.size);
  }
  
  this.red = function(){
    this.col = color(255, 0, 0);
  }
  
   this.green = function() {
    this.col = color(0, 255, 0);
  }
  
  this.white = function(){
    this.col = color(255);
  }
}

function BlackKey(start, space, kee) {
  this.x = start * space;
  this.keyWidth = space;
  this.col = color(0);
  this.kee = kee;
  this.size = space/5;

  this.display = function() {
    fill(this.col);
    rect(this.x, y_ground, (this.keyWidth * 0.667), (height-y_ground) * 0.6);
    
    fill(255, 0, 230);
    textSize(this.size);
    text(this.kee, this.x + (this.keyWidth *0.2), ((height-y_ground) * 0.6+y_ground)  - this.size);
  }
  
    this.red = function() {
    this.col = color(255, 0, 0);
  }
    
    this.green = function() {
    this.col = color(0, 255, 0);
  }
    
    this.white = function() {
    this.col = color(0);
  }
}

function MidKey(start, space, kee) {
  this.x = start * space;
  this.keyWidth = space;
  this.col = color(255);
  this.kee = kee;
  this.size = space/5;

  this.display = function() {
    fill(this.col);
    beginShape();
    vertex(this.x + (this.keyWidth * 0.333), y_ground);
    vertex(this.x + (this.keyWidth * 0.333), (height-y_ground) * 0.6+y_ground);
    vertex(this.x, (height-y_ground) * 0.6+y_ground);
    vertex(this.x, height);
    vertex(this.x + this.keyWidth, height);
    vertex(this.x + this.keyWidth, (height-y_ground) * 0.6+y_ground);
    vertex(this.x + (this.keyWidth * 0.667), (height-y_ground) * 0.6+y_ground);
    vertex(this.x + (this.keyWidth * 0.667), y_ground);
    vertex(this.x + (this.keyWidth * 0.333), y_ground);
    endShape();
    
    fill(0, 0, 230);
    textSize(this.size);
    text(this.kee, this.x + (this.keyWidth *0.4), (height) - this.size);
  }
  
   this.red = function() {
    this.col = color(255, 0, 0);
  }
  
     this.green = function() {
    this.col = color(0, 255, 0);
  }
  
  this.white = function() {
    this.col = color(255);
  }
}

function lSideKey(start, space, kee) {
  this.x = start * space;
  this.keyWidth = space;
  this.col = color(255);
  this.kee = kee;
  this.size = space/5;

  this.display = function() {
    fill(this.col);
    beginShape();
    vertex(this.x + (this.keyWidth * 0.333), y_ground);
    vertex(this.x + (this.keyWidth * 0.333), (height-y_ground) * 0.6+y_ground);
    vertex(this.x, (height-y_ground) * 0.6+y_ground);
    vertex(this.x, height);
    vertex(this.x + this.keyWidth, height);
    vertex(this.x + this.keyWidth, y_ground);
    vertex(this.x + (this.keyWidth * 0.333), y_ground);
    endShape();
    
    fill(0, 0, 230);
    textSize(this.size);
    text(this.kee, this.x + (this.keyWidth *0.4), (height) - this.size);
  }
  
   this.red = function(){
    this.col = color(255, 0, 0);
  }
  
   this.green = function() {
    this.col = color(0, 255, 0);
  }
  
  this.white = function(){
    this.col = color(255);
  }
}



//osc setup
function receiveOsc(address, value) {
  console.log("received OSC: " + address + ", " + value);
}

function sendOsc(address, value) {
  if (isConnected) {
    socket.emit('message', [address, value]);
  }
}

function setupOsc(oscPortIn, oscPortOut) {
  socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
  socket.on('connect', function() {
    socket.emit('config', {
      server: { port: oscPortIn,  host: '192.168.137.1'},
      client: { port: oscPortOut, host: '192.168.137.1'}
    });
  });
  socket.on('connect', function() {
    isConnected = true;
  });
  socket.on('message', function(msg) {
    if (msg[0] == '#bundle') {
      for (var i=2; i<msg.length; i++) {
        receiveOsc(msg[i][0], msg[i].splice(1));
      }
    } else {
      receiveOsc(msg[0], msg.splice(1));
    }
  });
}
