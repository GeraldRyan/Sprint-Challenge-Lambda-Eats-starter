import React, { useState } from "react";
import './Form.css'
import { Button, Form as RSForm, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import * as yup from 'yup'


const formSchema = yup.object().shape({
  name: yup.string().required("Please enter your name").min(2),
  specialInstructions: yup.string()
})

// set orders to be populated from returned success response to be displayed


const Form = () =>
{
  const [orders, setOrders] = useState([])
  const [post, setPost] = useState ([])

  const [formState, setFormState] = useState({
    name: '',
    size: '',
    specialInstructions: ''
  })


  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [errors, setErrors] = useState({
    name: '',
    size:'',
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

  const formSubmit = e =>
  {
    console.log("Form submitting via Axios.post() and then reset form state")
    e.preventDefault()
    axios
    .post("https://reqres.in/api/users", formState)
    .then(res =>
      {
        setPost(res.data)
        console.log("success", post)
        setFormState({
          name:'',
          size:'',
          specialInstructions:''
        })
        setOrders(orders =>[...orders,res.data]) // change name
        console.log("post:", post)
      })
  }

  return (
    <div>
      <h3>Place an Order $>></h3>
      <RSForm>
        <label htmlFor="name">Name:
    <input
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? <p className="error"> {errors.name}</p> : null}
        </label>
        <br/>
        <label htmlFor="size">
          Size:
          <select 
          name="size" 
          id="size">
            <option value="small">Small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
            <option value="Titan">Titan</option>
            </select>
            </label>
        <br />
        <label htmlFor="specialInstructions">specialInstructions:
    <input
            type="text"
            name="specialInstructions"
            value={formState.specialInstructions}
            onChange={inputChange}
          />
        </label>
        <br/>
        <button type='submit' disabled={buttonDisabled}>Add To Order</button>
      </RSForm>
    </div>
  );
};
export default Form;
