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

/*
 program to control a micro:bit - robot
 Commands are given via serial communication in following form:
 
        B v 2.0: (without whitespaces)
        | | |  |
        Command type: B = Bewegung          (Movement directions)
          | |  |      K = Kombination       (Movement combinations)
          | |  |      M = Melodie           (Melody)
          | |  |      G = Geschwindigkeit   (Motor Velocity)
          | |  |
          Command content:
            |  |  B directions: v   vor (forward)
            |  |                z   zurück  (back)
            |  |                r   rechtskurve (turn right)
            |  |                l   linkskurve  (turn left)
            |  |                R   Rechtskehre (turn around own middle axis: right)
            |  |                L   Linkskehre  (turn around own middle axis: left)
            |  |  K combinations:
            |  |                T   Tanzen (dance)
            |  |                Z   Zickzack (Zigzag)
            |  |                P   Pirouette
            |  |                S   Schütteln (Shake)
            |  |    
            |  |  G velocity motors:
            |  |                 1   Motor 1
            |  |                 2   Motor 2
            |  |                 b   Both
            |  |  M Melody:
            |  |                 1..X Melodie (melody number = index in SONG array with X entries)
            Parameter Values:
               |     
               |    Befehl:              Grenzwerte:      Description:
               |    directions:           0.0 .. 9.9      Dauer in Sekunden und hundertstel Sekunden 
               |                                          (duration in seconds as float value, eg. 1.2)
               |     
               |    combinations / Melody:  1 .. 9        Wiederholungen in ganzen Zahlen (Repetitions as integer value)
               |    
               |    velocity motors:      400 .. 1024     Geschwindigkeit als ganze Zahl (Velocity as integer value from slowest to fastest)
               |
               : = Ende des Kommandos (end of command)
                
    USAGE EXAMPLES:
    Bz3.0:  move backwards for 3 seconds
    BR2.5:  turn right around own axis for 2.5 seconds   
    KT2:    combination "Tanz", dance twice
    G1800:  change Velocity of motor 1 to 800
    M1:     play song 1
    M3:     play song 3                   
*/
#include "MicroBit.h"
#include "MicroBitSamples.h"
#include "MicroBitUARTService.h"

// Define Frequencies of musical notes
#ifdef MICROBIT_R4G_BEFEHLE
#define NOTE_B0  31
#define NOTE_C1  33
#define NOTE_CS1 35
#define NOTE_D1  37
#define NOTE_DS1 39
#define NOTE_E1  41
#define NOTE_F1  44
#define NOTE_FS1 46
#define NOTE_G1  49
#define NOTE_GS1 52
#define NOTE_A1  55
#define NOTE_AS1 58
#define NOTE_B1  62
#define NOTE_C2  65
#define NOTE_CS2 69
#define NOTE_D2  73
#define NOTE_DS2 78
#define NOTE_E2  82
#define NOTE_F2  87
#define NOTE_FS2 93
#define NOTE_G2  98
#define NOTE_GS2 104
#define NOTE_A2  110
#define NOTE_AS2 117
#define NOTE_B2  123
#define NOTE_C3  131
#define NOTE_CS3 139
#define NOTE_D3  147
#define NOTE_DS3 156
#define NOTE_E3  165
#define NOTE_F3  175
#define NOTE_FS3 185
#define NOTE_G3  196
#define NOTE_GS3 208
#define NOTE_A3  220
#define NOTE_AS3 233
#define NOTE_B3  247
#define NOTE_C4  262
#define NOTE_CS4 277
#define NOTE_D4  294
#define NOTE_DS4 311
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_FS4 370
#define NOTE_G4  392
#define NOTE_GS4 415
#define NOTE_A4  440
#define NOTE_AS4 466
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_CS5 554
#define NOTE_D5  587
#define NOTE_DS5 622
#define NOTE_E5  659
#define NOTE_F5  698
#define NOTE_FS5 740
#define NOTE_G5  784
#define NOTE_GS5 831
#define NOTE_A5  880
#define NOTE_AS5 932
#define NOTE_B5  988
#define NOTE_C6  1047
#define NOTE_CS6 1109
#define NOTE_D6  1175
#define NOTE_DS6 1245
#define NOTE_E6  1319
#define NOTE_F6  1397
#define NOTE_FS6 1480
#define NOTE_G6  1568
#define NOTE_GS6 1661
#define NOTE_A6  1760
#define NOTE_AS6 1865
#define NOTE_B6  1976

