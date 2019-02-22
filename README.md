# Robo4girls

With this code you can control our micro:bit R4G robot platform through Bluetooth from this website: https://zimdvienna.github.io/Robo4girls/

This code is still in development.

## Testing the setup 
You can test out the bluetooth communication between our website and a micro:bit, you do not need our R4G platform for this.

### What you need
+ a <a href="https://microbit.org">Micro:bit</a> with usb cable
+ a computer with internet access
+ a buzzer
+ optionally 2 croco clamps to connect the buzzer to your Micro:bit. If you do not have croco clamps just use scotch tape and tape the ends of the buzzer cables to the pins of your Micro:bit.

### Instructions
Connect your micro:bit to your computer via usb and load the R4G_MICROBIT.hex file on to your micro:bit. The R4G_MICROBIT.hex file is in the microbit folder of this repository. 

Next, connect pin0 and GND Pin of your micro:bit to the buzzer (you cannot do much wrong, it does not matter which cable you attach to which pin.

on the website connect to your micro:bit, type "M1:", "M2:" or "M3:" (without the quotation marks) in the input field and click send. You should hear the robot play a melody.
