import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import createMachine from 'machines/createMachine';
import api from '../api';

const studentMachine = {
  initial: {
    change: 'dirty'
  },
  dirty: {
    submit: 'pending'
  },
  pending: {
    post: 'submitted'
  },
  submitted: {
    fail: 'error',
    success: 'initial'
  },
  error: {
    reset: 'initial'
  }
};

const getNextFormState = createMachine(studentMachine, 'initial');

const Form = styled.form`
  display: grid;
  grid-row-gap: 0.3em;
  align-content: center;
  text-align: left;

  & label {
    display: block;
    font-size: 85%;
    color: gray;
  }

  & input[type=text],
  & input[type=email] {
    display: block;
    border-radius: 5px;
    border: 1px solid darkgray;
    color: darkgray;
    padding: 1em 0.5em;
  }

  & button {
    color: lightblue;
    background-color: #282c34;
    border-radius: 3px;
    align-self: center;
    border: none;
    outline: none;
    padding: 0.6em;
  }
`;

function StudentForm({ id, name, email }) {
  const [currentFormState, setNextState] = useState(getNextFormState());
  const [student, setStudent] = useState({ name, email });

  function handleChange(event) {
    event.preventDefault();
    setNextState(getNextFormState('change'));
    setStudent({
      ...student,
      [event.target.name]: event.target.value
    });
  }

  function handleSave(event) {
    event.preventDefault();
    setNextState(getNextFormState('submit'));
  }

  useEffect(() => {
    async function updateStudent() {
      const result = await api.post(`/students/${id}`, student);
      console.log(result);
    }

    async function postStudent() {
      const result = await api.post('/students', student);
      console.log(result);
      setStudent({ name: '', email: '' });
    }

    if (currentFormState === 'pending') {
      setNextState(getNextFormState('submit'));
      try {
        if (id) {
          updateStudent();
        } else {
          postStudent();
        }
        setNextState(getNextFormState('success'));
      } catch (err) {
        console.error(err);
        setNextState(getNextFormState('fail'));
      }
    }
  }, [currentFormState, student, id]);

  return (
    <Form onSubmit={handleSave}>
      <label htmlFor="student-name">Name</label>
      <input id="student-name" onChange={handleChange} type="text" name="name" value="" />
      <label htmlFor="student-email">Email</label>
      <input id="student-email" onChange={handleChange} type="text" name="email" value="" />
      <button disabled={currentFormState === 'pending'}>Save</button>
    </Form>
  )
}

export default StudentForm;
