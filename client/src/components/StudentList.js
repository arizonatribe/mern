import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import api from '../api';

const Table = styled.table`
  display: grid;
  text-align: center;
  grid-colum-gap: 0.5em;
  background: white;
  border-radius: 2px;
  padding: 0.4em;

  & a {
    color: lightblue;
  }

  & thead tr {
    background-color: whitesmoke;
  }

  & tr {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    & td:nth-child(3) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 1em;
    }
  }
  & tr:nth-child(even) {
    background-color: whitesmoke;
  }
  & td {
    color: darkgray;
  }
`;

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await api.get('/students');
      setStudents(data.students || []);
    }
    getData();
  }, [students]);

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s =>
          <tr key={s._id}>
            <td>{s.name}</td>
            <td>
              <a
                className="App-link"
                href={`mailto:${s.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.email}
              </a>
            </td>
            <td>
              <IconButton iconName="edit" />
              <IconButton iconName="trash" />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default StudentList;
