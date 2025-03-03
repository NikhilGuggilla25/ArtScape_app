from flask import request, jsonify
import http.client
import json
from server import app

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    mobile_number = data.get('mobile_number')

    # Validate mobile number format
    if not mobile_number or not mobile_number.isdigit() or len(mobile_number) != 10:
        return jsonify({"message": "Invalid mobile number"}), 400

    payload = json.dumps({
        "otp_expiry": "5",  # Set OTP expiry time if needed
        "template_id": "",  # Add your template ID if needed
        "mobile": mobile_number,
        "authkey": "430114A4dqES13o67c16d91P1",  # Use the auth key from app config
        "realTimeResponse": "true"
    })

    headers = {
        'Content-Type': "application/json"
    }

    conn = http.client.HTTPSConnection("control.msg91.com")

    try:
        conn.request("POST", "/api/v5/otp", payload, headers)
        res = conn.getresponse()
        response_data = res.read()
        response_json = json.loads(response_data.decode("utf-8"))

        # Check if the response indicates success
        if res.status == 200 and response_json.get('type') == 'success':
            return jsonify({"message": "OTP sent successfully!"}), 200
        else:
            app.logger.error(f"Failed to send OTP: {response_json}")
            return jsonify({"message": "Failed to send OTP."}), 500

    except http.client.HTTPException as e:
        app.logger.error(f"HTTPException during OTP request: {str(e)}")
        return jsonify({"message": "HTTP error occurred while sending OTP."}), 500
    except json.JSONDecodeError as e:
        app.logger.error(f"JSONDecodeError: {str(e)}")
        return jsonify({"message": "Error parsing OTP response."}), 500
    except Exception as e:
        app.logger.error(f"Unexpected error sending OTP: {str(e)}")
        return jsonify({"message": "Unexpected error occurred while sending OTP."}), 500
    finally:
        conn.close()


@app.route('/api/resend-otp', methods=['GET'])
def resend_otp():
    mobile_number = request.args.get('mobile_number')
    retrytype = request.args.get('retrytype', 'text')  # Default to 'text' if not provided

    if not mobile_number or not mobile_number.isdigit() or len(mobile_number) != 10:
        return jsonify({"message": "Invalid mobile number"}), 400

    authkey = "YOUR_AUTH_KEY_HERE"  # Replace with your actual MSG91 auth key
    mobile_number = f"91{mobile_number}"  # Ensure the mobile number is in international format

    request_path = f"/api/v5/otp/retry?authkey={authkey}&retrytype={retrytype}&mobile={mobile_number}"

    conn = http.client.HTTPSConnection("control.msg91.com")

    try:
        conn.request("GET", request_path)
        res = conn.getresponse()
        response_data = res.read()
        response_json = json.loads(response_data.decode("utf-8"))

        if res.status == 200 and response_json.get('type') == 'success':
            return jsonify({"message": "OTP resent successfully!"}), 200
        else:
            return jsonify({"message": "Failed to resend OTP."}), 400

    except http.client.HTTPException as e:
        app.logger.error(f"HTTPException during OTP resend: {str(e)}")
        return jsonify({"message": "HTTP error occurred while resending OTP."}), 500
    except json.JSONDecodeError as e:
        app.logger.error(f"JSONDecodeError: {str(e)}")
        return jsonify({"message": "Error parsing OTP resend response."}), 500
    except Exception as e:
        app.logger.error(f"Unexpected error resending OTP: {str(e)}")
        return jsonify({"message": "Unexpected error occurred while resending OTP."}), 500
    finally:
        conn.close()


@app.route('/api/verify-otp', methods=['GET'])
def verify_otp():
    otp = request.args.get('otp')
    mobile_number = request.args.get('mobile_number')

    if not otp or not mobile_number:
        return jsonify({"message": "OTP and mobile number are required"}), 400

    conn = http.client.HTTPSConnection("control.msg91.com")

    headers = { 
        'authkey': "429155AJNIWbNG2766d59ea0P1"  # Replace with your actual MSG91 auth key
    }

    # Construct the request path with the otp and mobile number
    request_path = f"/api/v5/otp/verify?otp={otp}&mobile=91{mobile_number}"

    try:
        conn.request("GET", request_path, headers=headers)
        res = conn.getresponse()
        response_data = res.read()
        response_json = json.loads(response_data.decode("utf-8"))
        
        if res.status == 200 and response_json.get('type') == 'success':
            return jsonify({"message": "OTP verified successfully!"}), 200
        else:
            return jsonify({"message": "Failed to verify OTP."}), 400
        
    except http.client.HTTPException as e:
        app.logger.error(f"HTTPException during OTP verification: {str(e)}")
        return jsonify({"message": "HTTP error occurred while verifying OTP."}), 500
    except json.JSONDecodeError as e:
        app.logger.error(f"JSONDecodeError: {str(e)}")
        return jsonify({"message": "Error parsing OTP verification response."}), 500
    except Exception as e:
        app.logger.error(f"Unexpected error verifying OTP: {str(e)}")
        return jsonify({"message": "Unexpected error occurred while verifying OTP."}), 500
    finally:
        conn.close()
