import React from 'react';

// import { useDispatch } from 'react-redux';
// import storage from './StorageService';
// import { setMessage } from '../store/SnackbarMessage';
// import { signoutUser } from '../store/User';

const versionCode = "1";


// const getToken = async function () => {
//   return new Promise((resolve, reject) => {
//     storage
//       .getKeyData('userAuth')
//       .then(data => {
//         if (typeof data == "string")
//           data = JSON.parse(data);
//         console.log(data['token']);
//         //        console.log(data['token']);
//         if (data && data['token']) {
//           resolve(data['token']);
//         } else resolve('');
//       })
//       .catch(err => resolve(''));
//   });
// };
const BASE_URL = "https://api.ascendehr.com/";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxIiwiUm9sZUlEIjoiMSIsIlVzZXJOYW1lIjoiYXNjZW5kQWRtaW4iLCJPcmdhbml6YXRpb25JRCI6IjEiLCJTdGFmZklEIjoiMSIsIkxvY2F0aW9uSUQiOiIxIiwiRG9tYWluTmFtZSI6ImFzY2VuZCIsIkNvdW50cnlDb2RlIjoiVVMiLCJzdWIiOiJhc2NlbmRBZG1pbiIsImp0aSI6IjNkMjQ2YmZlLWViYjAtNGJjNC04YTJjLTk4NjQ1YWNhNDJlZiIsImlhdCI6MTY5NDcxMTY5MywiSGVhbHRoQ2FyZSI6IklBbUF1dGhvcml6ZWQiLCJuYmYiOjE2OTQ3MTE2OTIsImV4cCI6MjIwODkyMjE5OSwiaXNzIjoiU3VwZXJBd2Vzb21lVG9rZW5TZXJ2ZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxMjY5LyIsInJvbGVzIjpbIkFkbWluIl19.jYNCQ6_e8BoQq5rBevd6uHA4Fh188ORfguHMDaMc4dI";