MicroBit uBit;                  // instance of the microbit class
MicroBitUARTService *uart;      // serial communication via Bluetooth Low Energy
int velocity = 800;             // motor velocity

// use of constants gets stored in flash memory (saves RAM)

// constant variables for directions
const ManagedString forward("v");
const ManagedString backwards("z");
const ManagedString curveRight("r");
const ManagedString curveLeft("l");
const ManagedString turnRight("R");     //turns right around own middle axis
const ManagedString turnLeft("L");      //turns left around own middle axis

// constant variables for control
const ManagedString stop("s");      // turn off motors when stop interrupt accurs
/*
const ManagedString start("S");     // starts program (?)
*/
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

// Number of songs in Songbook
const int storedSongs = 4;

// Songbook
const int *SONGS[] = {tusch,song2,starWars,superMario};
const int *BEATS[] = {tusch_b,beat2,starWars_b,superMario_b};

/******************* FUNCTIONS ******************************/

/*
// ElecFreaks Motor:bit
void moveBot(ManagedString msg)
{
    //< moves the robot in given direction
    // ElecFreak Motor:bit pinout:
    // Motor 1 PWM = P1; Motor1 direction = P8 (LOW = CC, HIGH = C)
    // Motor 2 PWM = P2; Motor2 direction = P12(LOW = CC, HIGH = C)
    
    // Each pin is represented by a single bit in 1 Byte: X X X X P12 P2 P8 P1
    // Create a bitmask to set the respective pins high(1) or low(0):
    unsigned char moveMask = 0;                  //stop (00000000) by default
    // Create bitmasks for motor pins:                 
    unsigned char m1_pwm = 1, m1_dir = 2, m2_pwm = 4, m2_dir = 8;   //pin 1 = 00000001 = 1, pin2 = 00000010 = 2, ...
    
    ManagedString direction(msg.charAt(1));     //direction given as input

    // set direction
    if(direction == stop){                      //stop for interrupt
        moveMask = 0;   
    }
    if(direction == forward){
        moveMask = 15;                          //forward (00001111)
    }
    if(direction == backwards){
        moveMask = 5;                           //backwards (00000101)
    } 
    if(direction == curveRight){
        moveMask = 3;                           //curveRight(00000011)
    }
    if(direction == curveLeft){
        moveMask = 12;                          //curveLeft (00001100)
    }
    if(direction == turnRight){
        moveMask = 7;                           //turnRight (00000111)
    }
    if(direction == turnLeft){
        moveMask = 13;                          //turnLeft (00001101)
    }
    //set the pin values with a bit operation 
    uBit.io.P12.setDigitalValue((m2_dir & moveMask)/m2_dir);              //dir motor2
    uBit.io.P8.setDigitalValue((m1_dir & moveMask)/m1_dir);               //dir motor1
    uBit.io.P1.setAnalogValue((m1_pwm & moveMask)* velocity);             //pwm motor1
    uBit.io.P2.setAnalogValue(((m2_pwm & moveMask)/m2_pwm) * velocity);   //pwm motor2
}
*/

