# Sprint 4 - *T03* - *Hugh-Lit Pack-Herd*

## Goal: Optimize the trip!
### Sprint Leader: *Brandon Vasquez*


## Definition of Done

* The version in `server/pom.xml` is `<version>4.0</version>`.
* The Product Increment release for `v4.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and retrospective are captured below.


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
| *04/06/2020* | *256, 270* | *263, 255, 269* |  |
| *04/08/2020* | *263, 269* | *255, 272, 273, 267, 260* |  |
| *04/10/2020* | *272, 273* | *255, 268, 298, 299, 267, 260* | *Lost teammate* |
| *04/13/2020* | *255, 260, 267, 268* | *298, 299, 261, 297* | |
| *04/15/2020* | *261, 254, 262, 275, 308* | *317, 277, 276, 313* | |


## Review

### Epics done 
* **Bugfix, Cleanup, Add Tests**: We increased our testing from 58% to 64% by adding tests to client and server and retained our "A" grade on codeClimate by fixing as many code smells as possible. Since we both acquired a teammate and lost a teammate. We updated our website to reflect that. 
* **Save**: We changed our "load file" button to a modal that allows the user to either load or save a file. allowing users to save the files in various formats.
* **Protocol Version 4**: We tested the server side of api by making sure that our distance and trip requests were doing what they should be doing. We updated our protocol to allow for optimizations in trip.

### Epics not done 
* **Modify Itinerary**:
    * What got finished: We were able implement to functionality to allow the user to change the start position, delete positions from the table, and reverse the trip. With each updating the elements in both the table and the map.
    * What we didn't finish: We were not able to finish allowing the user to reorder the list.
* **Optimize**:
    * Finished: We were able to get Nearest Neighbor to work for one solution.
    * Not Finished: We did not implement the "Some" variation of NN or the Improvement option.
* **Modify Destinations**:
    * We shelved this epic due to losing a teammate.

### What went well
* For only effectively having three people on our team, we believe we successfully completed as much of this sprint as we could.
* We adjusted to meeting online a more this sprint and have implemented using Microsoft Teams as a way to have daily scrums.
* Our team has a better understanding of manipulating arrays in state and how to write tests and provide proper coverage of our API, which we learned extensively during this sprint as we increased our test coverage and as we worked on our Modify itinerary epic.

### Problems encountered and resolutions
* We had issues a slow start to this sprint with multiple teammates not doing any work in the first week of the sprint.
    * Our resolution as a team is to keep each other more accountable and to work incrementally for the next sprint.
* We had problems with a teammate not working on anything during the sprint, then had that teammate leave.
    * We had to meeting to decide what we should and shouldn't tackle and adjusted our plans by ice-boxing certain Epics that we were working on so that we could focus on attaining other epics.
    * We divided the work as best we could and had more meetings in our last week of development to compensate for the lack of manpower.
    * Since this teammate was our sprint leader, we choose a new sprint leader to run our test and divided up what the sprint leader normally does.


## Retrospective

### What we changed this sprint
* Our biggest change was using microsoft teams to not just do daily scrums, but also work and code with each other during the sprint. This fulfilled one our goals of having more communication.
* We also became more strict on making sure our commits and merges were fitting our code climate goals and have made sure to add test for additional components created.

### What went well
* Overall this sprint was our worst performance in terms of accomplishing epics. So the work that we were able to do and the quality of UI design that went with it still held up to our standards.

### Potential improvements
* The biggest improvement we can make is making sure that we can keep each other more accountable to actually start tasks and incrementally develop. This would assure we will actually get more done even in extreme circumstances.
* Finding a way to optimize our meetings so that we cover what needs to be covered instead of just talking about whatever comes to mind.
### What we will change next time
* We will plan out more of what needs to be talked about for our meetings.
* We will focus on individual performances each week to make sure that each person is providing their share of the work.

