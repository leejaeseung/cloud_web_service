import React, {useState, useEffect} from 'react'
import SearchForm from 'components/SearchForm'
import ListForm from 'components/ListForm'

import * as config from '../config'

const OriginRecipes = () => {

    const [items, setItems] = useState([])
    const [nowPage, setNowPage] = useState(0)
    const [pages, setPages] = useState([1])

    const makePages = (len) => {
        const array = []

        for(let i = 1; i <= len; i++)
            array.push(i)

        return array
    }

    useEffect(() => {
        
        const prevItems = JSON.parse(window.sessionStorage.getItem("originRecipes"))

        if(!prevItems){
            const uri = config.API_URI + 'originrecipes?search='

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
                window.sessionStorage.setItem("originRecipes", JSON.stringify(data.recipes))
                setPages(makePages(data.recipes.length / 10 + 1))
            })
        }
        else{
            setItems(prevItems)
            setPages(makePages(prevItems.length / 10 + 1))
        }
    }, [])

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
            window.sessionStorage.setItem("originRecipes", JSON.stringify(data.recipes))
            setPages(makePages(data.recipes.length / 10 + 1))
            setNowPage(0)
        })
    }

    return (
        <div style={{width: "100%"}}>
            <SearchForm 
                onSubmit={handleSubmit}
                />

            <ListForm
                items={items}
                nowPage={nowPage}
                setNowPage={setNowPage}
                pages={pages}
                type="origin"
            />

        </div>
    )
}

export default OriginRecipes