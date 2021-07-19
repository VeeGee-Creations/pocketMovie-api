# pocketMovie-api
An Express API which delivers movie and user profile information from a MongoDB database.  
Includes endpoints for user registration and login.

## Dependencies
-  bcrypt: ^5.0.1
-  cors: ^2.8.5,
-  express: ^4.17.1,
-  express-validator: ^6.10.0,
-  jsonwebtoken: ^8.5.1,
-  mongoose: ^5.12.3,
-  mongoose-beautiful-unique-validation: ^7.1.1,
-  morgan: ^1.10.0,
-  passport: ^0.4.1,
-  passport-jwt: ^4.0.0,
-  passport-local: ^1.0.0

## Endpoints

| Endpoint | Method | Response | Parameters |
| :------: | :----: | :------: | :--------: |
| / | GET | Static HTML | N/A |
| /documentation | GET | Static HTML | N/A |
| /movies | GET | JSON | /:Title |
| /featured | GET | JSON | N/A |
| /directors | GET | JSON | /:Name |
| /users/profile | GET | JSON | N/A |
| /users | PUT | JSON | N/A |
| /login | POST | JSON | /login?Username=(username)&Password=(password) |
| /users/favorites/push | POST | JSON | :MovieID |
| /users/favorites/pull | POST | JSON | :MovieID |
| /users | DELETE | String | N/A |

## Response Examples

### GET Movies Example

```javascript
[
    {
        "Directors": [
            {
                "_id": "605fa677036abe2b60c6e29b",
                "Name": "Sam Raimi",
                "Bio": "Highly inventive U.S. film director/producer/writer/actor Sam Raimi first came to the attention of film fans with the savage, yet darkly humorous, low-budget horror film, The Evil Dead (1981). From his childhood, Raimi was a fan of the cinema and, before he was ten-years-old, he was out making movies with an 8mm camera. He was a devoted fan of The Three Stooges, so much of Raimi's film work in his teens, with good friends Bruce Campbell and Rob Tapert, was slapstick comedy based around what they had observed from \"Stooges\" movies.\n\nAmong the three of them, they wrote, directed, produced and edited a short horror movie titled Within the Woods (1978), which was then shown to prospective investors to raise the money necessary to film The Evil Dead (1981). It met with lukewarm interest in the U.S. with local distributors, so Raimi took the film to Europe, where it was much more warmly received. After it started gaining positive reviews and, more importantly, ticket sales upon its release in Europe, U.S. distributors showed renewed interest, and \"Evil Dead\" was eventually released stateside to strong box office returns. His next directorial effort was Crimewave (1985), a quirky, cartoon-like effort that failed to catch fire with audiences. However, he bounced back with Evil Dead II (1987), a racier and more humorous remake/sequel to the original \"Dead\" that did even better at the box office. Raimi was then given his biggest budget to date to shoot Darkman (1990), a comic book-style fantasy about a scarred avenger. The film did moderate business, but Raimi's strong visual style was evident throughout the film via inventive and startling camera work that caught the attention of numerous critics.\n\nThe third chapter in the Evil Dead story beckoned, and Raimi once again directed buddy Campbell as the gritty hero \"Ash\", in the Gothic horror Army of Darkness (1992). Raimi surprised fans when he took a turn away from the fantasy genre and directed Gene Hackman and Sharon Stone in the sexy western, The Quick and the Dead (1995); four years later, he took the directorial reins on A Simple Plan (1998), a crime thriller about stolen money, starring Bill Paxton and Bridget Fonda. In early 1999, he directed the baseball film, For Love of the Game (1999), and, in 2000, returned to the fantasy genre with a top-flight cast in The Gift (2000). In 2002, Raimi was given a real opportunity to demonstrate his dynamic visual style with the big-budget film adaptation of the Stan Lee comic book superhero, Spider-Man (2002), and fans were not disappointed. The movie was strong in both script and effects, and was a runaway success at the box office. Of course, Raimi returned for the sequel, Spider-Man 2 (2004), which surpassed the original in box-office takings.",
                "Birth": "1959-10-23",
                "Death": null
            }
        ],
        "Genres": [
            {
                "_id": "605f8b194d3d4b1d9eac613c",
                "Name": "Comedy",
                "Description": "Virtually all scenes should contain characters participating in humorous or comedic experiences. The comedy can be exclusively for the viewer, at the expense of the characters in the title, or be shared with them. Please submit qualifying keywords to better describe the humor (i.e. spoof, parody, irony, slapstick, satire, black-comedy etc). If the title does not conform to the 'virtually all scenes' guideline then please do not add the comedy genre; instead, submit the same keyword variations described above to signify the comedic elements of the title. Subjective."
            },
            {
                "_id": "605f99663065fb69139e9258",
                "Name": "Horror",
                "Description": "Should contain numerous consecutive scenes of characters effecting a terrifying and/or repugnant narrative throughout the title. Note: not to be confused with Thriller which is not usually based in fear or abhorrence. Subjective."
            }
        ],
        "Actors": [],
        "_id": "605fb65b036abe2b60c6e2a5",
        "Title": "Army of Darkness",
        "Synopsis": "A sardonic hardware store clerk is accidentally transported to 1300 A.D., where he must retrieve the Necronomicon and battle an army of the dead so he can return home.",
        "ImageURL": "/covers/army-of-darkness.jpg",
        "Featured": true,
        "Release": "1992"
    }
]
```

