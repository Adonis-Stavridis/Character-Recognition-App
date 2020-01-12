# Character Recognition Application

----

This a website where you can draw characters and the application will try to recognize your character based on a model font.

It was built using **JavaScript**, **HTML5** and **CSS3**.

Direct link to the website: https://adonis-stavridis.github.io/Character-Recognition-App/

----

### Overview

Here is a quick overview of the main pages of the website.

>**Home Page**: from this page you can access the main application page.<br><br>
![Where did my picture go?](https://raw.githubusercontent.com/Adonis-Stavridis/Character-Recognition-App/master/imgs/home.png "Home Page")

>**Drawing Page**: here you can draw your character on the canvas on the left, change your character type (letter or number), clear the canvas and let the application recognize your character.<br><br>
![Where did my picture go?](https://raw.githubusercontent.com/Adonis-Stavridis/Character-Recognition-App/master/imgs/app.png "Drawing Page")

>**Results Page**: on this page you will find the results of the search. The application will indicate the most probable character in gold/yellow color, other possible characters in green and least probable characters in black. You can store the result in gold in a string if you would like to write a word for example and finally go back to the previous to draw another character.<br><br>
![Where did my picture go?](https://raw.githubusercontent.com/Adonis-Stavridis/Character-Recognition-App/master/imgs/results.png "Results Page")

### Font Model

If you would like to understand what the model font is, you can look up the **/javascript/lettres.js** and **/javascript/chiffres.js** files for the respective fonts the letters and the numbers.

The font is basically a 2D grid of booleans or pixels, that are true (1) if colored or false (0) if not.
