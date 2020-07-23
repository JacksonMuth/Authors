import React,{ useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'

const AuthorForm = props => {
    const { action } = props;
    const [newAuthor, setNewAuthor] = useState({
        name: ""
    });
    const [errors, setErrors] = useState({
        name: ""
    });

    useEffect(() => {
        if (action === "edit") {
            axios.get(`http://localhost:8000/api/authors/${props.id}`)
                .then(response => {
                    if (response.data.message === "success")
                        setNewAuthor(response.data.results)
                    else
                        navigate("/wrongpage")
                })
        }
    }, [])

    const submitHandler = e => {
        e.preventDefault();
        if (validate(newAuthor)) {
            if (action === "edit") {
                axios.put(`http://localhost:8000/api/authors/${props.id}`, newAuthor)
                    .then(response => {
                        if (response.data.message === "success") {
                            navigate("/");
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                axios.post(`http://localhost:8000/api/authors`, newAuthor)
                    .then(response => {
                        if (response.data.message === "success") {
                            navigate("/");
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    const changeHandler = e => {
        const curAuthor = {
            ...newAuthor,
            [e.target.name]: e.target.value
        }

        validate(curAuthor);
        setNewAuthor(curAuthor);
    }

    const validate = author => {
        let valid = false;
        let {...curErrors} = errors;

        if (author.name.length === 0) {
            curErrors.name = "Author Name is required.";
        } else if (author.name.length < 3) {
            curErrors.name = "Author Name must be at least 3 characters.";
        } else {
            curErrors = "";
            valid = true;
        }

        setErrors(curErrors);

        return valid;
    }

    return (
        <div>
            <h1>Favorite authors</h1>
            <Link to="/">Home</Link>
            {
                action === "edit" ?
                <h5>Edit this author</h5>
                :
                <h5>Add a new author</h5>
            }
            <form onSubmit={ submitHandler }>
                {
                    errors.name ?
                    <p className=" text-danger">{ errors.name }</p>
                    :
                    ''
                }
                <label htmlFor="name" >Name: </label>
                <input type="text" name="name" className="col-sm-2 form-control m-2" onChange={ changeHandler } value={newAuthor.name}/>
                <button className="col-sm-1 btn btn-secondary m-1" onClick={ e => navigate("/")}>Cancel</button>
                <input className="col-sm-1 btn btn-primary m-1" type="submit" value="Submit"/>
            </form>
            
        </div>
    )
}

export default AuthorForm