### Get Directors Example Response

```javascript
[
    {
        "name": "Rob Reiner",
        "born": "1947",
        "died": false,
        "bio": "Robert Reiner was born in New York City, to Estelle Reiner (née Lebost) and Emmy-winning actor, comedian, writer, and producer Carl Reiner.\n\n        As a child, he often looked up to his father as his inspiration and role-model. Carl Reiner was on The Dick Van Dyke Show, which he created and also starred in. Estelle was the inspiration for Rob Reiner to become a director. Her history as a singer helped him understand how music was used in a scene. Rob often felt pressured about measuring up to his father's twelve Emmys, and prestigious awards and successful streak.\n        \n        When Rob graduated high school, his parents advised him to participate in Summer Theatre. Reiner got a job as an apprentice in the Bucks County Playhouse in Pennsylvania. He went to be further educated at UCLA Film School. Reiner felt he still wasn't successful even having a recurring role on one of the biggest shows in the country, All in the Family. Reiner began his directing career with the Oscar-nominated films This Is Spinal Tap, Stand By Me, and The Princess Bride,.\n        \n        With these successful box-office movies in 1987, Reiner founded his own production company, Castle Rock Entertainment, along with Martin Shafer, Andrew Scheinman, Glenn Padnick, and Alan Horn. For Castle Rock Entertainment, he went to direct the Oscar-nominated films When Harry Met Sally, Misery, and A Few Good Men. Reiner often credits former co-star Carroll O'Connor in helping him get into the directing business, and showing Reiner the ropes.\n        \n        Reiner also is known as a political activist, co-founding the American Foundation For Equal Rights, a group that was an advisory for same-sex-marriage. Reiner has spoken at several rallies on several controversial topics, and is also seen as an advocate on social issues, such as domestic violence and tobacco use.\n        \n        Reiner has also made cameos on show like 30 Rock, The Simpsons, and Hannah Montana, and in the films The First Wives Club, Bullets Over Broadway, Primary Colors, and Throw Momma From The Train, among many others."
    }
]
```

### GET Profile Example

