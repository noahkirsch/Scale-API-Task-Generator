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

1. You must replace ADD_API_KEY with your personal API key in sendRequests.js on line 2.

2. Ensure that the relative file path on line 3 of sendRequests.js is correct.

3. This script assumes the CSV provided has the following data for each request, and will not run any requests with incomplete data.
```
callback_url
attachment
attachment_type
objects_to_annotate
instruction
with_labels
 ```

**To Run:**

To run the program, use the following command in the terminal:
```
> node sendRequests.js
```