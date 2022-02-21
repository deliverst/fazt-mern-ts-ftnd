import React from "react";
import {Video} from "./Videos/Video";
import ReactPlayer from "react-player";
import {deleteVideo} from "./Videos/VideoService";
import './Videos/videos.css'
import {useNavigate} from "react-router-dom";


interface Props {
    video: Video
    loadVideos: () => void;
}


const VideoItem = ({video, loadVideos}: Props) => {

    const handleDelete = async (id: string) => {
        await deleteVideo(id)
        loadVideos()
    }

    const navegation = useNavigate()

    return <div className="col-md-6 pb-4">
        <div className="card card-body video-cart">
            <div className="d-flex justify-content-between">
                <div onClick={() => {
                    navegation(`/update/${video._id}`)
                }} className={'mb-3'}>{video.title}</div>
                <span onClick={() => video._id && handleDelete(video._id)} style={{cursor: "pointer"}}>
                        <button type="button" className="close" aria-label="Close">
                            <span className="text-danger" aria-hidden="true">&times;</span>
                        </button>
                    </span>
            </div>

            <div className="embed-responsive embed-responsive-16by9">
                <ReactPlayer className={"embed-responsive-item"} url={video.url}/>
            </div>


            <div className={'mt-3'}>{video.description}</div>
        </div>
    </div>
}

export default VideoItem