import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import * as config from '../config'

const useStyles = makeStyles(() => ({
    title: {
        fontSize: "25px",
        fontWeight: "bold"
    },
    sub : {
        display: "flex",
        flexDirection: "column",
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

const DeleteDialog = (props) => {
    
    const classes = useStyles()
    const [password, setPassword] = useState("")

    const deleteRecipe = () => {

        const deleteRecID = props.recID

        const uri = config.API_URI + 'myrecipes/' + deleteRecID

        fetch(uri,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': "*",
                    'Access-Control-Request-Method': "DELETE",
                },
                body: JSON.stringify({password})
            })
            .then(res => res.json())
            .then(data => {

                if(data.success){
                    alert("레시피 삭제 성공")
                    props.reset()
                }
                else{
                    alert("레시피 삭제 실패")
                }
                props.onClose()
            })  
    }
    
    return (
        <Dialog
            fullWidth={true}
            maxWidth="xs"
            open={props.open}
            onClose={props.onClose}
        >
           <DialogContent className={classes.sub}>
                패스워드
                <TextField 
                        value={password}
                        placeholder="패스워드를 입력해 주세요"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
            </DialogContent>
            
            <Button style={{fontWeight: "bold"}} onClick={props.onClose}>
                취소
            </Button>
            <Button style={{fontWeight: "bold", color: "red"}} onClick={deleteRecipe}>
                삭제
            </Button>
        </Dialog>
    )
}

export default DeleteDialog