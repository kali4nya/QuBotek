from flask import Flask, render_template, request, redirect, url_for, session
import json
import csv

app = Flask(__name__)
app.secret_key = "oohhverysecretkey"  # Change this to something secure

#admin panel things
def load_credentials():
    with open('static/adminPanel/credentials.json') as f:
        return json.load(f)

USER_CREDENTIALS = load_credentials()

#csv things
def read_csv(filename):
    with open(filename, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        data = list(reader)
    return data

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
        data = read_csv('static/calculator/coeff.csv')
        return render_template('adminPanel.html', user=session['user'], data=data)
    return redirect(url_for('adminPanelLogin'))

@app.route('/logout')
def logout():
    session.pop('user', None)  # Remove user from session
    return redirect(url_for('adminPanelLogin'))

if __name__ == '__main__':
    app.run(debug=True)