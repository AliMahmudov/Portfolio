from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config["SECRET_KEY"] = "secretkey"

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from models import *
from routes.admin.users import *
from routes.site.messages import *


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(port=5000, debug=True)
