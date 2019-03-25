/*
The MIT License (MIT)

Copyright (c) 2016 British Broadcasting Corporation.
This software is provided by Lancaster University by arrangement with the BBC.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

// Robo4girls R4G: educational micro:bit - robot plattform
// Project repository: https://github.com/ZimdVienna/Robo4girls

#include "MicroBit.h"
#include "MicroBitSamples.h"
#include "MicroBitUARTService.h"
#include "MusicalNotes.h"

#ifdef MICROBIT_R4G_SENSOREN

MicroBit uBit;                  // instance of the microbit class
MicroBitUARTService *uart;      // serial communication via Bluetooth Low Energy

// use of constants gets stored in flash memory (saves RAM)

// constant variables for directions
const ManagedString forward("v");
const ManagedString backwards("z");
const ManagedString curveRight("r");
const ManagedString curveLeft("l");
const ManagedString turnRight("R");     //turns right around own middle axis
const ManagedString turnLeft("L");      //turns left around own middle axis
const ManagedString stop("s");

// Melodies as integer arrays: 0 ends the song!
const int tusch[]       =   {NOTE_C4,NOTE_G3,NOTE_G3,NOTE_A3,NOTE_G3,NOTE_B3,NOTE_C4,0};
const int song2[]       =   {NOTE_C5,NOTE_B4,NOTE_G4,NOTE_C5,NOTE_B4,NOTE_E4,NOTE_C5,NOTE_C4,NOTE_G4,NOTE_A4,NOTE_C5,0};
const int starWars[]    =   {NOTE_G3,NOTE_G3,NOTE_G3,NOTE_C3,NOTE_G3,NOTE_F3,NOTE_E3,NOTE_D3,NOTE_C4,NOTE_G3,NOTE_F3,NOTE_E3,NOTE_D3,NOTE_C4,NOTE_G3,NOTE_F3,NOTE_E3,NOTE_F3,NOTE_D3,0};
const int superMario[]  =   {NOTE_E4,NOTE_E4,NOTE_E4,NOTE_C4,NOTE_E4,NOTE_G4,NOTE_G3,0};
                       
// Delays to hold the notes (eg. 1/8, 1/4, 1/16 notes)
const int tusch_b[]     =   {250, 160, 160, 250,400,250,250,0};
const int beat2[]       =   {160, 160, 160, 800, 800, 160, 160, 160, 160, 800, 800,0};
const int starWars_b[]  =   {160, 160, 160,800,800,160,160,160,800,400,160,160,160,800,400,160,160,160,800,0};
const int superMario_b[]=   {160, 160, 250, 160,160,400,250,0};

const int storedSongs = 4;

// Songbook
const int *SONGS[] = {tusch,song2,starWars,superMario};
const int *BEATS[] = {tusch_b,beat2,starWars_b,superMario_b};

// Pictures
const MicroBitImage angry_face("0,255,0,255, 0\n0,255,0,255,0\n0,0,0,0,0\n0,255,255,255,0\n255,0,0,0,255\n");

/***** Motorcontrol: choose your board or write your own motor control *****/
int velocity = 800;

// ElecFreaks Motor:bit Board
void moveBot(ManagedString msg) {
    // Motor 1 PWM = P1,    Motor1 direction = P8 (LOW = CC, HIGH = C)
    // Motor 2 PWM = P2,    Motor2 direction = P12(LOW = CC, HIGH = C)
    
    // bitmask motor control: X X X X P12 P2 P8 P1
    unsigned char moveMask = 0;
    
    // bitmasks for motor pins:
    unsigned char m1_pwm = 1, m1_dir = 2, m2_pwm = 4, m2_dir = 8;
       
    ManagedString direction(msg.charAt(1));
    if(direction == forward)
        moveMask = 15;
    else if(direction == backwards)
        moveMask = 5;
    else if(direction == curveLeft)
        moveMask = 12;
    else if(direction == curveRight)
        moveMask = 3;
    else if(direction == turnLeft)
        moveMask = 13;
    else if(direction == turnRight)
        moveMask = 7;
    else
        moveMask = 0;   //stop
    //set the pin values according to direction
    uBit.io.P12.setDigitalValue((m2_dir & moveMask)/m2_dir);              //dir motor2
    uBit.io.P8.setDigitalValue((m1_dir & moveMask)/m1_dir);               //dir motor1
    uBit.io.P1.setAnalogValue((m1_pwm & moveMask)* velocity);             //pwm motor1
    uBit.io.P2.setAnalogValue(((m2_pwm & moveMask)/m2_pwm) * velocity);   //pwm motor2
}

