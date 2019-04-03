# Robo4girls

With this code you can control our micro:bit R4G robot platform through Bluetooth from this website: https://zimdvienna.github.io/Robo4girls/

This code is still in development.

## Testing the setup 
You can test out the bluetooth communication between our website and a micro:bit, you do not need our R4G platform for this.

### What you need
+ a [Micro:bit](https://microbit.org) with usb cable
+ a computer with internet access
+ optionally a [buzzer](https://de.wikipedia.org/wiki/Summer_(Elektronik))
+ optionally 2 croco clamps to connect the buzzer to your Micro:bit. If you do not have croco clamps just use scotch tape and tape the ends of the buzzer cables to the pins of your Micro:bit.

### Instructions

Connect your micro:bit to your computer via USB and load one of the R4G_MICROBIT.hex files on to your micro:bit. The R4G_MICROBIT.hex files are in the microbit folder of this repository. If you have connected motors via a micro:bit motor driver board from [Keyestudio](https://wiki.keyestudio.com/Ks0308_keyestudio_Motor_Drive_Breakout_Board_for_micro_bit), from [Elecfreaks](https://www.instructables.com/id/Elecfreaks-Motorbit-User-Guide/) or from [Waveshare](https://www.waveshare.com/wiki/Motor_Driver_for_micro:bit), choose the respective <i>...-KS.hex</i>, <i>..-EF.hex or <i>..-WS.hex</i> file. Otherwise choose either one. If you do not know how to upload a program to your micro:bit you can look it up [here](https://makecode.microbit.org/device/usb).

On the website click the <i>connect</i> button and choose your micro:bit from the list. Don't forget to activate Bluetooth on your device! Wait a bit until it says <i>Notification started</i> in the Terminal. 

<b>If you have a buzzer:</b>
Connect pin0 and GND Pin of your micro:bit to the buzzer (you cannot do much wrong, it does not matter which cable you attach to which pin.

You can now program the micro:bit by connecting the blocks in the blockly workspace. If you click on one of the 6 sections in the toolbox it will list all blocks available in this section.

![blockly toolbox](media/blockly_toolbox_foto.png)

Then you can drag and drop the blocks you want in the workspace and connect them to write a program. You should hear a clicking sound when the blocks connect. To start the program click start. Melodies and Movements will only work if you have a buzzer and motors connected to your micro:bit.

Have Fun!

