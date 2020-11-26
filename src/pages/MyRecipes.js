import React from 'react'
import MapForm from 'components/MapForm'
import SearchForm from 'components/SearchForm'
import * as config from '../config'

const MyRecipes = () => {



    const handleSubmit = (e) => {
        e.preventDefault()

        const keyword = e.target.searchText.value
        const uri = config.API_URI + 'myrecipes?search=' + keyword

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

export default MyRecipes