#Wallets

Small web-application.

## Deploy

The project contains a ready for use `gulp-webserver`.
Just do:

```
git clone https://github.com/NikitaBonachev/wallets.git
cd wallets
npm install
bower install
gulp dev
```
Then visit [http://localhost:8000/index.html#/users](http://localhost:8000/index.html#/users).

Unfortunately, after `gulp dev` at first time you may see a crush. Please, repeat `gulp dev`.

Also, you can use this application at [GitHub Pages](https://nikitabonachev.github.io/wallets/#/users). 
 
##What I've used
 - [Angular 1.5](https://angularjs.org/)
 - [Semantic UI](http://semantic-ui.com/)
 - [Moment.js](https://momentjs.com/)
 
##Browser support
 I have tested on following desktop latest versions: 
 - Google Chrome (Mac and Windows)
 - Opera (Mac and Windows)
 - Mozilla Firefox (Mac and Windows)
 - Safari (small problem with margin at the button)
 - IE 11 (small problem with padding in the last cell at user-list)
 
##Testing
 
 Only manual testing (check-list). I know, that better do a unit-testing, but I didn't implement it.
 
## My mark 6/10
 
 Why not 10:
 
 * Crush after first time `gulp dev`.
 * Small problems in Safari and IE 11.
 * Bug with range date picker at transaction list (incorrect dates).
 * No unit-tests