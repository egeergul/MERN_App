import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltIconOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useStyles from "./styles.js";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts.js";

const Post = ({post, setCurrentId})=> {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();

    const Likes= ()=> {
        if(post.likes.length>0){

            return post.likes.find((like)=> like ===(user?.result?.googleId ||  user?.result?._id))
            ?(
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{post.likes.length>2? `You and ${post.likes.length -1} others`:`${post.likes.length} like${post.likes.length>1?"s":""}`}</>
            ):(
                <><ThumbUpAltIconOutlined fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length>1?"Likes":"Like"}</>
            )
        }

        return <><ThumbUpAltIconOutlined fontSize="small"/>&nbsp;Like</>
    }

    return (
        <h1>
            <Card className={classes.card} >
                {post.selectedFile && <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>}  
                <div className={classes.overlay} >
                    <Typography variant="h6">{post.name} </Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()} </Typography>
                </div>


                {(user?.result?.googleId === post?.creator ||  user?.result?._id=== post?.creator) &&   
                    <div className={classes.overlay2} >
                         <Button style={{"color": "white"}} size="small" onClick={()=>setCurrentId(post._id)} >
                             <MoreHorizIcon fontSize="medium"/>
                         </Button>
                    </div>
                }
           
                <div className={classes.details} >
                    <Typography variant="body2" color="textSecondary" >{post.tags.map((tag)=>`#${tag.trim()} `)} </Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom >{post.title} </Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p"  >{post.message} </Typography>
                </CardContent>
                <CardActions>
                    <Button color="primary" size="small" disabled={!user?.result} onClick={()=>{dispatch(likePost(post._id))}} >
                       <Likes/>
                    </Button>

                    {(user?.result?.googleId === post?.creator ||  user?.result?._id=== post?.creator) &&   
                    <Button color="primary" size="small" onClick={()=>{dispatch(deletePost(post._id))}} >
                        <DeleteIcon fontSize="small"/>Delete
                    </Button>
                    }
                  

                </CardActions>

                
            </Card>
        </h1>
    )
}

export default Post;