// Keyestudio Motor Driver Board
void moveBot(ManagedString msg)
{
    //<! moves the robot in given direction 
    
    // Enable = pin14
    // Motor1 Direction Clockwise = pin12
    // Motor1 Direction Counter Clockwise = pin13
    // Motor2 Direction Clockwise = pin15
    // Motor2 Direction Counter Clockwise = pin16 
    // Bitmask: X X X P15 P16 P12 P13 P14
    // Motor1 PWM = pin1
    // Motor2 PWM = pin2
    
    ManagedString direction(msg.charAt(1));  //direction given as input
    
    unsigned char moveMask = 0;   //stop (00000000)
    if(direction == stop)
    {
        moveMask = 0;
    }
    if(direction == forward)
    {
        moveMask = 11; //forward (00001011)
    }
    if(direction == backwards)
    {
        moveMask = 21; //backwards (00010101)
    } 
    if(direction == curveRight)
    {
        moveMask = 3; //curveRight(00000011)
    }
    if(direction == curveLeft)
    {
        moveMask = 9; //curveLeft (00001001)
    }
    if(direction == turnRight)
    {
        moveMask = 19; //turnRight (00010011)
    }
    if(direction == turnLeft)
    {
        moveMask = 13; //turnLeft (00001101)
    }  
    uBit.io.P1.setAnalogValue(velocity);
    uBit.io.P2.setAnalogValue(velocity);
    uBit.io.P12.setDigitalValue((4 & moveMask)/4);
    uBit.io.P13.setDigitalValue((2 & moveMask)/2);
    uBit.io.P15.setDigitalValue((16 & moveMask)/16);
    uBit.io.P16.setDigitalValue((8 & moveMask)/8);
    uBit.io.P14.setDigitalValue(1 & moveMask);    
}


void playMelody(int songidx)
{
    //<! plays melody out of songbook
    
    for(int i = 0; SONGS[songidx][i] != 0; i++){
            uBit.io.P0.setAnalogValue(511);//set duty cycle
            uBit.io.P0.setAnalogPeriodUs((int)(1000000/SONGS[songidx][i]));
            uBit.sleep(BEATS[songidx][i]);
            uBit.io.P0.setAnalogValue(0);
            uBit.sleep(50);   
    }
}
 
void onConnected(MicroBitEvent e)
{
    //>! reads incoming messages until delimiter ":"
    //then it scrolls text or moves or plays melody
    //then it sets all outputs to 0FF and sends "OK"
    
    ManagedString eom(":");
    uBit.display.scroll("C");
    
    while(1)
    {
        ManagedString msg = uart->readUntil(eom);
        uart->send(msg);
        uint32_t duration = 0;
        
        switch(msg.charAt(0)){
            case 'B':
            {
                //check if input is valid motor input:
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
            case 'M':
            {
                //check if input is valid melody input:
                if((msg.charAt(1)-'0') < 1 || (msg.charAt(1)-'0') > storedSongs){
                    uBit.display.scroll(msg);
                    break;
                }
                int songidx = (int)(msg.charAt(1)-'0') - 1; //song index in SONGS array
                playMelody(songidx);
                break;
            }               
            default:
            {
                uBit.display.scroll(msg);
                break;
            }
        }
        moveBot("s");                       //turn off motors
        uBit.io.P0.setAnalogValue(0);       //turn off buzzer pin
        uart->send("OK\n");
        
    }
}

void onDisconnected(MicroBitEvent e)
{
    uBit.display.scroll("D");
    //connected = 0;
}



int main()
{
    // Initialise the micro:bit runtime.
    uBit.init();
    
    //serial communication via uart
    uBit.serial.baud(9600);
    uBit.serial.send("A\r\n");
    
    uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_CONNECTED, onConnected);
    uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_DISCONNECTED, onDisconnected);
    
    uart = new MicroBitUARTService(*uBit.ble,32,32);
    uBit.display.scroll("R4G");
    
    //gives Bluetooth access to the micro:bit LED matrix
    //new MicroBitLEDService(*uBit.ble, uBit.display);
    
    //gives Bluetooth access to changes in state of buttons A and/or B
    //new MicroBitButtonService(*uBit.ble);
    
    //gives Bluetooth read / write and analogue/digital access to IO Pins
    //new MicroBitIOPinService(*uBit.ble, uBit.io);
    
    //gives Bluetooth access to the internal temperature sensor
    //new MicroBitTemperatureService(*uBit.ble, uBit.thermometer);
    
    //gives Bluetooth access to the to 3D motion data
    //new MicroBitAccelerometerService(*uBit.ble, uBit.accelerometer);
    
    //gives Bluetooth access to magnetic field readings
    //new MicroBitMagnetometerService(*uBit.ble, uBit.compass);
    
    // If main exits, there may still be other fibers running or registered event handlers etc.
    // Simply release this fiber, which will mean we enter the scheduler. Worse case, we then
    // sit in the idle task forever, in a power efficient sleep.
    release_fiber();
}

#endif
