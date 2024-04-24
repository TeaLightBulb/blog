import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import service from '../../appwriteReasouces/appwrite_config'

export default function PostForm ({post}) {
    const {register, handleSubmit, watch, control, setValue, getValues} = useForm({
        // if the user is already logged in we need to set a default value
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug || '',
            contrent: post?.content || '',
            state: post?.state || 'active',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector( state => state.user.userdata)  // usse veriable from the store

    // Post cerat delete or update 
    const submit = async (data) => {

        // if post is already availavble then
        if (post) {
            const file = data.iamge[0]? service.uploadFile(data.image[0]) : null
            
            // delete post 
            if (file) {
                service.deleteFile(post.featuredImage)
            }
            // update post
            const dbPost = await service.updatePost(
                post.$id, {...data, featuredImage: (file ? file.$id : undefined)} 
                // post.$id is a syntax for appwrite to access tghe id of the post object
            )
            // after the post is updated navigate the user to the post component
            if (dbPost) {
                navigate(`/post/${dbPost}`)
            }
        } 
        // if no post is available then 
        else{
            const file = data.image[0] ? await service.uploadFile(data.image[0] ) : null

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                // creat new post 
                const dbpost = await service.creatPost( {...data, userId: userData.id})
                if (dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }


    // convert the title into slug
    const slugTransform = useCallback( (value) => {
        if( value && typeof(value) == String){
            return value
            .trim()
            .toLowerCase()
            .repalce(/^[a-zA-Z\d]+/g, '-')
        }else {
            return ""
        }
    }, [])

    useEffect( () => {
        const subcription = watch( (value, {name}) => {
            if (name === 'title') {
                setValue(slug, slugTransform(value.title, {shouldValidate: true}));
            }
        })

        return () => subcription.unsubscribe()
    })

    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
   )
  }
