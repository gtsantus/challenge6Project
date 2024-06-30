# Unnamed Card Game: Online

# Description
An application to hold a database of cards and facilitate the creation of decks.

# Context
Making decks is a pain, making them online is easier. It means you don't have to print cards you end up not using, you can see all the potential options, you can filter by card/keyword and search the database easily. This also has the options to be expanded into an online client of the game so that it can be played without all needing to be in the same room.

# Features
-Login as either a user or an admin. Users can create and save decks and view the card database. Admins can add and edit cards in the database (on top of being able to do what the user does)
-UI to make creating decks easy (deck building rules)
-UI to make adding cards easy
Decks need to be saved in a space efficient fashion .
Load decks into the program from a deck code?

# User Interface
WIREFRAMES (take a look at the deck building in LoR)
login screen - dashboard
Make deck
Load Deck
View Cards
Add Card


# Architecture
???

# RESTful Routing
Back End stuff, how are the Routes going to work?
Services:
User:
Authenticate User -> Returns Token + _id + role
signUp -> Returns Token + _id + role
updatePassword -> Updates a currently logged in user
Cards:
getAllCards -> Returns an Array of all Cards (which are their own object)
getCardById -> Returns a specific card
addCard -> Adds a specific card
updateCard -> Updates a specific card
Decks:
getAllDecks -> Returns all of a user's decks
addDeck -> Creates a new deck
updateDeck -> Updates a specific deck


# Technologies
Testing Tools. Shouldn't need any external APIs since this is all our own stuff.

# Deployment
Look up deployment on a cloud service.