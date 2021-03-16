const movies = [
    {
        "title": "Coming 2 America",
        "year": "2021",
        "directors": [
            "Craig Brewer"
        ],
        "genres": [
            "Comedy"
        ],
        "synopsis": "The African monarch Akeem learns he has a long-lost son in the United States and must return to America to meet this unexpected heir and build a relationship with his son.",
        "cover": "http://localhost:8080/public/covers/coming-2-america.jpg",
        "featured": false
    },
    {
        "title": "Raya and the Last Dragon",
        "year": "2021",
        "directors": [
            "Don Hall",
            "Carlos Lopez Estrada",
            "Paul Briggs",
            "John Ripa"
        ],
        "genres": [
            "Animation",
            "Action",
            "Adventure"
        ],
        "synopsis": "In a realm known as Kumandra, a re-imagined Earth inhabited by an ancient civilization, a warrior named Raya is determined to find the last dragon.",
        "cover": "http://localhost:8080/public/covers/raya-and-the-last-dragon.jpg",
        "featured": false
    },
    {
        "title": "Coming to America",
        "year": "1988",
        "directors": [
            "John Landis"
        ],
        "genres": [
            "Comedy",
            "Romance"
        ],
        "synopsis": "An extremely pampered African prince travels to Queens, New York, and goes undercover to find a wife that he can respect for her intelligence and strong will.",
        "cover": "http://localhost:8080/public/covers/coming-to-america.jpg",
        "featured": false
    },
    {
        "title": "Zack Snyder's Justice League",
        "year": "2021",
        "directors": [
            "Zack Snyder"
        ],
        "genres": [
            "Action",
            "Adventure",
            "Fantasy"
        ],
        "synopsis": "Zack Snyder's definitive director's cut of Justice League. Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
        "cover": "http://localhost:8080/public/covers/zack-snyders-justice-league.jpg",
        "featured": false
    },
    {
        "title": "I Care a Lot",
        "year": "2021",
        "directors": [
            "J Blakeson"
        ],
        "genres": [
            "Comedy",
            "Crime",
            "Thriller"
        ],
        "synopsis": "A crooked legal guardian who drains the savings of her elderly wards meets her match when a woman she tries to swindle turns out to be more than she first appears.",
        "cover": "http://localhost:8080/public/covers/i-care-a-lot.jpg",
        "featured": false
    },
    {
        "title": "Cherry",
        "year": "2021",
        "directors": [
            "Anthony Russo",
            "Joe Russo"
        ],
        "genres": [
            "Crime",
            "Drama"
        ],
        "synopsis": "Cherry drifts from college dropout to army medic in Iraq - anchored only by his true love, Emily. But after returning from the war with PTSD, his life spirals into drugs and crime as he struggles to find his place in the world.",
        "cover": "http://localhost:8080/public/covers/cherry.jpg",
        "featured": false
    },
    {
        "title": "Moxie",
        "year": "2021",
        "directors": [
            "Amy Poehler",
        ],
        "genres": [
            "Comedy",
            "Drama",
            "Music"
        ],
        "synopsis": "Fed up with the sexist and toxic status quo at her high school, a shy 16-year-old finds inspiration from her mother's rebellious past and anonymously publishes a zine that sparks a school-wide, coming-of-rage revolution.",
        "cover": "http://localhost:8080/public/covers/moxie.jpg",
        "featured": false
    },
    {
        "title": "Chaos Walking",
        "year": "2021",
        "directors": [
            "Doug Liman",
        ],
        "genres": [
            "Adventure",
            "Sci-Fi"
        ],
        "synopsis": "A dystopian world where there are no women and all living creatures can hear each other's thoughts in a stream of images, words, and sounds called Noise.",
        "cover": "http://localhost:8080/public/covers/chaos-walking.jpg",
        "featured": false
    },
    {
        "title": "Boss Level",
        "year": "2021",
        "directors": [
            "Joe Carnahan"
        ],
        "genres": [
            "Action",
            "Mystery",
            "Sci-Fi"
        ],
        "synopsis": "A retired special forces officer is trapped in a never ending time loop on the day of his death.",
        "cover": "http://localhost:8080/public/covers/boss-level.jpg",
        "featured": false
    },
    {
        "title": "Nomadland",
        "year": "2020",
        "directors": [
            "Chloe Zhao"
        ],
        "genres": [
            "Drama"
        ],
        "synopsis": "After losing everything in the Great Recession, a woman embarks on a journey through the American West, living as a van-dwelling modern-day nomad.",
        "cover": "http://localhost:8080/public/covers/nomadland.jpg",
        "featured": false
    },
    {
        "title": "Mortal Kombat",
        "year": "Mortal Kombat",
        "directors": [
            "Simon McQuoid"
        ],
        "genres": [
            "Action",
            "Adventure",
            "Fantasy"
        ],
        "synopsis": "MMA fighter Cole Young seeks out Earth's greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.",
        "cover": "http://localhost:8080/public/covers/mortal-kombat.jpg",
        "featured": false
    },
    {
        "title": "Tom and Jerry",
        "year": "2021",
        "directors": [
            "Tim Story"
        ],
        "genres": [
            "Animation",
            "Comedy",
            "Family"
        ],
        "synopsis": "A chaotic battle ensues between Jerry Mouse, who has taken refuge in the Royal Gate Hotel, and Tom Cat, who is hired to drive him away before the day of a big wedding arrives.",
        "cover": "http://localhost:8080/public/covers/tom-and-jerry.jpg",
        "featured": false
    },
    {
        "title": "Godzilla vs. Kong",
        "year": "2021",
        "directors": [
            "Adam Wingard"
        ],
        "genres": [
            "Action",
            "Sci-Fi",
            "Thriller"
        ],
        "synopsis": "The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against one another - the fearsome Godzilla and the mighty Kong - with humanity caught in the balance.",
        "cover": "http://localhost:8080/public/covers/godzilla-vs.-kong.jpg",
        "featured": false
    },
    {
        "title": "Judas and the Black Messaia",
        "year": "2021",
        "directors": [
            "Shaka King"
        ],
        "genres": [
            "Biography",
            "Drama",
            "History"
        ],
        "synopsis": "Bill O'Neal infiltrates the Black Panther Party per FBI Agent Mitchell and J. Edgar Hoover. As Party Chairman Fred Hampton ascends, falling for a fellow revolutionary en route, a battle wages for O'Neal's soul.",
        "cover": "http://localhost:8080/public/covers/judas-and-the-black-messaiah",
        "featured": false
    },
    {
        "title": "The Unholy",
        "year": "2021",
        "directors": [
            "Evan Spiliotopoulos"
        ],
        "genres": [
            "Horror"
        ],
        "synopsis": "A hearing-impaired girl is visited by the Virgin Mary and can suddenly hear, speak, and heal the sick. As people flock to witness her miracles, terrifying events unfold. Are they the work of the Virgin Mary or something much more sinister?",
        "cover": "http://localhost:8080/public/covers/unholy.jpg",
        "featured": false
    },
    {
        "title": "The Mauritanian",
        "year": "2021",
        "directors": [
            "Kevin Macdonald"
        ],
        "genres": [
            "Drama",
            "Thriller"
        ],
        "synopsis": "Mohamedou Ould Slahi fights for freedom after being detained and imprisoned without charge by the U.S. Government for years.",
        "cover": "http://localhost:8080/public/covers/the-mauritanian.jpg",
        "featured": false
    },
    {
        "title": "Promising Young Woman",
        "year": "2020",
        "directors": [
            "Emerald Fennell"
        ],
        "genres": [
            "Crime",
            "Drama",
            "Thriller"
        ],
        "synopsis": "A young woman, traumatized by a tragic event in her past, seeks out vengeance against those who crossed her path.",
        "cover": "http://localhost:8080/public/covers/pomising-young-woman.jpg",
        "featured": false
    },
    {
        "title": "Monster Hunter",
        "year": "2020",
        "directors": [
            "Paul W.S. Anderson"
        ],
        "genres": [
            "Action",
            "Adventure",
            "Fantasy"
        ],
        "synopsis": "When Lt. Artemis and her loyal soldiers are transported to a new world, they engage in a desperate battle for survival against enormous enemies with incredible powers. Feature film based on the video game by Capcom.",
        "cover": "http://localhost:8080/public/covers/monster-hunter.jpg",
        "featured": false
    },
    {
        "title": "Avengers: Endgame",
        "year": "2019",
        "directors": [
            "Anthony Russo",
            "Joe Russo"
        ],
        "genres": [
            "Action",
            "Adventure",
            "Drama"
        ],
        "synopsis": "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        "cover": "http://localhost:8080/public/covers/avengers-endgame.jpg",
        "featured": false
    },
    {
        "title": "Crisis",
        "year": "2021",
        "directors": [
            "Nicholas Jarecki"
        ],
        "genres": [
            "Drama",
            "Thriller"
        ],
        "synopsis": "Three stories about the world of opioids collide: a drug trafficker arranges a multi-cartel Fentanyl smuggling operation between Canada and the U.S., an architect recovering from an oxycodone addiction tracks down the truth behind her son's involvement with narcotics, and a university professor battles unexpected revelations about his research employer, a drug company with deep government influence bringing a new \"non-addictive\" painkiller to market.",
        "cover": "http://localhost:8080/public/covers/crisis.jpg",
        "featured": false
    },
    {
        "title": "The Princess Bride",
        "year": "1987",
        "directors": [
            "Rob Reiner"
        ],
        "genres": [
            "Adventure",
            "Family",
            "Fantasy"
        ],
        "synopsis": "While home sick in bed, a young boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
        "cover": "http://localhost:8080/public/covers/the-princess-bride.jpg",
        "featured": true
    },
    {
        "title": "The Hitchhiker's Guide to the Galaxy",
        "year": "2005",
        "directors": [
            "Garth Jennings"
        ],
        "genres": [
            "Adventure",
            "Comedy",
            "Sci-Fi"
        ],
        "synopsis": "Mere seconds before the Earth is to be demolished by an alien construction crew, journeyman Arthur Dent is swept off the planet by his friend Ford Prefect, a researcher penning a new edition of \"The Hitchhiker's Guide to the Galaxy.\"",
        "cover": "http://localhost:8080/public/covers/hitchhikers-guide-to-the-galaxy.jpg",
        "featured": true
    },
    {
        "title": "Odd Thomas",
        "year": "2013",
        "directors": [
            "Stephen Sommers"
        ],
        "genres": [
            "Comedy",
            "Fantasy",
            "Horror"
        ],
        "synopsis": "In a California desert town, a short-order cook with clairvoyant abilities encounters a mysterious man with a link to dark, threatening forces.",
        "cover": "http://localhost:8080/public/covers/odd-thomas.jpg",
        "featured": true
    },
    {
        "title": "John Dies at the End",
        "year": "2012",
        "directors": [
            "Don Coscarelli"
        ],
        "genres": [
            "Comedy",
            "Fantasy",
            "Horror"
        ],
        "synopsis": "A new street drug that sends its users across time and dimensions has one drawback: some people return no longer human. Can two college drop-outs save humanity from this silent, otherworldly invasion?",
        "cover": "http://localhost:8080/public/covers/john-dies-at-the-end.jpg",
        "featured": true
    },
    {
        "title": "Army of Darkness",
        "year": "1992",
        "directors": [
            "Sam Raimi"
        ],
        "genres": [
            "Comedy",
            "Fantasy",
            "Horror"
        ],
        "synopsis": "A sardonic hardware store clerk is accidentally transported to 1300 A.D., where he must retrieve the Necronomicon and battle an army of the dead so he can return home.",
        "cover": "http://localhost:8080/public/covers/army-of-darkness",
        "featured": true
    },
    {
        "title": "Tucker and Dale vs Evil",
        "year": "2010",
        "directors": [
            "Eli Craig"
        ],
        "genres": [
            "Comedy",
            "Horror"
        ],
        "synopsis": "Affable hillbillies Tucker and Dale are on vacation at their dilapidated mountain cabin when they are mistaken for murderers by a group of preppy college students.",
        "cover": "http://localhost:8080/public/covers/tucker-and-dale-vs-evil.jpg",
        "featured": true
    },
    {
        "title": "Dark City",
        "year": "1998",
        "directors": [
            "Alex Proyas"
        ],
        "genres": [
            "Mystery",
            "Sci-Fi",
            "Thriller"
        ],
        "synopsis": "A man struggles with memories of his past, which include a wife he cannot remember and a nightmarish world no one else ever seems to wake up from.",
        "cover": "http://localhost:8080/public/covers/dark-city.jpg",
        "featured": true
    },
    {
        "title": "Spaceballs",
        "year": "1987",
        "directors": [
            "Mel Brooks"
        ],
        "genres": [
            "Adventure",
            "Comedy",
            "Sci-Fi"
        ],
        "synopsis": "A hero and his trusty half-man, half-dog set out to rescue a kidnapped princess from the clutches of an evil despot.",
        "cover": "http://localhost:8080/public/covers/spaceballs.jpg",
        "featured": true
    },
    {
        "title": "Valerian and the City of a Thousand Planets",
        "year": "2017",
        "directors": [
            "Luc Besson"
        ],
        "genres": [
            "Action",
            "Adventure",
            "Fantasy"
        ],
        "synopsis": "A dark force threatens Alpha, a vast metropolis and home to species from a thousand planets. Special operatives Valerian and Laureline must race to identify the marauding menace and safeguard not just Alpha, but the future of the universe.",
        "cover": "http://localhost:8080/public/covers/valerian-and-the-city-of-a-thousand-planets.jpg",
        "featured": true
    },
    {
        "title": "Identity",
        "year": "2003",
        "directors": [
            "James Mangold"
        ],
        "genres": [
            "Mystery",
            "Thriller"
        ],
        "synopsis": "Stranded at a desolate Nevada motel during a nasty rain storm, ten strangers become acquainted with each other when they realize that they're being killed off one by one.",
        "cover": "http://localhost:8080/public/covers/identity.jpg",
        "featured": true
    },
]

module.exports = movies;