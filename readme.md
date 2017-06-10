Frontend - HTML/CSS/JS
The site is hosted on github-pages using Jekyll.
Database - Firebase

I chose Github-pages since it is the most reliable and secure free hosting service I have come across.

Ideally, the FireBase calls should have been made from the server using NodeJS/PHP, but github-pages doesn't support either of them.

Input Validation and sanity is done by adding rules in Firebase. Therefore, client can enter any number of special symbols without any risk of being vulnerable to XSS/Injections.

data/contacts.json - This is the input file for contacts
assets/js/abi.js - Business logic is handled entirely by this file

I was unable to implement the actual SMS sending part since I have already used up my free trial on Twilio from both of my contact numbers. 
Currently, when an SMS is sent, the log is stored in FireBase. This is then fetched and displayed n descending order of timestamp.
