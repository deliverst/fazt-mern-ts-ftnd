import React, {useEffect, useState} from "react";
import {Video} from "./Video";
import * as videosService from "./VideoService";
import VideoItem from "../../componentes/VideoItem";


const VideoList = () => {
    const [videos, setVideos] = useState<Video[]>([])
    const loadVideos = async () => {
        const res = await videosService.getVideos()

        const SortVideos = res.data.map(video => {
            return {
                ...video,
                createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
                updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
            }
        }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        setVideos(SortVideos)
    }

    useEffect(() => {
        loadVideos()
    }, [])

    return (
        <div className={'row'}>
            {videos.map(video => {
                return (< VideoItem video={video} key={video._id} loadVideos={loadVideos}/>)
            })}
        </div>
    )
}

export default VideoList