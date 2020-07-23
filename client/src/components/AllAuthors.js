import React, { useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'

const AllAuthors = () => {
    const [authors, setAuthors] = useState([]);

    const getAll = () => {
        axios.get("http://localhost:8000/api/authors")
            .then(response => {
                let allAuthors = response.data.results;
                allAuthors.sort((a, b) => a.name.localeCompare(b.name))
                setAuthors(allAuthors);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getAll();
    }, []);

    const deleteHandler = (e, id) => {
        axios.delete(`http://localhost:8000/api/authors/${id}`)
            .then(response => {
                if (response.data.message === "success") {
                    getAll();
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Link to="/new">Add an author</Link>
            <h5 style={{color: "#007BFF"}}>We have quotes by: </h5>
            <table>
                <tr>
                    <th>Author</th>
                    <th>Actions available</th>
                </tr>
                {
                    authors.map((author, i) =>
                        <tr>
                            <td>{author.name}</td>
                            <td>
                                <Link to={`/edit/${author._id}`}><button className="btn btn-primary">Edit</button></Link>
                                <button className="btn btn-danger" onClick={e => deleteHandler(e, author._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default AllAuthors
