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
  styled,
} from '@mui/material';
import NavigatePages from '../components/NavigatePages';
import {
  setShowPackage,
  updateState,
} from '../../../lib/redux/features/payment/paymentSlice';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import * as Yup from 'yup';

// Type script definitions
interface FormValues {
  email: string;
  phone: string;
}
type FormValueKey = keyof FormValues;

// Form validation schema

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string()
    .required('Required')
    .test('isValidPhoneNumber', 'Phone number is not valid', (value) => {
      if (!value) return false;
      try {
        const phoneNumber = parsePhoneNumberFromString(value);
        if (!phoneNumber || !phoneNumber.isValid()) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    }),
});

// Profile component

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payment } = useSelector((state: any) => state);
  const { showProfile, email, phone } = payment;

  // Handle change function

  const handleChange = (key: FormValueKey, value: any) => {
    dispatch(updateState({ key, value }));
  };

  // handle submit function

  const handleSubmit = (
    values: { email: string; phone: string },
    actions: FormikHelpers<{ email: string; phone: string }>
  ) => {
    // we are only dispatching the action here and not making any api call
    console.log(values);
    dispatch(setShowPackage());
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (!showProfile) {
      navigate('/package');
    }
  }, [showProfile]);
  return (
    <div>
      <NavigatePages />
      <Card
        variant="outlined"
        sx={{
          width: '90%',
          margin: 'auto',
          marginTop: '50px',
          padding: '20px',
        }}
      >
        <Formik
          initialValues={{ email, phone }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            setFieldValue,
            values,
            errors,
            touched,
            isSubmitting,
            isValid,
          }) => {
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
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('email', e.target.value);
                      handleChange('email', e.target.value);
                    }}
                  />
                  {/*  ============Phone========== */}
                  <FormControl
                    fullWidth
                    error={touched.phone && Boolean(errors.phone)}
                  >
                    <PhoneInputWrapper
                      international
                      defaultCountry="US"
                      // @ts-ignore
                      value={values.phone}
                      onChange={(value) => {
                        setFieldValue('phone', value);
                        handleChange('phone', value);
                      }}
                      style={{ width: '100%' }} // Ensures full width
                    />
                    <FormHelperText>
                      {touched.phone && errors.phone
                        ? errors.phone
                        : 'Enter your phone number in international format (e.g., +12345678900)'}
                    </FormHelperText>
                    <FormHelperText>
                      {touched.phone && errors.phone}
                    </FormHelperText>
                  </FormControl>
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 'auto' }}
                    disabled={isSubmitting || !isValid}
                  >
                    Next
                  </Button>
                </CardActions>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};

const PhoneInputWrapper = styled(PhoneInput)({
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
  paddingLeft: '10px',
  input: {
    width: '100%',
    padding: '16.5px 14px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    // on focus
    '&:focus': {
      outline: 'none',
    },
  },
});

export default Profile;
