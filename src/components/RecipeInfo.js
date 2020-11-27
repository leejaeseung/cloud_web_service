import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles(() => ({
    root: {
    },
    title: {
        fontSize: "25px",
        fontWeight: "bold"
    },
    sub : {
        fontWeight: "bold",
    },
    content: {
        marginTop: "10px",
        fontWeight: "bold",
    },
    ings: {
        //display: "inline-block",
        float: "left"
        //alignContent: "stretch"
    },
    ing: {
        padding: "5px 2px 5px 2px",
        display: "flex",
        float: "left",
        marginLeft: "5px",
        
    },
    childs: {
        borderRadius: 5,
        backgroundColor: "#E6E6E6",
        padding: "3px 7px 3px 7px",
    },
    process: {
        marginBottom: "10px"
    }
}))

const RecipeInfo = (props) => {

    const classes = useStyles()

    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={props.open}
            onClose={props.onClose}
            className={classes.root}
        >
            <DialogTitle disableTypography className={classes.title}>{props.item.recName}</DialogTitle>
            <DialogContent className={classes.sub}>
                간단 설명
                <DialogContentText className={classes.content}>
                    {props.item.recSummary}
                </DialogContentText>
            </DialogContent>
            <DialogContent className={classes.sub}>
                재료
                <div className={classes.ings}>
                {
                    
                        props.item.ingredients.map((ingredients, index) => (  
                            <div className={classes.ing} key={ingredients.ingName}>
                                <div className={classes.childs} >         
                                    <span className={classes.content}>
                                        {ingredients.ingName}
                                    </span> 
                                    &nbsp;
                                    <span className={classes.content}>
                                        {ingredients.capacity}
                                    </span>  
                                </div>
                            </div>
                        ))
                }
                </div>
            </DialogContent>
            <DialogContent className={classes.sub}>
                조리 과정
                <div className={classes.processes}>
                {
                        props.item.processes.map((process, index) => (  
                            <div className={classes.process} key={index}>
                                {index + 1}
                                <div className={classes.childs} >         
                                    {process}
                                </div>
                            </div>
                        ))
                }
                </div>
                
            </DialogContent>
            <Button style={{fontWeight: "bold"}} onClick={props.onClose}>
                닫기
            </Button>
        </Dialog>
    )
}

export default RecipeInfo