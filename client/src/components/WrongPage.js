import React from 'react'
import { Link } from '@reach/router'

const WrongPage = () => {
    return (
        <div style={{textAlign: "center"}}>
            <h1 style={{textAlign: "center"}}>We're sorry, but we could not find the author you are looking for.
                Would you like to add this author to our database?</h1>
            <Link to="/new" style={{textAlign: "center"}}><button className="btn btn-primary" style={{textAlign: "center"}}>Add Author</button></Link>
        </div>
    )
}

export default WrongPage
