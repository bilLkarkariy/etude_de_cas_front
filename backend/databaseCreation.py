from app import db, User, Client
import json

# Creation of three fictional users
UserOne = User(name='Dupont Jean', email='jean@arcane.run', claims={
    "authorized_clients": [
        "llt",
        "aur",
        "sho"
    ],
    "features_rights": {
        "ams_feed": 2
    }
})
UserTwo=User(name='Durand Jeanne', email='jeanne@arcane.run', claims={
    "authorized_clients": [
        "all"
    ],
    "features_rights": {
        "admin_tools": 3,
        "adscale_datalab": 3,
        "adscale_gtp": 3,
        "adscale_media": 3,
        "ams_feed": 3,
        "ams_gtp": 3,
        "ams_lab": 3,
        "ams_media": 3,
        "users": 3
    }
})
UserThree = User(name='Lapierre Marie', email='marie@arcane.run', claims={
    "authorized_clients": [
        "tar"
    ],
    "features_rights": {
        "ams_feed": 2
    }
})

ClientOne = Client(name="_myfashion_shop", slug="_my") 
ClientTwo = Client(name="auroremarket", slug="aur") 
ClientThree = Client(name="arcane", slug="arc") 
ClientFour = Client(name="aviva_fr", slug="viv") 
ClientFive = Client(name="shopix", slug="sho") 
ClientSix = Client(name="tartine_et_chocolat", slug="tar") 
ClientSeven = Client(name="training_company", slug="tra") 
ClientHeight = Client(name="white_bird", slug="whi") 
ClientNine = Client(name="alltricks", slug="llt") 
Client10 = Client(name="yse", slug="yse") 
Client11 = Client(name="appear_here", slug="app") 
Client12 = Client(name="afflelou", slug="aff") 


# Function to fill the database
def feed_the_database():
    # db.session.add_all([UserOne, UserTwo, UserThree])
    db.session.add_all([ClientOne,ClientTwo,ClientThree,ClientFour,ClientFive,ClientSix, \
        ClientSeven,ClientHeight,ClientNine, Client10, Client11, Client12 ])
    db.session.commit()


# Creation of the database
if __name__ == '__main__':
    # create_all() create the database only if it does not already exist
    db.create_all()
    # Check if the database is empty, if not we do not fill it with our data
    # if User.query.first() is None:
    feed_the_database()
