from dotmap import DotMap

MARLIN = DotMap()
MARLIN.name = "Marlin"
MARLIN.ACK = "ok"
MARLIN.buffer_command = "M114"
MARLIN.emergency_stop = "M112"
MARLIN.buffer_timeout = 30
MARLIN.ready_message = "start"
MARLIN.position_tolerance = 0.01

def is_marlin(val):
    return val == MARLIN.name


GRBL = DotMap()
GRBL.name = "Grbl"
GRBL.ACK = "ok"
GRBL.buffer_command = "?"
GRBL.emergency_stop = "!"
GRBL.buffer_timeout = 5
GRBL.ready_message = "Grbl"

def is_grbl(val):
    return val == GRBL.name

# Define ARTSCAPE firmware settings
ARTSCAPE = DotMap()
ARTSCAPE.name = "Artscape"
ARTSCAPE.ACK = "ok"
ARTSCAPE.buffer_command = "STATUS"
ARTSCAPE.emergency_stop = "STOP"
ARTSCAPE.buffer_timeout = 10
ARTSCAPE.ready_message = "ready"

def is_ARTSCAPE(val):
    return val == ARTSCAPE.name


# Functions to get firmware-specific parameters
def get_ACK(firmware):
    if firmware == MARLIN.name:
        return MARLIN.ACK
    elif firmware == GRBL.name:
        return GRBL.ACK
    elif firmware == ARTSCAPE.name:
        return ARTSCAPE.ACK

def get_buffer_command(firmware):
    if firmware == MARLIN.name:
        return MARLIN.buffer_command
    elif firmware == GRBL.name:
        return GRBL.buffer_command
    elif firmware == ARTSCAPE.name:
        return ARTSCAPE.buffer_command

def get_buffer_timeout(firmware):
    if firmware == MARLIN.name:
        return MARLIN.buffer_timeout
    elif firmware == GRBL.name:
        return GRBL.buffer_timeout
    elif firmware == ARTSCAPE.name:
        return ARTSCAPE.buffer_timeout

def get_emergency_stop_command(firmware):
    if firmware == MARLIN.name:
        return MARLIN.emergency_stop
    elif firmware == GRBL.name:
        return GRBL.emergency_stop
    elif firmware == ARTSCAPE.name:
        return ARTSCAPE.emergency_stop

def get_ready_message(firmware):
    if firmware == MARLIN.name:
        return MARLIN.ready_message
    elif firmware == GRBL.name:
        return GRBL.ready_message
    elif firmware == ARTSCAPE.name:
        return ARTSCAPE.ready_message