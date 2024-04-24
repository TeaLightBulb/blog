import { Client, Databases, ID, Query, Storage, } from 'appwrite';
import config from '../config/config' 

export class Service {

    client = new Client();
    databases;
    storage;

    constructor (){
        this.client
            .setEndpoint(config.appwriteUrl) // appwrite url
            .setProject(config.projectId); // project id
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async creatPost({title, slug, content, featuredImage, status, userId}) {
        try{
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    // Pass the attributes
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error){
            throw error;
        }

    }

    async updatePost (slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost (slug){
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug,   
            )
            return true;
        } catch (error) {
            throw error;
        }
    }


    //to get single post
    async getPost (slug) {  
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug, 
            ) 
        } catch (error) {
            throw error
        }
    }

    async getAllPost (queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries,
            )
        } catch (error) {
            throw error
        }
    }

    // file handling methods *upload *delete *preview

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.bucketID,
                ID.unique(),
                file,
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.bucketID,
                fileId,  
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    getFilePreview (fileId){
        return this.storage.getFilePreview(
            config.bucketID,
            fileId,  
        )
    }
}

const service = new Service();
export default service;