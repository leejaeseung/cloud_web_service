import React, {useState} from 'react'
import SearchForm from 'components/SearchForm'
import ListForm from 'components/ListForm'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

import CreateRecipe from 'components/CreateRecipe'

import * as config from '../config'

const useStyles = makeStyles(() => ({
    top: {
        width: "800px",
        display: "flex",
        justifyContent: "space-between",
    },
    createBt: {
        marginTop: "auto",
        marginBottom: "3px",
        height: "40px",
        fontWeight: "bold",
    }
}))

const MyRecipes = () => {

    const [items, setItems] = useState([])
    const [createOpen, setCO] = useState(false)
    const classes = useStyles()

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
            setItems(data.recipes)

        })
    }

    const openCreate = () => {
        setCO(true)
    }

    const closeCreate = () => {
        setCO(false)
    }

    return (
        <div>
            <div className={classes.top}>
                <SearchForm 
                    onSubmit={handleSubmit}
                />
                <Button
                    className={classes.createBt}
                    variant="contained"
                    onClick={openCreate}
                >
                    레시피 만들기
                </Button>
            </div>
            

            <ListForm
                items={items}
                type="my"
            />
            {
                createOpen && 
                <CreateRecipe
                    open={createOpen}
                    onClose={closeCreate}
                />
            }
        </div>
    )
}

export default MyRecipes