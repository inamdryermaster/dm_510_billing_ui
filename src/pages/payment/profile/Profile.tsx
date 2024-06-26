import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
} from '@mui/material';
import styled from '@emotion/styled';
import NavigatePages from '../components/NavigatePages';
import {
  setShowPackage,
  updateState,
} from '../../../lib/redux/features/payment/paymentSlice';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import * as Yup from 'yup';
import CountryComponent from './components/CountryComponent';

// TypeScript definitions
interface FormValues {
  email: string;
  phone: string;
  apartment?: string;
  building?: string;
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
}
type FormValueKey = keyof FormValues;

// Form validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .test('isValidPhoneNumber', 'Phone number is not valid', (value) => {
      if (!value || value === '+') return false; // Ensure the value is not empty or only a '+'
      try {
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber ? phoneNumber.isValid() : false;
      } catch {
        return false;
      }
    }),
  building: Yup.string().required('Building is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  province: Yup.string().required('Province is required'),
  postalCode: Yup.string().required('Postal code is required'),
});

// Profile component
const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    showProfile,
    email,
    phone,
    apartment,
    building,
    street,
    city,
    province,
    country,
    postalCode,
  } = useSelector((state: any) => state.payment);

  // Handle change function
  const handleChange = (key: FormValueKey, value: any) => {
    dispatch(updateState({ key, value }));
  };

  // handle submit function
  const handleSubmit = (
    _values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    dispatch(setShowPackage());
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (!showProfile) {
      navigate('/package');
    }
  }, [showProfile]);

  return (
    <Wrapper>
      <NavigatePages />
      <CardWrapper variant="outlined">
        <Formik
          initialValues={{
            email,
            phone,
            apartment,
            building,
            street,
            city,
            province,
            country,
            postalCode,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => {
            return (
              <Form>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Profile
                  </Typography>
                  {/*  ============Email========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    helperText={<ErrorMessage name="email" />}
                    placeholder="Enter your email"
                    margin="normal"
                    variant="outlined"
                    error={touched.email && Boolean(errors.email)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('email', e.target.value);
                      handleChange('email', e.target.value);
                    }}
                  />
                  {/*  ============Phone========== */}
                  <FormControl
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={touched.phone && Boolean(errors.phone)}
                  >
                    <PhoneInputWrapper
                      hasError={
                        touched.phone && Boolean(errors.phone) ? true : false
                      }
                    >
                      <PhoneInput
                        international
                        defaultCountry="US"
                        placeholder="Enter phone number"
                        id="phone"
                        name="phone"
                        // @ts-ignore
                        value={values.phone}
                        onChange={(value) => {
                          setFieldValue('phone', value);
                          handleChange('phone', value);
                        }}
                        style={{ width: '100%' }}
                      />
                    </PhoneInputWrapper>
                    <FormHelperText>
                      {touched.phone && errors.phone
                        ? errors.phone
                        : 'Enter your phone number in international format (e.g., +12345678900)'}
                    </FormHelperText>
                  </FormControl>

                  {/*  ============Apartment========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="apartment"
                    name="apartment"
                    label="Apartment"
                    placeholder="Enter your apartment"
                    margin="normal"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('apartment', e.target.value);
                      handleChange('apartment', e.target.value);
                    }}
                  />
                  {/*  ============Building========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="building"
                    name="building"
                    label="Building"
                    placeholder="Enter your building"
                    margin="normal"
                    variant="outlined"
                    error={touched.building && Boolean(errors.building)}
                    helperText={<ErrorMessage name="building" />}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('building', e.target.value);
                      handleChange('building', e.target.value);
                    }}
                  />

                  {/*  ============Street========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="street"
                    name="street"
                    label="Street"
                    placeholder="Enter your street"
                    margin="normal"
                    variant="outlined"
                    error={touched.street && Boolean(errors.street)}
                    helperText={<ErrorMessage name="street" />}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('street', e.target.value);
                      handleChange('street', e.target.value);
                    }}
                  />
                  {/*  ============City========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="city"
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    margin="normal"
                    variant="outlined"
                    error={touched.city && Boolean(errors.city)}
                    helperText={<ErrorMessage name="city" />}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('city', e.target.value);
                      handleChange('city', e.target.value);
                    }}
                  />
                  {/*  ============Province========== */}
                  {/*  ============Country========== */}
                  <CountryComponent />

                  {/*  ============Postal Code========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Enter your postal code"
                    margin="normal"
                    variant="outlined"
                    error={touched.postalCode && Boolean(errors.postalCode)}
                    helperText={<ErrorMessage name="postalCode" />}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('postalCode', e.target.value);
                      handleChange('postalCode', e.target.value);
                    }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 'auto' }}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                </CardActions>
              </Form>
            );
          }}
        </Formik>
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  minHeight: '120vh',

  '.MuiCard-root': {
    overflow: 'visible', // This allows dropdowns to overlap the card boundaries
    width: '100%',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
  },

  '@media (max-width: 767px)': {
    '.MuiCardContent-root': {
      padding: '0',
    },
  },
  '@media (min-width: 768px)': {
    '.MuiCard-root': {
      width: '70%',
    },
  },

  '@media (min-width: 1024px)': {
    '.MuiCard-root': {
      width: '60%',
    },
  },

  '@media (min-width: 1200px)': {
    '.MuiCard-root': {
      width: '50%',
    },
  },
});

const CardWrapper = styled(Card)({
  overflow: 'visible', // This allows dropdowns to overlap the card boundaries
  width: '90%',
  margin: 'auto',
  marginTop: '50px',
  padding: '20px',
});

const PhoneInputWrapper = styled.div<{ hasError: boolean }>(({ hasError }) => ({
  width: '100%',
  border: hasError ? '1px solid red' : '1px solid #ccc',
  borderRadius: '4px',
  paddingLeft: '10px',
  input: {
    width: '100%',
    padding: '16.5px 14px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
    },
  },
}));

export default Profile;
