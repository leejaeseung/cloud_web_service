import React, {useState} from 'react'

import {makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(() => ({
    root: {
        width: "60%"
    },
    form : {
        display: "flex",
        width: "100%",
        marginTop: "15px",
        borderRadius: 10,
        border: "solid 2px #6E6E6E",
    },
    searchRoot : {
        width: "100%",
        marginRight: "10px",
        //backgroundColor: "#A9D0F5"
        
    },
    searchInput : {
        paddingLeft : 10,
    },
    searchIcon : {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "10px",
        
    },
    
}))

const SearchForm = (props) => {
    
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <form onSubmit={props.onSubmit} className={classes.form}>
                
                <InputBase 
                    classes={{
                        root: classes.searchRoot,
                        input: classes.searchInput,
                    }}
                    type="text" 
                    placeholder="검색할 레시피를 입력하세요."
                    name="searchText"
                />
                <IconButton 
                    className={classes.searchIcon}
                    type="submit"
                    >
                    <SearchIcon />
                </IconButton>
            </form>
        </Box>
    )
}

export default SearchForm