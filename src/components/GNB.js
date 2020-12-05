import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(() => ({
    root : {
        display: "flex",
        width: "100%",
        marginTop: "15px",
        alignItems: "flex-start"
    },
    links : {
        textDecoration: "none",
        backgroundColor: "#E6E6E6",
        borderRadius: 10,
        fontWeight: "bold",
        color: "black",
        width: "110px",
        textAlign: "center",

        padding : "10px 10px 10px 10px",
        marginRight: "5px",
    },
    linksActive : {
        textDecoration: "none",
        backgroundColor: "#6E6E6E",
        borderRadius: 10,
        fontWeight: "bold",
        color: "white",
        width: "110px",
        textAlign: "center",

        padding : "10px 10px 10px 10px",
        marginRight: "5px",
    },
    
}))

const GNB = () => {
    
    const nowPath = document.location.href.split('/')[3]

    const [click, setClick] = useState(0)
    const classes = useStyles()

    let index = 0

    if(nowPath == "myrecipes"){
        index = 3
    }
    else if(nowPath == "originrecipes"){
        index = 2
    }
    else{
        index = 1 
    }

    const handleClick = (event) => {


        setClick(Number(event.target.id))
    }

    return (
        <Box className={classes.root}>

            <Link 
                id="1" 
                onClick={handleClick}  
                className={click == 1 || index == 1 ? classes.linksActive : classes.links}
                to='/'
            >
                Home
            </Link>

            <Link 
                id="2" 
                onClick={handleClick} 
                className={click == 2 || index == 2? classes.linksActive : classes.links} 
                to='/originrecipes'
            >
                원조 레시피
            </Link>

            <Link 
                id="3" 
                onClick={handleClick}  
                className={click == 3 || index == 3 ? classes.linksActive : classes.links} 
                to='/myrecipes'
            >
                나만의 레시피
            </Link>
        </Box>
    )
}

export default GNB