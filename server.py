from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import json
import csv

app = Flask(__name__)
app.secret_key = "oohhverysecretkey"  # Change this to something secure

def load_credentials():
    with open('static/adminPanel/credentials.json') as f:
        return json.load(f)

USER_CREDENTIALS = load_credentials()
COEFF_CSV = "static/calculator/coeff.csv"

#csv things
def read_csv(filename):
    with open(filename, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        data = list(reader)
    return data

def write_csv(data):
    with open(COEFF_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(data)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/adminPanelLogin', methods=['GET', 'POST'])
def adminPanelLogin():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username in USER_CREDENTIALS and USER_CREDENTIALS[username] == password:
            session['user'] = username  # Store session data
            return redirect(url_for('adminPanel'))
        else:
            return render_template('adminPanelLogin.html', error="Invalid username or password!")

    return render_template('adminPanelLogin.html')

@app.route('/adminPanel')
def adminPanel():
    if 'user' in session:  # Check if the user is logged in
        data = read_csv(COEFF_CSV)
        return render_template('adminPanel.html', user=session['user'], data=data)
    return redirect(url_for('adminPanelLogin'))

@app.route('/logout')
def logout():
    session.pop('user', None)  # Remove user from session
    return redirect(url_for('adminPanelLogin'))

@app.route('/save', methods=['POST'])
def save():
    if 'user' not in session:  # Prevent unauthorized access
        return jsonify({"message": "Unauthorized"}), 403  

    data = request.json.get("data")
    if data:
        write_csv(data)
        return jsonify({"message": "Data saved successfully! Log out and back in to fully refresh the data"})
    return jsonify({"message": "Failed to save data."}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)