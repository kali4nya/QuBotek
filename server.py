from flask import Flask, render_template, request, redirect, url_for, session
import json

app = Flask(__name__)
app.secret_key = "oohhverysecretkey"  # Change this to something secure

def load_credentials():
    with open('static/adminPanel/credentials.json') as f:
        return json.load(f)

USER_CREDENTIALS = load_credentials()

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
        return render_template('adminPanel.html', user=session['user'])
    return redirect(url_for('adminPanelLogin'))

@app.route('/logout')
def logout():
    session.pop('user', None)  # Remove user from session
    return redirect(url_for('adminPanelLogin'))

if __name__ == '__main__':
    app.run(debug=True)