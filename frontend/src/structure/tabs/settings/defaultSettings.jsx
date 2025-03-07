// This file is auto generated from the default settings file. 
// To generate a new version from the existing default values use the script: ./dev_tools/build_default_settings.py

const defaultSettings = {
	serial: {
		port: {
			name: "serial.port",
			type: "select",
			value: "FAKE",
			label: "Serial port",
			available_values: [
				"FAKE"
			],
			tip: "Select the serial port"
		},
		baud: {
			name: "serial.baud",
			type: "select",
			value: "115200",
			label: "Serial baudrate",
			available_values: [
				"2400",
				"4800",
				"9600",
				"19200",
				"38400",
				"57600",
				"115200",
				"230400",
				"250000",
				"460800",
				"921600"
			],
			tip: "Select the correct serial baudrate"
		},
		fast_mode: {
			name: "serial.fast_mode",
			type: "check",
			value: false,
			label: "Enable fast mode",
			tip: "Will make the command as short as possible to have a faster communication (will remove spaces and unnecessary line numbers)"
		}
	},
	device: {
		firmware: {
			name: "device.firmware",
			type: "select",
			value: "Marlin",
			available_values: [
				"Marlin",
				"Grbl"
			],
			label: "Select firmware type",
			tip: "Select the correct firmware type"
		},
		type: {
			name: "device.type",
			type: "select",
			value: "Scara",
			available_values: [
				"Cartesian",
				"Scara",
				"Polar"
			],
			label: "Select device type",
			tip: "Select the type of mechanism used by the device"
		},
		width: {
			name: "device.width",
			type: "input",
			value: 100,
			label: "Device width",
			depends_on: "device.type",
			depends_values: [
				"Cartesian"
			],
			tip: "Maximum X extension"
		},
		height: {
			name: "device.height",
			type: "input",
			value: 100,
			label: "Device height",
			depends_on: "device.type",
			depends_values: [
				"Cartesian"
			],
			tip: "Maximum Y extension"
		},
		radius: {
			name: "device.radius",
			type: "input",
			value: 200,
			label: "Device radius",
			depends_on: "device.type",
			depends_values: [
				"Polar",
				"Scara"
			],
			tip: "Device maximum radius"
		},
		angle_conversion_factor: {
			name: "device.angle_conversion_factor",
			type: "input",
			value: 6,
			label: "Angle conversion factor",
			depends_on: "device.type",
			depends_values: [
				"Polar",
				"Scara"
			],
			tip: "The value that makes the arm to turn one full turn"
		},
		offset_angle_1: {
			name: "device.offset_angle_1",
			type: "input",
			value: 1.5,
			label: "Insert angular position homing offset",
			depends_on: "device.type",
			depends_values: [
				"Polar",
				"Scara"
			],
			tip: "Angle for the home position of the arm (uses the values from the conversion factor, not rad: if angle_conversion_factor is 6 and must shift the homing by half turn must put 1.5"
		},
		offset_angle_2: {
			name: "device.offset_angle_2",
			type: "input",
			value: 3,
			label: "Insert second arm homing position offset",
			depends_on: "device.type",
			depends_values: [
				"Scara"
			],
			tip: "Angle for the home position of the second arm (uses the values from the conversion factor, not rad: if angle_conversion_factor is 6 and must shift the homing by half turn must put 1.5"
		}
	},
	scripts: {
		connected: {
			name: "scripts.connected",
			type: "text",
			value: "",
			label: "On connection",
			tip: "This script will run when the device is connected"
		},
		before: {
			name: "scripts.before",
			type: "text",
			value: "",
			label: "Before drawing",
			tip: "This script will run before starting to draw something"
		},
		after: {
			name: "scripts.after",
			type: "text",
			value: "",
			label: "After drawing",
			tip: "This script will run after the drawing is done"
		}
	},
	system: {
		is_linux: false
	},
	autostart: {
		on_ready: {
			name: "autostart.on_ready",
			type: "check",
			value: false,
			label: "Start drawing on power up",
			tip: "Enable this option to start drawing automatically from the full list of drawings every time the device is turned on"
		},
		interval: {
			name: "autostart.interval",
			type: "input",
			value: 0,
			label: "Interval between drawings [h]",
			tip: "Write the number of seconds to let the table pause between drawings"
		}
	},
	leds: {
		width: {
			name: "leds.width",
			type: "input",
			value: 30,
			label: "Leds number on the largest side",
			tip: "Number of LEDs in the longest side",
			depends_on: "device.type",
			depends_values: [
				"Cartesian"
			]
		},
		height: {
			name: "leds.height",
			type: "input",
			value: 20,
			label: "Leds number on the smallest side",
			tip: "Number of LEDs in the shortest side",
			depends_on: "device.type",
			depends_values: [
				"Cartesian"
			]
		},
		circumference: {
			name: "leds.circumference",
			type: "input",
			value: 50,
			label: "Total LEDs number",
			tip: "The total number of LEDs pixels in the table",
			depends_on: "device.type",
			depends_values: [
				"Scara",
				"Polar"
			]
		},
		type: {
			name: "leds.type",
			type: "select",
			value: "Dimmable",
			available_values: [
				"RGB",
				"RGBW",
				"Dimmable",
				"WWA"
			],
			label: "Select a led type",
			tip: "RGB and RGBW LEDs are compatible with WS2812B compatible drivers. The 'Dimmable' option is suitable for single color strips."
		},
		pin1: {
			name: "leds.pin1",
			type: "input",
			value: 18,
			label: "Pin number",
			tip: "Uses the BCM pin number"
		},
		available: {
			value: false,
			hide: true
		},
		has_light_sensor: {
			value: false,
			hide: true
		},
		light_sensor: {
			name: "leds.light_sensor",
			type: "select",
			value: "",
			available_values: [
				"No sensor",
				"TSL2591"
			],
			label: "Choose the type of light sensor available",
			depends_on: "leds.available",
			depends_values: [
				true
			]
		}
	},
	buttons: {
		buttons: [

		],
		available_values: [

		],
		available: false
	},
	updates: {
		hash: "",
		branch: "Master",
		update_available: false
	}
}

export default defaultSettings;