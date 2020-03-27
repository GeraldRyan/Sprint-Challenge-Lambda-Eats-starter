import React, { useState } from "react";
import './Form.css'
import { Button, Form as RSForm, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import * as yup from 'yup'
import { useEffect } from "react";


const formSchema = yup.object().shape({
  name: yup.string().required("Please enter your name").min(2),
  size: yup.string(),
  toppings: yup.string(),
  specialInstructions: yup.string()
})

// set orders to be populated from returned success response to be displayed


const Form = () =>
{
  const [orders, setOrders] = useState([])
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [theToppings, setTheToppings] = useState([])


  const [formState, setFormState] = useState({
    name: '',
    size: '',
    toppings:'',
    specialInstructions: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    size: '',
    toppings:'',
    specialInstructions: ''
  })

  const [post, setPost] = useState([])




  useEffect(() =>
  {
    formSchema.isValid(formState).then(valid =>
    {
      setButtonDisabled(!valid)
    })
  })

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
          name: '',
          size: '',
          specialInstructions: '',
          toppings:''
        })
        setOrders(orders => [...orders, res.data]) // change name
        console.log("post:", post)
      })
  }

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
    let arrvals = []
    if (e.target.type === 'checkbox'){
      setTheToppings(theToppings => [...theToppings, e.target.value])
      

    }
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? theToppings : e.target.value
    }
    validateChange(e);
    setFormState(newFormData)
  }



  return (
    <div>
      <h3>Place an Order $>></h3>
      <RSForm onSubmit={formSubmit}>
        <label htmlFor="name" >Name:
    <input
            type="text"
            name="name"
            placeholder="name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? <p className="error"> {errors.name}</p> : null}
        </label>
        <br />
        <br />
        <label htmlFor="size">
          Size:
          <select
            name="size"
            id="size"
            onChange={inputChange}>
            <option value="xxx">Select Size</option>
            <option value="dwarf">dwarf</option>
            <option value="human">human</option>
            <option value="bear">bear</option>
            <option value="Titan">Titan</option>
          </select>
        </label>
        <br />
        <br />


        <fieldset>
          <legend>Toppings</legend>
          <p>Choose additional toppings, $0.50 each.</p>
          <p>
            <label><input id="cheese" type="checkbox" name="toppings" value="extra cheese" onChange={inputChange}/> Extra Cheese</label>
            <label><input id="pineapple" type="checkbox" name="toppings" value="Pineapple" onChange={inputChange}/> Pineapple</label>
            <label><input id="salami" type="checkbox" name="toppings" value="Salami" onChange={inputChange}/> Salami</label>
            <label><input id="sardines" type="checkbox" name="toppings" value="Sardines" onChange={inputChange}/> Sardines</label>
            <label><input id="surprise" type="checkbox" name="toppings" value="Surprise me" onChange={inputChange}/> Surprise me</label>
          </p>
          {/* <p>
            <label><input type="checkbox" name="cheese" value="extra cheese" onChange={inputChange}/> Extra Cheese</label>
            <label><input type="checkbox" name="pineapple" value="Pineapple" onChange={inputChange} /> Pineapple</label>
            <label><input type="checkbox" name="salami" value="Salami" onChange={inputChange}/> Salami</label>
            <label><input type="checkbox" name="sardines" value="Sardines" onChange={inputChange}/> Sardines</label>
            <label><input type="checkbox" name="surprise" value="Surprise me" onChange={inputChange}/> Surprise me</label>
          </p> */}

        </fieldset>

















        <br />
        <label htmlFor="specialInstructions">special Instructions:
    <input
            type="text"
            name="specialInstructions"
            value={formState.specialInstructions}
            onChange={inputChange}
          />
        </label>
        <br />
        <br />
        <button type='submit' disabled={buttonDisabled}>Add To Order</button>
      </RSForm>
      <p>Orders:</p>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
    </div>
  );
};
export default Form;