```javascript
[
    {
        "Favorites": [
            {
                "Directors": [
                    {
                        "_id": "605fa677036abe2b60c6e29b",
                        "Name": "Sam Raimi",
                        "Bio": "Highly inventive U.S. film director/producer/writer/actor Sam Raimi first came to the attention of film fans with the savage, yet darkly humorous, low-budget horror film, The Evil Dead (1981). From his childhood, Raimi was a fan of the cinema and, before he was ten-years-old, he was out making movies with an 8mm camera. He was a devoted fan of The Three Stooges, so much of Raimi's film work in his teens, with good friends Bruce Campbell and Rob Tapert, was slapstick comedy based around what they had observed from \"Stooges\" movies.\n\nAmong the three of them, they wrote, directed, produced and edited a short horror movie titled Within the Woods (1978), which was then shown to prospective investors to raise the money necessary to film The Evil Dead (1981). It met with lukewarm interest in the U.S. with local distributors, so Raimi took the film to Europe, where it was much more warmly received. After it started gaining positive reviews and, more importantly, ticket sales upon its release in Europe, U.S. distributors showed renewed interest, and \"Evil Dead\" was eventually released stateside to strong box office returns. His next directorial effort was Crimewave (1985), a quirky, cartoon-like effort that failed to catch fire with audiences. However, he bounced back with Evil Dead II (1987), a racier and more humorous remake/sequel to the original \"Dead\" that did even better at the box office. Raimi was then given his biggest budget to date to shoot Darkman (1990), a comic book-style fantasy about a scarred avenger. The film did moderate business, but Raimi's strong visual style was evident throughout the film via inventive and startling camera work that caught the attention of numerous critics.\n\nThe third chapter in the Evil Dead story beckoned, and Raimi once again directed buddy Campbell as the gritty hero \"Ash\", in the Gothic horror Army of Darkness (1992). Raimi surprised fans when he took a turn away from the fantasy genre and directed Gene Hackman and Sharon Stone in the sexy western, The Quick and the Dead (1995); four years later, he took the directorial reins on A Simple Plan (1998), a crime thriller about stolen money, starring Bill Paxton and Bridget Fonda. In early 1999, he directed the baseball film, For Love of the Game (1999), and, in 2000, returned to the fantasy genre with a top-flight cast in The Gift (2000). In 2002, Raimi was given a real opportunity to demonstrate his dynamic visual style with the big-budget film adaptation of the Stan Lee comic book superhero, Spider-Man (2002), and fans were not disappointed. The movie was strong in both script and effects, and was a runaway success at the box office. Of course, Raimi returned for the sequel, Spider-Man 2 (2004), which surpassed the original in box-office takings.",
                        "Birth": "1959-10-23",
                        "Death": null
                    }
                ],
                "Genres": [
                    {
                        "_id": "605f99663065fb69139e9258",
                        "Name": "Horror",
                        "Description": "Should contain numerous consecutive scenes of characters effecting a terrifying and/or repugnant narrative throughout the title. Note: not to be confused with Thriller which is not usually based in fear or abhorrence. Subjective."
                    }
                ],
                "Actors": [],
                "_id": "605fe687036abe2b60c6e2af",
                "Title": "The Evil Dead",
                "Synopsis": "Five friends travel to a cabin in the woods, where they unknowingly release flesh-possessing demons.",
                "ImageURL": "/covers/the-evil-dead.jpg",
                "Featured": false,
                "Release": "1981"
            },
            {
                "Directors": [
                    {
                        "_id": "605fa677036abe2b60c6e29b",
                        "Name": "Sam Raimi",
                        "Bio": "Highly inventive U.S. film director/producer/writer/actor Sam Raimi first came to the attention of film fans with the savage, yet darkly humorous, low-budget horror film, The Evil Dead (1981). From his childhood, Raimi was a fan of the cinema and, before he was ten-years-old, he was out making movies with an 8mm camera. He was a devoted fan of The Three Stooges, so much of Raimi's film work in his teens, with good friends Bruce Campbell and Rob Tapert, was slapstick comedy based around what they had observed from \"Stooges\" movies.\n\nAmong the three of them, they wrote, directed, produced and edited a short horror movie titled Within the Woods (1978), which was then shown to prospective investors to raise the money necessary to film The Evil Dead (1981). It met with lukewarm interest in the U.S. with local distributors, so Raimi took the film to Europe, where it was much more warmly received. After it started gaining positive reviews and, more importantly, ticket sales upon its release in Europe, U.S. distributors showed renewed interest, and \"Evil Dead\" was eventually released stateside to strong box office returns. His next directorial effort was Crimewave (1985), a quirky, cartoon-like effort that failed to catch fire with audiences. However, he bounced back with Evil Dead II (1987), a racier and more humorous remake/sequel to the original \"Dead\" that did even better at the box office. Raimi was then given his biggest budget to date to shoot Darkman (1990), a comic book-style fantasy about a scarred avenger. The film did moderate business, but Raimi's strong visual style was evident throughout the film via inventive and startling camera work that caught the attention of numerous critics.\n\nThe third chapter in the Evil Dead story beckoned, and Raimi once again directed buddy Campbell as the gritty hero \"Ash\", in the Gothic horror Army of Darkness (1992). Raimi surprised fans when he took a turn away from the fantasy genre and directed Gene Hackman and Sharon Stone in the sexy western, The Quick and the Dead (1995); four years later, he took the directorial reins on A Simple Plan (1998), a crime thriller about stolen money, starring Bill Paxton and Bridget Fonda. In early 1999, he directed the baseball film, For Love of the Game (1999), and, in 2000, returned to the fantasy genre with a top-flight cast in The Gift (2000). In 2002, Raimi was given a real opportunity to demonstrate his dynamic visual style with the big-budget film adaptation of the Stan Lee comic book superhero, Spider-Man (2002), and fans were not disappointed. The movie was strong in both script and effects, and was a runaway success at the box office. Of course, Raimi returned for the sequel, Spider-Man 2 (2004), which surpassed the original in box-office takings.",
                        "Birth": "1959-10-23",
                        "Death": null
                    }
                ],
                "Genres": [
                    {
                        "_id": "605f8b194d3d4b1d9eac613c",
                        "Name": "Comedy",
                        "Description": "Virtually all scenes should contain characters participating in humorous or comedic experiences. The comedy can be exclusively for the viewer, at the expense of the characters in the title, or be shared with them. Please submit qualifying keywords to better describe the humor (i.e. spoof, parody, irony, slapstick, satire, black-comedy etc). If the title does not conform to the 'virtually all scenes' guideline then please do not add the comedy genre; instead, submit the same keyword variations described above to signify the comedic elements of the title. Subjective."
                    },
                    {
                        "_id": "605f99663065fb69139e9258",
                        "Name": "Horror",
                        "Description": "Should contain numerous consecutive scenes of characters effecting a terrifying and/or repugnant narrative throughout the title. Note: not to be confused with Thriller which is not usually based in fear or abhorrence. Subjective."
                    }
                ],
                "Actors": [],
                "_id": "605fe687036abe2b60c6e2b0",
                "Title": "Evil Dead II",
                "Synopsis": "The lone survivor of an onslaught of flesh-possessing spirits holes up in a cabin with a group of strangers while the demons continue their attack.",
                "ImageURL": "/covers/evil-dead-ii.jpg",
                "Featured": false,
                "Release": "1987"
            },
            {
                "Directors": [
                    {
                        "_id": "605fa677036abe2b60c6e29b",
                        "Name": "Sam Raimi",
                        "Bio": "Highly inventive U.S. film director/producer/writer/actor Sam Raimi first came to the attention of film fans with the savage, yet darkly humorous, low-budget horror film, The Evil Dead (1981). From his childhood, Raimi was a fan of the cinema and, before he was ten-years-old, he was out making movies with an 8mm camera. He was a devoted fan of The Three Stooges, so much of Raimi's film work in his teens, with good friends Bruce Campbell and Rob Tapert, was slapstick comedy based around what they had observed from \"Stooges\" movies.\n\nAmong the three of them, they wrote, directed, produced and edited a short horror movie titled Within the Woods (1978), which was then shown to prospective investors to raise the money necessary to film The Evil Dead (1981). It met with lukewarm interest in the U.S. with local distributors, so Raimi took the film to Europe, where it was much more warmly received. After it started gaining positive reviews and, more importantly, ticket sales upon its release in Europe, U.S. distributors showed renewed interest, and \"Evil Dead\" was eventually released stateside to strong box office returns. His next directorial effort was Crimewave (1985), a quirky, cartoon-like effort that failed to catch fire with audiences. However, he bounced back with Evil Dead II (1987), a racier and more humorous remake/sequel to the original \"Dead\" that did even better at the box office. Raimi was then given his biggest budget to date to shoot Darkman (1990), a comic book-style fantasy about a scarred avenger. The film did moderate business, but Raimi's strong visual style was evident throughout the film via inventive and startling camera work that caught the attention of numerous critics.\n\nThe third chapter in the Evil Dead story beckoned, and Raimi once again directed buddy Campbell as the gritty hero \"Ash\", in the Gothic horror Army of Darkness (1992). Raimi surprised fans when he took a turn away from the fantasy genre and directed Gene Hackman and Sharon Stone in the sexy western, The Quick and the Dead (1995); four years later, he took the directorial reins on A Simple Plan (1998), a crime thriller about stolen money, starring Bill Paxton and Bridget Fonda. In early 1999, he directed the baseball film, For Love of the Game (1999), and, in 2000, returned to the fantasy genre with a top-flight cast in The Gift (2000). In 2002, Raimi was given a real opportunity to demonstrate his dynamic visual style with the big-budget film adaptation of the Stan Lee comic book superhero, Spider-Man (2002), and fans were not disappointed. The movie was strong in both script and effects, and was a runaway success at the box office. Of course, Raimi returned for the sequel, Spider-Man 2 (2004), which surpassed the original in box-office takings.",
                        "Birth": "1959-10-23",
                        "Death": null
                    }
                ],
                "Genres": [
                    {
                        "_id": "605f8b194d3d4b1d9eac613c",
                        "Name": "Comedy",
                        "Description": "Virtually all scenes should contain characters participating in humorous or comedic experiences. The comedy can be exclusively for the viewer, at the expense of the characters in the title, or be shared with them. Please submit qualifying keywords to better describe the humor (i.e. spoof, parody, irony, slapstick, satire, black-comedy etc). If the title does not conform to the 'virtually all scenes' guideline then please do not add the comedy genre; instead, submit the same keyword variations described above to signify the comedic elements of the title. Subjective."
                    },
                    {
                        "_id": "605f99663065fb69139e9258",
                        "Name": "Horror",
                        "Description": "Should contain numerous consecutive scenes of characters effecting a terrifying and/or repugnant narrative throughout the title. Note: not to be confused with Thriller which is not usually based in fear or abhorrence. Subjective."
                    }
                ],
                "Actors": [],
                "_id": "605fb65b036abe2b60c6e2a5",
                "Title": "Army of Darkness",
                "Synopsis": "A sardonic hardware store clerk is accidentally transported to 1300 A.D., where he must retrieve the Necronomicon and battle an army of the dead so he can return home.",
                "ImageURL": "/covers/army-of-darkness.jpg",
                "Featured": true,
                "Release": "1992"
            }
        ],
        "_id": "605ff3e4036abe2b60c6e2b1",
        "Username": "user1",
        "Password": "user1pass",
        "Email": "user1@email.com",
        "Birthday": "1985-02-01T00:00:00.000Z"
    }
]
```

