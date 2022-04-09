radio.onReceivedNumber(function (receivedNumber) {
    if (Pressed < 1) {
        Position = receivedNumber
    }
})
function playMusic (num: number) {
    if (num == 1) {
        music.playTone(131, music.beat(BeatFraction.Whole))
    }
    if (num == 2) {
        music.playTone(262, music.beat(BeatFraction.Quarter))
        music.rest(music.beat(BeatFraction.Quarter))
        music.playTone(220, music.beat(BeatFraction.Quarter))
    }
    if (num == 3) {
        music.playTone(349, music.beat(BeatFraction.Quarter))
        music.rest(music.beat(BeatFraction.Quarter))
        music.playTone(440, music.beat(BeatFraction.Quarter))
        music.rest(music.beat(BeatFraction.Quarter))
        music.playTone(523, music.beat(BeatFraction.Quarter))
    }
    if (num == 4) {
        music.playTone(523, music.beat(BeatFraction.Eighth))
        music.rest(music.beat(BeatFraction.Eighth))
        music.playTone(523, music.beat(BeatFraction.Eighth))
        music.rest(music.beat(BeatFraction.Eighth))
        music.playTone(523, music.beat(BeatFraction.Eighth))
        music.rest(music.beat(BeatFraction.Eighth))
        music.playTone(523, music.beat(BeatFraction.Eighth))
    }
}
input.onButtonPressed(Button.A, function () {
    if (Pressed == 0) {
        Pressed = 1
        Position += 1
        radio.sendNumber(Position)
        radio.sendString(control.deviceName())
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Reset") {
        // Resets button for next question
        Reset()
    } else {
        if (Player_List.indexOf(receivedString) < 0) {
            // Adds Player name to list if not there already
            Player_List.push(receivedString)
        }
        basic.pause(100)
        if (Position == 1) {
            // If first button pressed, plays the button's sound
            playMusic(Player_List.indexOf(receivedString))
        }
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Reset")
    Reset()
    radio.sendValue("name", 0)
})
input.onPinPressed(TouchPin.P1, function () {
    if (Pressed == 0) {
        Pressed = 1
        Position += 1
        radio.sendNumber(Position)
        radio.sendString(control.deviceName())
    }
})
function Reset () {
    Position = 0
    Pressed = 0
    basic.clearScreen()
}
let Position = 0
let Pressed = 0
let Player_List: string[] = []
radio.setGroup(53)
Player_List = [""]
Reset()
basic.forever(function () {
    if (Pressed > 0) {
        while (Position == 1) {
            // Position 1, light is permanently switched on
            pins.digitalWritePin(DigitalPin.P2, 1)
            basic.pause(100)
        }
        while (Position == 2) {
            // Position 2, light is flashed on and off equally
            pins.digitalWritePin(DigitalPin.P2, 1)
            basic.pause(200)
            basic.clearScreen()
            pins.digitalWritePin(DigitalPin.P2, 0)
            basic.pause(100)
        }
        while (Position == 3) {
            // Positiion 3, light is flashed occasionally
            pins.digitalWritePin(DigitalPin.P2, 1)
            basic.pause(200)
            basic.clearScreen()
            pins.digitalWritePin(DigitalPin.P2, 0)
            basic.pause(2000)
        }
        // Otherwise, show the position on the display. Could be used for many MicroBits
        while (Position > 3) {
            basic.showString("" + (Position))
        }
    } else {
        // If Position is 0, no light and a pixel on MicroBit flashes
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.pause(100)
        led.plot(randint(0, 0), 4)
        basic.pause(100)
        basic.clearScreen()
    }
})
