# Fullstack Development - GA Project 3

# Wandermore

## Technical Requirements

- Use MongoDB, Express, React and Node
- Have at least 2 related models (with references) and an additional user model with authentication. There should be at least 2 types of users.
- Include all major CRUD functions for at least one of the models
- Manage team contributions and collaboration by using standard Git flow on Github.
- Nicely styled front-end with clean & well-formatted CSS, with or without a framework.
- Deploy your application online, so that it is publically accessible
- User stories that apply to the functionality of your app, crafted as a team.
- Wireframes for the views you planned to create

## Timeframe

1 week (5 day sprint)

## Technologies & tools used

- Vite
- React / React Router
- Fetch for API
- Material UI
- Formik & Yup
- Express & Express Session
- MongoDB & Mongoose
- Morgan
- bcrypt
- dotenv
- Nodemon

## Wireframes

Coming soon.

## User Stories

Wandermore is a Travel app:

1. Customer can create account
2. Customer can log into their account
3. Customer can add "about you" info to personalise their profile, once added, they can update this info at any time.
4. Customer can view their login info and can change their password with authorization.
5. Customer can request for multiple Trips, specifying their preferences per a fixed form.
6. Customer can view a list of requested trip and cancel requested trip before they are processed by Admin. When under process, trip request will not appear on this list.
7. Admin can login and have access to additional dashboard.
8. Admin can select and create an itinerary for each trip request. Trip request is displayed on the admin dashboard.
9. Admin can create/update activities within the itinerary of the trip.
10. Customer will be able to view the processed trips and see detailed itinerary containing various activities.

## Development

This is a 2-man project, hence we will briefly share what each individual contributed to the project during the development stage.

1. Khai set up the initial client and server side structure and created repository on his Github and Cyclic account.
2. Once working, Nick was added as contributor.
3. Both worked on the agreed models(schemas) and controllers for express server.
4. Khai worked on the client side initialization, putting together the basic page layouts.
5. Nick worked on the session login process on the back end.
6. Khai added Material UI, created all UI related templates and created new Trip request page.
7. Nick added Formik and created About you, Login, Sign up and Login Maintenance pages.
8. Khai created Admin Dashboard page and add itinerary page, also created My Trips and Itinerary viewing page, now with Formik.
9. Nick converted new Trip request page using Formik and then worked to resolve the login session logic and made sure that the fetch to server side returned the correct data.
10. Khai worked to resolve the Admin side pages, ensuring fetch to server gave back the requested data including linked data via populate.
11. With basic MVP completed, both worked on the CSS for the app and some minor updates.

## Challenges

- Being the first major team project, it took some time for us to get used to managing Github merges together. Close communication and practice got us up and running without any major issues.
- Learning different frameworks separately and then sharing with each other took some additional time, but it helped us learn faster! (When one teaches, two learn. - Robert Heinlein)

## References

- Images from [Kinfolk](https://www.kinfolk.com/)