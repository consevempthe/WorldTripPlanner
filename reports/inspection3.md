# Inspection - Team *T03* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Trip.js* |
| Meeting | *4/27/20, 5:30pm, Microsoft Teams* |
| Checklist | *https://www.evoketechnologies.com/blog/code-review-checklist-perform-effective-code-reviews/* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Ethan Liem | 30 minutes |
| Brandon Vasquez | 30 minutes |
| Axel Wahlstrom | 30 minutes |
| Winter Meng | 30 minutes |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Trip.js:248 | reset trip should reset the entire state| low | Ethan Liem | |
| Trip.js:204 | addPlace should check for that 'place' is good info | medium | Ethan Liem | |
| Trip.js:229,234 | the logic on the if statements is backwards, "up" really means going farther back in the list. | medium | Brandon Vasquez | btvasque |
| Trip.js:217 | delete place could probably use the array.filter method instead of spliceing and replacing the array. | medium | Brandon Vasquez | btvasque |
| Trip.js:148 | we may consider using something other than an alert here, when using our application, if the alert is ever removed from the page once, it will take a page refresh to get it back | low | Brandon Vasquez | btvasque |
| Trip.js:106 | &#x2B06 Unicode Hex Character should be stored in a constant somewhere for readability. |  low | Axel Wahlstrom | rwahlst |
| Trip.js:110 | &times; could also benefit being stored in a constant for readability. | low | Axel Wahlstrom | rwahlst |
| Trips.js:252 | setOptimization could use a few comment blocks indicating pending tasks such as to-do optimization plans. | low | Winter Meng | qm3  |
|  | | | | |
|  | | | | |
|  | | | | |
