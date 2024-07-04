const testData = {
    users: [{
        _id: "60f3e3f3e4e4c7e6f3b0d2b7",
        username: 'testUser',
        password: '$2b$10$mNhb8HSk1MeyDqbivHinQew4PydWwJt4.cLJRQSH4FX/9.wXeDrQ.',
        decks: [        {
            name: 'testDeck',
            faction: 'Wizard',
            cards: [],
            _id: "668407f9d3d06290b766a527"
        }],
        admin: true
    },
    {
        _id: "6685e6046782b4f828607b5c",
        username: 'testUserNonAdmin',
        password: '$2b$10$mNhb8HSk1MeyDqbivHinQew4PydWwJt4.cLJRQSH4FX/9.wXeDrQ.',
        decks: [],
        admin: false
    }    
    ]
}

export default testData;