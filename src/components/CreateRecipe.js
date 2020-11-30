import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as config from '../config'


const useStyles = makeStyles(() => ({
    root: {
    },
    title: {
        fontSize: "25px",
        fontWeight: "bold",
    },
    sub : {
        display: "flex",
        flexDirection: "column",
        fontWeight: "bold",
    },
    top: {
        display: "inline-block",
    },
    content: {
        marginTop: "10px",
        fontWeight: "bold",
    },
    ingsInput: {
        display: "flex",
        float: "left",
        border: "solid 2px #6E6E6E",
        borderRadius: 10,
        alignItems: "center",
        paddingLeft: "10px",
        marginTop: "10px",
        height: "50px"
        //alignContent: "stretch"
    },
    ingsForm: {
        display: "inline-block",
        alignItems: "center",
        width: "280px",
    },
    ing: {
        padding: "20px 5px 15px 2px",
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
    },
    inputLarge: {
        width: "100%",
        marginTop: "10px"
    },
    inputMedium: {
        marginTop: "10px"
    },
    inputSmall: {
        width: "100px",
        marginRight: "8px",
    },
    addBt: {
        //paddingBottom: "2px"
        //width: "100%",
        marginTop: "10px",
        //height: "100%",
    },
    processForm: {

    }
    
}))

const RecipeInfo = (props) => {

    const classes = useStyles()

    const [nickName, setNickName] = useState("")
    const [password, setPassword] = useState("")
    const [recName, setRecName] = useState("")

    const [recSummary, setRecSummary] = useState("")

    const [ingredients, setIngredients] = useState([])
    const [ing_name, setIngName] = useState("")
    const [ing_cap, setIngCap] = useState("")

    const [processes, setProcesses] = useState([])
    const [process, setProcess] = useState("")

    const addIng = () => {
        if(ing_name == "" || ing_cap == "") return

        const newIngs = ingredients.slice()
        newIngs.push({ingName: ing_name, capacity: ing_cap})


        setIngName("")
        setIngCap("")
        setIngredients(newIngs)
    }

    const addProcess = () => {
        if(process == "") return

        const newProcesses = processes.slice()
        newProcesses.push(process)

        setProcess("")
        setProcesses(newProcesses)
    }

    const createRecipe = () => {

        const body = JSON.stringify({
            nickName,
            password,
            recName,
            recSummary,
            ingredients,
            processes
        })

        console.log(body)

        const uri = config.API_URI + 'myrecipes'

        fetch(uri,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            })
            .then(res => res.json())
            .then(data => {

                alert("레시피가 등록되었습니다.(redID : " + data.recID + ")")

               props.onClose()
            })
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={props.open}
            onClose={props.onClose}
            className={classes.root}
        >
            <div>
                <DialogContent className={classes.top} style={{width: "200px"}}>
                    닉네임
                    <TextField 
                        value={nickName}
                        className={classes.inputMedium}
                        placeholder="닉네임을 입력해 주세요"
                        onChange={(e) => {
                            setNickName(e.target.value)
                        }}
                    />
                </DialogContent>

                <DialogContent className={classes.top} style={{width: "200px"}}>
                    패스워드
                    <TextField 
                        value={password}
                        className={classes.inputMedium}
                        placeholder="패스워드를 입력해 주세요"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </DialogContent>
            </div>

            <DialogTitle disableTypography className={classes.title}>
                레시피 명
                <TextField 
                    value={recName}
                    className={classes.inputLarge}
                    placeholder="등록할 레시피의 이름을 입력해 주세요"
                    onChange={(e) => {
                        setRecName(e.target.value)
                    }}
                />
            </DialogTitle>
            
            <DialogContent className={classes.sub}>
                간단 설명
                    <TextField 
                        value={recSummary}
                        className={classes.inputLarge}
                        placeholder="등록할 레시피의 간단 설명을 입력해 주세요"
                        multiline
                        onChange={(e) => {
                            setRecSummary(e.target.value)
                        }}
                    />
            </DialogContent>
            <DialogContent className={classes.sub}>
                재료
                <div style={{display: "block"}}>
                    {
                            
                        ingredients.map((item, index) => (  
                            <div className={classes.ing} key={index}>
                                <div className={classes.childs} >         
                                    <span className={classes.content}>
                                        {item.ingName}
                                    </span> 
                                    &nbsp;
                                    <span className={classes.content}>
                                        {item.capacity}
                                    </span>  
                                </div>
                            </div>
                        ))
                    }
                    <div className={classes.ingsForm}>
                        <div className={classes.ingsInput}>
                            
                            <TextField 
                                value={ing_name}
                                className={classes.inputSmall}
                                placeholder="재료 명"
                                onChange={(e) => {
                                    setIngName(e.target.value)
                                }}
                            />
                            <TextField 
                                value={ing_cap}
                                className={classes.inputSmall}
                                placeholder="재료 양"
                                onChange={(e) => {
                                    setIngCap(e.target.value)
                                }}
                            />
                        </div>
                        <IconButton
                            className={classes.addBt}
                            onClick={addIng}
                        >
                            <AddCircleIcon/>
                        </IconButton>
                    </div>
                </div>
            </DialogContent>
            <DialogContent className={classes.sub}>
                조리 과정
                <div className={classes.processes}>
                    {
                            processes.map((item, index) => (  
                                <div className={classes.process} key={index}>
                                    {index + 1}
                                    <div className={classes.childs} >         
                                        {item}
                                    </div>
                                </div>
                            ))
                    }
                </div>
                <div className={classes.processForm}>
                    <TextField 
                        value={process}
                        className={classes.inputLarge}
                        placeholder="등록할 레시피의 조리 과정을 입력해 주세요"
                        multiline
                        onChange={(e) => {
                            setProcess(e.target.value)
                        }}
                    />
                    <IconButton
                        className={classes.addBt}
                        onClick={addProcess}
                    >
                        <AddCircleIcon/>
                    </IconButton>
                </div>
                
            </DialogContent>
            <Button style={{fontWeight: "bold", color: "red"}} onClick={props.onClose}>
                취소
            </Button>
            <Button style={{fontWeight: "bold", color: "green"}} onClick={createRecipe}>
                등록
            </Button>
        </Dialog>
    )
}

export default RecipeInfo