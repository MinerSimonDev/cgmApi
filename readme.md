# CGM (continous glucose monitoring) api
The CGM API (Continuous Glucose Monitoring Application Programming Interface) is a vital resource for developers in the healthcare technology field. This API serves as a connector between continuous glucose monitoring devices and software applications, enabling seamless integration of real-time glucose data into healthcare and diabetes management solutions.

## Possible features
**Smart Home Integration**: 
» Easily incorporate real-time glucose data into smart home environments.

**Enhanced Diabetes Management**: 
» Empower users to monitor blood sugar levels seamlessly from their smart devices.

**Home Automation**: 
» Trigger automated responses based on glucose readings, such as adjusting lighting, thermostats, or sending alerts.

**Health Insights Dashboard**: 
» Create a smart home health dashboard to display glucose data alongside other vital information.

**Personalized Alerts**: 
» Customize alerts for glucose levels, ensuring timely notifications for individuals or caregivers.

## Installation / Setup
» Run this app via NodeJS (version 16.13.1) and pm2 on your apache webserver.
» Lookup the ip adress (hostname -l) and visit the webserver ip adress:3000 in your browser (Example: 192.168.1.36:3000)
» Enable cloud upload in xDrip+ and activate the restfulAPI upload. Write "http://minersimon@yourwebserveripadress:3000/api/v1"
» Raw data available at api/v1/currentBloodSugar/raw

## Contact
For inquiries or support, contact me on discord (username: minersimon)

## Version
1.1 beta - december 10th, 2023
