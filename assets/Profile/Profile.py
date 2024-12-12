from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL
import base64

app = Flask(__name__)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'myuser'
app.config['MYSQL_PASSWORD'] = 'mypassword'


mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def profile():
    cursor = mysql.connection.cursor()

    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        avatar = request.form['avatar_url']  # Base64 or image URL

        # Update profile in the database
        cursor.execute("UPDATE profiles SET name=%s, avatar_url=%s WHERE id=1", (name, avatar))
        mysql.connection.commit()

        # Redirect to the same page to see updated profile
        return redirect(url_for('profile'))

    # Fetch profile data from the database
    cursor.execute("SELECT * FROM profiles WHERE id=1")
    profile_data = cursor.fetchone()

    # If profile does not exist, create a default one
    if not profile_data:
        cursor.execute("INSERT INTO profiles (name, avatar_url) VALUES (%s, %s)", ('John Doe', 'https://via.placeholder.com/120'))
        mysql.connection.commit()
        cursor.execute("SELECT * FROM profiles WHERE id=1")
        profile_data = cursor.fetchone()

    cursor.close()

    return render_template('profile.html', profile=profile_data)

if __name__ == '__main__':
    app.run(debug=True)
