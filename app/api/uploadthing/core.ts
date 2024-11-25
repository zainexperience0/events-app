import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
 image: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(async ({ metadata, file }) => {}),
  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;