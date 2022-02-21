import React, {FormEvent, useState, useEffect} from "react";
import {Video} from "./Video";
import * as videoService from "./VideoService";
import {toast} from "react-toastify";
// @ts-ignore
import {useNavigate, useParams,} from "react-router-dom";

interface Params {
    id: string
}

const VideoForms = () => {

    // type InputChange = ChangeEvent<HTMLInputElement> | ChangeEventHandler<HTMLTextAreaElement>;
    const navigate = useNavigate()
    // @ts-ignore
    const params = useParams<Params>()

    const initialState = {
        title: '',
        description: '',
        url: ''
    };

    const [video, setVideo] = useState<Video>(initialState);

    const handleInputChange = (e: any) => {
        setVideo({...video, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!params.id) {
            await videoService.createVideo(video)
            toast.success('Saved')
        } else {
            await videoService.updateVideo(params.id, video)
        }

        navigate('/')
    }

    const getVideo = async (id: string) => {
        const res = await videoService.getVideo(id)
        console.log(res)
        const {title, description, url} = res.data
        setVideo({title, description, url})
        // setVideo({title, description, url})
        // console.log(video)
    }

    useEffect(() => {
        if (params.id) getVideo(params.id)
        // if (params.id) console.log(params.id)
    }, []);


    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>New Video</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input onChange={handleInputChange} type="text" name='title' placeholder={'Write the title for the video'} className='form-control' autoFocus value={video.title}/>
                            </div>
                            <div className="form-group">
                                <input onChange={handleInputChange} type='text' name='url' placeholder={'type your link'} className={'form-control'} autoFocus value={video.url}/>
                            </div>
                            <div className="form-group">
                                <textarea onChange={handleInputChange} name={'description'} placeholder={'add your comment'} className={'form-control'} autoFocus value={video.description}/>
                            </div>
                            {
                                params.id ?
                                    <button className="btn btn-primary center btn-block">Update</button>
                                    :
                                    <button className="btn btn-secondary center btn-block">Create</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoForms