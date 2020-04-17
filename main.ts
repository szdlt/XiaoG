/*  2020.0119.10:59
redunce some useless function  for APP moldule
load dependency
"HelloMaker": "file:../pxt-HelloMaker"
*/

//% color="#C814B8" weight=25 icon="\uf1d4"
namespace HelloMaker_显示类 {

    let lhRGBLight: DlbitRGBLight.LHDlbitRGBLight;
    //% blockId="initRGBLight" block="initRGBLight before use"
    //% weight=94
    export function initRGBLight() {
        if (!lhRGBLight) {
            lhRGBLight = DlbitRGBLight.create(DigitalPin.P16, 2, DlbitRGBPixelMode.RGB);
        }

        clearLight();
    }

    //% blockId="setBrightness" block="set brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=92
    export function setBrightness(brightness: number): void {
        lhRGBLight.setBrightness(brightness);
       
    }

    //% weight=91 blockId=setPixelRGB block="Set|%lightoffset|color to %rgb"
    export function setPixelRGB(lightoffset: Lights, rgb: DlbitRGBColors) {
        if (lightoffset == 0) {
            lhRGBLight.setPixelColor(0, rgb, false);
       
        }
        else if (lightoffset == 1) {
           
			lhRGBLight.setPixelColor(1, rgb, false);
        }
    }


    //% weight=90 blockId=setPixelRGBArgs block="Set|%lightoffset|color to %rgb"
    export function setPixelRGBArgs(lightoffset: Lights, rgb: number) {

        if (lightoffset == 0) {
            lhRGBLight.setPixelColor(0, rgb, false);
         
        }
        else if (lightoffset == 1) {
           
			lhRGBLight.setPixelColor(1, rgb, false);
        }
    }
    //% weight=88 blockId=showLight block="Show light"
    export function showLight() {
        lhRGBLight.show();
        
    }

    //% weight=86 blockGap=50 blockId=clearLight block="Clear light"
    export function clearLight() {
        lhRGBLight.clear();
       
    }

}