### PUT and POST User Response
```javascript
{
    "Favorites": [],
    "_id": "6068ac7f491759c2b0eb6329",
    "Username": "user6",
    "Password": "user6pass",
    "Email": "user6@email.com",
    "Birthday": "1985-02-01T00:00:00.000Z",
    "__v": 0
}
```

### String Responses

String responses will announce either the current issue or the success of your request. All requests are accompanied by a corresponding HTML status code.  

Example 1: user6 was deleted  
Example 2: Error: ValidationError: Email: (user6@email.com) is already registered  

## Users

POST to '/users' will create a new user  
PUT to '/users' will allow you to update user information  

### Expected JSON Format:

```javascript
{
    "Username": "user7",
    "Email": "user6@email.com",
    "Password": "user6pass",
    "Birthday": "1985-02-06"
}
```
POST to 'users/Favorites/push/:MovieID' will add movie to users favorites list  
POST to 'users/Favorites/pull/:MovieID' will remove movie from user favorites list  

## Movies

GET to '/movies' will return all movies  
GET to '/movies/:Title' will return movies by title  
GET to '/featured' will return featured movies  

## Directors

GET to '/directors' will return all directors  
GET to '/directors/:Name' will return directors by name

## Setup
* Verify Node is installed by typing ```node -v``` in your terminal.  
This should print the version number so you’ll see something like this ```v12.18.1```
  * If the command is unrecognized, download and install node from [nodjs.org](https://nodejs.org/en/download/)
* Install Expo Command Line  
```npm install expo-cli --global```

## To Install Clone

Open the terminal in the project folder and run
```npm install```

