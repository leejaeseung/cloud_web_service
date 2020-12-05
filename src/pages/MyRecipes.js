import React, {useState, useEffect} from 'react'
import SearchForm from 'components/SearchForm'
import ListForm from 'components/ListForm'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

import CreateRecipe from 'components/CreateRecipe'

import * as config from '../config'

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
    },
    top: {
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
    const [nowPage, setNowPage] = useState(0)
    const [pages, setPages] = useState([1])

    const makePages = (len) => {
        const array = []

        for(let i = 1; i <= len; i++)
            array.push(i)

        return array
    }

    const resetRecipes = () => {
        const uri = config.API_URI + 'myrecipes?search='

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
                window.sessionStorage.setItem("myRecipes", JSON.stringify(data.recipes))
                setPages(makePages(data.recipes.length / 10 + 1))
            })
    }

    useEffect(() => {
        
        const prevItems = JSON.parse(window.sessionStorage.getItem("myRecipes"))

        if(!prevItems){
            const uri = config.API_URI + 'myrecipes?search='

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
                window.sessionStorage.setItem("myRecipes", JSON.stringify(data.recipes))
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
            window.sessionStorage.setItem("myRecipes", JSON.stringify(data.recipes))
            setPages(makePages(data.recipes.length / 10 + 1))
            setNowPage(0)
        })
    }

    const openCreate = () => {
        setCO(true)
    }

    const closeCreate = () => {
        setCO(false)
    }

    return (
        <div className={classes.root}>
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
                nowPage={nowPage}
                setNowPage={setNowPage}
                pages={pages}
                reset={resetRecipes}
                type="my"
            />
            {
                createOpen && 
                <CreateRecipe
                    open={createOpen}
                    reset={resetRecipes}
                    onClose={closeCreate}
                />
            }
        </div>
    )
}

export default MyRecipes