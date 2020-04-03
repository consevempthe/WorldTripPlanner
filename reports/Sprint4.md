# Sprint 4 - *T03* - *Hugh-Lit Pack-Herd*

## Goal: Optimize the trip!
### Sprint Leader: *Moise Lacrete*


## Definition of Done

* The version in `server/pom.xml` is `<version>4.0</version>`.
* The Product Increment release for `v4.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and restrospective are captured below.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio <= 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 60%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
### Bugfix, Cleanup, Add Tests
    We will continue to increase code coverage due to the increased requirement by 
    dedicating initial development time to write more tests for our Distance and
    Trip components. A few rather trivial bugs surfaced during our increment 
    demonstration which we will also be addressing so that we have a clean, reliable
    and stable foundation to begin our efforts towards delivering a more optimized trip
    planning experience.
### Modify Itinerary
    The implementation of this epic will provide the user the ability to perform a variety
    of modifications to the displayed list of destinations they create. These modifications
    include re-ordering the destinations in the list, choosing a new start destination, and
    reversing the order of the destinaitons in their trip. This epic will also grant the 
    user the ability to store their trip between sessions by the use of browser cookies.
### Save
    The Save epic includes providing the user an easy way of saving their itinerary to a 
    JSON formatted file, of saving their map to an SVG or KML file.
### Protocol Version 4
    This epic will add an optimization peoperty to config and trip which will be used to provide the
    user an option to optimize the creation of their trip. This should effectively allow the user to
    create a trip with the shortest possible distance traveled.
### Optimize
    This epic focusses on implementation of various optimization techniques, varying in complexity 
    and accuracy at the cost of execution time. Multiple approaches to the travelling salesman problem
    must be taken to ensure the user gets appropriate level of optimization of their trip depending
    on how much time they allow the optimization process to run. More attention will be taken towards 
    choosing the best data structures wherever possible to increase efficiency across the board.
### Modify Destinations
    The completion of this epic will allow the user to edit attributes of individual places in their 
    trip. This will provide customization and allow the user to more closely tailor the application's 
    usage to their needs.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *6* | *count* |
| Tasks |  *21*   | *count* | 
| Story Points |  *29*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *04/01/2020* | *257* | *263, 256, 255, 264* |  | 
| *04/03/2020* | *264* | *263, 256, 255, 270* |  |


## Review

### Epics done  

### Epics not done 

### What went well

### Problems encountered and resolutions


## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
