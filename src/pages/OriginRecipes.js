import React, {useState} from 'react'
import SearchForm from 'components/SearchForm'
import ListForm from 'components/ListForm'

import * as config from '../config'

const OriginRecipes = () => {

    
    const [items, setItems] = useState([])

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
            setItems(data.recipes)
        })
    }

    return (
        <div>
            <SearchForm 
                onSubmit={handleSubmit}
                />

            <ListForm
                items={items}
            />
            
            
        </div>
    )
}

export default OriginRecipes