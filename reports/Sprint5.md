# Sprint 5 - *t03* - *Hugh-Lit Pack-Herd*

## Goal: Finding more places to go!
### Sprint Leader: *Ethan Liem*


## Definition of Done

* The version in `server/pom.xml` is `<version>5.0</version>`.
* The Product Increment release for `v5.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and retrospective are captured below.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).
* No more modals...

### Clean Code
* Code Climate maintainability of A (technical debt ratio <= 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 70%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.
* Commits are done incrementally to development standards and work is done on a weekly basis
* After a task has been completed, that person will check out another task to show what they will be working on.


## Planned Epics
#### 1. Finish Modify Itinerary and Bug Fixing
    * Finish Modify Itinerary:
        - Allow the user to reorder each place in the table itinerary.
    * Remove bugs that were hindering cVWour User Experience:
        - Fixing a dateline wrapping issue with long distances that should wrap the other direction.
        - Fixing a NaN problem when a place is added to the table.
        - Showing the final polyline from the final place back to the start.
    * Improve initial testing to 70% before we add any additional code.
#### 2. Finish Optimize
    * Complete "Some" and allow the server to compute optimal distances using multiple starting points:
        - This includes creating functions to find round trip distance and a way to find the shortest 
          destination out of a place.
    * Implement "Improvements":
        - We are opting to just add 2-OPT to our improvement optimization and are disregarded 3-OPT in
          order to work on other epics.
    * Putting it all together:
        - Once we have implemented 2-OPT and "some" we will make it so they work with our slider to allow
          the user to choose the between the fastest and the best option.
#### 3. Protocol Version 5
    * Updating our config schema so that it has the new request types
    * Find creation:
        - Creating RequestFind.java and adding the post to the restfulAPIs
        - Adding the additional schema for the Find request
    * Updating our UI config to show off new requests and optimizations
#### 4. Find
    * Server Side implementation
        - Our team will work to understand the database SQL and create the serverside functions necessary to
          allow for requests to be sent, validated, and returned.
    * Client Side implementation
        - We will be adding a new search bar UI above our map with added buttons to configure search queries
        - Adding a list of destinations to choose from that the user will be able to add to their trip
#### 5. Itinerary Search
    * Creating a search bar that appears only when the table exists
        - This will move the view to that table entry and highlight the information searched for.
## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *count* |
| Tasks |  *20*   | *count* | 
| Story Points |  *26*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 


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