import React, {useState, useRef} from 'react'

import {makeStyles} from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import RecipeInfo from 'components/RecipeInfo'

import * as config from '../config'

const useStyles = makeStyles(() => ({
    root: {
        width: "800px",
        marginTop: "15px",
        borderRadius: 10,
        border: "solid 2px #6E6E6E",
    },
    lists: {
        display:"flex",
        flexDirection: "row",
    },
    listItems: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "700px",
    },
    item: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "1rem",
        justifyContent: "space-between",
    },
    itemTitle: {
        marginTop: "5px",
        marginLeft: "30px",
        padding: "2px 5px 2px 5px",
        borderRadius: 5,
        backgroundColor: "#6E6E6E",
        color: "white"
    },
    recName: {
        flex: "none",
        borderRadius: 5,
        backgroundColor: "#E6E6E6",
        padding: "5px 5px 5px 5px",

        '& span': {
            fontWeight: "bold",
        }
    },
    deleteBt: {
        marginTop: "auto",
        marginBottom: "auto",
        height: "40px",
        fontWeight: "bold",
    }
}))

const ListForm = (props) => {

    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [clickedItem, setClicked] = useState()

    //const clickedItem = useRef()

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = (item) => {

        const recID = item.recID
        const uri = config.API_URI + 'originrecipes/' + recID

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

                setClicked(data)
                setOpen(true);
            })
        
    }

    return (
        <div className={classes.root}>


            {
                (() => {
                    if(props.items.length == 0){
                        return (
                            <p style={{paddingLeft: "5px"}}>
                                검색 결과가 없습니다.
                            </p>
                        )
                    }
                    else{
                        return (
                            <List>
                                <p style={{color: "#0B0B61"}}>
                                    &nbsp;&nbsp;총 {props.items.length} 개의 레시피가 검색되었습니다. 자세한 정보를 보려면 클릭하세요.
                                </p>
                                {
                                    props.items.map((item, index) => (
                                        <div className={classes.lists} key={item.recID}>
                                            <Divider/>
                                            <ListItem 
                                                button 
                                                className={classes.listItems} 
                                                onClick={handleOpen.bind(this,item)} 
                                                
                                                id={index}
                                            >
                                                <div className={classes.item}>
                                                    <ListItemText className={classes.recName} primary={item.recName}/>
                                                    {props.type == "my" && <span className={classes.itemTitle}>{item.nickName}</span>}
                                                </div>

                                                <div className={classes.item}>

                                                <ListItemText className={classes.textItem} primary={item.recSummary}/>
                                                </div>
                                            </ListItem>
                                            {props.type == "my" &&
                                                <Button
                                                    className={classes.deleteBt}
                                                    variant="contained"
                                                >
                                                    삭제
                                                </Button>
                                            }

                                        </div>
                                    ))
                                }
                                
                            </List>
                        )
                    }
                })()
            }
            {clickedItem && <RecipeInfo
                item={clickedItem}
                onClose={handleClose}
                open={open}
            />
            }
        </div>
    )
}

export default ListForm