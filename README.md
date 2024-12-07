# GamingFever - Laboratory 4

This project, **Gaming Fever**, was developed as part of the **Laboratory 4** course at **Universidad Tecnológica Nacional (UTN)**. It is a web-based application designed to measure the cognitive and motor skills of players through interactive games. The project is hosted online and integrates Firebase for authentication, data storage, and real-time functionality.

## Live Demo

You can access the deployed application here:

[Game Room - Live Demo](https://tp-labo-iv-marian-aquino.web.app/home)

## Overview

**GamingFever** is a collection of games designed with a focus on user experience and engagement. The application supports login and registration, tracks user statistics, and includes unique features such as a chat room and a player leaderboard.

### Games Included:
1. **Ahorcado**: Guess the word by selecting letters from on-screen buttons.
2. **Mayor o Menor**: Predict if the next card in the deck is higher or lower.
3. **Preguntados**: Answer multiple-choice questions with images fetched from an external API.
4. **Custom Game**: 
   - **Name the Metallica Song**: A music-based game where players listen to Metallica songs and select the correct title from the given options.

### Additional Features:
- **User Registration and Login**: Only registered users can access the games and chat. Login details are validated and logged in Firebase.
- **Chat Room**: A real-time chat feature available for logged-in users.
- **Survey**: Collects user feedback with validation and stores responses in Firebase. Includes fields like age, phone number, and various input controls (textboxes, checkboxes, radiobuttons).
- **Admin Features**: An admin-only section displays survey responses, protected by CanActivate and Guard.

## Technologies Used

- **Frontend**: Angular with PrimeNG, Angular Material, and Bootstrap for styling and animations.
- **Backend**: Firebase for authentication, real-time database, and API integration.
- **Hosting**: Deployed using Firebase Hosting.

## How to Use

1. **Visit the Live Demo**: Use the link above to access the application.
2. **Register or Login**: Create a new account or log in with a pre-registered user.
3. **Explore the Features**:
   - Access different games from the home screen.
   - Join the chat room to interact with other users.
   - Complete the survey to provide feedback.
   - View your game performance in the results section.
4. **Admin Access**: Admin users can view survey responses in a dedicated section.

## Documentation

The repository includes detailed documentation of the project and its features:
- **Project Documentation**: Explains the overall structure and functionality.
- **Game Details**: Each game, including "Name the Metallica Song," is documented in the "Who Am I" section of the app.

## Requirements

To run the project locally or understand its features:
- **Node.js**: To set up and serve the Angular project.
- **Firebase Account**: To connect to the real-time database and hosting.
- **Browser**: A modern browser to access the deployed app.

## Contributors

This project was created by **Marian Aquino** and developed as part of the Laboratory 4 course at UTN.

## License

This project is intended for educational purposes as a university assignment. It is not for commercial use.

<div style="text-align:center">
  <img src="./UTN_logo.png" alt="UTN Logo" width="450"/>
</div>
