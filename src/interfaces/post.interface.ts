import { Schema } from "mongoose";


export enum ContentType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
}

export interface Post {
  _id: Schema.Types.ObjectId,
title: string,
body: string,
contentType: ContentType
}

