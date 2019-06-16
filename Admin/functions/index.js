'use strict';

const functions = require('firebase-functions');
const cors= require("cors")({origin:true})
const fs = require("fs");
const UUID = require("uuid-v4");
const  storages = require('@google-cloud/storage');
  
const gcs = storages({
    projectId: 'servicepulse-5a75b',
    keyFilename: '/servicepulse.json'
    
  });

// projectId:"servicepulse-5a75b",
// keyFilename:"servicepulse.json"

const storeImage = functions.https.onRequest((request, response) => {
  cors(request,response,()=>{
      const body=JSON.parse(request.body)
      fs.writeFileSync("/tmp/uploaded-image.jpg",body.image,err =>{
          console.log(err)
          return response.status(500).json({error:err})
      });
      const bucket = gcs.bucket("servicepulse-5a75b.appspot.com")

      const uuid =UUID()
      bucket.upload("/tmp/uploaded-image.jpg",{
          uploadType:"media",
          destination:"/services/" + uuid + ".jpg",
          metadata:{
              contentType:"image/jpeg",
              firebaseStorageDownloadTokens: uuid
          }
      },(err,file)=>{
          if(!err){
              response.status(201).json({
                  imageUrl:"https://storage.googleapis.com/v0/b/" +
                  bucket.name + 
                  "/o/" +
                  encodeURIComponent(file.name) +
                  "?alt=media&token=" +
                  uuid
              })
          }else{
              console.log(err)
              response.status(500).json({error:err})
          }
      })
  });

});

module.exports = storeImage;
