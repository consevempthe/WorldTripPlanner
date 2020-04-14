# Inspection - Team *T03* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *RequestDistance.java and GreatCircleDistance.java* |
| Meeting | *Apr 13, 5pm, Microsoft Teams* |
| Checklist | *https://dev.to/smartyansh/code-review-checklist-for-java-beginners-181f, https://dzone.com/articles/java-code-review-checklist* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Ethan Liem | .6 hour |
| Brandon Vasquez  | .5 hour |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| RequestDistance.java:43,48 | code doesn't fit style| low | Ethan Liem | |
| GreatCircleDistance.java:13 | element never gets used consider deleting | low | Ethan Liem | |
| GreatCircleDistance.java:34 | vincenty formula could use some comments to understand how it works| medium | Ethan Liem | |
| GreatCircleDistance.java:42-47 | variables don't fit naming conventions | low | Ethan Liem | |
| RequestDistance.java:38 | build response is the same code as the getDistance function | medium | Ethan Liem | |
| GreatCircleDistance.java:23,27 | Redundant comments, consider removing | low | Axel Wahlstrom | rwahlst |
| GreatCircleDistance.java:General | Describe purpose of functions with comments, would benefit team communication | low | Axel Wahlstrom | rwahlst |
| RequestDistance.java:General  | Describe purpose of functions with comments | low | Axel Wahlstrom | rwahlst |
| GreatCircleDistance.java:General | class should be final if it is not being used for inheritance | low | Axel Wahlstrom | rwahlst |
| RequestDistance.java:43,48  | I think these methods may be unused | low | Brandon Vasquez | btvasque |
| GreatCircleDistance.java:General  | Could use a link to formula being used | low | Brandon Vasquez | btvasque |
| GreatCircleDistance.java:64| Line should be removed | low | Brandon Vasquez | btvasque |