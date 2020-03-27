import React, { useState } from "react";
import './Form.css'
import { Button, Form as RSForm, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import * as yup from 'yup'


const formSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  specialInstructions: yup.string()
})




const Form = () =>
{

  const [formState, setFormState] = useState({
    name: '',
    specialInstructions: ''
  })


  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [errors, setErrors] = useState({
    name: '',
    specialInstructions: ''
  })


  const validateChange = e =>
  {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid =>
      {
        setErrors({
          ...errors,
          [e.target.name]: ""
        })
      })
      .catch(err =>
      {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        })
      })
  }

  const inputChange = e =>
  {
    e.persist()
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    }
    validateChange(e);
    setFormState(newFormData)
  }

  return (
    <div>
      <h3>This will be my form</h3>
      <RSForm>
        <label htmlFor="name">Name:
    <input
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
        </label>
        <br />
        <br/>
        <button type='submit' disabled={buttonDisabled}>Submit</button>
      </RSForm>
    </div>
  );
};
export default Form;
