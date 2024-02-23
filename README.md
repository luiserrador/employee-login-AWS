# Employee Facial Login
This project involves the implementation of an employee login system using facial recognition. 😄

The project was deployed via AWS, is running on a t2.micro EC2 instance and can be accessed via this [link](http://bit.ly/employee-login-ls). 🔗

The figure below shows how to add an employee to the database by uploading a picture of the employee and then logging in with a different picture of the same employee. 📷🔀👤
<p align=center>
 <img src='https://github.com/luiserrador/employee-login-AWS/blob/main/pics/gif_employee_login.gif' width=600>
</p>

## Architecture
The architecture of the project is shown in the following figure:
<p align=center>
 <img src='https://github.com/luiserrador/employee-login-AWS/blob/main/pics/architecture.png' width=600>
</p>

An API gateway, configured as a REST API, connects to the AWS services needed to add employee images to the database and authenticate the employee by searching for the person in the database. ✨

The employee registration is done by adding the image to an S3 bucket, which triggers a [Lambda Registration Function](https://github.com/luiserrador/employee-login-AWS/blob/main/lambda_functions/employee_registration.py) responsible for retrieving the person ID from the AWS Rekognition service and storing it in DynamoDB. 📷🔍

The authentication process is performed by a [Lambda Authentication Function](https://github.com/luiserrador/employee-login-AWS/blob/main/lambda_functions/employee_authentication.py) responsible for storing the visitor's image, retrieving the person ID from the Rekognition service, and then searching for the ID in the database. The authentication is successful if the person is registered as an employee in DynamoDB. ✅

The CI/CD process is also implemented using Docker and GitHub actions. A Docker container image is created and pushed to Amazon ECR. Then, the latest image is pulled to an Amazon EC2 instance running the application. GitHub Actions is responsible for automatically pulling the latest image to the EC2 instance. 🐳🚀

### TODO
* [ ] Add photo to database and authentication via camera;
* [ ] Improve frontend (I am not the best on frontend development);
* [ ] Separate access to add employee - it should not be in the same endpoint as authentication (it is just a demo).
