import React, {useState, useEffect} from 'react'

import {makeStyles} from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import RecipeInfo from 'components/RecipeInfo'
import DeleteDialog from 'components/DeleteDialog'
import Link from '@material-ui/core/Link'

import * as config from '../config'

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        marginTop: "15px",
        borderRadius: 10,
        border: "solid 2px #6E6E6E",
    },
    lists: {
        display:"flex",
        flexDirection: "row",
        //borderTop:  "solid 1px black",
    },
    listItems: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "800px",
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
        margin: "auto auto auto auto",
        height: "40px",
        fontWeight: "bold",
    },
    pageBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "15px",
        fontSize: "20px",
        fontWeight: "bold",
    },
    pageItems: {
        marginRight: "13px",

    }
}))

const ListForm = (props) => {

    const classes = useStyles()

    //const [initPage, setInitPage] = useState(1)
    const [nowPages, setNowPages] = useState([])
    const [nowPageItems, setNowPageItems] = useState([])

    const [openView, setOpenView] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [clickedItem, setClicked] = useState()
    const [deleteID, setDeleteID] = useState("")

    useEffect(() => {
        const start = (props.nowPage) * 10
        const end = start + 10
        const newItems = props.items.slice(start, end)

        const pagesStart = parseInt(props.nowPage / 10) * 10
        const pagesEnd = pagesStart + 10
        const newPages = props.pages.slice(pagesStart, pagesEnd)


        setNowPages(newPages)
        setNowPageItems(newItems)
        
    }, [props.nowPage, props.pages])

    const handleViewClose = () => {
        setOpenView(false);
    }

    const handleDeleteClose = () => {
        setOpenDelete(false)
    }

    const handleViewOpen = (item) => {

        const recID = item.recID
        let uri
        if(props.type == "origin")
            uri = config.API_URI + 'originrecipes/' + recID
        else if(props.type == "my")
            uri = config.API_URI + 'myrecipes/' + recID

        fetch(uri,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {

                setClicked(data)
                setOpenView(true);
            })   
    }

    const pageClick = (e) => {
        const num = e.target.id - 1
        
        props.setNowPage(num)
    }

    const onPrev = () => {
        props.setNowPage(props.nowPage - 1)
    }

    const onNext = () => {
        props.setNowPage(props.nowPage + 1)
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
                            <List style={{marginLeft: "10px"}}>
                                <p style={{color: "#0B0B61"}}>
                                    &nbsp;&nbsp;총 {props.items.length} 개의 레시피가 검색되었습니다. 자세한 정보를 보려면 클릭하세요.
                                </p>
                                {
                                    nowPageItems.map((item, index) => (
                                        <div className={classes.lists} key={item.recID}>
                                            <ListItem 
                                                button 
                                                className={classes.listItems} 
                                                onClick={handleViewOpen.bind(this,item)} 
                                                divider
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
                                                    onClick={() => {
                                                        setOpenDelete(true)
                                                        setDeleteID(item.recID)
                                                    }}
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
            {openView && <RecipeInfo
                item={clickedItem}
                onClose={handleViewClose}
                open={openView}
            />
            }
            {openDelete && <DeleteDialog
                recID={deleteID}
                reset={props.reset}
                onClose={handleDeleteClose}
                open={openDelete}
            />
            }

            <div className={classes.pageBox}>
                {
                    props.nowPage > 0 ?
                    <Link
                        href='#'
                        color="inherit"
                        className={classes.pageItems}
                        onClick={onPrev}
                    >
                        이전
                    </Link>
                    : ""
                }
                {
                    nowPages.map((item) => {
                        return (
                            <div key={item}>
                                <Link 
                                    id={item}
                                    className={classes.pageItems}
                                    href='#'
                                    color={item == props.nowPage + 1 ? "primary" : "inherit"}
                                    onClick={pageClick}
                                >
                                    {item}
                                </Link>
                            </div>
                        )
                    })
                }
                {
                    props.nowPage < props.pages.length - 1 ?
                    <Link
                    href='#'
                    color="inherit"
                    className={classes.pageItems}
                    onClick={onNext}
                >
                    다음
                </Link>
                : ""
                }
            </div>

        </div>
    )
}

export default ListForm