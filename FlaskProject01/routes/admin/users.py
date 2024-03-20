from flask import redirect, render_template, request
from start import app, db
from forms import UserForm

# Nəyə görə User modulunu burda import edəndə error verir?????
# from models import User


@app.route('/login', methods=['GET', 'POST'])
def login():
    from models import User
    userForm = UserForm()
    if request.method == "POST":

        user = User(name=userForm.u_name.data, email=userForm.u_email.data,
                    password=userForm.u_password.data, is_logged_in=False)

        db.session.add(user)
        db.session.commit()
        return redirect("/admina/users")
    return render_template("site/login.html", userForm=userForm)


@app.route('/admina', methods=['GET', 'POST'])
def admina():
    from models import User
    user = User.query.get(1)
    if user.is_logged_in:
        users = User.query.all()
        return render_template("admin/users.html", users=users)
    else:
        return redirect("/login")
    

@app.route('/admina/messages', methods=['GET', 'POST'])
def admina_messages():
    from models import User, Messages
    user = User.query.get(1)
    if user.is_logged_in:
        messages = Messages.query.all()
        return render_template("admin/messages.html", messages=messages)
    else:
        return redirect("/login")


@app.route('/logged', methods=['GET', 'POST'])
def logged():
    from models import User
    if request.method == "POST":
        user = User.query.get(1)
        username_login = request.form["username_login"]
        password_login = request.form["password_login"]
        if username_login == user.name and password_login == user.password:
            user.is_logged_in = True
            db.session.commit()
            return redirect("/admina")
        return redirect("/login")


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    from models import User
    user = User.query.get(1)
    user.is_logged_in = False
    db.session.commit()
    return redirect("/login")


@app.route('/admina/delete/<id>', methods=['GET', 'POST'])
def delete(id):
    from models import User
    msg = User.query.get(id)
    db.session.delete(msg)
    db.session.commit()
    return redirect("/admina")


@app.route('/admina/update/<id>', methods=['GET', 'POST'])
def update(id):
    from models import User
    user = User.query.get(id)
    if request.method == "POST":
        new_name = request.form["new_name"]
        new_email = request.form["new_email"]
        new_password = request.form["new_password"]

        user.name = new_name
        user.email = new_email
        user.password = new_password
        db.session.commit()
        return redirect("/admina")
    return render_template("admin/update.html", user=user)
