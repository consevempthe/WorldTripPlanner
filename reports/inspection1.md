# Inspection - Team *T##* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Atlas.js* |
| Meeting | *Friday Apr 10, 4:00pm, Microsoft Teams* |
| Checklist | *https://www.evoketechnologies.com/blog/code-review-checklist-perform-effective-code-reviews/* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Ethan Liem | 1 hr |
| Moise Lacrete | 1 hr |
| Brandon Vasquez | .75 hr |
| Axel Wahlstrom | .75 hr |


### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Atlas.js:233 | Creating positions could use another function | low | Ethan Liem| consevempthe |
| Atlas.js:230 | Function is giving information to Distance that Distance already will have | low | Ethan Liem | consevempthe|
| Atlas.js:General | Create a proper naming convention for: places, distances, positions etc., currently very confusing because we are using multiple names for things | high | Ethan Liem | consevempthe |
| Atlas.js:170 | No way of stopping empty text in prompt, bad for keys | medium | Ethan Liem | consevempthe |
| Atlas.js:69 | function doesn't fit formatting | low | Ethan Liem | consevempthe |
| Atlas.js:194 | function is confusing and has multiple calls to other functions that make it hard to understand what it does | medium | Ethan Liem | consevempthe|
| Trip.js: | Title should use user-inputted trip name | low | Moise Lacrete | Moise98  |
| Atlas.js:166 | Map click -> cancel in name dialogue still creates marker + un-named place | low | Moise Lacrete | Moise98  |
| Atlas.js:169 | Could remove this comment as it is not necessary | low | Brandon Vasquez | btvasque | 
| Atlas.js:191 | Not sure if we should clear this array after adding a location | low | Brandon Vasquez | btvasque |
| Atlas.js:General| Check for duplicate "Place Names" before adding to point to array | medium | Brandon Vasquez | btvasque |
| Atlas.js:General | Better naming convention for functions. Some functions' names are very similar ie. addMarker() and addPointToArray() can be confused with eachother if you do not know their functionality | low | Axel Wahlstrom | rwahlst |
| Atlas.js:General | Better commenting habits. The group would benefit from more comments allowing another layer of communication in regards to the reasoning behind some programming techniques. | low | Axel Wahlstrom | rwahlst |
| Atlas.js:185 | Shortening this line would benefit readability and code-smells. | low | Axel Wahlstrom | rwahlst |
| Atlas.js:178 | Removing the prompt and adding a modal or something with a more pleasing UI for the end user | low | Axel Wahlstrom | rwahlst |