/*****************************************************************************************************************************************
 *    音乐类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#D2691E" weight=22 icon="\uf001"
namespace HelloMaker_音乐类 {
    export enum enBuzzer {
        //% blockId="NoBeep" block="不响"
        NoBeep = 0,
        //% blockId="Beep" block="响"
        Beep
    }
    //% blockId=HelloMaker_Buzzer block="Buzzer"
    //% weight=100
    //% blockGap=10 
    //% color="#D2691E"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function Buzzer(): void {
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P0, 0);
    }
}


//% color="#212121" weight=24 icon="\uf1b6"
namespace HelloMaker_积木类 {

    let StrAt = -1
    let MoveType = -1
    let rgb_id = -1
    let rgb_color = -1
    let rgb_bright = -1
    let color_id = -1
    let tone = -1
    let dlbot_beat = -1
    let show_number = -1
    let time = -1
    let move = -1
    let speed = -1
    let direction = -1
    let Robot_Mode = -1
    export let Move_T = -1
    let stringReceive = ""
    let dl_CarSpeed = 80
    let Tone = [65, 65, 73, 82, 87, 98, 110, 123,
				131, 147, 165, 175, 196, 220, 247,
				262, 294, 330, 349, 392, 440, 494,
				523, 587, 659, 698, 784, 880, 988,
				1047, 1175, 1319, 1397, 1568, 1760, 
				1976,2093, 2349, 2637, 2794, 3136, 
				3520, 3951,4186, 4699]
    
    let Beat = [16, 16, 8, 4, 2, 1, 32, 64]
	let CarDirState = -1
    let arr = [0, 0, 0, 0, 0]
    enum CMD_TYPE {
        NO_COMMAND,
        MST,
        DST,
        STO,
        LIG,
        COL,
        TON,
        VER,
        POS,
        COO,
        TIM,
        MOD,
        SEN,
        SNB,
        CHE,
        EXT,
        TEM,
        STA,
        SERVO_MOVE,
        SERVO_ONE,
        SERVO_GROUP,
        STM32_MOVE,
        ROBOT_MODE_BIZHANG,
        ROBOT_MODE_XUNJI,
        ROBOT_SPEED_ADJUST

    }
   
	let CMD_SR04_DISTANCE = 33
    let cmdType = -1
   export enum BalanceCarState {
	   //% blockId="Balance_Stop" block="停止"
        Balance_Stop = 0,
        //% blockId="Balance_Run" block="前行"
        Balance_Run = 1,
        //% blockId="Balance_Back" block="后退"
        Balance_Back = 2,
        //% blockId="Balance_Left" block="左转"
        Balance_Left = 3,
        //% blockId="Balance_Right" block="右转"
        Balance_Right = 4
        
      
    }
    function UartSend4data(num: number) {
        if (num < 10) {
            serial.writeNumber(0)
            serial.writeNumber(0)
            serial.writeNumber(0)
            serial.writeNumber(num)
        }
        else if (num < 100) {
            serial.writeNumber(0)
            serial.writeNumber(0)
            serial.writeNumber(num)
        }
        else if (num < 1000) {
            serial.writeNumber(0)
            serial.writeNumber(num)
        }
        else {
            serial.writeNumber(num)
        }
    }

    function UartSend3data(num: number) {
        if (num < 10) {
            serial.writeNumber(0)
            serial.writeNumber(0)
            serial.writeNumber(num)
        }
        else if (num < 100) {
            serial.writeNumber(0)
            serial.writeNumber(num)
        }
        else {
            serial.writeNumber(num)
        }
    }

    function UartSend2data(num: number) {
        if (num < 10) {
            serial.writeNumber(0)
            serial.writeNumber(num)
        }

        else {
            serial.writeNumber(num)
        }
    }

   export function SendMoveTypeToMcu(type: number) {

        serial.writeNumber(2)
        serial.writeNumber(2)
        serial.writeNumber(0)
        serial.writeNumber(4)
        UartSend2data(type)
    }

    
	//% blockId=HelloMaker_SendBarrierDistance block="SendBarrierDistance"
    //% weight=96
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
	export function SendBarrierDistance(distance: number) {

        serial.writeNumber(2)
        serial.writeNumber(2)
        serial.writeNumber(0)
        serial.writeNumber(7)
		UartSend2data(CMD_SR04_DISTANCE)
        UartSend3data(distance)
    }
		
	//% blockId=HelloMaker_ultrasonic_car block="超声波快速测距得到的结果为(cm)"
    //% color="#006400"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Car(): number {
        let echoPin: DigitalPin = DigitalPin.P15;
        let trigPin: DigitalPin = DigitalPin.P14;
        pins.setPull(echoPin, PinPullMode.PullNone);
        pins.setPull(trigPin, PinPullMode.PullNone);
        // send pulse
        pins.digitalWritePin(trigPin, 0);
        control.waitMicros(5);
        pins.digitalWritePin(trigPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trigPin, 0);
        control.waitMicros(5);
        // read pulse
        let d = pins.pulseIn(echoPin, PulseValue.High, 11600);
        basic.pause(10);
        return Math.floor(d / 40);
        
    }
  //% blockId=PreciseUltrasonic block="超声波精准测距得到结果为（cm）"
    export function  PreciseUltrasonic(): number {
			let distance = 0
			for (let i = 0; i < 5; i++) {
				arr[i] = Ultrasonic_Car()
			}
			arr.sort(function (a, b) {
				return a - b
			})
			
			for (let i = 1; i < 4; i++) {
				distance += arr[i]
			}
			distance /= 3
			return Math.round(distance)
		  
		}

//% blockId=CarModeState block="当前为避障模式?"
	export function CarModeState(): boolean {
      
	       if(cmdType == CMD_TYPE.ROBOT_MODE_BIZHANG)
		   {
			    return true
		   }
          
	       else {
			     return false
		   }
		  
   }
	
	//% blockId=DirectionState block="机器人运动方向"
	export function DirectionState(): number {
      
           return CarDirState
   }	

    //% blockId=HelloMaker_BuildingBlocksInit block="BuildingBlocksInit"
    //% weight=96
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function BuildingBlocksInit() {

        serial.redirect(
            SerialPin.P12,
            SerialPin.P13,
            BaudRate.BaudRate9600)
        
        HelloMaker_显示类.initRGBLight()
        HelloMaker_显示类.setPixelRGB(Lights.Light1, DlbitRGBColors.Red)
        HelloMaker_显示类.setPixelRGB(Lights.Light2, DlbitRGBColors.Red)
        HelloMaker_显示类.showLight()
        
    }

    //% blockId=HelloMaker_BalanceMode block="BalanceMode|%direction"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    //  export function BalanceMode(index: BalanceCarState): void {
	  export function BalanceMode(direction:number): void {
		    switch (direction) {
            case    1: 
			        SendMoveTypeToMcu(9)
			break;
            case    2: 
			        SendMoveTypeToMcu(10)
			break;
            case    3: 
				    SendMoveTypeToMcu(11)
			break;
            case    4: 
			        SendMoveTypeToMcu(12)
			break;
            case    0: 
			        SendMoveTypeToMcu(17)
			
			break;
            
        }	
	}

    //% blockId=HelloMaker_SetBalanceMode block="设置小G运动模式|%BalanceCarState"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
      export function SetBalanceMode(index: BalanceCarState): void {
	 
		    switch (index) {
            case    BalanceCarState.Balance_Run: 
			        SendMoveTypeToMcu(9)
			break;
            case    BalanceCarState.Balance_Back: 
			        SendMoveTypeToMcu(10)
			break;
            case    BalanceCarState.Balance_Left: 
				    SendMoveTypeToMcu(11)
			break;
            case    BalanceCarState.Balance_Right: 
			        SendMoveTypeToMcu(12)
			break;
            case    BalanceCarState.Balance_Stop: 
			        SendMoveTypeToMcu(17)
			
			break;
            
        }	
	}
   

    //% blockId=HelloMaker_BuildingBlocks block="BuildingBlocks|%uartData"
    //% weight=96
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9

    export function BuildingBlocks(uartData: string): number {
		
		let start_num = uartData.indexOf("*@")
        if (start_num != -1) {
			
	    let sum3 = uartData.charAt(start_num+2)+uartData.charAt(start_num+3)+uartData.charAt(start_num+4);
		switch(sum3)
	{
			 case  'S'+'e'+'r':
			  
					if(uartData.charAt(start_num+5) == 'c')
					{
						if (uartData.charAt(start_num+13) == 'S') 
						{
							
							Move_T = 9
							CarDirState = 1
							cmdType = CMD_TYPE.STM32_MOVE
						}
						else if (uartData.charAt(start_num+13) == 'B') {
							
							Move_T = 10
							CarDirState = 2
							cmdType = CMD_TYPE.STM32_MOVE
						}
						else if (uartData.charAt(start_num+13) == 'L') {
						
							Move_T = 11
							CarDirState = 3
							cmdType = CMD_TYPE.STM32_MOVE
						}
						else if (uartData.charAt(start_num+13) == 'R') {
							
							Move_T = 12
							CarDirState = 4
							cmdType = CMD_TYPE.STM32_MOVE
						}
						else if (uartData.charAt(start_num+13) == 'Z') {
							cmdType = CMD_TYPE.ROBOT_MODE_BIZHANG
							Move_T = 13
						}
						else if (uartData.charAt(start_num+13) == 'X') {
							   cmdType = CMD_TYPE.ROBOT_MODE_XUNJI
							   Move_T = 14
						}
						
						else if (uartData.charAt(start_num+13) == '0') {
							
							Move_T = 17
							CarDirState = 0
							cmdType = CMD_TYPE.STM32_MOVE
						}
						else {
							Move_T = 17
						}
						 SendMoveTypeToMcu(Move_T)
						 
					}		
					
				  break;
			
				  case  'm'+'s'+'t':
				   
					move = parseInt(uartData.substr(start_num+6, 1))
					speed = parseInt(uartData.substr(start_num+8, 3))
					time = parseInt(uartData.substr(start_num+12, 2))
 
					 if (move == 1) {
						  SendMoveTypeToMcu(9)
						 basic.pause(time * 1000)
						 if (time != 0) {
							 SendMoveTypeToMcu(17)
						 }
					 }
					 else if (move == 2) {
						 SendMoveTypeToMcu(10)
						 basic.pause(time * 1000)
						 if (time != 0) {
							 SendMoveTypeToMcu(17)
						 }
					 }
					 cmdType = CMD_TYPE.MST;
					break
			 
					case   's'+'p'+'e':
						    dl_CarSpeed = parseInt(uartData.substr(start_num+8, 3))
						    cmdType = CMD_TYPE.ROBOT_SPEED_ADJUST
					break
				 
					case   'd'+'s'+'t':
						 direction = parseInt(uartData.substr(start_num+6, 1))
						 speed = parseInt(uartData.substr(start_num+8, 3))
						 time = parseInt(uartData.substr(start_num+12, 2))
						 if (direction == 1) {  // right
							 SendMoveTypeToMcu(12)
							 basic.pause(time * 1000)
							 if (time != 0) {
								 SendMoveTypeToMcu(17)
							 }
						 }
						 else if (direction == 2) {  // left
							  SendMoveTypeToMcu(11)
							  basic.pause(time * 1000)
							 if (time != 0) {
								 SendMoveTypeToMcu(17)
							 }
						 }
						 cmdType = CMD_TYPE.DST;
					 break
				 
					
					 case   'l'+'i'+'g':
						 rgb_id = parseInt(uartData.substr(start_num+6, 1))
						 rgb_color = parseInt(uartData.substr(start_num+8, 1))
						 rgb_bright = parseInt(uartData.substr(start_num+10, 3))
						 if (rgb_id != 0) {
							 if (rgb_color == 5) {
								 rgb_color = 6
							 } else if (rgb_color == 6) {
								 rgb_color = 5
							 } else if (rgb_color == 8) {
								 rgb_color = 9
							 }
							 if (rgb_id == 1) {
								 HelloMaker_显示类.setPixelRGB(0, rgb_color)
							 }
							 else if (rgb_id == 2) {
								 HelloMaker_显示类.setPixelRGB(1, rgb_color)
							 }
		 
							 HelloMaker_显示类.setBrightness(rgb_bright * 2.5)
							 HelloMaker_显示类.showLight()
		 
						 }
						 else {
							 HelloMaker_显示类.clearLight()
						 }
						 cmdType = CMD_TYPE.LIG;
				 
					  break
					  
					  
					  case   't'+'o'+'n':
					      
                            tone = parseInt(uartData.substr(start_num+6, 2))
                            dlbot_beat = parseInt(uartData.substr(start_num+9, 1))
                            music.playTone(Tone[tone], Beat[dlbot_beat])
                            cmdType = CMD_TYPE.TON
                
					  
					  break
		  
					default :
					  
					break
					  
	        }	
            
               return cmdType
        }
       
            return -1
        
    }

}
 
