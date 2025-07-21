import * as Yup from 'yup';
// export const loginSchema = Yup.object({
//     email: Yup.string().email('Invalid email format').required('Email is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   });

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is requried !'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(8, 'Password must be at least 8 characters')
    .required('Password is required !'),
});

const phoneRegExp =
  /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;

export const SignupSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is requried !'),
  // contact: Yup.string()
  //   .matches(phoneRegExp, 'Phone number is not valid')
  //   .matches(/^\d+$/, 'Mobile number must contain only digits')
  //   .min(10, 'Mobile number must be at least 10 digits')
  //   .max(15, 'Mobile number cannot exceed 15 digits')
  //   .required('Mobile number is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(8, 'Password must be at least 8 characters')
    .required('Password is required !'),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('Required'),

  // country: Yup.string()
  //   .required('Country is required'),

  // state: Yup.string().required('State is required'),

  // city: Yup.string().required('City is required'),

  // zipCode: Yup.string()
  //   .matches(/^[0-9A-Za-z -]{4,10}$/, 'Invalid ZIP code')
  //   .required('ZIP Code is required'),

  // address: Yup.string()
  //   .min(5, 'Address is too short')
  //   .max(255, 'Address is too long')
  //   .required('Address is required'),
  // modal: Yup.boolean().required('Car number is required'),
  // number: Yup.boolean().required('Car number is required'),
  // seat: Yup.bool().required('Seat is required'),
  // category: Yup.string().required('Category is Requried'),
  // image: Yup.object().required('Image of car is required'),
});

export const forgotpasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is requried !'),
});

export const forgotpassword = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(8, 'Password must be at least 8 characters')
    .required('Password is required !'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Currrent Password is Requried'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'New password is must be 8 charcters long')
    .max(8, 'New password is must be 8 charcters long'),
  confirmNewPassword: Yup.string()
    .required('Confirm password is requried')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

export const editProfileSchema = Yup.object({
  userName: Yup.string(),
  email: Yup.string(),
  phoneNumber: Yup.number(),
});
const currentYear = new Date().getFullYear();

export const addYourCarSchema = Yup.object({
  carName: Yup.string().required('Car name is required!'),
  carModel: Yup.string().required('Car model is required!'),
  carNumber: Yup.mixed().required('Car number  is required!'),
  carNumber: Yup.string().required('Car name is required!'),
  year: Yup.number()
    .required('Car year is required')
    .min(currentYear - 15, `Car must not be older than 15 years`)
    .max(currentYear, 'Car year cannot be in the future'),
  capacity: Yup.number().required('Capacity is required!'),
  registration: Yup.object().required('registration image is required!'),
  image: Yup.object().required('Car image is required!'),
});
