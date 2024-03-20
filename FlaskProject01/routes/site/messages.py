from flask import redirect, render_template, request
from start import app, db
import datetime
from forms import MessagesForm
# from models import Messages


@app.route('/book', methods=["GET", "POST"])
def book():
    from models import Messages
    messages = Messages.query.all()
    messagesForm = MessagesForm()
    if request.method == "POST":

        msg = msg = Messages(name=messagesForm.u_name.data, email=messagesForm.u_email.data,
                             message=messagesForm.u_message.data, msg_date=str(datetime.datetime.now()))

        db.session.add(msg)
        db.session.commit()
        return redirect("/book")
    return render_template("site/book.html", messages=messages, messagesForm=messagesForm)
