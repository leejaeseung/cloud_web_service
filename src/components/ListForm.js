import React, {useState} from 'react'

import {makeStyles} from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(() => ({
    root: {
        width: "800px",
        marginTop: "15px",
        borderRadius: 10,
        border: "solid 2px #6E6E6E",
    },
    lists: {

    },
    listItems: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "700px",
    },
    item: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "1rem",
    },
    itemTitle: {
        fontWeight: "bold",
        paddingBottom: "4px",
    },
    recName: {
        
        borderRadius: 5,
        backgroundColor: "#E6E6E6",
        padding: "5px 5px 5px 5px",

        '& span': {
            fontWeight: "bold",
        }
    }
}))

const ListForm = (props) => {

    const classes = useStyles()

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
                                            <ListItem button className={classes.listItems}>
                                                <div className={classes.item}>
                                                    {/* <span className={classes.itemTitle}>&nbsp;&nbsp;&nbsp;</span> */}
                                                    <ListItemText className={classes.recName} primary={item.recName}/>
                                                </div>

                                                <div className={classes.item}>

                                                <ListItemText className={classes.textItem} primary={item.recSummary}/>
                                                </div>
                                            </ListItem>
                                            
                                        </div>
                                    ))
                                }
                            </List>
                        )
                    }
                })()
            }
        </div>
    )
}

export default ListForm