const api = {
  getMasterData: async function () {
    console.log("loading master data");
    const result = await fetch(BASE_URL + '/api/MasterData/MasterDataByName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        masterdata:
          "masterStaff,masterLocation,MASTERROLES,masterCountry,masterGender,masterDegree,MASTERTAGSFORSTAFF,MASTERPROOFS,MASTERRACE,MASTERETHNICITY,MASTERNATIONALITIES,MASTERPHONEPREFERENCES,PHONETYPE"
      }),
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    console.log('getMasterData loaded');
    return result;
  },
  getMRN: async function () {
    const result = await fetch(BASE_URL + '/Patients/GetPatientUniqueMRN', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    console.log('getMRN', result);
    return result;

  },
  getPrepaidFee: async function () {
    const result = await fetch(BASE_URL + '/api/MasterServiceCodes/GetPrepaidFee?servicecodeId=7683', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    console.log('getMRN', result);
    return result;

  },
  checkSecurityQuestions: async function (obj) {
    console.log("checkSecurityQuestions token ", obj);

    const result = await fetch(BASE_URL + 'Login/CheckQuestionAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'businessToken': 'OuR9LHZot8QPPr58owsMFw=='
      },
      body: JSON.stringify(obj),
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('loginPatient', result);
    return result;


  },
  saveSecurityQuestions: async function (obj) {
    console.log("security token ", obj);

    const result = await fetch(BASE_URL + 'Login/SaveUserSecurityQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'businessToken': 'OuR9LHZot8QPPr58owsMFw=='
      },
      body: JSON.stringify(obj),
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('loginPatient', result);
    return result;


  },
  loginPatient: async function (obj) {
    console.log("PatientLogin ", obj);
    const result = await fetch(BASE_URL + '/Login/PatientLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'businessToken': 'OuR9LHZot8QPPr58owsMFw=='
      },
      body: JSON.stringify(obj),
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('loginPatient', result);
    return result;

  },
  resetPassword: async function (obj) {
    console.log("reset password ", obj);
    const result = await fetch(BASE_URL + 'ForgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'businessToken': `OuR9LHZot8QPPr58owsMFw==`,
      },
      body: JSON.stringify(obj),
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('registerPatient', result);
    return result;

  },

  registerPatient: async function (obj) {
    console.log("register patient ", obj);
    const result = await fetch(BASE_URL + '/Patients/CreateUpdatePatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(obj),
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('registerPatient', result);
    return result;

  },
  verifyCode: async function (obj) {
    console.log("register patient ", obj);
    const result = await fetch(BASE_URL + `/Patients/VerifyCodeForPatientReg?patientId=${obj.patientId}&verifyCode=${obj.code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('verifyCode', result);
    return result;

  },
  availableDoctors: async function (obj) {
    console.log("availableDoctors ", obj);
    const result = await fetch(BASE_URL + `Staffs/GetStaffsAvailability`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('availableDoctors', result);
    return result;

  },
  findDoctor: async function (obj) {
    console.log("findDoctor ", obj);
    const result = await fetch(BASE_URL + `Staffs/GetAllStaffs?pageNumber=${obj.pageNumber ? obj.pageNumber : 1}&pageSize=${obj.pageSize ? obj.pageSize : 10}&sortColumn=&sortOrder=&searchText=${obj.search ? obj.search : ''}${obj.query ? obj.query : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('findDoctor', result);
    return result;

  },
  getDoctorAvailability: async function (obj) {
    console.log("getDoctorAvailability api");
    const result = await fetch(BASE_URL + `AvailabilityTemplates/GetStaffAvailabilityWithLocation?staffId=${obj.id}&locationId=1&isLeaveNeeded=false`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getDoctorAvailability res', result);
    return result;
  },
  getDoctorDetails: async function (obj) {
    console.log("getDoctorDetails api");
    const result = await fetch(BASE_URL + `Staffs/GetStaffById?id=${obj.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('getDoctorDetails error => ', err));
    //console.log('getDoctorDetails res', result);
    return result;
  },
  applyPayment: async function (obj) {
    console.log("applyPayment api");
    const result = await fetch(BASE_URL + `api/Payment/ApplyPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('saveAppointment res', result);
    return result;
  },
  saveAppointment: async function (obj) {
    console.log("saveAppointment api");
    const result = await fetch(BASE_URL + `api/PatientAppointments/SavePatientAppointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('saveAppointment res', result);
    return result;
  },
  getAppointmentTypes: async function () {
    console.log("getAppointmentTypes api");
    const result = await fetch(BASE_URL + `api/PatientAppointments/GetDataForSchedulerByPatient`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getAppointmentTypes res', result);
    return result;
  },

  getDepartment: async function () {
    console.log("getDepartment api");
    const result = await fetch(BASE_URL + `Room/GetDepartment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    // console.log('getDepartment res', result);
    return result;
  },
  getUserToken: async function (obj) {
    console.log("getUserToken ", obj);
    const result = await fetch(BASE_URL + `GetUserByToken`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obj.token}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getUserToken', result);
    return result;

  },
  getPatientDashboard: async function (obj) {
    console.log("getPatientDashboard ", obj);
    const result = await fetch(BASE_URL + `AdminDashboard/GetPatientDashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obj.token}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getPatientDashboard', result);
    return result;
  },
  getPatientAppointments: async function (obj) {
    console.log("getPatientAppointments ", obj, BASE_URL + `api/PatientAppointments/GetPatientAppointmentList?fromDate=${obj.fromDate}&locationIds=${obj.locationIds}&patientIds=${obj.patientIds}`);
    const result = await fetch(BASE_URL + `api/PatientAppointments/GetPatientAppointmentList?fromDate=${obj.fromDate}&locationIds=${obj.locationIds}&patientIds=${obj.patientIds}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obj.token}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getPatientAppointments', result);
    return result;
  },
  getPatientMedicalHistory: async function (obj) {
    console.log("getPatientMedicalHistory ", obj);
    const result = await fetch(BASE_URL + `PatientMedicalFamilyHistory/GetPatientMedicalFamilyHistoryById?patientID=${obj.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obj.token}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getPatientDetails', result);
    return result;
  },
  getPatientAllergies: async function (obj) {
    console.log("getPatientAllergies ", obj);
    const result = await fetch(BASE_URL + `PatientsAllergy/GetAllergies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obj.token}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getPatientDetails', result);
    return result;
  },
  getPatientLabOrders: async function (obj) {
    console.log("getPatientLabOrders ", obj);
    const result = await fetch(BASE_URL + `PatientsLabOrder/GetAllLabOrders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obj.token}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getPatientDetails', result);
    return result;
  },
  getPatientDetails: async function (obj) {
    console.log("getPatientDetails ", obj);
    const result = await fetch(BASE_URL + `Patients/GetPatientsDetails?id=${obj.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obj.token}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getPatientDetails', result);
    return result;
  },
  getPatientLedger: async function (obj) {
    console.log("getPatientLedger ", obj);
    const result = await fetch(BASE_URL + `Claim/GetClaimsForPatientLedger?pageNumber=${obj.pageNumber}&pageSize=${obj.pageSize}&patientId=${obj.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obj.token}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log('error => ', err));
    //console.log('getPatientLedger', result);
    return result;
  }

};
export default api;
