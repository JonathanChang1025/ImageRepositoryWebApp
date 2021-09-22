Shopify Backend Developer Intern Challenge 2021 by Jonathan Chang
An image repository website powered by ReactJS and Firebase

# How to Setup the ReactJS Environment and Run the Local Server #
Download the latest src files from this GitHub Repository
Ensure that Nodejs is installed on the operating computer: https://nodejs.org/en/
Using the cmd/terminal and navigate to the src folder
Then type "npm install" to install the necessary dependencies
Once complete, type "npm" start to begin the local server running on port: 3000; "http://localhost:3000/"
   
# How to Use the Website #
When you first open the page: "http://localhost:3000/" you will see a couple of public images that have been uploaded by other users (which includes me!)
You can see the name of the image as well as the publisher.
-Click on any of the image to enlarge it and see the full image.
-Click anywhere outside of the image to close it.
Sign in by clicking on the signin button on the top right of the website: Please use your gmail to log in.
Once signed in, you will still be on the home page, however, you can now see additional header links: My Images and Upload.
If you click on My Image you won't have any images since it is your first time logging in; click on the Upload link.

Feel free to upload any image files, give it a title, decide whether you want it to be public or private and upload. (please don't upload anything you wouldn't want on the internet since the 'remove image' feature still has not been implemented)

If you selected private, only you have access to the image and can find it under the "My Images".
If you selected public, you will find it under "My Images" but it will also show up under the "Home" page.
Other signed in user, as well as non-signed in users will be able to see any public images uploaded by any user on the "Home" page.

# Test Cases #
-Sign in persistence is only preserved by session. If you close the tab/window the user will be automatically signed out.
-Upload will be refused if no Title is provided.
-Upload will also be refused if no file other than '.png' or '.jpg' is selected.
-When the user is on one of the pages only accessable by a signed in user and they log out, the page will redirect them to the Home Page
-If the user manually types in the upload page, they can access the upload page however, cannot upload.

# Future Implementations / Feature Fixes #
-When an image is selected, additional actions should be available: make public/private, delete, more info etc...
-Multi image uploading
-Search bar for filtering
-Sorting images for filtering
-Preview images only display top left of the entire image; ideally it should be centered.
-User can manually type in the "My Images" and "Upload" link; need to add a user logged in check, and if not redirect to home and prompt for login. Currently pages load but will provide no functionality; upload will not upload unless signed in.