/*
// Keyestudio Motor Driver Board v1.8
void moveBot(ManagedString msg) {
    // Enable = pin14
    // Motor1 CW = pin12,   Motor1 CCW = pin13
    // Motor2 CW = pin15,   Motor2 CCW = pin16
    // Motor1 PWM = pin1,   Motor2 PWM = pin2
    
    unsigned char moveMask = 0;   // Bitmask: X X X P15 P16 P12 P13 P14
    ManagedString direction(msg.charAt(1));
    if(direction == forward)
        moveMask = 11;
    else if(direction == backwards)
        moveMask = 21;
    else if(direction == curveLeft)
        moveMask = 9;
    else if(direction == curveRight)
        moveMask = 3;
    else if(direction == turnLeft)
        moveMask = 13;
    else if(direction == turnRight)
        moveMask = 19;
    else
        moveMask = 0;   //stop

    // set motor pins according to direction
    uBit.io.P1.setAnalogValue(velocity);
    uBit.io.P2.setAnalogValue(velocity);
    uBit.io.P12.setDigitalValue((4 & moveMask)/4);
    uBit.io.P13.setDigitalValue((2 & moveMask)/2);
    uBit.io.P15.setDigitalValue((16 & moveMask)/16);
    uBit.io.P16.setDigitalValue((8 & moveMask)/8);
    uBit.io.P14.setDigitalValue(1 & moveMask);
}
*/

// Waveshare Motor Driver for micro:bit
/*
void moveBot(ManagedString msg) {
    // Motor A in1 = pin 13
    // Motor A in2 = pin 12
    // Motor B in1 = pin 14
    // Motor B in2 = pin 15
    // Motor A PWM = pin 8
    // Motor B PWM = pin 16
}
*/


/******************** Functions ***************************/

void playMelody(int songidx) {
    //<! plays melody out of songbook
    for(int i = 0; SONGS[songidx][i] != 0; i++){
            uBit.io.P0.setAnalogValue(511);//set duty cycle
            uBit.io.P0.setAnalogPeriodUs((int)(1000000/SONGS[songidx][i]));
            uBit.sleep(BEATS[songidx][i]);
            uBit.io.P0.setAnalogValue(0);
            uBit.sleep(50);   
    }
}


void onConnected(MicroBitEvent e) {
    //>! receives commands, controls robot and returns "OK" if successfull
    ManagedString msg = "R4G";
    ManagedString eom(":");
    uBit.display.scroll("C");
    
    while(1) {
        //reads incoming messages until delimiter ":"
        msg = uart->readUntil(eom);
        uint32_t duration = 0;
        
        switch(msg.charAt(0)) {
            case 'B': {   //check if input is valid motor input:
                if((msg.charAt(2)-'0') < 0 || (msg.charAt(2)-'0') > 10){
                    uBit.display.scroll(msg);
                    break;
                }
                duration = (uint32_t)((msg.charAt(2)-'0') * 1000);
                duration = duration + (uint32_t)((msg.charAt(4)-'0') * 100);
                moveBot(msg);
                uBit.sleep(duration);
                moveBot("s");
                break;
            }   
            case 'M': {
                //check if input is valid melody input:
                if((msg.charAt(1)-'0') < 1 || (msg.charAt(1)-'0') > storedSongs){
                    uBit.display.scroll(msg);
                    break;
                }
                int songidx = (int)(msg.charAt(1)-'0') - 1; //song index in SONGS array
                playMelody(songidx);
                break;
            }    
            default: {
                uBit.display.scroll(msg);
                break;
            }
        }
        moveBot("s");                       //turn off motors
        uBit.io.P0.setAnalogValue(0);       //turn off buzzer pin
        uart->send("OK\n");
    }
}

void onDisconnected(MicroBitEvent e) {
    uBit.display.scroll("D");
}

//touchSensor ON: micro:bit ran into something
void onTouch(MicroBitEvent e) {
     int sensorLeft = uBit.io.P4.getAnalogValue();
     int sensorRight = uBit.io.P11.getAnalogValue();
     if(!sensorLeft || !sensorRight){
         // shows angry face when bump into something
         uBit.display.print(angry_face);
     }
     else{
        uBit.display.clear();
     }
}

void onButtonB(MicroBitEvent e) {
    //<! stops motors when ButtonB is clicked long
    uBit.display.scroll("stop");
    moveBot("s");
}


int main()
{
    // Initialise the micro:bit runtime.
    uBit.init();
    
    //serial communication via uart
    uBit.serial.baud(9600);
    uBit.serial.send("A\r\n");
    
    //sensor pins
    uBit.io.P11.eventOn(MICROBIT_PIN_EVENT_ON_TOUCH);
    uBit.io.P4.eventOn(MICROBIT_PIN_EVENT_ON_TOUCH);
    
    uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_CONNECTED, onConnected);
    uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_DISCONNECTED, onDisconnected);
    uBit.messageBus.listen(MICROBIT_ID_IO_P11, MICROBIT_PIN_EVENT_ON_TOUCH, onTouch);
    uBit.messageBus.listen(MICROBIT_ID_IO_P4, MICROBIT_PIN_EVENT_ON_TOUCH, onTouch);
    uBit.messageBus.listen(MICROBIT_ID_BUTTON_B, MICROBIT_BUTTON_EVT_LONG_CLICK, onButtonB);
    
    uart = new MicroBitUARTService(*uBit.ble,32,32);
    uBit.display.scroll("R4G");
    
    //gives Bluetooth access to the micro:bit LED matrix
    //new MicroBitLEDService(*uBit.ble, uBit.display);

    // If main exits, there may still be other fibers running or registered event handlers etc.
    // Simply release this fiber, which will mean we enter the scheduler. Worse case, we then
    // sit in the idle task forever, in a power efficient sleep.
    release_fiber();
}

#endif
