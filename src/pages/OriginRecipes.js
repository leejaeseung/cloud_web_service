import React from 'react'
import SearchForm from 'components/SearchForm'
import * as config from '../config'


const OriginRecipes = () => {

    
    

    const handleSubmit = (e) => {
        e.preventDefault()

        const keyword = e.target.searchText.value
        const uri = config.API_URI + 'originrecipes?search=' + keyword

        fetch(uri,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)


        })
    }

    return (
        <div>
            <SearchForm onSubmit={handleSubmit}/>
        </div>
    )
}

export default OriginRecipes