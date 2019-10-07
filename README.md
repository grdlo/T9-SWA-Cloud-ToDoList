# Project « To-Do-List »


### Introduction

The aim of this request of proposal (RFP) is to present the requirements for the to-do-list project.

### 1. Company description

EpiNuage is a French multinational company which sends basic cloud services to other companies.
It works in collaboration with the none so famous company Amazon with its solution AWS.

Founded in 2017 in the dynamic city of Nice, the company turnover is continually increasing since
its creation. To extend its bank of basic tools, the company needs to get a to-do-list. In this context,
the company looks for a motivated person which could realize this project.

### 2. Project context

The provider will have to provide a fully workable and manageable to-do-list software with the
capabilities to manage users and tasks with some administrator capabilities.

Furthermore, the customer would like to have a mobile application of the software in the future,
so you the provider need to implement a re-usable and “developer-friendly” backend.

It’s not a mandatory but the customer will really enjoy a mobile version of the software, the
provider is free to do it or not.

### 3. Requirements

The software must implement the following requirements and are organized in three categories:

- **REQ_DESIGN_XXX** design requirements,
- **REQ_FUNC_XXX** functional requirements,
- **REQ_IHM_XXX** IHM requirements,
- **REQ_DATA_XXX** data managing requirements.

#### a. Design requirements

- **REQ_DESIGN_010** You need to release at least two containers: one front, one back
- **REQ_DESIGN_020** You must expose a JSON Rest API on the back
- **REQ_DESIGN_030** You must, at least, respect the Level 2 of the Richardson maturity model
- **REQ_DESIGN_040** You must provide a functional and well-designed authentication system
- **REQ_DESIGN_050** You must choose between part NodeJS, python, Golang, php, java for the backend*
- **REQ_DESIGN_060** You must provide a framework choice) JavaScript^ based frontend (you are free on the JavaScript
- **REQ_DESIGN_070** You mustto stay stored, even after a relaunch of the containers)^ have a persistent storage for the users and the tasks (the data needs
- **REQ_DESIGN_080** You must provide a docworking “docker-compose up” command.ker-compose file (docker - compose.yml) with a fully
- **REQ_DESIGN_090** You must be able to manage two kinds of user: administrator and classic user
- **REQ_DESIGN_100** You must provide a fully tested project, on both part: back and front

#### b. Functional requirements

- **REQ_FUNC_010** You must be able to register / log-in on the software
- **REQ_FUNC_020** You must be able to add / delete / edit / list the tasks
- **REQ_FUNC_030** You must be able to pass a task done or undone it
- **REQ_FUNC_040** As administrator, you must be able to list all the users
- **REQ_FUNC_050** As administrator, you must be able to edit / remove / add / ban the users
- **REQ_FUNC_060** As administrator, you must be able to list all the tasks
- **REQ_FUNC_070** As administrator, you must be able to edit / remove / add the tasks
- **REQ_FUNC_080** A user (non-administrator) is not able to see the tasks of another user

#### c. IHM requirements

- **REQ_IHM_010** You must provide a login page (with email (or nickname) / password)
- **REQ_IHM_020** You must provide a tasks management page with these features:
  - add a task of the connected user
  - remove a task of the connected user
  - list all the tasks of the connected user
  - done a task of the connected user
  - undone a task of the connected user
  - filter the tasks (done / undone / all) of the connected user
  - edit a task of the connected user
- **REQ_IHM_030** You must provide an administrator a task management page with these features:
  - add a task for any user
  - remove a task for any user
  - list all the tasks for any user
  - done a task for any user
  - undone a task for any user
  - filter the tasks (done / undone / all) for any user
  - edit a task for any user
- **REQ_IHM_040** You must provide an administrator a user management page with these features:
  - add a user
  - remove a user
  - list all the users
  - ban / unban a user
- **REQ_IHM_050** The frontend part of the project the administrator panel) needs^ to be user-friendly and nice^ (even for

#### d. Data requirements

- **REQ_DATA_010** The users and tasks information need to be stored in a persistent database

### 4. Delivery conditions

The delivery package must contain the following documents:
- **Documentary :**
  - SAS (Software Architecture Specifications). This document must follow the template “Template – Software Architecture Specifications.docx” given by the company. It must contain an explanation of the provider understanding of the project, constraints and solutions proposed, global and detailed UML diagrams of the architecture proposition, and the state machine diagrams if needed.
  - SQS (Software Qualification Specifications). This document must follow the template ‘Template – Software Qualification Specifications.docx” given by the company. It must contain tests procedures to check the software. The document must also contain a traceability matrix which link the requirement id with the test id. The provider should write a first version of this document only from this request for proposal and before any work.
  - SQSA (Software Qualification Specifications Acceptance). This is the SQS document filled with results of the tests procedures.
- **Code and binaries :**
  - Code. In order to be fully compliant with our existent tools, the software must be packaged and released as docker containers. A docker-compose need to be released too (even if the release only contains one container) as the customer will just need to execute a “docker-compose up” in the project root for starting the project.
  - The customer will always use the last STABLE version of docker and docker-compose
  - Your repository name is: T-CLO-Todolist_$AcademicYear.
- **Tests :**
  - tests code.

### 5. Planning

The planning of this project consists of several deadlines, T0 is the beginning of the project:
Object Week
- Kick-Off T
- Follow-Up T0 + 4 weeks
- Follow-Up T0 + 7 weeks
- Delivery of the project T0 + 9 weeks
- Pitch T0 + 10 weeks

### 6. Evolutions

This is not mandatory, but the company will appreciate if the provider go further this project,
adding functionalities which make the project more complex. Example: the mobile application as said
earlier in the document.
