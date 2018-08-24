# Scale-API-Task-Generator

## Overview

The Scale-API-Task-Generator repository includes a script, sendRequests.js, that parses a CSV file and generates a request to the Scale API for 2D Object Annotation tasks.

## Dependencies

**1. Node.js**

**2. Scale API Client Library**

To install the client library, use the following command:
```
> npm install scaleapi --save
```

## Instructions for Use

**Notes Before Use**

You must replace ADD_API_KEY with your personal API key in the script on line 2.

Ensure that the relative file path on line 3 of the script is correct.

**To Run:**

To run the program, use the following command in the terminal:
```
> node sendRequests.js
```